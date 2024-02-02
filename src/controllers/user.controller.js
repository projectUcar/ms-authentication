import User from '../models/User.js';

export const getUserProfile = async (req, res) => {
  try {
    const userProfile = await User.aggregate([
      { $match: { email: req.user.email } },
      {
        $lookup: {
          from: 'roles',
          localField: 'roles',
          foreignField: '_id',
          as: 'rolesData',
        },
      },
      {
        $project: {
          _id: 0,
          firstName: 1,
          lastName: 1,
          email: 1,
          carrer: 1,
          phoneNumber: 1,
          gender: 1,
          profileImage: 1,
          roles: {
            $map: {
              input: '$rolesData',
              as: 'role',
              in: '$$role.name',
            },
          },
        },
      },
    ]);
    
    res.json(userProfile[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};