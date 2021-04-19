import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { MOCK_PLAYERS_OVERVIEW } from "../models/players.const";
import { IPlayerOverview } from "../models/players.interface";

@Injectable({providedIn: 'root'})
export class PlayerHttpService {
  getPlayers(): Observable<IPlayerOverview[]> {
    return of(MOCK_PLAYERS_OVERVIEW);
  }
}