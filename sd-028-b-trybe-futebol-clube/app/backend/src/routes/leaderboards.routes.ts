import { Request, Router, Response } from 'express';
import LeaderboardsController from '../controllers/leaderboards.controlle';
// import Validations from '../middlewares/validations.middleware';

const router = Router();

const leaderboardsController = new LeaderboardsController();

router.get('/', (req: Request, res: Response) => leaderboardsController.getLeaderboards(req, res));
router.get(
  '/home',
  (req: Request, res: Response) => leaderboardsController.getLeaderboardsHome(req, res),
);
router.get(
  '/away',
  (req: Request, res: Response) => leaderboardsController.getLeaderboardsAway(req, res),
);

export default router;
