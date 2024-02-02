import { Router } from "express";
import { authenticateUser } from "../middlewares/authJwt.js";

const router = Router();
import * as verifyTokenCtrl from '../controllers/verifyTokenCtrl';

router.get('/validate-token', authenticateUser, verifyTokenCtrl.validateToken);

export default router;
