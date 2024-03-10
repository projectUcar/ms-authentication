import {Router} from 'express'
import { authenticateUser } from '../middlewares/authJwt';
import upload from '../libs/multerConfig';

import { uploadProfileImage, getProfileImage } from '../controllers/profileImage.controller';

const router = Router();

router.post("/upload-profile-image", authenticateUser, upload.single("photoUrl"), uploadProfileImage);
router.get('/profile-image', authenticateUser, getProfileImage);

export default router;