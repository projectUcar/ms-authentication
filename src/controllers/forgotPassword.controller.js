import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from "../models/User.js"
import PasswordReset from '../models/PasswordReset.js';
import { LENGTH_PASSWORD, PASSWORD_EMAIL, FRONTEND_BASE_URL, PORT } from "../config.js"

// TODO Configuración de nodemailer 
const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com', // Servidor SMTP para Microsoft 365
  port: 587, // Puerto para TLS
  secure: false, // true para uso seguro (TLS), false para otro caso
  auth: {
    user: 'carpooling.fisi@upb.edu.co',
    pass: PASSWORD_EMAIL, //
  },
});

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Verificar si el usuario con ese correo existe
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found with the provided email.' });
    }

    // Generar un código único para restablecer la contraseña
    const resetCode = crypto.randomBytes(4).toString('hex');

    // Almacenar el código en una colección separada
    const resetEntry = new PasswordReset({
      userId: user._id,
      resetCode,
    });

    await resetEntry.save();

    const resetUrl = `${FRONTEND_BASE_URL}:${PORT}/api/auth/reset-password/${resetCode}`;

    // TODO Enviar correo con el enlace de restablecimiento
    const mailOptions = {
      from: 'carpooling.fisi@upb.edu.co',
      to: user.email,
      subject: 'Restablecimiento de Contraseña',
      html: `
          <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
          <a href="${resetUrl}">${resetUrl}</a>
        `,
    };
    await transporter.sendMail(mailOptions);

    console.log(resetUrl);

    res.status(200).json({ link: resetUrl, message: 'Reset link sent to the provided email.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    const { confirmNewPassword } = req.body;

    if (newPassword.length <= LENGTH_PASSWORD || !/\d/.test(newPassword
    )) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one number.' });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    // Buscar el código en la colección PasswordReset
    const resetEntry = await PasswordReset.findOne({ resetCode: token });

    if (!resetEntry) {
      return res.status(404).json({ error: 'Invalid or expired reset code.' });
    }

    // Verificar la duración del token (20 minutos)
    const expirationTime = 20 * 60 * 1000; // 20 minutos en milisegundos
    const currentTime = new Date().getTime();

    if (currentTime - resetEntry.createdAt > expirationTime) {
      // Limpiar el código en PasswordReset si ha expirado
      await resetEntry.remove();
      return res.status(400).json({ error: 'Reset code has expired.' });
    }

    // Actualizar la contraseña del usuario en el modelo User
    const user = await User.findById(resetEntry.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Actualizar la contraseña y limpiar el código en PasswordReset
    user.password = newPassword;
    await user.save();
    await resetEntry.remove();

    res.status(200).json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};