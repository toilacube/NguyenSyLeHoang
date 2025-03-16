"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const challenge_model_1 = require("./challenge.model");
dotenv_1.default.config();
const dbName = process.env.DB_NAME || 'coding_challenges';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || 'password';
const dbHost = process.env.DB_HOST || 'localhost';
exports.sequelize = new sequelize_typescript_1.Sequelize({
    database: dbName,
    username: dbUser,
    password: dbPassword,
    host: dbHost,
    dialect: 'mysql',
    models: [challenge_model_1.Challenge],
    logging: false,
});
