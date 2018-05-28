import {
  Component, ChangeDetectionStrategy, OnInit, AfterViewInit, OnDestroy,
  ChangeDetectorRef, Input, SimpleChanges,
} from '@angular/core';
import * as Plotly from 'plotly.js';

export const PlotlyEvent = {
  Hover: 'plotly_hover',
  Unhover: 'plotly_unhover',
  Click: 'plotly_click',
  DoubleClick: 'plotly_doubleclick',
  ClickAnnotation: 'plotly_clickannotation',
  AfterPlot: 'plotly_afterplot',
  Redraw: 'plotly_redraw',
  Restyle: 'plotly_restyle',
  Relayout: 'plotly_relayout',
  Selecting: 'plotly_selecting',
  Selected: 'plotly_selected',
  Deselect: 'plotly_deselect',
};

const isWebkit: boolean = 'WebkitAppearance' in document.documentElement.style;

const ResizeEvent: string = 'resize';

const PlotlyParameter = {
  PlotId: 'plotId',
  PlotClass: 'plotClass',

  Data: 'data',
  Layout: 'layout',
  Configuration: 'configuration',
  Events: 'events',
  Frames: 'frames',

  Width: 'width',
  Height: 'height',
};

enum ChangeAction {
  None,
  Restyle,
  Relayout,
  Resize,
  Update,
  Redraw,
  Recreate,
}

@Component({
  selector: 'plotly',
  templateUrl: 'plotly.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.width]': '"100%"',
    '[style.height]': '"100%"',
  }
})
export class PlotlyComponent implements OnInit, AfterViewInit, OnDestroy {
  private static readonly Tag: string = 'PlotlyComponent';

  private tag: string;

  private receivedResize: boolean = false;
  private resizeHandler: EventListenerObject;

  private changeAction: ChangeAction;

  public plot/*: HTMLElement */;
  public afterPlot: boolean = false;

  @Input() private debug: boolean = false;

  @Input() public plotId: string = '';
  @Input() public plotClass: string = '';

  @Input() public data: any[];
  @Input() public layout: any;
  @Input() public configuration: any;
  @Input() public events: any;
  @Input() public frames: any[];

  @Input() public width: number;
  @Input() public height: number;

  constructor(
    private readonly cd: ChangeDetectorRef,
  ) {
    const tag: string = `${this.tag}.constructor()`;
    if (this.debug) console.log(tag);

    // WebKit double resize event workaround.
    // https://stackoverflow.com/questions/5534363/why-does-the-jquery-resize-event-fire-twice
    this.resizeHandler = (() => {
      const tag: string = `${this.tag}.resizeHandler()`;
      if (isWebkit) {
        if (this.receivedResize) {
          this.resize();
          this.receivedResize = false;
        } else {
          this.receivedResize = true;
        }
      } else {
        this.resize();
      }
    }).bind(this);
  }

  public ngOnInit(): void {
    this.tag = `${PlotlyComponent.Tag}.${this.plotId}`;
    const tag: string = `${this.tag}.ngOnInit()`;
    if (this.debug) console.log(tag);
  }

  public ngAfterViewInit(): void {
    const tag: string = `${this.tag}.ngAfterViewInit()`;
    if (this.debug) console.log(tag);
    setTimeout(() => this.recreate());
  }

  private ngOnChanges(changes: SimpleChanges): void {
    const tag: string = `${this.tag}.ngOnChanges()`;
    if (!this.plot) {
      if (this.debug) console.log(tag, 'ignoring changes, plot not yet once initialized');
      return;
    }
    if (this.debug) console.log(tag, 'changes:', changes);

    const changedKeys: string[] = Object.keys(changes);

    if (includesArr(changedKeys, [
      PlotlyParameter.Width, PlotlyParameter.Height])) {
      this.changeAction = ChangeAction.Resize;
    }

    if (includesArr(changedKeys, [
      PlotlyParameter.Layout, PlotlyParameter.PlotId,
      PlotlyParameter.PlotClass])) {
      this.changeAction = ChangeAction.Relayout;
    }

    if (includes(changedKeys, PlotlyParameter.Data)) {
      this.changeAction = ChangeAction.Redraw;
    }

    if (includesArr(changedKeys, [
      PlotlyParameter.Configuration, PlotlyParameter.Events,
      PlotlyParameter.Frames])) {
      this.changeAction = ChangeAction.Recreate;
    }

    setTimeout(() => this.applyChanges());
  }

  private applyChanges(): void {
    const tag: string = `${this.tag}.applyChanges()`;
    if (this.debug) console.log(tag, 'this.changeAction:', ChangeAction[this.changeAction]);
    switch (this.changeAction) {
      case ChangeAction.Resize:
        this.resize();
        break;
      case ChangeAction.Relayout:
        this.relayout();
        break;
      case ChangeAction.Redraw:
        this.redraw();
        break;
      case ChangeAction.Recreate:
        this.recreate();
        break;
    }
    this.changeAction = ChangeAction.None;
  }

  public async restyle(update: any, traces?: number[]): Promise<any> {
    const tag: string = `${this.tag}.restyle()`;
    if (this.debug) console.log(tag, 'update:', update);
    if (this.debug) console.log(tag, 'traces:', traces === undefined ? 'all' : traces);
    return Plotly.restyle(this.plot, update, traces);
  }

