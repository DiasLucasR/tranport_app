import { Router, Request, Response } from 'express';

const router = Router();

// Rotas de exemplo para "Viagens"
router.get('/:user', (req: Request, res: Response) => {
  res.json({ message: 'Listando todas as viagens' });
});

router.post('/', (req: Request, res: Response) => {
  const trip = req.body;
  res.json({ message: 'Viagem criada', trip });
});

router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Buscando viagem com ID ${id}` });
});

export = router;