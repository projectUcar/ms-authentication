const jwt = require("jsonwebtoken");
import { ENV_UCAR, SECRET_KEY, JWT_REFRESH } from "../config";
import { returnRole } from "./verifyRole";


export const preparateDataToken = async (user) => {

  const roleNames = await Promise.all(user.roles.map(roleId => returnRole(roleId)));
  return {
    name: user.firstName,
    lastname: user.lastName,
    email: user.email,
    id: user._id,
    role: roleNames,
  };
};


export const generateToken = (payload) => {

  const expiresIn = '24h';
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn });
  return { token, expiresIn };
};

export const generateRefreshToken = (payload, res) => {

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
