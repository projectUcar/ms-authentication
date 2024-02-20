import multer from 'multer';
import fs from 'fs';
import shortid from 'shortid';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadPath = 'uploads/profileImage';

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

const upload = multer({ storage });

export default upload;