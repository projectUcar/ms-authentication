import express from 'express';
import multer from 'multer';
import { authenticateUser } from '../middlewares/authJwt';
import fs from 'fs';
import shortid from 'shortid';
import crypto from 'crypto';
import multerConfig from '../libs/multerConf';

import { uploadProfileImage, getProfileImage } from '../controllers/profileImage.controller';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadPath = 'uploads/profileImage';

    // Verifica si la carpeta de destino existe, si no, créala
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    const userId = req.user.id;
    const fileExtension = file.originalname.split('.').pop();
    const newFileName = `${shortid.generate()}.${fileExtension}`;

    callback(null, newFileName);
  },
});

const upload = multer({storage});
//const upload = multer(multerConfig);

router.post("/upload-profile-image", authenticateUser, upload.single("photoUrl"), uploadProfileImage);
router.get('/profile-image', authenticateUser, getProfileImage);

export default router;