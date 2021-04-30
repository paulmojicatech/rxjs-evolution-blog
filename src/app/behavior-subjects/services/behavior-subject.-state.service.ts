import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
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

  private getPlayers(): Observable<IPlayerOverview[]> {
    return this._playerHttpSvc.getPlayers();
  }

  private addPlayersToSections(positionSections: IPositionSections[], player: IPlayerOverview): IPositionSections[] {
    return null;
  }

}