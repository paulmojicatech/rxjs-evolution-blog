import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDrawer } from "@angular/material/sidenav";
import { Observable } from "rxjs";
import { IBehaviorSubjectViewModel, IPlayerOverview } from "../../models/players.interface";
import { BehaviorSubjectStateService } from "../services/behavior-subject.-state.service";

@Component({
  templateUrl: './behavior-subject.component.html',
  styleUrls: [ '../../subscribes/components/subscribes.component.scss'],
  providers: [
    BehaviorSubjectStateService
  ]
})

export class BehaviorSubjectComponent implements OnInit{

  @ViewChild('drawer')
  drawer: MatDrawer;

  viewModel$: Observable<IBehaviorSubjectViewModel>;
  topFiveForm: FormGroup;

  constructor(private _fb: FormBuilder, private _behaviorSubjectStateService: BehaviorSubjectStateService){}

  ngOnInit(): void {
    this.viewModel$ = this._behaviorSubjectStateService.getViewModel();
    this.topFiveForm = this._fb.group({
            position: [null],
        });
  }

  handlePlayerSelected(player: IPlayerOverview): void {
    this.drawer.toggle();
    this._behaviorSubjectStateService.loadPlayerDetails(player);
  }

  handlePlayerLiked(player: IPlayerOverview): void {
    this._behaviorSubjectStateService.incrementPlayerLiked(player);
  }


}