export const validateToken = (req, res) => {
    try {
      const user = {
        email: req.user.email,
        id: req.user._id,
        firstName: req.user.firstName,
        lastname: req.user.lastName,
        roles: req.user.roles,
        carrer: req.user.carrer,
        profileImage: req.user.profileImage
      };
      res.status(200).json({ authenticated: true, user }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  