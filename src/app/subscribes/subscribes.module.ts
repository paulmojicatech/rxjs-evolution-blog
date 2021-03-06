import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { Route, RouterModule } from "@angular/router";
import { PmtSharedComponentsModule } from "../../shared-components/shared-components.module";
import { SidePanelModule } from "../../shared-components/side-panel/side-panel.module";
import { SubscribesComponent } from "./components/subscribes.component";

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: SubscribesComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatListModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatExpansionModule,
    MatSidenavModule,
    MatButtonModule,
    SidePanelModule,
    PmtSharedComponentsModule
  ],
  declarations: [
    SubscribesComponent
  ]
})
export class SubscribesModule {}