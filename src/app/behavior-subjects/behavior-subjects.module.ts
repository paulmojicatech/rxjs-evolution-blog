import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BehaviorSubjectComponent } from "./components/behavior-subject.component";
import { PmtSharedComponentsModule } from '../../shared-components/shared-components.module';
import { SidePanelModule } from '../../shared-components/side-panel/side-panel.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatExpansionModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatAutocompleteModule,
    PmtSharedComponentsModule,
    SidePanelModule,
  ],
  declarations: [
    BehaviorSubjectComponent
  ]
})
export class BehaviorSubjectModule { }