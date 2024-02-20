import User from '../models/User';
import fs from 'fs';
import path from 'path';

const getProfileImageById = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user || !user.profileImage) {
      return null; 
    }

    const imageFileName = user.profileImage;
    const imagePath = path.join(__dirname, '..', '..', 'uploads', 'profileImage', imageFileName);

    if (fs.existsSync(imagePath)) {
      return imagePath;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error al obtener la imagen de perfil:', error);
    return null;
  }
};

export default getProfileImageById;