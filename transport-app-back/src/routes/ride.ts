import { Router, Request, Response } from 'express';
import TripsController from '../Controllers/TripsController';

const router = Router();

// Rotas de exemplo para "Viagens"
router.get('/', (req: Request, res: Response) => {
  TripsController.index(req, res);
});

router.post('/estimate', (req: Request, res: Response) => {
  const trip = req.body;
  res.json({ message: 'Buscando Motoristas Disponiveis', trip });
});

router.patch('/confirm', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Buscando viagem com ID ${id}` });
});
router.patch('/:customer_id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Buscando viagem com ID ${id}` });
});

export = router;