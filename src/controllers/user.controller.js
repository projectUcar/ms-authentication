import getUserProfileById from '../libs/getUserProfile.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await getUserProfileById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getUserInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await getUserProfileById(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};