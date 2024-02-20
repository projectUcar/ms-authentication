import { Router } from "express";
import { authenticateUser } from "../middlewares/authJwt.js";

const router = Router();
import * as userCtrl from '../controllers/user.controller.js'

router.get("/profile", authenticateUser, userCtrl.getUserProfile);
router.get("/user/:id", authenticateUser, userCtrl.getUserInfoById);

export default router;