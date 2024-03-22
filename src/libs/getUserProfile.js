import User from '../models/User';
import Rating from '../models/Rating';

const getUserProfileById = async (userId) => {
    try {
        const userFound = await User.findById(userId);
        if (!userFound) {
            return null;
        }

        const userProfile = await User.aggregate([
            { $match: { email: userFound.email } },
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
                    _id: 1,
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

        

        const ratings = await Rating.find({ ratedUserId: userFound._id });
        const allRatings = [];

        for (const rating of ratings) {
            const ratingByUser = await User.findById(rating.raterUserId);
            const ratingBy = ratingByUser ? `${ratingByUser.firstName} ${ratingByUser.lastName}` : null;

            allRatings.push({
                comment: rating.comment,
                stars: rating.stars,
                ratingBy,
            });
        }

        // Fusionar la información del usuario con todos los comentarios y estrellas
        const mergedUserProfile = {
            user: userProfile[0],
            ratings: allRatings.length > 0 ? allRatings : "¡Ups! Parece que todavía no ha sido evaluado.",
        };

        return mergedUserProfile;

    } catch (error) {
        console.error('Error interno del servidor:', error);
        return null;
    }
};

export default getUserProfileById;