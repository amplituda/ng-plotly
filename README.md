### 21.03.2017.

Be aware of this [Plotly bug](https://github.com/plotly/plotly.js/issues/1492).

# API

## Properties:
### Input()

Name                 | Type                      | Default | Description
-------------------- | ------------------------- | ------- | --------------------------------------------------
`debug` _(1)_        | boolean                   | false   | whether to output debug information in the console
`plotId`             | string                    | ''      | plot div id
`plotClass`          | string                    | ''      | plot div classes
`data`               | Plotly.Data[]             |         | [plot data](https://plot.ly/javascript/reference)
`layout`             | Plotly.Layout             |         | [plot layout](https://plot.ly/javascript/reference/#layout)
`configuration`      | Plotly.Configuration      |         | [plot configuration](https://plot.ly/javascript/configuration-options/)
`events`             | [event: string]: Function |         | [plot events](https://plot.ly/javascript/plotlyjs-events/), *see "Attaching events" below*
`frames`             | Plotly.Frame              |         | [plot frames](https://plot.ly/javascript/animations/)
`width`              | number                    |         | the width of the plot in percentage relative to the parent element 
`height`             | number                    |         | the height of the plot in percentage relative to the parent element 

### Public
Name                 | Type                      | Default | Description
-------------------- | ------------------------- | ------- | --------------------------------------------------
`afterPlot`          | boolean                   |         | Whether the plot has been drawn for the first time
`plot`               | HTMLElement               |         | The plot's HTML element

_(1) Suggested use is in conjunction with browsing the plotly code._

  
## Methods:

Name           | Arguments                                    | Description
-------------- | -------------------------------------------- | -----------------------------------
`restyle`      | update: any, traces?: number[]       | [Plotly.restyle](https://plot.ly/javascript/plotlyjs-function-reference/#plotly-restyle) wrapper
`resize`       |                                      | Plotly.resize wrapper - resize the plot
`relayout`     | layout: any = this.layout            | [Plotly.relayout](https://plot.ly/javascript/plotlyjs-function-reference/#plotly-relayout) wrapper
`update`       |                                      | [Plotly.update](https://plot.ly/javascript/plotlyjs-function-reference/#plotly-update) wrapper
`redraw`       |                                      | Plotly.redraw wrapper - force a full recalculation and redraw of the plot
`recreate`     |                                      | [Plotly.newPlot](https://plot.ly/javascript/plotlyjs-function-reference/plotly-newplot) wrapper
`addTraces`    | traces: any OR any[], index?: number | [Plotly.addTraces](https://plot.ly/javascript/plotlyjs-function-reference/#plotly-addtraces) wrapper
`deleteTraces` | traces: number OR number[]           | [Plotly.deleteTraces](https://plot.ly/javascript/plotlyjs-function-reference/#plotly-deletetraces) wrapper

# Usage

## Using with webpack

The plotly package provides a special entry point for webpack.
Add "webpack" to resolve.mainFields in your webpack config file.

```
resolve: {
  mainFields: ["webpack", "module", "browser", "main"],
  ...
}
```

## Importing plotly

if you want to use Plotly.js in combination with zone.js,
you must include ng-plotly *before* zone.js in your project!

```ts
import '@n-fuse/ng-plotly';

import 'zone.js/dist/zone';
```

See also: https://github.com/plotly/plotly.js/issues/955.

## app.module.ts
```ts
import { VCLPlotlyModule } from '@n-fuse/ng-plotly';

@NgModule({
    ...
    imports: [
      VCLPlotlyModule
    ]
    ...
})
export class AppModule {}
```

## myAwesomePlotly.component.html

```html
<plotly #plotly *ngIf="data"
  [debug]="debugPlot"
  [plotId]="plotId"
  [plotClass]="plotClass"
  [data]="data"
  [layout]="layout"
  [configuration]="configuration"
  [events]="events"
  [frames]="frames"
  [width]="width"
  [height]="height">
</plotly>

```

## Events

Plotly events are called with this signature:

```ts
EventListener(data, event, this, Plotly);
```

Where `this` is the instance of `PlotlyComponent`.

To attach event listeners to the plot, see the available
[list of events](https://plot.ly/javascript/plotlyjs-events/) or import `PlotlyEvents` from `@n-fuse/ng-plotly` 
and create them like so:

```ts
const events = {
  [PlotlyEvent.Click]: (data, event, plot: PlotlyComponent, Plotly) => {
    ...
  }
}
```

## Debug
It's also possible to enable the debug flag to output information in the console.
```html
<plotly
  ...
  [debug]="true"
  ...>
</plotly>
```


