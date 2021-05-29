export enum PlayerPositionType {
  PG = 'Point Guard',
  SG = 'Shooting Guard',
  SF = 'Small Forward',
  PF = 'Power Forward',
  C = 'Center'
}

export interface IPlayerOverview {
  name: string;
  position: PlayerPositionType;
  likes?: number;
  details?: IPlayerDetails;
}

export interface IPlayerDetails {
  nickname: string;
  specialty: string;

}

export interface IPositionSections {
  position: PlayerPositionType;
  players: IPlayerOverview[];
}

export interface IBehaviorSubjectViewModel {
  positionSections: IPositionSections[];
  searchFilter: string;
  selectedPlayer: IPlayerOverview;
}