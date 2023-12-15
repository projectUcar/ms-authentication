import User from '../models/User';

export const uploadProfileImage = async (req, res) => {
  try {
    const photoUrl = req.file.path;

    const userId = req.user.id;
    await User.findByIdAndUpdate(userId, { photoUrl: photoUrl });

    res.json({ imageUrl: photoUrl, message: "La imagen de perfil se actualizo correctamente." });
  } catch (error) {
    console.error('Error al subir la imagen de perfil:', error);
    res.status(500).json({ error: 'Error al subir la imagen de perfil' });
  }
};