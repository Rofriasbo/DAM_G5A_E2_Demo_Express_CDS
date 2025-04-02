import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connection = mongoose.createConnection(process.env.CONNECTION_STRING, {
  dbName: process.env.DATABASE,
  user: process.env.DB_USER,
  pass: process.env.DB_PASSWORD
});

export default connection;