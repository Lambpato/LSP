import multer from 'multer';

const imagesDirectory = 'public/images';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, imagesDirectory);
  },
  filename: (req, file, callback) => {
    const fileExtension = '.png';
    const name = `${file.fieldname}-${Date.now()}${fileExtension}`;
    callback(null, name);
  }
});

export default multer({ storage });
