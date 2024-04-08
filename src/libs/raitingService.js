import Rating from "../models/Rating";

const getAverageStars = async (ratedUserId) => {
    try {
        const ratings = await Rating.find({ ratedUserId });

        if (ratings.length === 0) {
            return { averageRating: 0, numberRatings: 0 };
        }
        // Calcular el promedio de estrellas
        const totalStars = ratings.reduce((total, rating) => total + rating.stars, 0);
        const averageRating = totalStars / ratings.length;

        return { averageRating, ratingTotal: ratings.length };
    } catch (error) {
        console.error('Error al actualizar el promedio de estrellas del usuario:', error);
        throw error;
    }
};

export default getAverageStars;