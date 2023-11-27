import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    carrer: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    photoUrl: {
        type: String
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
        },
    ],
},
    {
        timestamps: true,
        versionKey: false,
    }
);


userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword  = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
};

// Middleware de hashing de contraseñas
userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
      return next();
    }
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
  });

export default mongoose.model('User', userSchema);
