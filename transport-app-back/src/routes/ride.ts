import { Router, Request, Response } from 'express';
import RideController from '../controllers/RideController';

const router = Router();


router.post('/estimate', (req: Request, res: Response) => {
  RideController.estimateRide(req, res);
});

router.patch('/confirm', (req: Request, res: Response) => {
  RideController.confirmRide(req, res);
});

router.get('/drivers', (req: Request, res: Response) => {
  RideController.getAllDrivers(req, res);
});

router.get('/:customer_id', (req: Request, res: Response) => {
  RideController.index(req, res);
});


export = router;