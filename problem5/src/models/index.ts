import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { Challenge } from './challenge.model';

dotenv.config();

const dbName = process.env.DB_NAME || 'coding_challenges';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || 'password';
const dbHost = process.env.DB_HOST || 'localhost';

export const sequelize = new Sequelize({
  database: dbName,
  username: dbUser,
  password: dbPassword,
  host: dbHost,
  dialect: 'mysql',
  models: [Challenge],
  logging: false,
});
