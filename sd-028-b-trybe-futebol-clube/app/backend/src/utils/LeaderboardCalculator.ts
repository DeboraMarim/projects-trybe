import IMatch from '../Interfaces/matches/IMatches';

export default class LeaderboardCalculator {
  static totalVictories(matches: IMatch[], teamId: number): number {
    return matches.filter((match) =>
      (match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals)
    || (match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals)).length;
  }

  static totalDraws(matches: IMatch[], teamId: number): number {
    return matches.filter((match) =>
      (match.homeTeamId === teamId && match.homeTeamGoals === match.awayTeamGoals)
    || (match.awayTeamId === teamId && match.awayTeamGoals === match.homeTeamGoals)).length;
  }

  static totalLosses(matches: IMatch[], teamId: number): number {
    return matches.filter((match) =>
      (match.homeTeamId === teamId && match.homeTeamGoals < match.awayTeamGoals)
    || (match.awayTeamId === teamId && match.awayTeamGoals < match.homeTeamGoals)).length;
  }

  static goalsFavor(matches: IMatch[], teamId: number): number {
    return matches.reduce((total, match) => {
      if (match.homeTeamId === teamId) {
        return total + match.homeTeamGoals;
      }
      return total + match.awayTeamGoals;
    }, 0);
  }

  static goalsOwn(matches: IMatch[], teamId: number): number {
    return matches.reduce((total, match) => {
      if (match.homeTeamId === teamId) {
        return total + match.awayTeamGoals;
      }
      return total + match.homeTeamGoals;
    }, 0);
  }

  static goalsBalance(matches: IMatch[], teamId: number): number {
    const balance = LeaderboardCalculator.goalsFavor(matches, teamId) - LeaderboardCalculator
      .goalsOwn(matches, teamId);

    return balance;
  }

  static totalPoints(matches: IMatch[], teamId: number): number {
    const vic = (LeaderboardCalculator.totalVictories(matches, teamId)) * 3;

    const draws = LeaderboardCalculator.totalDraws(matches, teamId);

    return vic + draws;
  }

  static efficiency(matches: IMatch[], teamId: number): string {
    const games = matches.length;

    const points = LeaderboardCalculator.totalPoints(matches, teamId);

    return ((points / (games * 3)) * 100).toFixed(2);
  }
}
