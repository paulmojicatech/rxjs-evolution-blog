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
  },
  {
    name: 'James Worthy',
    position: PlayerPositionType.SF
  },
  {
    name: 'Charles Barkley',
    position: PlayerPositionType.PF
  },
  {
    name: `Shaquille O'Neal`,
    position: PlayerPositionType.C
  }
]