import IUsers from '../Interfaces/users/IUsers';
import { ServiceResponse } from '../Interfaces/services/ServiceResponse';
import UsersModel from '../Models/UsersModel';

export default class UsersServices {
  constructor(private model = new UsersModel()) { }

  async getAllUsers(): Promise<ServiceResponse<IUsers[]>> {
    const allUsers = await this.model.findAll();

    return { data: allUsers, status: 200 };
  }

  async getUserById(id: number): Promise<ServiceResponse<IUsers>> {
    const user = await this.model.findById(id);

    if (!user) {
      return { data: { message: 'User with this ID does not exist' }, status: 404 };
    }

    return { data: user, status: 200 };
  }
}
