import dotenv from 'dotenv';

dotenv.config();

const config = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  API_URL: process.env.API_URL,
  CONNECTION_STRING: process.env.CONNECTION_STRING,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DATABASE: process.env.DATABASE
};

export default config;