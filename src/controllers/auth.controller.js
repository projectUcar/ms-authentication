import User from '../models/User.js';
import Role from "../models/Roles.js";
import generateToken from "../libs/jwt.js";

export const singup = async (req, res) => {
    try {
        const { firstName, lastName, email, carrer, semester, phoneNumber, gender, password, roles } = req.body;

        const newUser = new User({ firstName, lastName, email, carrer, semester, phoneNumber, gender, password });

        // checking for roles
        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } });
            newUser.roles = foundRoles.map((role) => role._id);
        } else {
            const role = await Role.findOne({ name: "passenger" });
            newUser.roles = [role._id];
        }

        const savedUser = await newUser.save();
        const token = generateToken(savedUser);
        res.status(201).json({ savedUser, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const singin = async (req, res) => {
    try {
        // Request body email can be an email or username
        const userFound = await User.findOne({ email: req.body.email }).populate(
            "roles"
        );

        if (!userFound) return res.status(400).json({ message: "User Not Found" });

        const matchPassword = await User.comparePassword(
            req.body.password,
            userFound.password
        );

        if (!matchPassword)
            return res.status(401).json({
                token: null,
                message: "Invalid Password",
            });

        const token = generateToken(userFound);
        res.json({ token });
    } catch (error) {
        console.log(error);
    }
};