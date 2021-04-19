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
}