import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/matches.controller';
import Validations from '../middlewares/validations.middleware';

const router = Router();

const matchesController = new MatchesController();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
router.post(
  '/',
  Validations.Token,
  (req: Request, res: Response) => matchesController.createNewMatch(req, res),
);

router.patch(
  '/:id/finish',
  Validations.Token,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);
router.patch(
  '/:id',
  Validations.Token,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);

export default router;
