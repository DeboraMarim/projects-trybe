import IScore from '../Interfaces/matches/IScore';
import IMatch from '../Interfaces/matches/IMatches';
import { ServiceMessage, ServiceResponse } from '../Interfaces/services/ServiceResponse';
import MatchesModel from '../Models/MatchesModel';
import { NewEntity } from '../Interfaces/CRUD/NewEntity';
import TeamsModel from '../Models/TeamsModel';

export default class MatchesService {
  constructor(
    private matchesModel = new MatchesModel(),
    private teamsModel = new TeamsModel(),
  ) {}

  async getAllMatches(inProgress: unknown): Promise<ServiceResponse<IMatch[]>> {
    const Matches = await this.matchesModel.findAll();

    if (inProgress === 'true') {
      const filteredMatches = Matches.filter((match) => match.inProgress === true);
      return { data: filteredMatches, status: 200 };
    } if (inProgress === 'false') {
      const filteredMatches = Matches.filter((match) => match.inProgress === false);
      return { data: filteredMatches, status: 200 };
    }

    return { data: Matches, status: 200 };
  }

  async finishMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const finishedMatch = await this.matchesModel.finishMatch(id);

    if (finishedMatch === 0) {
      return { data: { message: 'This match already finished' }, status: 400 };
    }

    return { data: { message: 'Finished' }, status: 200 };
  }

  async updateMatch(id: number, score: IScore): Promise<ServiceResponse<unknown>> {
    await this.matchesModel.update(id, score);

    return { data: { message: 'Score Updated' }, status: 200 };
  }

  async createNewMatch(NewMatch: NewEntity<IMatch>): Promise<ServiceResponse<IMatch>> {
    if (NewMatch.awayTeamId === NewMatch.homeTeamId) {
      return {
        data: { message: 'It is not possible to create a match with two equal teams' },
        status: 422 };
    }

    const homeTeam = await this.teamsModel.findById(NewMatch.homeTeamId);
    const awayTeam = await this.teamsModel.findById(NewMatch.awayTeamId);

    if (!homeTeam || !awayTeam) {
      return { data: { message: 'There is no team with such id!' }, status: 404 };
    }

    const newMatch = await this.matchesModel.create({ ...NewMatch, inProgress: true });

    return { data: newMatch, status: 201 };
  }
}
