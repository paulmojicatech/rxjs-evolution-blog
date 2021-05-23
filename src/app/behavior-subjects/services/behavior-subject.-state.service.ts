import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { first, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { IBehaviorSubjectViewModel, IPlayerOverview, IPositionSections, PlayerPositionType } from "../../models/players.interface";
import { PlayerHttpService } from "../../services/player-http.service";

@Injectable()
export class BehaviorSubjectStateService {

  readonly INITIAL_STATE: IBehaviorSubjectViewModel = {
    positionSections: []
  };

  private _viewModelSub$ = new BehaviorSubject<IBehaviorSubjectViewModel>(this.INITIAL_STATE);
  viewModel$ = this._viewModelSub$.asObservable();

  constructor(private _playerHttpSvc: PlayerHttpService){ }

  getViewModel(): Observable<IBehaviorSubjectViewModel> {
    return this.viewModel$;
  }

  private setupSections(): IPositionSections[] {
    return [
      {
        position: PlayerPositionType.PG,
        players: [],
      },
      {
        position: PlayerPositionType.SG,
        players: [],
      },
      {
        position: PlayerPositionType.SF,
        players: [],
      },
      {
        position: PlayerPositionType.PF,
        players: [],
      },
      {
        position: PlayerPositionType.C,
        players: [],
      },
    ];
  }

  private getPlayers(): Observable<IPositionSections[]> {
    return this._playerHttpSvc.getPlayers().pipe(
      map(players => {
        let positions: IPositionSections[] = [];
        Object.keys(PlayerPositionType).forEach(positionType => {
          switch (positionType) {
            case PlayerPositionType.PG:
              const pointGuards = players.filter(player => player.position === PlayerPositionType.PG);
              positions = [
                ...positions,
                {
                  position: PlayerPositionType.PG,
                  players: pointGuards
                }
              ];
              break;
            case PlayerPositionType.SG:
              const shootingGuards = players.filter(player => player.position === PlayerPositionType.SG);
              positions = [
                ...positions,
                {
                  position: PlayerPositionType.SG,
                  players: shootingGuards
                }
              ];
              break;
            case PlayerPositionType.SF:
              const smallForwards = players.filter(player => player.position === PlayerPositionType.SF);
              positions = [
                ...positions,
                {
                  position: PlayerPositionType.SF,
                  players: smallForwards
                }
              ];
              break;
            case PlayerPositionType.PF:
              const powerForwards = players.filter(player => player.position === PlayerPositionType.PF);
              positions = [
                ...positions,
                {
                  position: PlayerPositionType.PF,
                  players: powerForwards
                }
              ];
              break;
            case PlayerPositionType.C:
              const centers = players.filter(player => player.position === PlayerPositionType.C);
              positions = [
                ...positions,
                {
                  position: PlayerPositionType.C,
                  players: centers
                }
              ];
              break;
            default:
              break;
          }
        })
        return positions;
      }),

    )
  }

  private addPlayerDetails(position: IPositionSections): Observable<IPositionSections> {
    const updatedPosition$ = position.players.map(player => {
      const playerDetails$: Observable<IPositionSections> = this._playerHttpSvc.getPlayerDetails(player).pipe(
        map(playerDetails => {
          const updatedPlayerIndex = position.players.findIndex(playerInstance => playerInstance.name === playerDetails.name);
          position.players[updatedPlayerIndex] = playerDetails;
          return {
            ...position,
            players: position.players
          };
        })
      );
      return playerDetails$;
    })[0]
    return updatedPosition$;
  }


}