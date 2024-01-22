import * as dotenv from 'dotenv';

dotenv.config();

export const envs = {
  PORT: parseInt(process.env.PORT as string, 10) || 3000,
  JWT_SEED: process.env.JWT_SEED as string,
};