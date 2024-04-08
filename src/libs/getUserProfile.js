import User from '../models/User';
import Rating from '../models/Rating';
import getAverageStars from './raitingService';

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

        // Validar si el usuario tiene el rol de conductor
        const isConductor = userProfile[0].roles.includes('driver');
        if (!isConductor) {
            return userProfile[0]; // Si el usuario no es conductor, devolver null
        }

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

        const { averageRating, ratingTotal } = await getAverageStars(userId);

        // Fusionar la información del usuario con todos los comentarios y estrellas
        const mergedUserProfile = {
            user: userProfile[0],
            rating: {
                averageRating,
                ratingTotal,
                ratings: allRatings.length > 0 ? allRatings : "¡Ups! Parece que todavía no ha sido evaluado.",
            } 
        };

        return mergedUserProfile;

    } catch (error) {
        console.error('Error interno del servidor:', error);
        return null;
    }
};

export default getUserProfileById;