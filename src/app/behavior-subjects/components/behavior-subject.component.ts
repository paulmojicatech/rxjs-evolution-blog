import { Component } from "@angular/core";
import { BehaviorSubjectService } from "../services/behavior-subject.service";

@Component({
  templateUrl: './behavior-subject.component.html',
  providers: [
    BehaviorSubjectService
  ]
})

export class BehaviorSubjectComponent{}