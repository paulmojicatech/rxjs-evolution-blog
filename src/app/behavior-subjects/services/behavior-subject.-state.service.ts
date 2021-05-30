import { Injectable } from "@angular/core";
import { BehaviorSubject, from, merge, Observable, of, Subject } from "rxjs";
import { first, map, mergeMap, publish, switchMap, take, tap } from "rxjs/operators";
import { IBehaviorSubjectViewModel, IPlayerOverview, IPositionSections, PlayerPositionType } from "../../models/players.interface";
import { PlayerHttpService } from "../../services/player-http.service";

@Injectable()
export class BehaviorSubjectStateService {

  readonly INITIAL_STATE: IBehaviorSubjectViewModel = {
    positionSections: [],
    searchFilter: '',
    selectedPlayer: null
  };

  private _viewModelSub$ = new BehaviorSubject<IBehaviorSubjectViewModel>(this.INITIAL_STATE);
  viewModel$ = this._viewModelSub$.asObservable();

  constructor(private _playerHttpSvc: PlayerHttpService){ }

  getViewModel(): Observable<IBehaviorSubjectViewModel> {
    const initialViewModel$: Observable<IBehaviorSubjectViewModel> = this.getPositionsStream().pipe(
      map(positionSections => ({ ...this.INITIAL_STATE, positionSections })),
      switchMap(viewModel => this.getPlayerDetails(viewModel.positionSections).pipe(
        map(positionSections => ({...viewModel, positionSections}))
      )),
      tap(viewModel => {
        this._viewModelSub$.next(viewModel);
      })
    );
  
    return merge(this.viewModel$, initialViewModel$);
  }

  loadPlayerDetails(playerName: string): void {
    
  }

  private getPositionsStream(): Observable<IPositionSections[]> {
    return this._playerHttpSvc.getPlayers().pipe(
      map(players => {
        let positions: IPositionSections[] = [];
        for (const positionType in PlayerPositionType) {
          switch (positionType) {
            case 'PG':
              const pointGuards = players.filter(player => player.position === PlayerPositionType.PG);
              positions = [
                ...positions,
                {
                  position: PlayerPositionType.PG,
                  players: pointGuards
                }
              ];
              break;
            case 'SG':
              const shootingGuards = players.filter(player => player.position === PlayerPositionType.SG);
              positions = [
                ...positions,
                {
                  position: PlayerPositionType.SG,
                  players: shootingGuards
                }
              ];
              break;
            case 'SF':
              const smallForwards = players.filter(player => player.position === PlayerPositionType.SF);
              positions = [
                ...positions,
                {
                  position: PlayerPositionType.SF,
                  players: smallForwards
                }
              ];
              break;
            case 'PF':
              const powerForwards = players.filter(player => player.position === PlayerPositionType.PF);
              positions = [
                ...positions,
                {
                  position: PlayerPositionType.PF,
                  players: powerForwards
                }
              ];
              break;
            case 'C':
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
        }
        return positions;
      })
    )
  }

  private getPlayerDetails(positionSections: IPositionSections[]): Observable<IPositionSections[]> {
    const updatedPostions$ = from(positionSections).pipe(
      switchMap(section => {
        return from(section.players).pipe(
          switchMap(sectionPlayer => {
            return this._playerHttpSvc.getPlayerDetails(sectionPlayer).pipe(
              map(updatedPlayerDetail => {
                const updatedPlayerIndex = section.players.findIndex(player => player.name === updatedPlayerDetail.name);
                section.players[updatedPlayerIndex] = updatedPlayerDetail;
                const updatedSectionIndex = positionSections.findIndex(foundSection => foundSection.position === section.position);
                positionSections[updatedSectionIndex] = section;
                return positionSections;
              })
            )
          })
        );
      })
    )
    return updatedPostions$;
  }

}