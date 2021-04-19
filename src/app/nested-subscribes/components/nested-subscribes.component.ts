import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { IPlayerOverview } from "../../models/players.interface";
import { PlayerHttpService } from "../../services/player-http.service";

@Component({
  templateUrl: './nested-subscribes.component.html'
})
export class NestedSubscribesComponent implements OnInit, OnDestroy {

  topFiveForm: FormGroup;
  positions = [
   'Point Guard',
   'Shooting Guard',
   'Small Forward',
   'Power Guard',
   'Center'
  ];
  filteredPositions: string[];
  players: IPlayerOverview[];
  
  private _componentDestroyed$ = new Subject();

  constructor(private _fb: FormBuilder, private _playersHttpSvc: PlayerHttpService) { }

  ngOnInit(): void {
    this.topFiveForm = this._fb.group({
      position: [null]
    });
    this.topFiveForm.get('position').valueChanges
      .pipe(
        takeUntil(this._componentDestroyed$)
      )
      .subscribe(value => {
        console.log('VALUE', value);
        if (!!value) {
          this.filteredPositions = this.positions.filter(position => position.toLowerCase().indexOf(value.toLowerCase()) > -1);
        } else {
          this.filteredPositions = this.positions;
        }
      });
  }

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
  }

  private getPlayers(): void {
    this._playersHttpSvc.getPlayers().pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe(players => {
      this.players = players;
    })
  }

}