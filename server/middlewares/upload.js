import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryConfig } from "../configs/cloudinary.js";

const allowedFormats = ["jpeg", "jpg", "png"];

const storage = new CloudinaryStorage({
    cloudinary:cloudinaryConfig(),
    params: {
        folder: "dami_cooks_upload",
        format: async (req, file) => {
            const fileFormat = file.mimetype.split("/")[1]; 
            if (!allowedFormats.includes(fileFormat)) {
              throw new Error("Invalid file type. Only JPEG, JPG, and PNG are allowed.");
            }
            return fileFormat;
          },
        public_id: (req, file) => file.originalname.split(".")[0],
    },
});

const upload = multer({ storage });

export default upload;
