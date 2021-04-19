import { PlayerHttpService } from "../services/player-http.service";

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

export interface IPositionSections {
  position: PlayerPositionType;
  player: IPlayerOverview;
}