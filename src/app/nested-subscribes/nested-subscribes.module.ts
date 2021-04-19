import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { Route, RouterModule } from "@angular/router";
import { NestedSubscribesComponent } from "./components/nested-subscribes.component";

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: NestedSubscribesComponent
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
    MatExpansionModule
  ],
  declarations: [
    NestedSubscribesComponent
  ]
})
export class NestedSubscribesModule {}