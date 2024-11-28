import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Configuração inicial
const app = express();
const PORT = process.env.API_PORT || 8000;

// Middlewares globais
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas principais
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Bem-vindo à API Transporte APP - Criado por Lucas Dias - https://github.com/DiasLucasR' });
});

app.use('/ride', require('./routes/ride'));
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});