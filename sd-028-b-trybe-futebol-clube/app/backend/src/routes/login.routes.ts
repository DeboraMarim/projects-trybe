import { Request, Router, Response } from 'express';
import LoginController from '../controllers/login.controller';
import Validations from '../middlewares/validations.middleware';

const router = Router();

const loginsController = new LoginController();

router.post(
  '/',
  Validations.Login,
  (req: Request, res: Response) => loginsController.generateToken(req, res),
);

router.get(
  '/role',
  Validations.Token,
  (req: Request, res: Response) => LoginController.getRole(req, res),
);

export default router;
