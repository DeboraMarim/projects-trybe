import { ICRUDModelReader } from '../CRUD/ICRUDModel';
import IUsers from './IUsers';

export default interface IUsersModel extends ICRUDModelReader<IUsers> {
  findByEmail(email: IUsers['email']): Promise<IUsers | null>
}
