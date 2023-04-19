import path from 'node:path';
import multer from 'multer';

const audioDirectory = 'public/audio';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, audioDirectory);
  },
  filename: (req, file, callback) => {
    const fileExtension = path.extname(file.originalname);
    const name = `${file.fieldname}-${Date.now()}${fileExtension}`;
    callback(null, name);
  }
});

export default multer({ storage });
