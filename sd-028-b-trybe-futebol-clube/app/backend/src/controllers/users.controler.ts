import { Request, Response } from 'express';
import UsersServices from '../services/users.service';

export default class UsersController {
  constructor(private service = new UsersServices()) {}

  async getAllUsers(_req: Request, res: Response) {
    const { data, status } = await this.service.getAllUsers();

    res.status(status).json(data);
  }

  async getUserById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const { data, status } = await this.service.getUserById(id);

    res.status(status).json(data);
  }
}
