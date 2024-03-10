import Rating from '../models/Rating.js';
import hasRole from '../libs/verifyRole.js';

export const createRating = async (req, res) => {
  try {
    const isPasajero = await hasRole(req.user._id, 'passenger');
    if (!isPasajero) {
      return res.status(403).json({ error: 'Solo los pasajeros pueden calificar a los conductores' });
    }
    const { stars, comment } = req.body;
    const {ratedUserId} = req.params
    const raterUserId =  req.user._id

    const rating = new Rating({
      stars,
      comment,
      ratedUserId,
      raterUserId
    });

    await rating.save();

    res.status(201).json({ message: 'Calificación creada con éxito' });

  } catch (error) {
    console.error('Error al crear la calificación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};