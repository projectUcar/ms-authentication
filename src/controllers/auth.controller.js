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
    res.json('singin')
};