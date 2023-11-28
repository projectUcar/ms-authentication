const jwt = require('jsonwebtoken');
import { SECRET_KEY } from '../config'

const generateToken = (user) => {
    const payload = {
        name: user.firstName,
        lastname: user.lastName,
        email: user.email,
        role: user.roles,
      };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  return token;
};

export const decodeToken = (token) => {
  try {
    const payload = jwt.verify(token, SECRET_KEY);

    return payload;
  } catch (err) {
    return null;
  }
};

export default generateToken;