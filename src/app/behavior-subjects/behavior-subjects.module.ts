import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubjectComponent } from "./components/behavior-subject.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    BehaviorSubjectComponent
  ]
})
export class BehaviorSubjectModule {}