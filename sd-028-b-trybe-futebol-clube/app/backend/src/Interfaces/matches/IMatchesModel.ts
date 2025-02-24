import { ICRUDModelCreator, ICRUDModelReader, ICRUDModelUpdater } from '../CRUD/ICRUDModel';
import IMatches from './IMatches';

export default interface IMatchesModel extends ICRUDModelReader<IMatches>,
  ICRUDModelCreator<IMatches>, ICRUDModelUpdater<IMatches> { }
