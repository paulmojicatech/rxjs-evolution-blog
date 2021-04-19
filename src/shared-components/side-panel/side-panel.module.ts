import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SidePanelComponent } from "./components/side-panel.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SidePanelComponent
  ],
  exports: [
    SidePanelComponent
  ]
})
export class SidePanelModule{}