import SequelizeTeams from '../database/models/SequelizeTeams';
import ITeams from '../Interfaces/teams/ITeams';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';

export default class TeamsModel implements ITeamsModel {
  private teamsModel = SequelizeTeams;

  async findAll(): Promise<ITeams[]> {
    const allTeams = this.teamsModel.findAll();

    return allTeams;
  }

  findById(id: number): Promise<ITeams | null> {
    const team = this.teamsModel.findByPk(id);

    return team;
  }
}
