import IMatchesModel from '../Interfaces/matches/IMatchesModel';
import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { NewEntity } from '../Interfaces/CRUD/NewEntity';
import IMatch from '../Interfaces/matches/IMatches';

export default class MatchesModel implements IMatchesModel {
  private macthesModel = SequelizeMatches;

  async findAll(): Promise<IMatch[]> {
    const allMatches = await this.macthesModel.findAll({
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return allMatches;
  }

  async finishedMtaches(): Promise<IMatch[]> {
    const allMatches = await this.macthesModel.findAll({
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress: false },
    });
    return allMatches;
  }

  async findById(id: number): Promise<IMatch | null> {
    const match = await this.macthesModel.findByPk(id, {
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return match;
  }

  async create(data: NewEntity<IMatch>): Promise<IMatch> {
    const newMatch = await this.macthesModel.create(data);

    return newMatch;
  }

  async update(id: number, data: Partial<IMatch>): Promise<IMatch | null> {
    const [updatedMatch] = await this.macthesModel.update(data, { where: { id } });

    if (updatedMatch === 0) {
      return null;
    }
    return this.findById(id);
  }

  async finishMatch(id: number): Promise<number> {
    const [finishedMatch] = await this.macthesModel
      .update({ inProgress: false }, { where: { id } });

    return finishedMatch;
  }
}
