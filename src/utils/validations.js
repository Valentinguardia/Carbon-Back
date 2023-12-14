const regexPatterns = {
  id: /^\d+$/,
  name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
  fantasyName: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s,-]+$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  imageFormat: /\.(jpeg|jpg|png|gif)$/i,
  password: /^[a-zA-Z\d]{6,}$/,  
};
const validate = {
  id: id => regexPatterns.id.test(id),
  name: name => regexPatterns.name.test(name),
  fantasyName: name => regexPatterns.fantasyName.test(name),
  email: email => regexPatterns.email.test(email),
  password: password => regexPatterns.password.test(password),
  createResetUrl: resetToken => `${process.env.MAIL_RESET_PASSWORD_URL}/reset-password/${resetToken}`,
};
export default validate;
