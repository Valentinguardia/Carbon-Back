import validations from './validations.js';

const createEmailOptions = (to, subject, htmlContent) => ({
  from: process.env.MAIL_USERNAME,
  to,
  subject,
  html: htmlContent
});
const emailTemplates = {
  welcome: (user) => createEmailOptions(user.email, 'Bienvenido/a a Mi Turno Web App', `
    <h3>¡Hola, ${user.fullName}!</h3>
    <p>¡Tu cuenta fue creada exitosamente!</p>
    <p>Ya podés iniciar sesión y empezar a usar la aplicación.</p>
    <p>Saludos,</p>
    <p><b>Carbon</b></p>
  `),
  forgotPassword: (user, resetToken) => {
    const resetUrl = validations.createResetUrl(resetToken);
    return createEmailOptions(user.email, 'Restablecimiento de Contraseña', `
      <h3>¡Hola, ${user.fullName || ''}!</h3>
      <p>Por favor, hacé clic en el siguiente enlace para restablecer tu contraseña:</p>
      <p><a href="${resetUrl}">Hacé clic sobre este mismo link</a></p>
      <p>Si no solicitaste restablecer tu contraseña, por favor ignorá este correo electrónico.</p>
      <p>Saludos,</p>
      <p><b>Carbon</b></p>
    `);
  },
  resetPasswordConfirmation: (user) => createEmailOptions(user.email, 'Confirmación de Cambio de Contraseña', `
    <h4>¡Tu contraseña fue cambiada exitosamente!</h4>
    <p>Si no hiciste este cambio de contraseña, por favor comunicate con nuestro equipo de soporte.</p>
    <p>Si realizaste este cambio, no es necesario que realices ninguna otra acción.</p>
    <p>Saludos,</p>
    <p><b>Carbon</b></p>
  `),
  accountDeletion: (user) => createEmailOptions(user.email, 'Cuenta Eliminada en Mi Turno Web App', `
    <h3>¡Hola, ${user.fullName}!</h3>
    <p>Tu cuenta en Carbon ha sido eliminada.</p>
    <p>Si creés que esto es un error, por favor comunicate con nuestro soporte.</p>
    <p>¡Gracias por haber sido parte de nuestra comunidad!</p>
    <p>Saludos,</p>
    <p><b>Carbon</b></p>
  `),
  passwordChanged: (user) => createEmailOptions(user.email, 'Cambio de Contraseña en Mi Turno Web App', `
  <h3>¡Hola, ${user.fullName}!</h3>
  <p>Tu contraseña en Carbon fue cambiada exitosamente.</p>
  <p>Si no realizaste este cambio, por favor comunicate inmediatamente con nuestro equipo de soporte.</p>
  <p>Saludos,</p>
  <p><b>Carbon</b></p>
`),
}

export default emailTemplates;