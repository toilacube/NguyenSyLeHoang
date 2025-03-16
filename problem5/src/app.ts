import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { sequelize } from "./models";
import challengeRoutes from "./routes/challenge.routes";
import { errorHandler } from "./middleware/error.middleware";
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/challenges", challengeRoutes);

app.use(errorHandler);

export default app;
