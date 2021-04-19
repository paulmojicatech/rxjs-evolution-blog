import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { SidePanelComponent } from "./components/side-panel.component";

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule
  ],
  declarations: [
    SidePanelComponent
  ],
  exports: [
    SidePanelComponent
  ]
})
export class SidePanelModule{}