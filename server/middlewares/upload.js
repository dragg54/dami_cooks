import multer, { diskStorage } from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const allowedFormats = ["jpeg", "jpg", "png"];

const storage = diskStorage({
  filename:(req, file , cb) =>{
    cb(null, file.originalname)
  }
})
const upload = multer({ storage });

export default upload;
