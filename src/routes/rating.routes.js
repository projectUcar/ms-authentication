import { Router } from "express";
import { authenticateUser } from '../middlewares/authJwt';

const router = Router();
import * as ratingCtrl from '../controllers/rating.controller.js';

router.post("/user/:ratedUserId", authenticateUser, ratingCtrl.createRating);

export default router;