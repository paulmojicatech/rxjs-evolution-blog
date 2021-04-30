import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IBehaviorSubjectViewModel } from "../../models/players.interface";

@Injectable()
export class BehaviorSubjectService {
  
  private _viewModelSub$ = new Subject<IBehaviorSubjectViewModel>();
  viewModel$ = this._viewModelSub$.asObservable();

  getViewModel(): Observable<IBehaviorSubjectViewModel> {
    return this.viewModel$;
  }

}