import * as dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';

dotenv.config({ path: envFile });

export const envs = {
  PORT: parseInt(process.env.PORT as string, 10) || 3000,
  JWT_SEED: process.env.JWT_SEED as string,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string, 
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string, 
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY as string,
  CACHE_TTL: parseInt(process.env.CACHE_TTL as string, 10) || 300
};