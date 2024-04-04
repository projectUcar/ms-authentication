import User from "../models/User.js";
import Role from "../models/Roles.js";
import { generateToken, generateRefreshToken } from "../libs/jwt.js";
import { LENGTH_PASSWORD } from "../config.js";

export const singup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      carrer,
      phoneNumber,
      gender,
      password,
      confirmPassword,
      roles,
    } = req.body;

    if (password.length <= LENGTH_PASSWORD || !/\d/.test(password)) {
      return res
        .status(400)
        .json({ error: "La contraseña debe tener mínimo 8 caracteres" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Las contraseñas no coinciden" });
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@upb\.edu\.co$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({
          error:
            "Formato de Email no válido. Recuerda que sólo debes usar el dominio @upb.edu.co.",
        });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      carrer,
      phoneNumber,
      gender,
      password,
    });

    // checking for roles
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "passenger" });
      newUser.roles = [role._id];
    }

    newUser.profileImage = "";
    const savedUser = await newUser.save();
    const { token, expiresIn } = generateToken(savedUser);
    generateRefreshToken(savedUser, res);

    res.status(201).json({ savedUser, token, expiresIn });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const singin = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );

    if (!userFound)
      return res
        .status(400)
        .json({ message: "Email o contraseña incorrectos" });

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword)
      return res
        .status(400)
        .json({ message: "Email o contraseña incorrectos" });

    const { token, expiresIn } = generateToken(userFound);
    generateRefreshToken(userFound, res);
    const name = userFound.firstName;
    res.json({ name, token, expiresIn });
  } catch (error) {
    console.log(error);
  }
};

export const refreshToken = (req, res) => {
    try {
        const { token, expiresIn } = generateToken(req.user);
        return res.json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error de server" });
    }
};