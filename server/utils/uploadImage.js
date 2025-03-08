import cloudinary from '../configs/cloudinary.js'
import { BadRequestError } from '../exceptions/BadRequestError.js';
import { InternalServerError } from '../exceptions/InternalServerError.js'

export const uploadImage = async (imagePath) => {
  if(!imagePath){
    throw BadRequestError("File upload failed: File cannot be empty")
  }
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };
    try {
      const result = await cloudinary.uploader.upload(imagePath, options);
      return result.secure_url;
    } catch (error) {
      console.error(error);
      throw new InternalServerError("Failed to upload image", error.message)
    }
};