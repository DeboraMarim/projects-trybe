import ITeams from '../Interfaces/teams/ITeams';
import { ServiceResponse } from '../Interfaces/services/ServiceResponse';
import TeamsModel from '../Models/TeamsModel';

export default class TeamsService {
  constructor(private model = new TeamsModel()) { }

  async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.model.findAll();

    return { data: allTeams, status: 200 };
  }

  async getTeamById(id: number): Promise<ServiceResponse<ITeams | null>> {
    const teamById = await this.model.findById(id);

    if (!teamById) {
      return { data: { message: 'Team with this ID does not exist' }, status: 404 };
    }

    return { data: teamById, status: 200 };
  }
}
