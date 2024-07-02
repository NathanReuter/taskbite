import dotenv from 'dotenv';
dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
import express from 'express';
import cors from 'cors';
import db from './config/database';
import authRoutes from './routes/authRoutes';
import { checkEnv } from './config/checkEnv';
import { logger } from './utils/logger';
import boardRoutes from './routes/boardRoutes';
import listRoutes from './routes/listRoutes';
import taskRoutes from './routes/taskRoutes';
import { authenticateToken } from './middleware/authMiddleware';
import { node } from 'globals';

const app = express();
const PORT = process.env.PORT || 4000;
const API_VERSION = 'v1';

checkEnv();
app.use(cors());
app.use(express.json());

(async () => {})();
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
  });
});

app.use(`/api/${API_VERSION}/auth`, authRoutes);
app.use(`/api/${API_VERSION}/boards`, authenticateToken, boardRoutes);
app.use(`/api/${API_VERSION}/lists`, authenticateToken, listRoutes);
app.use(`/api/${API_VERSION}/tasks`, authenticateToken, taskRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logger.info(`Server running: ${PORT}`);
  });
}

export default app;
