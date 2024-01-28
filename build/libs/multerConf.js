/* import multer from 'multer';
import crypto from 'crypto';
import fs from 'fs';

const multerConfig = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {

            const uploadPath = '../../uploads/profileImage/';

            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
              }

            cb(null, _dirname + uploadPath); // los uploads se subirán en esta carpeta
        },
        filename: (req, file, cb) => {
            const userId = req.user.id;

            const hash = crypto.createHash('md5').update(userId.toString()).digest('hex');
            // obtener la extensión del archivo
            const fileExtension = file.originalname.split('.').pop();

            const newFileName = `${hash}.${fileExtension}`;
            // generar ID para ponerlo como nombre de imagen
            callback(null, newFileName);
        }
    }),
    fileFilter (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') { 
            cb(null, true);
        } else {
            cb(new Error('Formato de imagen no válido'));
        }
    }
}

export default multerConfig */
"use strict";