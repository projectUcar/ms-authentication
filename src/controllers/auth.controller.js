import User from '../models/User.js';
import Role from "../models/Roles.js";
import generateToken from "../libs/jwt.js";
import { LENGTH_PASSWORD } from '../config.js';

export const singup = async (req, res) => {
    try {
        const { firstName, lastName, email, carrer, phoneNumber, gender, password, confirmPassword, roles } = req.body;
        
        if (password.length <= LENGTH_PASSWORD || !/\d/.test(password)){
            return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one number.' });
        }

        if (password!== confirmPassword){
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@upb\.edu\.co$/;

        if (!emailRegex.test(email)) {
          return res.status(400).json({ error: 'Invalid email format. Use only @upb.edu.co domain.' });
        }

        const newUser = new User({ firstName, lastName, email, carrer, phoneNumber, gender, password });

        // checking for roles
        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } });
            newUser.roles = foundRoles.map((role) => role._id);
        } else {
            const role = await Role.findOne({ name: "passenger" });
            newUser.roles = [role._id];
        }

        newUser.profileImage = '';
        const savedUser = await newUser.save();
        const token = generateToken(savedUser);
        res.status(201).json({ savedUser, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const singin = async (req, res) => {
    try {
        const userFound = await User.findOne({ email: req.body.email }).populate(
            "roles"
        );

        if (!userFound) return res.status(400).json({ message: "Email or Password Not Found" });

        const matchPassword = await User.comparePassword(
            req.body.password,
            userFound.password
        );

        if (!matchPassword)
            return res.status(400).json({message: "Email or Password Not Found"});

        const token = generateToken(userFound);
        const name = userFound.firstName;
        res.json({ name, token });
    } catch (error) {
        console.log(error);
    }
};