import IMatch from '../matches/IMatches';

export default interface ILeaderbordeData {
  teamName: string,
  teamId: number,
  matches: IMatch[]
}
