import SequelizeUsers from '../database/models/SequelizeUsers';
import IUsers from '../Interfaces/users/IUsers';
import IUsersModel from '../Interfaces/users/IUsersModel';

export default class UsersModel implements IUsersModel {
  private usersModel = SequelizeUsers;
  async findByEmail(email: string): Promise<IUsers | null> {
    const user = await this.usersModel.findOne({ where: { email } });

    return user;
  }

  async findAll(): Promise<IUsers[]> {
    const allUsers = this.usersModel.findAll();

    return allUsers;
  }

  async findById(id: number): Promise<IUsers | null> {
    const User = this.usersModel.findByPk(id);

    return User;
  }
}
