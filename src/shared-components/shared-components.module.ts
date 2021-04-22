import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PmtListFilterPipe } from "./pipes/list-filter.pipe";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PmtListFilterPipe
  ],
  exports: [
    PmtListFilterPipe
  ]
})
export class PmtSharedComponentsModule {}