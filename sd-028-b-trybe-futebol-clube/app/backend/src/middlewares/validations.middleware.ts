import { Request, Response, NextFunction } from 'express';
import JWTutlis from '../utils/JWTutils';

export default class Validations {
  static Login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailRegex.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return next();
  }

  static Token(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = authorization.split(' ')[1];

    const verifyUser = JWTutlis.verify(token);

    if (verifyUser === 'Token must be a valid token') {
      return res.status(401).json({ message: verifyUser });
    }

    res.locals.user = verifyUser;

    return next();
  }
}
