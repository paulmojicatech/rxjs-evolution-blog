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
      specialty: 'Handles, Sharp Shooter'
    }
  },
  {
    name: 'Kobe Bryant',
    position: PlayerPositionType.SG,
    details: {
      nickname: 'Black Mamba',
      specialty: 'Closer, Competitor, High IQ'
    }
  },
  {
    name: 'LeBron James',
    position: PlayerPositionType.SF,
    details: {
      nickname: 'King James',
      specialty: 'All Around, High IQ'
    }
  },
  {
    name: 'Michael Jordan',
    position: PlayerPositionType.SG,
    details: {
      nickname: 'His Airness',
      specialty: 'GOAT, Closer, High IQ'
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
  },
  {
    name: 'Dirk Nowitski',
    position: PlayerPositionType.PF,
    details: {
      nickname: '',
      specialty: 'Sharp Shooter, Scorer'
    }
  },
  {
    name: 'Earvin Johnson',
    position: PlayerPositionType.PG,
    details: {
      nickname: 'Magic',
      specialty: 'Floor General, High IQ'
    }
  },
  {
    name: 'Wilt Chamberlain',
    position: PlayerPositionType.C,
    details: {
      nickname: 'Wilt the Stilt',
      specialty: 'Scorer'
    }
  },
  {
    name: 'Pete Maravich',
    position: PlayerPositionType.PG,
    details: {
      nickname: 'Pistol Pete',
      specialty: 'Flashy, Handles, Court Vision'
    }
  }
]