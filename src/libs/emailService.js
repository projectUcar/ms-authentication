import nodemailer from 'nodemailer';
import exphbs from 'nodemailer-express-handlebars';
import path from 'path';
import { EMAIL_UCAR, PASSWORD_EMAIL } from "../config.js";

// Configuración de nodemailer 
const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com', // Servidor SMTP para Microsoft 365
  port: 587, // Puerto para TLS
  secure: false, // true para uso seguro (TLS), false para otro caso
  auth: {
    user: EMAIL_UCAR,
    pass: PASSWORD_EMAIL,
  },
});

// Configuración de nodemailer-express-handlebars
transporter.use('compile', exphbs({
  viewEngine: {
    extName: '.handlebars',
    partialsDir: path.resolve('./views'), 
    defaultLayout: false,
  },
  viewPath: path.resolve('./views'),
}));


export const sendMail = async (to, subject, template, context) => {
  const mailOptions = {
    from: EMAIL_UCAR,
    to,
    subject,
    template,
    context,
    attachments: [{
      filename: 'coverLogo.png',
      path: 'public/images/coverLogo.png',
      cid: 'coverLogo'
    }]
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado exitosamente');
  } catch (error) {
    console.error(error);
    throw new Error('Error al enviar el correo electrónico', error);
  }
};
