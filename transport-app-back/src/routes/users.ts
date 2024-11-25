import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Listando todos os usuários' });
});

router.post('/', (req: Request, res: Response) => {
  const user = req.body;
  res.json({ message: 'Usuário criado', user });
});

router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Buscando usuário com ID ${id}` });
});

export = router;