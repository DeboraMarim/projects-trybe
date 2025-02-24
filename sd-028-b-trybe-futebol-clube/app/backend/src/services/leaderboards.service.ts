import LeaderboardFormat from '../utils/LeaderboardFormat';
import ILeaderbordeData from '../Interfaces/leaderboards/ILeaderbordeData';
import { ServiceResponse } from '../Interfaces/services/ServiceResponse';
import MatchesModel from '../Models/MatchesModel';
import TeamsModel from '../Models/TeamsModel';

export default class LeaderboardsService {
  constructor(
    private matchesModel = new MatchesModel(),
    private teamsModel = new TeamsModel(),
  ) {}

  private async getMatches(where: string): Promise<ILeaderbordeData[]> {
    const allMatches = await this.matchesModel.finishedMtaches();
    const allTeams = await this.teamsModel.findAll();

    if (where === 'home' || where === 'away') {
      const filteredMatches = allTeams.map((team) => {
        const matches = allMatches.filter((match) =>
          (match[`${where}TeamId`] === team.id));
        return { teamName: team.teamName, teamId: team.id, matches };
      });
      return filteredMatches;
    }

    const allTeamsMatches = allTeams.map((team) => {
      const matches = allMatches.filter((match) =>
        (match.homeTeamId === team.id) || (match.awayTeamId === team.id));
      return { teamName: team.teamName, teamId: team.id, matches };
    });
    return allTeamsMatches;
  }

  async getLeaderboards(): Promise<ServiceResponse<unknown>> {
    const matchesByTeams = await this.getMatches('all');
    const leaderboard = LeaderboardFormat.sortLeaderboard(matchesByTeams);
    return { data: leaderboard, status: 200 };
  }

  async getLeaderboardsHome(): Promise<ServiceResponse<unknown>> {
    const matchesByTeams = await this.getMatches('home');
    const leaderboard = LeaderboardFormat.sortLeaderboard(matchesByTeams);
    return { data: leaderboard, status: 200 };
  }

  async getLeaderboardsAWay(): Promise<ServiceResponse<unknown>> {
    const matchesByTeams = await this.getMatches('away');
    const leaderboard = LeaderboardFormat.sortLeaderboard(matchesByTeams);
    return { data: leaderboard, status: 200 };
  }
}
