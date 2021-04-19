import { PlayerPositionType } from "./players.interface";
import { IPlayerOverview } from "./players.interface";

export const MOCK_PLAYERS_OVERVIEW: IPlayerOverview[] = [
  {
    name: 'Allen Iverson',
    position: PlayerPositionType.SG,
    details: {
      nickname: 'The Answer',
      specialty: 'Crossover'
    }
  },
  {
    name: 'Steph Curry',
    position: PlayerPositionType.PG,
    details: {
      nickname: 'Chef Curry',
      specialty: 'Handles'
    }
  },
  {
    name: 'James Worthy',
    position: PlayerPositionType.SF,
    details: {
      nickname: '',
      specialty: 'All Around'
    }
  },
  {
    name: 'Charles Barkley',
    position: PlayerPositionType.PF,
    details: {
      nickname: 'Sir Charles',
      specialty: 'Hustle, Rebounding'
    }
  },
  {
    name: `Shaquille O'Neal`,
    position: PlayerPositionType.C,
    details: {
      nickname: 'Shaq Diesel',
      specialty: 'Powerhouse'
    }
  }
]