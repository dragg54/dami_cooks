import { v2 as cloudinary } from 'cloudinary';
import  dotenv  from 'dotenv'

dotenv.config()

export async function cloudinaryConfig() {
    try{
        const resp = cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }
    catch(err){
        console.log(err.message)
        throw new Error(err.message)
    }
}
