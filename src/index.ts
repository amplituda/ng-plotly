import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotlyComponent, PlotlyEvent } from './plotly/plotly.component';

export { PlotlyComponent, PlotlyEvent };

@NgModule({
  imports: [CommonModule],
  exports: [PlotlyComponent],
  declarations: [PlotlyComponent],
  providers: [],
})
export class PlotlyModule { }
