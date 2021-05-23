import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { IBehaviorSubjectViewModel } from "../../models/players.interface";
import { BehaviorSubjectStateService } from "../services/behavior-subject.-state.service";

@Component({
  templateUrl: './behavior-subject.component.html',
  providers: [
    BehaviorSubjectStateService
  ]
})

export class BehaviorSubjectComponent implements OnInit{

  viewModel$: Observable<IBehaviorSubjectViewModel>;

  constructor(private _behaviorSubjectStateService: BehaviorSubjectStateService){}

  ngOnInit(): void {
    this.viewModel$ = this._behaviorSubjectStateService.getViewModel();
  }
}