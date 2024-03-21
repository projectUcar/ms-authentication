import crypto from 'crypto';
import User from "../models/User.js"
import PasswordReset from '../models/PasswordReset.js';
import { sendMail } from '../libs/emailService.js';
import { LENGTH_PASSWORD, FRONTEND_BASE_URL, EMAIL_UCAR } from "../config.js";


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado con el email proporcionado' });
    }

    const resetCode = crypto.randomBytes(4).toString('hex');

    const resetEntry = new PasswordReset({
      userId: user._id,
      userEmail: user.email,
      resetCode,
    });

    await resetEntry.save();

    const resetUrl = `${FRONTEND_BASE_URL}/api/auth/reset-password/${resetCode}`;

    const mailOptions = {
      from: EMAIL_UCAR,
      to: user.email,
      subject: 'UCAR - Restablecimiento de Contraseña',
      template: 'emailResetPassword', // Utilizar la plantilla emailResetPassword
      context: {
        username: user.firstName,
        resetUrl,
      },
    };
    
    await sendMail(mailOptions);

    res.status(200).json({ link: resetUrl, message: 'Se ha enviado un enlace con un código a tu correo electrónico.' });
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

    if (newPassword.length <= LENGTH_PASSWORD || !/\d/.test(newPassword)) {
      return res.status(400).json({ error: 'La contraseña debe tener mínimo 8 caracteres, incluyendo números y signos' });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ error: "Las contraseñas no coinciden" });
    }

    // Buscar el código en la colección PasswordReset
    const resetEntry = await PasswordReset.findOne({ resetCode: token });

    if (!resetEntry) {
      return res.status(404).json({ error: 'Código inválido o expirado' });
    }

    // Verificar la duración del token (20 minutos)
    const expirationTime = 20 * 60 * 1000; // 20 minutos en milisegundos
    const currentTime = new Date().getTime();

    if (currentTime - resetEntry.createdAt > expirationTime) {
      // Limpiar el código en PasswordReset si ha expirado
      await resetEntry.remove();
      return res.status(400).json({ error: 'El código ha expirado' });
    }

    // Actualizar la contraseña del usuario en el modelo User
    const user = await User.findById(resetEntry.userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualizar la contraseña y limpiar el código en PasswordReset
    user.password = newPassword;
    await user.save();
    await resetEntry.remove();

    res.status(200).json({ message: 'La contraseña ha sido cambiada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};