import { Request, Response } from 'express';
import LoginServices from '../services/login.service';

export default class LoginController {
  constructor(private service = new LoginServices()) {}

  async generateToken(req: Request, res: Response) {
    const { email, password } = req.body;

    const { data, status } = await this.service.generateToken({ email, password });

    res.status(status).json(data);
  }

  static async getRole(req: Request, res: Response) {
    const { role } = res.locals.user;

    res.status(200).json({ role });
  }
}
