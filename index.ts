import dotenv from 'dotenv';
import express, { json } from 'express';
import router from './controllers/routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(json());
app.use('/api/', router);

app.listen(port, () => {
  console.log(`Servidor rodando em: http://localhost:${port}`);
});