  public async resize(event?: Event): Promise<any> {
    const tag: string = `${this.tag}.resize()`;
    if (this.debug) console.log(tag, 'event:', event);
    await Plotly.Plots.resize(this.plot);
  }

  public async relayout(layout: any = this.layout): Promise<any> {
    const tag: string = `${this.tag}.relayout()`;
    if (this.debug) console.log(tag, 'layout:', layout);
    await Plotly.relayout(this.plot, layout);
  }

  public async update(dataUpdate: any, layoutUpdate: any): Promise<any> {
    const tag: string = `${this.tag}.update()`;
    if (this.debug) console.log(tag, 'dataUpdate:', dataUpdate);
    if (this.debug) console.log(tag, 'layoutUpdate:', layoutUpdate);
    return Plotly.update(this.plot, dataUpdate, layoutUpdate);
  }

  public async redraw(): Promise<any> {
    const tag: string = `${this.tag}.redraw()`;
    if (this.debug) console.log(tag);
    this.plot.data = this.data;
    this.plot.layout = this.layout;
    return Plotly.redraw(this.plot);
  }

  public async recreate(): Promise<any> {
    const tag: string = `${this.tag}.recreate()`;
    if (this.debug) console.log(tag);
    this.removeEventListeners();

    this.plot = document.getElementById(this.plotId);

    if (this.width) {
      this.plot.style.width = this.width + '%';
      this.plot.style['margin-left'] = (100 - this.width) / 2 + '%';
    }

    if (this.height) {
      this.plot.style.height = this.height + '%';
      this.plot.style['margin-top'] = (100 - this.height) / 2 + '%';
    }
    if (this.debug) console.log(tag, 'this.plot:', this.plot);

    // if (this.debug) console.log(tag, 'this.data:', this.data);
    // if (this.debug) console.log(tag, 'this.layout:', this.layout);
    // if (this.debug) console.log(tag, 'this.configuration:', this.configuration);
    // if (this.debug) console.log(tag, 'this.frames:', this.frames);
    await Plotly.newPlot(this.plot, {
      data: this.data,
      layout: this.layout,
      config: this.configuration,
      frames: this.frames,
    });

    if (this.width || this.height) {
      if (this.debug) console.log(tag, 'resizing');
      await this.resize();
      this.afterPlot = true;
    }

    this.attachEventListeners(this.plot, this.events);

    return;
  }

  private attachEventListeners(plot: any, events: any): void {
    const tag: string = `${this.tag}.attachEventListeners()`;
    if (this.debug) console.log(tag, 'events:', events);

    Object.keys(events || {}).forEach(k => {
      const tag: string = `${this.tag}.${k}()`;
      this.plot.on(k, (data, event) => {
        if (this.debug) console.log(tag, 'data:', data);
        if (this.debug) console.log(tag, 'event:', event);
        events[k](data, event, this, Plotly);
      });
    });

    window.addEventListener(ResizeEvent, this.resizeHandler);
  }

  public removeEventListeners(): void {
    const tag: string = `${this.tag}.removeEventListeners()`;
    if (this.debug) console.log(tag);
    window.removeEventListener(ResizeEvent, this.resizeHandler);
  }

  public async addTraces(traces: any | any[], index?: number): Promise<any> {
    const tag: string = `${this.tag}.addTraces()`;
    if (this.debug) console.log(tag, 'traces:', traces);
    if (this.debug) console.log(tag, 'index:', index);
    return Plotly.addTraces(this.plot, traces, index);
  }

  public async deleteTraces(traces: number | number[]): Promise<any> {
    const tag: string = `${this.tag}.deleteTraces()`;
    if (this.debug) console.log(tag, 'traces:', traces);
    Plotly.deleteTraces(this.plot, traces);
  }

  public async animate(update: any, animation: any): Promise<any> {
    const tag: string = `${this.tag}.animate()`;
    if (this.debug) console.log(tag, 'update:', update);
    if (this.debug) console.log(tag, 'animation:', animation);
    return Plotly.animate(this.plot, update, animation);
  }

  public async addFrames(frames: any[], indices?: number[]): Promise<any> {
    const tag: string = `${this.tag}.addFrames()`;
    if (this.debug) console.log(tag, 'frames:', frames);
    if (this.debug) console.log(tag, 'indices:', indices);
    return Plotly.addFrames(this.plot, frames, indices);
  }

  public async deleteFrames(indices: number[]): Promise<any> {
    const tag: string = `${this.tag}.deleteFrames()`;
    if (this.debug) console.log(tag, 'frames:', frames);
    return Plotly.deleteFrames(this.plot, indices);
  }

  public ngOnDestroy(): void {
    const tag: string = `${this.tag}.ngOnDestroy()`;
    if (this.debug) console.log(tag);
    this.removeEventListeners();
  }
}


function includes(arr: any[], val: any): boolean {
  return arr.indexOf(val) !== -1;
}

function includesArr(arr: any[], vals: any[]): boolean {
  return vals.some(val => includes(arr, val));
}

function clone(v: any): any {
  return !v ? v : JSON.parse(JSON.stringify((v)));
}
