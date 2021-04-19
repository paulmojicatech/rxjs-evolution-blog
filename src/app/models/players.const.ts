import { PlayerPositionType } from "./players.interface";
import { IPlayerOverview } from "./players.interface";

export const MOCK_PLAYERS_OVERVIEW: IPlayerOverview[] = [
  {
    name: 'Allen Iverson',
    position: PlayerPositionType.SG,
    nickname: 'The Answer',
    specialty: 'Crossover'
  },
  {
    name: 'Steph Curry',
    position: PlayerPositionType.PG,
    nickname: 'Chef Curry',
    specialty: 'Handles'
  },
  {
    name: 'James Worthy',
    position: PlayerPositionType.SF,
    nickname: '',
    specialty: 'All Around'
  },
  {
    name: 'Charles Barkley',
    position: PlayerPositionType.PF,
    nickname: 'Sir Charles',
    specialty: 'Hustle, Rebounding'
  },
  {
    name: `Shaquille O'Neal`,
    position: PlayerPositionType.C,
    nickname: 'Shaq Diesel',
    specialty: 'Powerhouse'
  }
]