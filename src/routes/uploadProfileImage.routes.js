import express from 'express';
import multer from 'multer';
import { authenticateUser } from '../middlewares/authJwt';
import fs from 'fs';
import path from 'path';

import { uploadProfileImage }  from '../controllers/uploadProfileImage.controller';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      const uploadPath = 'uploads/images';
  
      // Verifica si la carpeta de destino existe, si no, créala
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
  
      callback(null, uploadPath);
    },
    filename: (req, file, callback) => {
      // Asegúrate de que el nombre del archivo sea único (por ejemplo, agregar un timestamp)
      callback(null, Date.now() + '-' + file.originalname);
    },
  });

const upload = multer({ storage: storage });

router.post("/upload-profile-image", authenticateUser, upload.single("photoUrl"), uploadProfileImage);

export default router;