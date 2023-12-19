import Sequelize from "sequelize";
import models from "../models/index.js";
import bcrypt from "bcrypt";
import { generateToken } from "../config/tokens.js";
import { transporter } from "../config/mailTransporter.js";
import validate from "../utils/validations.js";
import emailTemplates from "../utils/emailTemplates.js";

const { User } = models;
const userController = {
  register: async (req, res) => {
    const { fullName, email, password, confirmPassword } = req.body;
    if (!fullName) return res.status(400).json({ message: "Nombre completo no proporcionado." });
    if (!email) return res.status(400).json({ message: "Email no proporcionado." });
    if (!validate.email(email)) return res.status(400).json({ message: "El email tiene un formato incorrecto." });
    if (!password) return res.status(400).json({ message: "Contraseña no proporcionada." });
    if (!validate.name(fullName)) return res.status(400).json({ message: "El nombre completo contiene caracteres inválidos." });
    if (!validate.password(password)) {
      return res.status(400).json({
        message:
          "La nueva contraseña no cumple con los requisitos mínimos:\n" +
          "✓ Solo letras y números.\n" +
          "✓ 1 letra mayúscula.\n" +
          "✓ 1 letra minúscula.\n" +
          "✓ 6 caracteres de largo.",
      });
    }
    if (password !== confirmPassword) return res.status(400).json({ message: "Las contraseñas no coinciden." });
    try {
      const userExist = await User.findOne({ where: { email } });
      if (userExist) return res.status(400).json({ message: "El usuario ya se encuentra registrado." });
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({fullName,email,password: hashedPassword,});
      const mailOptions = emailTemplates.welcome(newUser);
      await transporter.sendMail(mailOptions);
      const userResponse = { ...newUser.toJSON(), password: undefined };
      res.status(201).json(userResponse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al registrar el usuario." });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email)  return res.status(400).json({ message: "Email no proporcionado." });
    if (!validate.email(email)) return res.status(400).json({ message: "El email no tiene un formato correcto." });
    if (!password) return res.status(400).json({ message: "Contraseña no proporcionada." });
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(400).json({ message: "Usuario no encontrado." });  
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return res.status(400).json({ message: "Contraseña inválida." });
      await user.update();
      const payload = {email: user.email,fullName: user.fullName,photo: user.photo,};
      const token = generateToken(payload);
      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({ payload, message: "Usuario logeado con éxito." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error de servidor." });
    }
  },
  logout: (req, res) => {
    if (!req.cookies.token) return res.status(400).json({ message: "No hay sesión iniciada." });
    res.clearCookie("token");
    res.status(204).json({ message: "Deslogueado correctamente" });
  },
  me: async (req, res) => {
    const userId = req.user?.id;
    if (!userId) return res.status(400).json({ message: "Id no encontrado en el token." });
    try {
      const user = await User.findOne({where: { id: userId },attributes: ["email","fullName","photo",],});
      if (!user) return res.status(404).json({ message: "Usuario no encontrado." });
      res.json(user.get({ plain: true }));
    } catch (error) {
      console.error(error);
      res.status(500).send("Error de servidor");
    }
  },
  deleteMe: async (req, res) => {
    const userId = req.user?.id;
    if (!userId) return res.status(400).json({ message: "Autenticación requerida." });
    try {
      const user = await User.findOne({ where: { id: userId } });
      if (!user) return res.status(404).json({ message: "Usuario no encontrado." });
      await User.destroy({ where: { id: userId } });
      const mailOptions = emailTemplates.accountDeletion(user);
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Usuario eliminado con éxito." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar el usuario." });
    }
  },
  changeUserPassword: async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user?.id;
    if (!currentPassword) return res.status(400).json({ message: "Se requiere la contraseña actual." });
    if (!newPassword) return res.status(400).json({ message: "Se requiere la contraseña nueva." });
    if (!validate.password(newPassword)) {
      return res.status(400).json({
        message:
          "La nueva contraseña no cumple con los requisitos mínimos:\n" +
          "✓ Solo letras y números.\n" +
          "✓ 1 letra mayúscula.\n" +
          "✓ 1 letra minúscula.\n" +
          "✓ 1 número.\n" +
          "✓ 6 caracteres de largo.",
      });
    }
    try {
      const user = await User.findByPk(userId);
      if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) return res.status(400).json({ message: "La contraseña actual es incorrecta." });
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      const mailOptions = emailTemplates.passwordChanged(user);
      await transporter.sendMail(mailOptions);
      res.clearCookie("token");
      res.json({message:"Contraseña cambiada correctamente, por favor iniciá sesión nuevamente.",});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al cambiar la contraseña." });
    }
  },
  mailForgotPassword: async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "El campo email es obligatorio." });
    if (!validate.email(email)) return res.status(400).json({ message: "El formato de correo electrónico es inválido." });
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ message: "Usuario no registrado." });     
      const resetToken = generateToken({ userId: user.id });
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000;
      await user.save();
      const mailOptions = emailTemplates.forgotPassword(user, resetToken);
      await transporter.sendMail(mailOptions);
      res.json({message:"Se envió un correo electrónico con instrucciones para restablecer la contraseña.",});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
  mailResetPassword: async (req, res) => {
    const { token, newPassword } = req.body;
    if (!token) return res.status(400).json({ message: "Se requiere un token." });
    if (!newPassword) return res.status(400).json({ message: "Se requiere ingresar una nueva contraseña." });
    if (!validate.password(newPassword)) {
      return res.status(400).json({
        message:
          "La nueva contraseña no cumple con los requisitos mínimos:\n" +
          "✓ Solo letras y números.\n" +
          "✓ 1 letra mayúscula.\n" +
          "✓ 1 letra minúscula.\n" +
          "✓ 6 caracteres de largo.",
      });
    }
    try {
      const user = await User.findOne({
        where: {
          resetPasswordToken: token,
          resetPasswordExpires: { [Sequelize.Op.gt]: Date.now() },
        },
      });
      if (!user) return res.status(400).json({ message: "Token inválido o expirado." });
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();
      const confirmMailOptions = emailTemplates.resetPasswordConfirmation(user);
      await transporter.sendMail(confirmMailOptions);
      res.json({ message: "Contraseña actualizada con éxito." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
  updateUser: async (req, res) => {
    const { fullName, phoneNumber } = req.body;
    let updatedFields = [];
    const photo = req.file;
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) return res.status(404).json({ message: "Usuario no encontrado." });
      if (fullName && !validate.name(fullName)) return res.status(400).json({message: "El nombre completo contiene caracteres especiales.",});
      if (phoneNumber && !validate.phone(phoneNumber)) return res.status(400).json({message: "El número de teléfono tiene que contener solo números.",});
      if (photo && !!validate.imageFormat(photo)) return res.status(400).json({ message: "El formato de imagen es inválido para la foto." });
      if (fullName && fullName !== user.fullName) {
        user.fullName = fullName;
        updatedFields.push("Nombre Completo");
      }
      if (phoneNumber && phoneNumber !== user.phoneNumber) {
        user.phoneNumber = phoneNumber;
        updatedFields.push("Número de Teléfono");
      }
      if (photo && photo !== user.photo) {
        user.photo = photo;
        updatedFields.push("Foto");
      }
      await user.save();
      if (updatedFields.length > 0) {
        const mailOptions = emailTemplates.userDetailsUpdated(
          user,
          updatedFields
        );
        await transporter.sendMail(mailOptions);
      }
      res.json({ message: "Usuario actualizado correctamente." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar usuario." });
    }
  },
}
export default userController;
