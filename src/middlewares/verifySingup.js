import User from "../models/User.js";

export const checkExistingUser = async (req, res, next) => {
  try {
    const email = await User.findOne({ email: req.body.email });
    if (email)
      return res.status(400).json({ message: "The email already exists" });

    const phoneNumber = await User.findOne({ phoneNumber: req.body.phoneNumber });
    if (phoneNumber)
      return res.status(400).json({ message: "The phoneNumber already exists" });

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};