import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
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
    MatToolbarModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  declarations: [
    NestedSubscribesComponent
  ]
})
export class NestedSubscribesModule {}