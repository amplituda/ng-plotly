import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotlyModule } from '@n-fuse/ng-lib';
import { PlotlyDemoComponent } from './demo.component';

@NgModule({
  imports: [
    CommonModule,
    PlotlyModule,
  ],
  entryComponents: [ PlotlyDemoComponent ],
  declarations: [ PlotlyDemoComponent ]
})
export class PlotlyDemoModule { }
