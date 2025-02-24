import { Request, Router, Response } from 'express';
import UserController from '../controllers/users.controler';

const router = Router();

const usersController = new UserController();

router.get('/', (req: Request, res: Response) => usersController.getAllUsers(req, res));
router.get('/:id', (req: Request, res: Response) => usersController.getUserById(req, res));

export default router;
