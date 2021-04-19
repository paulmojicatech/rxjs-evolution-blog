import { PlayerPositionType } from "./players.interface";
import { IPlayerOverview } from "./players.interface";

export const MOCK_PLAYERS_OVERVIEW: IPlayerOverview[] = [
  {
    name: 'Allen Iverson',
    position: PlayerPositionType.SG
  },
  {
    name: 'Steph Curry',
    position: PlayerPositionType.PG
  }
]