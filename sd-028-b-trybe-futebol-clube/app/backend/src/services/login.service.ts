import * as bcrypt from 'bcryptjs';
import { ServiceResponse } from '../Interfaces/services/ServiceResponse';
import UsersModel from '../Models/UsersModel';
import IToken from '../Interfaces/login/IToken';
import ILogin from '../Interfaces/login/ILogin';
import IUsers from '../Interfaces/users/IUsers';
import JWTutlis from '../utils/JWTutils';

export default class UsersServices {
  constructor(private model = new UsersModel()) { }

  private async getUserByEmail(email: ILogin['email']): Promise<IUsers | null> {
    const user = await this.model.findByEmail(email);

    return user;
  }

  async generateToken(login: ILogin): Promise<ServiceResponse<IToken>> {
    const user = await this.getUserByEmail(login.email);

    if (!user) {
      return { data: { message: 'Invalid email or password' }, status: 401 };
    }

    if (user && !bcrypt.compareSync(login.password, user.password)) {
      return {
        status: 401,
        data: { message: 'Invalid email or password' },
      };
    }

    const { email, role } = user;

    const token = JWTutlis.sign({ email, role });

    return { data: { token }, status: 200 };
  }
}
