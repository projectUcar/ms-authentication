const jwt = require("jsonwebtoken");
import { ENV_UCAR, SECRET_KEY, JWT_REFRESH } from "../config";

export const generateToken = (user) => {
  const payload = {
    name: user.firstName,
    lastname: user.lastName,
    email: user.email,
    id: user._id,
    role: user.roles,
  };

  const expiresIn = '24h';
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn });
  return { token, expiresIn };
};

export const generateRefreshToken = (user, res) => {
  const payload = {
    name: user.firstName,
    lastname: user.lastName,
    email: user.email,
    id: user._id,
    role: user.roles,
  };

  const expiresIn = 1000 * 60 * 60 * 24 * 30;
  const refreshToken = jwt.sign(payload, JWT_REFRESH, { expiresIn });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: !(ENV_UCAR === "development"),
    expires: new Date(Date.now() + expiresIn),
  });
};

export const decodeToken = (token) => {
  try {
    const payload = jwt.verify(token, SECRET_KEY);

    return payload;
  } catch (err) {
    return null;
  }
};
