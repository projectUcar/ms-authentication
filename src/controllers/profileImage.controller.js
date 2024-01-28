import User from '../models/User';
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
    const user = await User.findById(userId);

    if (!user || !user.profileImage) {
      return res.status(404).json({ message: 'Usuario o imagen de perfil no encontrado' });
    }

    const imageFileName = user.profileImage;
    const imagePath = path.join(__dirname, '..','..','uploads', 'profileImage', imageFileName);

    if (fs.existsSync(imagePath)) {
      res.sendFile(imagePath);
    } else {
      res.status(404).json({ message: 'Imagen de perfil no encontrada en el servidor' });
    }
  } catch (error) {
    console.error('Error al obtener la imagen de perfil:', error);
    res.status(500).json({ error: 'Error al obtener la imagen de perfil' });
  }
};