import multer from 'multer';

const audioDirectory = 'public/audio';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, audioDirectory);
  },
  filename: (req, file, callback) => {
    const fileExtension = '.mp3';
    const name = `${Date.now()}-${file.fieldname}${fileExtension}`;
    callback(null, name);
  }
});

export default multer({ storage });
