import User from "../models/User.js";
const jwt = require('jsonwebtoken');
import { SECRET_KEY } from '../config'

export const authenticateUser = async (req, res, next) => {
    const authorization = req.get('authorization')
    let token = ''
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7)
    }

    let decodedToken = {}
    try {
        decodedToken = jwt.verify(token, SECRET_KEY)
    } catch (e) {
        console.log(e)
    }

    if (!token || !decodedToken.email) {
        return res.status(401).json({ message: "token missing or invalid" })
    }

    const user = await User.findOne({ email: decodedToken.email });

    if (!user) return res.status(404).json({ message: "No user found" });

    req.user = user;
    req.token = token;
    next();
};