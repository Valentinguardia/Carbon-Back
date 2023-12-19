import models from "../models/index.js";

const { UserStyles } = models;
const userStylesControllers = {
createStyle: async (req, res) => {
  try {
    const { user_id, style_details, name } = req.body;
    const newUserStyle = await UserStyles.create({ user_id, style_details, name });
    res.status(201).json(newUserStyle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el estilo personalizado.", error });
  }
},
styleId: async (req, res) => {
  try {
    const styleId = req.params.styleId;
    const customStyle = await UserStyles.findByPk(styleId);
    if (!customStyle) return res.status(404).json({ message: "Estilo personalizado no encontrado." });
    res.status(200).json(customStyle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el estilo personalizado.", error });
  }
},
userId: async (req, res) => {
  try {
    const userId = req.params.userId;
    const userCustomStyles = await UserStyles.findAll({where: { user_id: userId },});
    res.status(200).json(userCustomStyles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los estilos personalizados del usuario.", error });
  }
},
updateStyle: async (req, res) => {
  try {
    const styleId = req.params.styleId;
    const { style_details, name } = req.body;
    const updatedStyle = await UserStyles.update({ style_details, name },{ where: { id: styleId } });
    if (!updatedStyle) return res.status(404).json({ message: "Estilo personalizado no encontrado" });       
    res.status(200).json({ message: "Estilo personalizado actualizado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el estilo personalizado.", error });
  }
},
deleteStyle: async (req, res) => {
  try {
    const styleId = req.params.styleId;
    const deletedStyle = await UserStyles.destroy({ where: { id: styleId } });
    if (!deletedStyle) return res.status(404).json({ message: "Estilo personalizado no encontrado" });
    res.status(200).json({ message: "Estilo personalizado eliminado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el estilo personalizado.", error });
  }
},
}
export default userStylesControllers