import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    const { data, status } = await this.matchesService.getAllMatches(inProgress);

    res.status(status).json(data);
  }

  async finishMatch(req: Request, res: Response) {
    const id = Number(req.params.id);

    const { data, status } = await this.matchesService.finishMatch(id);

    res.status(status).json(data);
  }

  async updateMatch(req: Request, res: Response) {
    const id = Number(req.params.id);
    const score = req.body;

    const { data, status } = await this.matchesService.updateMatch(id, score);

    res.status(status).json(data);
  }

  async createNewMatch(req: Request, res: Response) {
    const newMatch = req.body;

    const { data, status } = await this.matchesService.createNewMatch(newMatch);

    res.status(status).json(data);
  }
}
