import { Router, Request, Response } from 'express';
import LoginController from '../Controllers/LoginController';

const router = Router();

router.post('/login', (req: Request, res: Response) => {
  LoginController.login(req, res);
});

router.post('/register', (req: Request, res: Response) => {
  LoginController.register(req, res);
  });

export = router;