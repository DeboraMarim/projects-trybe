import ILeaderbordeData from '../Interfaces/leaderboards/ILeaderbordeData';
import LeaderboardCalculator from './LeaderboardCalculator';

export default class LeaderboardFormat {
  private static leaderboardFormat(leaderboardData: ILeaderbordeData[]) {
    const format = leaderboardData.map(({ teamName, teamId, matches }) => ({
      name: teamName,
      totalPoints: LeaderboardCalculator.totalPoints(matches, teamId),
      totalGames: matches.length,
      totalVictories: LeaderboardCalculator.totalVictories(matches, teamId),
      totalDraws: LeaderboardCalculator.totalDraws(matches, teamId),
      totalLosses: LeaderboardCalculator.totalLosses(matches, teamId),
      goalsFavor: LeaderboardCalculator.goalsFavor(matches, teamId),
      goalsOwn: LeaderboardCalculator.goalsOwn(matches, teamId),
      goalsBalance: LeaderboardCalculator.goalsBalance(matches, teamId),
      efficiency: LeaderboardCalculator.efficiency(matches, teamId),
    }));
    return format;
  }

  public static sortLeaderboard(leaderboardData: ILeaderbordeData[]) {
    const format = LeaderboardFormat.leaderboardFormat(leaderboardData);

    const board = format.sort((a, b) => (b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor));

    return board;
  }
}
