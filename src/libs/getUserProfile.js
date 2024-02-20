import User from '../models/User';

const getUserProfileById = async (userId) => {
    try {
        const user = await User.findOne({ email: userId });
        if (!user) {
            return null;
        }

        const userProfile = await User.aggregate([
            { $match: { email: userId } },
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
        return userProfile[0];
    } catch (error) {
        console.error('Error interno del servidor:', error);
        return null;
    }
};

export default getUserProfileById;