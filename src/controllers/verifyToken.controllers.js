export const validateToken = (req, res) => {
    try {
      res.status(200).json({ authenticated: true, userId: req.user.email }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  