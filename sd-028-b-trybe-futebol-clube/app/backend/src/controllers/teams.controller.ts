import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  constructor(private service = new TeamsService()) {}

  async getAllTeams(_req: Request, res: Response) {
    const { data, status } = await this.service.getAllTeams();

    res.status(status).json(data);
  }

  async getTeamById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const { data, status } = await this.service.getTeamById(id);

    res.status(status).json(data);
  }
}
