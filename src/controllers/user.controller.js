import User from '../models/User.js';

export const getUserProfile = async (req, res) => {
    try {
      const userProfile = await User.findOne({ email: req.user.email }, {
        _id: 0,
        firstName: 1,
        lastName: 1,
        email: 1,
        carrer: 1,
        semester: 1,
        phoneNumber: 1,
        gender: 1,
        photoUrl: 1,
      });
  
      res.json(userProfile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };