import User from "../models/User.js";
const jwt = require('jsonwebtoken');
import { SECRET_KEY } from '../config'

export const authenticateUser = async (req, res, next) => {
    const token = req.headers["authorization"] || "";
    console.log(req.headers["authorization"]);
    try {

        const decoded = jwt.verify(token, SECRET_KEY);;
        console.log(decoded.email);
        const user = await User.findOne({ email: decoded.email});

        if (!user) return res.status(404).json({ message: "No user found" });

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};