import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import helmet from "helmet";
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes'
import indexRoutes from "./routes/index.routes.js";
import userRoutes from "./routes/user.routes.js";
import forgotPasswordRoutes from './routes/forgotPassword.routes.js';
import profileImage from './routes/profileImage.routes.js';
import ratingUser from './routes/rating.routes.js';
import roleDriver from './routes/roleDriver.routes.js';

import './libs/rabbitmq.js'

const app = express()

app.set('pkg', pkg)

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("images")); 

app.set("json spaces", 4);

app.use('/api', indexRoutes)
app.use("/api/user", userRoutes);
app.use('/api/auth', authRoutes)
app.use('/api/auth', forgotPasswordRoutes)
app.use('/api/user', profileImage)
app.use('/api/rating', ratingUser)
app.use('/api/change-role', roleDriver)

export default app;