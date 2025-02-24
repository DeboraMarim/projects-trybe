import { Request, Response } from 'express';
import LeaderboardsService from '../services/leaderboards.service';

export default class LeaderboardsController {
  constructor(
    private leaderboardsService = new LeaderboardsService(),
  ) { }

  async getLeaderboards(_req: Request, res: Response) {
    const { data, status } = await this.leaderboardsService.getLeaderboards();

    res.status(status).json(data);
  }

  async getLeaderboardsHome(_req: Request, res: Response) {
    const { data, status } = await this.leaderboardsService.getLeaderboardsHome();

    res.status(status).json(data);
  }

  async getLeaderboardsAway(_req: Request, res: Response) {
    const { data, status } = await this.leaderboardsService.getLeaderboardsAWay();

    res.status(status).json(data);
  }
}
