import {v2 as cloudinary} from 'cloudinary';
import { envs } from '../env';

cloudinary.config({
  cloud_name: envs.CLOUDINARY_CLOUD_NAME, 
  api_key: envs.CLOUDINARY_API_KEY, 
  api_secret: envs.CLOUDINARY_API_SECRET,
  secure: true
})


export const uploadImage = async (filePath: string) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'novadata'
  })
}

export const deleteImage = async (publicId: string) => {
  return await cloudinary.uploader.destroy(publicId)
}