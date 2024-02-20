import User from '../models/User';
import getProfileImageById from '../libs/profileImage';
import fs from 'fs';
import path from 'path';

export const uploadProfileImage = async (req, res) => {
  try {
    const oldImageUrl = req.user.profileImage;
    const newImageFileName = req.file.filename;

    const userId = req.user.id;
    await User.findByIdAndUpdate(userId, { profileImage: newImageFileName });

    if (oldImageUrl) {
      const oldImagePath = path.join(__dirname, '..','..', 'uploads', 'profileImage', oldImageUrl);
      fs.unlinkSync(oldImagePath);
    }

    res.json({newImageFileName, message: "La imagen de perfil se actualizo correctamente." });
  } catch (error) {
    console.error('Error al subir la imagen de perfil:', error);
    res.status(500).json({ error: 'Error al subir la imagen de perfil' });
  }
};

export const getProfileImage = async (req, res) => {
  try {
    const userId = req.user.id;
    const imagePath = await getProfileImageById(userId);

    if (!imagePath) {
      return res.status(404).json({ message: 'Usuario o imagen de perfil no encontrado' });
    }

    res.sendFile(imagePath);  
  } catch (error) {
    console.error('Error al obtener la imagen de perfil:', error);
    res.status(500).json({ error: 'Error al obtener la imagen de perfil' });
  }
};