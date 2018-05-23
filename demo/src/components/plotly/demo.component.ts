import { Component, ViewChild } from '@angular/core';
import { PlotlyComponent } from '@n-fuse/ng-lib';

@Component({
  selector: 'plotlyDemo',
  templateUrl: 'demo.component.html'
})
export class PlotlyDemoComponent {

  @ViewChild(PlotlyComponent) private readonly plotly: PlotlyComponent;

  public debugPlot: boolean = true;

  public plotId: string = 'plotlyDemo';
  public plotClass: string;

  public data: any[];
  public layout: any;
  public configuration: any;
  public events: any;
  public frames: any[];

  public width: number = 100;
  public height: number = 100;

  constructor() {
    const trace1 = {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      mode: 'markers',
      type: 'scatter'
    };

    const trace2 = {
      x: [2, 3, 4, 5],
      y: [16, 5, 11, 9],
      mode: 'lines',
      type: 'scatter'
    };

    const trace3 = {
      x: [1, 2, 3, 4],
      y: [12, 9, 15, 12],
      mode: 'lines+markers',
      type: 'scatter'
    };

    this.data = [trace1, trace2, trace3];
  }
}
