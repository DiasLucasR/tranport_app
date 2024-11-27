import { Router, Request, Response } from 'express';
import RideController from '../controllers/RideController';

const router = Router();

// Rotas de exemplo para "Viagens"
router.get('/:customer_id', (req: Request, res: Response) => {
  RideController.index(req, res);
});

router.post('/estimate', (req: Request, res: Response) => {
  RideController.estimateRide(req, res);
});

router.patch('/confirm', (req: Request, res: Response) => {
  RideController.confirmRide(req, res);
});

export = router;