import { Secret, sign, verify } from 'jsonwebtoken';
import IPayload from '../Interfaces/JWT/IPayload';

export default class JWTutlis {
  private static secret: Secret = process.env.JWT_SECRET || '';

  static sign(payload: IPayload): string {
    return sign({ ...payload }, this.secret);
  }

  static verify(token: string): IPayload | string {
    try {
      return verify(token, this.secret) as IPayload;
    } catch (error) {
      return 'Token must be a valid token';
    }
  }
}
