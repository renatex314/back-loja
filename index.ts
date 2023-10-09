import cors from 'cors';
import dotenv from 'dotenv';
import express, { json } from 'express';
import router from './controllers/routes';
import authMiddleware from './middlewares/auth.middleware';
import authController from './controllers/auth.controller';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
  origin: '*'
}));
app.use(json());
app.post('/login', authController.loginUser);
app.post('/register', authController.registerUser);
app.use('/api/', authMiddleware.authenticateUser, router);

app.listen(port, () => {
  console.log(`Servidor rodando em: http://localhost:${port}`);
});