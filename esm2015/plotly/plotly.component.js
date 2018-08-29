/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, } from '@angular/core';
import * as Plotly from 'plotly.js';
export const /** @type {?} */ PlotlyEvent = {
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
const /** @type {?} */ isWebkit = 'WebkitAppearance' in document.documentElement.style;
const /** @type {?} */ ResizeEvent = 'resize';
const /** @type {?} */ PlotlyParameter = {
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
/** @enum {number} */
const ChangeAction = {
    None: 0,
    Restyle: 1,
    Relayout: 2,
    Resize: 3,
    Update: 4,
    Redraw: 5,
    Recreate: 6,
};
ChangeAction[ChangeAction.None] = "None";
ChangeAction[ChangeAction.Restyle] = "Restyle";
ChangeAction[ChangeAction.Relayout] = "Relayout";
ChangeAction[ChangeAction.Resize] = "Resize";
ChangeAction[ChangeAction.Update] = "Update";
ChangeAction[ChangeAction.Redraw] = "Redraw";
ChangeAction[ChangeAction.Recreate] = "Recreate";
export class PlotlyComponent {
    /**
     * @param {?} cd
     */
    constructor(cd) {
        this.cd = cd;
        this.receivedResize = false;
        this.afterPlot = false;
        this.debug = false;
        this.plotId = '';
        this.plotClass = '';
        const /** @type {?} */ tag = `${this.tag}.constructor()`;
        if (this.debug)
            console.log(tag);
        // WebKit double resize event workaround.
        // https://stackoverflow.com/questions/5534363/why-does-the-jquery-resize-event-fire-twice
        this.resizeHandler = (() => {
            const /** @type {?} */ tag = `${this.tag}.resizeHandler()`;
            if (isWebkit) {
                if (this.receivedResize) {
                    this.resize();
                    this.receivedResize = false;
                }
                else {
                    this.receivedResize = true;
                }
            }
            else {
                this.resize();
            }
        }).bind(this);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.tag = `${PlotlyComponent.Tag}.${this.plotId}`;
        const /** @type {?} */ tag = `${this.tag}.ngOnInit()`;
        if (this.debug)
            console.log(tag);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        const /** @type {?} */ tag = `${this.tag}.ngAfterViewInit()`;
        if (this.debug)
            console.log(tag);
        setTimeout(() => this.recreate());
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const /** @type {?} */ tag = `${this.tag}.ngOnChanges()`;
        if (!this.plot) {
            if (this.debug)
                console.log(tag, 'ignoring changes, plot not yet once initialized');
            return;
        }
        if (this.debug)
            console.log(tag, 'changes:', changes);
        const /** @type {?} */ changedKeys = Object.keys(changes);
        if (includesArr(changedKeys, [
            PlotlyParameter.Width, PlotlyParameter.Height
        ])) {
            this.changeAction = ChangeAction.Resize;
        }
        if (includesArr(changedKeys, [
            PlotlyParameter.Layout, PlotlyParameter.PlotId,
            PlotlyParameter.PlotClass
        ])) {
            this.changeAction = ChangeAction.Relayout;
        }
        if (includes(changedKeys, PlotlyParameter.Data)) {
            this.changeAction = ChangeAction.Redraw;
        }
        if (includesArr(changedKeys, [
            PlotlyParameter.Configuration, PlotlyParameter.Events,
            PlotlyParameter.Frames
        ])) {
            this.changeAction = ChangeAction.Recreate;
        }
        setTimeout(() => this.applyChanges());
    }
    /**
     * @return {?}
     */
    applyChanges() {
        const /** @type {?} */ tag = `${this.tag}.applyChanges()`;
        if (this.debug)
            console.log(tag, 'this.changeAction:', ChangeAction[this.changeAction]);
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
    /**
     * @param {?} update
     * @param {?=} traces
     * @return {?}
     */
    restyle(update, traces) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const /** @type {?} */ tag = `${this.tag}.restyle()`;
            if (this.debug)
                console.log(tag, 'update:', update);
            if (this.debug)
                console.log(tag, 'traces:', traces === undefined ? 'all' : traces);
            return Plotly.restyle(this.plot, update, traces);
        });
    }
    /**
     * @param {?=} event
     * @return {?}
     */
    resize(event) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const /** @type {?} */ tag = `${this.tag}.resize()`;
            if (this.debug)
                console.log(tag, 'event:', event);
            yield Plotly.Plots.resize(this.plot);
        });
    }
    /**
     * @param {?=} layout
     * @return {?}
     */
    relayout(layout = this.layout) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const /** @type {?} */ tag = `${this.tag}.relayout()`;
            if (this.debug)
                console.log(tag, 'layout:', layout);
            yield Plotly.relayout(this.plot, layout);
        });
    }
    /**
     * @param {?} dataUpdate
     * @param {?} layoutUpdate
     * @return {?}
     */
    update(dataUpdate, layoutUpdate) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const /** @type {?} */ tag = `${this.tag}.update()`;
            if (this.debug)
                console.log(tag, 'dataUpdate:', dataUpdate);
            if (this.debug)
                console.log(tag, 'layoutUpdate:', layoutUpdate);
            return Plotly.update(this.plot, dataUpdate, layoutUpdate);
        });
    }
    /**
     * @return {?}
     */
    redraw() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const /** @type {?} */ tag = `${this.tag}.redraw()`;
            if (this.debug)
                console.log(tag);
            this.plot.data = this.data;
            this.plot.layout = this.layout;
            return Plotly.redraw(this.plot);
        });
    }
    /**
     * @return {?}
     */
    recreate() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const /** @type {?} */ tag = `${this.tag}.recreate()`;
            if (this.debug)
                console.log(tag);
            this.removeEventListeners();
            this.plot = document.getElementById(this.plotId);
            if (!this.plot)
                return;
            if (this.width) {
                this.plot.style.width = this.width + '%';
                this.plot.style['margin-left'] = (100 - this.width) / 2 + '%';
            }
            if (this.height) {
                this.plot.style.height = this.height + '%';
                this.plot.style['margin-top'] = (100 - this.height) / 2 + '%';
            }
            if (this.debug)
                console.log(tag, 'this.plot:', this.plot);
            // if (this.debug) console.log(tag, 'this.data:', this.data);
            // if (this.debug) console.log(tag, 'this.layout:', this.layout);
            // if (this.debug) console.log(tag, 'this.configuration:', this.configuration);
            // if (this.debug) console.log(tag, 'this.frames:', this.frames);
            const /** @type {?} */ resizePlot = !!(this.width || this.height);
            if (this.debug)
                console.log(tag, { resizePlot });
            Plotly.newPlot(this.plot, {
                data: this.data,
                layout: this.layout,
                config: this.configuration,
                frames: this.frames,
            });
            this.attachEventListeners(this.plot, this.events);
            if (this.width || this.height) {
                if (this.debug)
                    console.log(tag, 'resizing');
                yield this.resize();
                this.afterPlot = true;
            }
            else {
                this.afterPlot = true;
            }
            return;
        });
    }
    /**
     * @param {?} plot
     * @param {?} events
     * @return {?}
     */
    attachEventListeners(plot, events) {
        const /** @type {?} */ tag = `${this.tag}.attachEventListeners()`;
        if (this.debug)
            console.log(tag, 'events:', events);
        Object.keys(events || {}).forEach(k => {
            const /** @type {?} */ tag = `${this.tag}.${k}()`;
            this.plot.on(k, (data, event) => {
                if (this.debug)
                    console.log(tag, 'data:', data);
                if (this.debug)
                    console.log(tag, 'event:', event);
                events[k](data, event, this, Plotly);
            });
        });
        window.addEventListener(ResizeEvent, this.resizeHandler);
    }
    /**
     * @return {?}
     */
    removeEventListeners() {
        const /** @type {?} */ tag = `${this.tag}.removeEventListeners()`;
        if (this.debug)
            console.log(tag);
        window.removeEventListener(ResizeEvent, this.resizeHandler);
    }
    /**
     * @param {?} traces
     * @param {?=} index
     * @return {?}
     */
    addTraces(traces, index) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const /** @type {?} */ tag = `${this.tag}.addTraces()`;
            if (this.debug)
                console.log(tag, 'traces:', traces);
            if (this.debug)
                console.log(tag, 'index:', index);
            return index === undefined ? Plotly.addTraces(this.plot, traces) :
                Plotly.addTraces(this.plot, traces, index);
        });
    }
    /**
     * @param {?} traces
     * @return {?}
     */
    deleteTraces(traces) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const /** @type {?} */ tag = `${this.tag}.deleteTraces()`;
            if (this.debug)
                console.log(tag, 'traces:', traces);
            return Plotly.deleteTraces(this.plot, traces);
        });
    }
    /**
     * @param {?} update
     * @param {?} animation
     * @return {?}
     */
    animate(update, animation) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const /** @type {?} */ tag = `${this.tag}.animate()`;
            if (this.debug)
                console.log(tag, 'update:', update);
            if (this.debug)
                console.log(tag, 'animation:', animation);
            return Plotly.animate(this.plot, update, animation);
        });
    }
    /**
     * @param {?} frames
     * @param {?=} indices
     * @return {?}
     */
    addFrames(frames, indices) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const /** @type {?} */ tag = `${this.tag}.addFrames()`;
            if (this.debug)
                console.log(tag, 'frames:', frames);
            if (this.debug)
                console.log(tag, 'indices:', indices);
            return Plotly.addFrames(this.plot, frames, indices);
        });
    }
    /**
     * @param {?} indices
     * @return {?}
     */
    deleteFrames(indices) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const /** @type {?} */ tag = `${this.tag}.deleteFrames()`;
            if (this.debug)
                console.log(tag, 'frames:', frames);
            return Plotly.deleteFrames(this.plot, indices);
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        const /** @type {?} */ tag = `${this.tag}.ngOnDestroy()`;
        if (this.debug)
            console.log(tag);
        this.removeEventListeners();
    }
}
PlotlyComponent.Tag = 'PlotlyComponent';
PlotlyComponent.decorators = [
    { type: Component, args: [{
                selector: 'plotly',
                template: `<div
  id="{{ plotId }}"
  class="{{ plotClass }}">
</div>
`,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '[style.width]': '"100%"',
                    '[style.height]': '"100%"',
                }
            },] },
];
/** @nocollapse */
PlotlyComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
PlotlyComponent.propDecorators = {
    debug: [{ type: Input }],
    plotId: [{ type: Input }],
    plotClass: [{ type: Input }],
    data: [{ type: Input }],
    layout: [{ type: Input }],
    configuration: [{ type: Input }],
    events: [{ type: Input }],
    frames: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }]
};
function PlotlyComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    PlotlyComponent.Tag;
    /** @type {?} */
    PlotlyComponent.prototype.tag;
    /** @type {?} */
    PlotlyComponent.prototype.receivedResize;
    /** @type {?} */
    PlotlyComponent.prototype.resizeHandler;
    /** @type {?} */
    PlotlyComponent.prototype.changeAction;
    /** @type {?} */
    PlotlyComponent.prototype.plot;
    /** @type {?} */
    PlotlyComponent.prototype.afterPlot;
    /** @type {?} */
    PlotlyComponent.prototype.debug;
    /** @type {?} */
    PlotlyComponent.prototype.plotId;
    /** @type {?} */
    PlotlyComponent.prototype.plotClass;
    /** @type {?} */
    PlotlyComponent.prototype.data;
    /** @type {?} */
    PlotlyComponent.prototype.layout;
    /** @type {?} */
    PlotlyComponent.prototype.configuration;
    /** @type {?} */
    PlotlyComponent.prototype.events;
    /** @type {?} */
    PlotlyComponent.prototype.frames;
    /** @type {?} */
    PlotlyComponent.prototype.width;
    /** @type {?} */
    PlotlyComponent.prototype.height;
    /** @type {?} */
    PlotlyComponent.prototype.cd;
}
/**
 * @param {?} arr
 * @param {?} val
 * @return {?}
 */
function includes(arr, val) {
    return arr.indexOf(val) !== -1;
}
/**
 * @param {?} arr
 * @param {?} vals
 * @return {?}
 */
function includesArr(arr, vals) {
    return vals.some(val => includes(arr, val));
}
/**
 * @param {?} v
 * @return {?}
 */
function clone(v) {
    return !v ? v : JSON.parse(JSON.stringify((v)));
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxvdGx5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuLWZ1c2UvbmctcGxvdGx5LyIsInNvdXJjZXMiOlsicGxvdGx5L3Bsb3RseS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLHVCQUF1QixFQUNsQyxpQkFBaUIsRUFBRSxLQUFLLEdBQ3pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sS0FBSyxNQUFNLE1BQU0sV0FBVyxDQUFDO0FBRXBDLE1BQU0sQ0FBQyx1QkFBTSxXQUFXLEdBQUc7SUFDekIsS0FBSyxFQUFFLGNBQWM7SUFDckIsT0FBTyxFQUFFLGdCQUFnQjtJQUN6QixLQUFLLEVBQUUsY0FBYztJQUNyQixXQUFXLEVBQUUsb0JBQW9CO0lBQ2pDLGVBQWUsRUFBRSx3QkFBd0I7SUFDekMsU0FBUyxFQUFFLGtCQUFrQjtJQUM3QixNQUFNLEVBQUUsZUFBZTtJQUN2QixPQUFPLEVBQUUsZ0JBQWdCO0lBQ3pCLFFBQVEsRUFBRSxpQkFBaUI7SUFDM0IsU0FBUyxFQUFFLGtCQUFrQjtJQUM3QixRQUFRLEVBQUUsaUJBQWlCO0lBQzNCLFFBQVEsRUFBRSxpQkFBaUI7Q0FDNUIsQ0FBQztBQUVGLHVCQUFNLFFBQVEsR0FBWSxrQkFBa0IsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQztBQUUvRSx1QkFBTSxXQUFXLEdBQVcsUUFBUSxDQUFDO0FBRXJDLHVCQUFNLGVBQWUsR0FBRztJQUN0QixNQUFNLEVBQUUsUUFBUTtJQUNoQixTQUFTLEVBQUUsV0FBVztJQUV0QixJQUFJLEVBQUUsTUFBTTtJQUNaLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLGFBQWEsRUFBRSxlQUFlO0lBQzlCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE1BQU0sRUFBRSxRQUFRO0lBRWhCLEtBQUssRUFBRSxPQUFPO0lBQ2QsTUFBTSxFQUFFLFFBQVE7Q0FDakIsQ0FBQzs7Ozs7Ozs7Ozs7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QUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzs7O3NCQS9QUSxpQkFBaUI7O1lBZHhELFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsUUFBUTtnQkFDbEIsUUFBUSxFQUFFOzs7O0NBSVg7Z0JBQ0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLElBQUksRUFBRTtvQkFDSixlQUFlLEVBQUUsUUFBUTtvQkFDekIsZ0JBQWdCLEVBQUUsUUFBUTtpQkFDM0I7YUFDRjs7OztZQTNEQyxpQkFBaUI7OztvQkF5RWhCLEtBQUs7cUJBRUwsS0FBSzt3QkFDTCxLQUFLO21CQUVMLEtBQUs7cUJBQ0wsS0FBSzs0QkFDTCxLQUFLO3FCQUNMLEtBQUs7cUJBQ0wsS0FBSztvQkFFTCxLQUFLO3FCQUNMLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRPUixrQkFBa0IsR0FBVSxFQUFFLEdBQVE7SUFDcEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Q0FDaEM7Ozs7OztBQUVELHFCQUFxQixHQUFVLEVBQUUsSUFBVztJQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztDQUM3Qzs7Ozs7QUFFRCxlQUFlLENBQU07SUFDbkIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNqRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsIElucHV0LCBTaW1wbGVDaGFuZ2VzLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyBQbG90bHkgZnJvbSAncGxvdGx5LmpzJztcclxuXHJcbmV4cG9ydCBjb25zdCBQbG90bHlFdmVudCA9IHtcclxuICBIb3ZlcjogJ3Bsb3RseV9ob3ZlcicsXHJcbiAgVW5ob3ZlcjogJ3Bsb3RseV91bmhvdmVyJyxcclxuICBDbGljazogJ3Bsb3RseV9jbGljaycsXHJcbiAgRG91YmxlQ2xpY2s6ICdwbG90bHlfZG91YmxlY2xpY2snLFxyXG4gIENsaWNrQW5ub3RhdGlvbjogJ3Bsb3RseV9jbGlja2Fubm90YXRpb24nLFxyXG4gIEFmdGVyUGxvdDogJ3Bsb3RseV9hZnRlcnBsb3QnLFxyXG4gIFJlZHJhdzogJ3Bsb3RseV9yZWRyYXcnLFxyXG4gIFJlc3R5bGU6ICdwbG90bHlfcmVzdHlsZScsXHJcbiAgUmVsYXlvdXQ6ICdwbG90bHlfcmVsYXlvdXQnLFxyXG4gIFNlbGVjdGluZzogJ3Bsb3RseV9zZWxlY3RpbmcnLFxyXG4gIFNlbGVjdGVkOiAncGxvdGx5X3NlbGVjdGVkJyxcclxuICBEZXNlbGVjdDogJ3Bsb3RseV9kZXNlbGVjdCcsXHJcbn07XHJcblxyXG5jb25zdCBpc1dlYmtpdDogYm9vbGVhbiA9ICdXZWJraXRBcHBlYXJhbmNlJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XHJcblxyXG5jb25zdCBSZXNpemVFdmVudDogc3RyaW5nID0gJ3Jlc2l6ZSc7XHJcblxyXG5jb25zdCBQbG90bHlQYXJhbWV0ZXIgPSB7XHJcbiAgUGxvdElkOiAncGxvdElkJyxcclxuICBQbG90Q2xhc3M6ICdwbG90Q2xhc3MnLFxyXG5cclxuICBEYXRhOiAnZGF0YScsXHJcbiAgTGF5b3V0OiAnbGF5b3V0JyxcclxuICBDb25maWd1cmF0aW9uOiAnY29uZmlndXJhdGlvbicsXHJcbiAgRXZlbnRzOiAnZXZlbnRzJyxcclxuICBGcmFtZXM6ICdmcmFtZXMnLFxyXG5cclxuICBXaWR0aDogJ3dpZHRoJyxcclxuICBIZWlnaHQ6ICdoZWlnaHQnLFxyXG59O1xyXG5cclxuZW51bSBDaGFuZ2VBY3Rpb24ge1xyXG4gIE5vbmUsXHJcbiAgUmVzdHlsZSxcclxuICBSZWxheW91dCxcclxuICBSZXNpemUsXHJcbiAgVXBkYXRlLFxyXG4gIFJlZHJhdyxcclxuICBSZWNyZWF0ZSxcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdwbG90bHknLFxyXG4gIHRlbXBsYXRlOiBgPGRpdlxyXG4gIGlkPVwie3sgcGxvdElkIH19XCJcclxuICBjbGFzcz1cInt7IHBsb3RDbGFzcyB9fVwiPlxyXG48L2Rpdj5cclxuYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBob3N0OiB7XHJcbiAgICAnW3N0eWxlLndpZHRoXSc6ICdcIjEwMCVcIicsXHJcbiAgICAnW3N0eWxlLmhlaWdodF0nOiAnXCIxMDAlXCInLFxyXG4gIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIFBsb3RseUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBUYWc6IHN0cmluZyA9ICdQbG90bHlDb21wb25lbnQnO1xyXG5cclxuICBwcml2YXRlIHRhZzogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIHJlY2VpdmVkUmVzaXplOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSByZXNpemVIYW5kbGVyOiBFdmVudExpc3RlbmVyT2JqZWN0O1xyXG5cclxuICBwcml2YXRlIGNoYW5nZUFjdGlvbjogQ2hhbmdlQWN0aW9uO1xyXG5cclxuICBwdWJsaWMgcGxvdC8qOiBIVE1MRWxlbWVudCAqLztcclxuICBwdWJsaWMgYWZ0ZXJQbG90OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIHByaXZhdGUgZGVidWc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgcHVibGljIHBsb3RJZDogc3RyaW5nID0gJyc7XHJcbiAgQElucHV0KCkgcHVibGljIHBsb3RDbGFzczogc3RyaW5nID0gJyc7XHJcblxyXG4gIEBJbnB1dCgpIHB1YmxpYyBkYXRhOiBhbnlbXTtcclxuICBASW5wdXQoKSBwdWJsaWMgbGF5b3V0OiBhbnk7XHJcbiAgQElucHV0KCkgcHVibGljIGNvbmZpZ3VyYXRpb246IGFueTtcclxuICBASW5wdXQoKSBwdWJsaWMgZXZlbnRzOiBhbnk7XHJcbiAgQElucHV0KCkgcHVibGljIGZyYW1lczogYW55W107XHJcblxyXG4gIEBJbnB1dCgpIHB1YmxpYyB3aWR0aDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBoZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICApIHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LmNvbnN0cnVjdG9yKClgO1xyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZyk7XHJcblxyXG4gICAgLy8gV2ViS2l0IGRvdWJsZSByZXNpemUgZXZlbnQgd29ya2Fyb3VuZC5cclxuICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU1MzQzNjMvd2h5LWRvZXMtdGhlLWpxdWVyeS1yZXNpemUtZXZlbnQtZmlyZS10d2ljZVxyXG4gICAgdGhpcy5yZXNpemVIYW5kbGVyID0gKCgpID0+IHtcclxuICAgICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ucmVzaXplSGFuZGxlcigpYDtcclxuICAgICAgaWYgKGlzV2Via2l0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVjZWl2ZWRSZXNpemUpIHtcclxuICAgICAgICAgIHRoaXMucmVzaXplKCk7XHJcbiAgICAgICAgICB0aGlzLnJlY2VpdmVkUmVzaXplID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMucmVjZWl2ZWRSZXNpemUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnJlc2l6ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KS5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy50YWcgPSBgJHtQbG90bHlDb21wb25lbnQuVGFnfS4ke3RoaXMucGxvdElkfWA7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5uZ09uSW5pdCgpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9Lm5nQWZ0ZXJWaWV3SW5pdCgpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlY3JlYXRlKCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5uZ09uQ2hhbmdlcygpYDtcclxuICAgIGlmICghdGhpcy5wbG90KSB7XHJcbiAgICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdpZ25vcmluZyBjaGFuZ2VzLCBwbG90IG5vdCB5ZXQgb25jZSBpbml0aWFsaXplZCcpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnY2hhbmdlczonLCBjaGFuZ2VzKTtcclxuXHJcbiAgICBjb25zdCBjaGFuZ2VkS2V5czogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhjaGFuZ2VzKTtcclxuXHJcbiAgICBpZiAoaW5jbHVkZXNBcnIoY2hhbmdlZEtleXMsIFtcclxuICAgICAgUGxvdGx5UGFyYW1ldGVyLldpZHRoLCBQbG90bHlQYXJhbWV0ZXIuSGVpZ2h0XSkpIHtcclxuICAgICAgdGhpcy5jaGFuZ2VBY3Rpb24gPSBDaGFuZ2VBY3Rpb24uUmVzaXplO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbmNsdWRlc0FycihjaGFuZ2VkS2V5cywgW1xyXG4gICAgICBQbG90bHlQYXJhbWV0ZXIuTGF5b3V0LCBQbG90bHlQYXJhbWV0ZXIuUGxvdElkLFxyXG4gICAgICBQbG90bHlQYXJhbWV0ZXIuUGxvdENsYXNzXSkpIHtcclxuICAgICAgdGhpcy5jaGFuZ2VBY3Rpb24gPSBDaGFuZ2VBY3Rpb24uUmVsYXlvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGluY2x1ZGVzKGNoYW5nZWRLZXlzLCBQbG90bHlQYXJhbWV0ZXIuRGF0YSkpIHtcclxuICAgICAgdGhpcy5jaGFuZ2VBY3Rpb24gPSBDaGFuZ2VBY3Rpb24uUmVkcmF3O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbmNsdWRlc0FycihjaGFuZ2VkS2V5cywgW1xyXG4gICAgICBQbG90bHlQYXJhbWV0ZXIuQ29uZmlndXJhdGlvbiwgUGxvdGx5UGFyYW1ldGVyLkV2ZW50cyxcclxuICAgICAgUGxvdGx5UGFyYW1ldGVyLkZyYW1lc10pKSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlQWN0aW9uID0gQ2hhbmdlQWN0aW9uLlJlY3JlYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hcHBseUNoYW5nZXMoKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFwcGx5Q2hhbmdlcygpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LmFwcGx5Q2hhbmdlcygpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0aGlzLmNoYW5nZUFjdGlvbjonLCBDaGFuZ2VBY3Rpb25bdGhpcy5jaGFuZ2VBY3Rpb25dKTtcclxuICAgIHN3aXRjaCAodGhpcy5jaGFuZ2VBY3Rpb24pIHtcclxuICAgICAgY2FzZSBDaGFuZ2VBY3Rpb24uUmVzaXplOlxyXG4gICAgICAgIHRoaXMucmVzaXplKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQ2hhbmdlQWN0aW9uLlJlbGF5b3V0OlxyXG4gICAgICAgIHRoaXMucmVsYXlvdXQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBDaGFuZ2VBY3Rpb24uUmVkcmF3OlxyXG4gICAgICAgIHRoaXMucmVkcmF3KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQ2hhbmdlQWN0aW9uLlJlY3JlYXRlOlxyXG4gICAgICAgIHRoaXMucmVjcmVhdGUoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHRoaXMuY2hhbmdlQWN0aW9uID0gQ2hhbmdlQWN0aW9uLk5vbmU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgcmVzdHlsZSh1cGRhdGU6IGFueSwgdHJhY2VzPzogbnVtYmVyW10pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ucmVzdHlsZSgpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd1cGRhdGU6JywgdXBkYXRlKTtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0cmFjZXM6JywgdHJhY2VzID09PSB1bmRlZmluZWQgPyAnYWxsJyA6IHRyYWNlcyk7XHJcbiAgICByZXR1cm4gUGxvdGx5LnJlc3R5bGUodGhpcy5wbG90LCB1cGRhdGUsIHRyYWNlcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgcmVzaXplKGV2ZW50PzogRXZlbnQpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ucmVzaXplKClgO1xyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2V2ZW50OicsIGV2ZW50KTtcclxuICAgIGF3YWl0IFBsb3RseS5QbG90cy5yZXNpemUodGhpcy5wbG90KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyByZWxheW91dChsYXlvdXQ6IGFueSA9IHRoaXMubGF5b3V0KTogUHJvbWlzZTxhbnk+IHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LnJlbGF5b3V0KClgO1xyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2xheW91dDonLCBsYXlvdXQpO1xyXG4gICAgYXdhaXQgUGxvdGx5LnJlbGF5b3V0KHRoaXMucGxvdCwgbGF5b3V0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUoZGF0YVVwZGF0ZTogYW55LCBsYXlvdXRVcGRhdGU6IGFueSk6IFByb21pc2U8YW55PiB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS51cGRhdGUoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnZGF0YVVwZGF0ZTonLCBkYXRhVXBkYXRlKTtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdsYXlvdXRVcGRhdGU6JywgbGF5b3V0VXBkYXRlKTtcclxuICAgIHJldHVybiBQbG90bHkudXBkYXRlKHRoaXMucGxvdCwgZGF0YVVwZGF0ZSwgbGF5b3V0VXBkYXRlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyByZWRyYXcoKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LnJlZHJhdygpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcpO1xyXG4gICAgdGhpcy5wbG90LmRhdGEgPSB0aGlzLmRhdGE7XHJcbiAgICB0aGlzLnBsb3QubGF5b3V0ID0gdGhpcy5sYXlvdXQ7XHJcbiAgICByZXR1cm4gUGxvdGx5LnJlZHJhdyh0aGlzLnBsb3QpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIHJlY3JlYXRlKCk6IFByb21pc2U8YW55PiB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5yZWNyZWF0ZSgpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcpO1xyXG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVycygpO1xyXG5cclxuICAgIHRoaXMucGxvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMucGxvdElkKTtcclxuICAgIGlmICghdGhpcy5wbG90KSByZXR1cm47XHJcblxyXG4gICAgaWYgKHRoaXMud2lkdGgpIHtcclxuICAgICAgdGhpcy5wbG90LnN0eWxlLndpZHRoID0gdGhpcy53aWR0aCArICclJztcclxuICAgICAgdGhpcy5wbG90LnN0eWxlWydtYXJnaW4tbGVmdCddID0gKDEwMCAtIHRoaXMud2lkdGgpIC8gMiArICclJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5oZWlnaHQpIHtcclxuICAgICAgdGhpcy5wbG90LnN0eWxlLmhlaWdodCA9IHRoaXMuaGVpZ2h0ICsgJyUnO1xyXG4gICAgICB0aGlzLnBsb3Quc3R5bGVbJ21hcmdpbi10b3AnXSA9ICgxMDAgLSB0aGlzLmhlaWdodCkgLyAyICsgJyUnO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ3RoaXMucGxvdDonLCB0aGlzLnBsb3QpO1xyXG5cclxuICAgIC8vIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0aGlzLmRhdGE6JywgdGhpcy5kYXRhKTtcclxuICAgIC8vIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0aGlzLmxheW91dDonLCB0aGlzLmxheW91dCk7XHJcbiAgICAvLyBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndGhpcy5jb25maWd1cmF0aW9uOicsIHRoaXMuY29uZmlndXJhdGlvbik7XHJcbiAgICAvLyBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndGhpcy5mcmFtZXM6JywgdGhpcy5mcmFtZXMpO1xyXG5cclxuICAgIGNvbnN0IHJlc2l6ZVBsb3Q6IGJvb2xlYW4gPSAhISh0aGlzLndpZHRoIHx8IHRoaXMuaGVpZ2h0KTtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsIHsgcmVzaXplUGxvdCB9KTtcclxuXHJcbiAgICBQbG90bHkubmV3UGxvdCh0aGlzLnBsb3QsIHtcclxuICAgICAgZGF0YTogdGhpcy5kYXRhLFxyXG4gICAgICBsYXlvdXQ6IHRoaXMubGF5b3V0LFxyXG4gICAgICBjb25maWc6IHRoaXMuY29uZmlndXJhdGlvbixcclxuICAgICAgZnJhbWVzOiB0aGlzLmZyYW1lcyxcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYXR0YWNoRXZlbnRMaXN0ZW5lcnModGhpcy5wbG90LCB0aGlzLmV2ZW50cyk7XHJcblxyXG4gICAgaWYgKHRoaXMud2lkdGggfHwgdGhpcy5oZWlnaHQpIHtcclxuICAgICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ3Jlc2l6aW5nJyk7XHJcbiAgICAgIGF3YWl0IHRoaXMucmVzaXplKCk7XHJcbiAgICAgIHRoaXMuYWZ0ZXJQbG90ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYWZ0ZXJQbG90ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGF0dGFjaEV2ZW50TGlzdGVuZXJzKHBsb3Q6IGFueSwgZXZlbnRzOiBhbnkpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LmF0dGFjaEV2ZW50TGlzdGVuZXJzKClgO1xyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2V2ZW50czonLCBldmVudHMpO1xyXG5cclxuICAgIE9iamVjdC5rZXlzKGV2ZW50cyB8fCB7fSkuZm9yRWFjaChrID0+IHtcclxuICAgICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30uJHtrfSgpYDtcclxuICAgICAgdGhpcy5wbG90Lm9uKGssIChkYXRhLCBldmVudCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdkYXRhOicsIGRhdGEpO1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdldmVudDonLCBldmVudCk7XHJcbiAgICAgICAgZXZlbnRzW2tdKGRhdGEsIGV2ZW50LCB0aGlzLCBQbG90bHkpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFJlc2l6ZUV2ZW50LCB0aGlzLnJlc2l6ZUhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ucmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnKTtcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFJlc2l6ZUV2ZW50LCB0aGlzLnJlc2l6ZUhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGFkZFRyYWNlcyh0cmFjZXM6IGFueSB8IGFueVtdLCBpbmRleD86IG51bWJlcik6IFByb21pc2U8YW55PiB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5hZGRUcmFjZXMoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndHJhY2VzOicsIHRyYWNlcyk7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnaW5kZXg6JywgaW5kZXgpO1xyXG4gICAgcmV0dXJuIGluZGV4ID09PSB1bmRlZmluZWQgPyBQbG90bHkuYWRkVHJhY2VzKHRoaXMucGxvdCwgdHJhY2VzKSA6XHJcbiAgICAgIFBsb3RseS5hZGRUcmFjZXModGhpcy5wbG90LCB0cmFjZXMsIGluZGV4KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBkZWxldGVUcmFjZXModHJhY2VzOiBudW1iZXIgfCBudW1iZXJbXSk6IFByb21pc2U8YW55PiB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5kZWxldGVUcmFjZXMoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndHJhY2VzOicsIHRyYWNlcyk7XHJcbiAgICByZXR1cm4gUGxvdGx5LmRlbGV0ZVRyYWNlcyh0aGlzLnBsb3QsIHRyYWNlcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgYW5pbWF0ZSh1cGRhdGU6IGFueSwgYW5pbWF0aW9uOiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30uYW5pbWF0ZSgpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd1cGRhdGU6JywgdXBkYXRlKTtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdhbmltYXRpb246JywgYW5pbWF0aW9uKTtcclxuICAgIHJldHVybiBQbG90bHkuYW5pbWF0ZSh0aGlzLnBsb3QsIHVwZGF0ZSwgYW5pbWF0aW9uKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBhZGRGcmFtZXMoZnJhbWVzOiBhbnlbXSwgaW5kaWNlcz86IG51bWJlcltdKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LmFkZEZyYW1lcygpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdmcmFtZXM6JywgZnJhbWVzKTtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdpbmRpY2VzOicsIGluZGljZXMpO1xyXG4gICAgcmV0dXJuIFBsb3RseS5hZGRGcmFtZXModGhpcy5wbG90LCBmcmFtZXMsIGluZGljZXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGRlbGV0ZUZyYW1lcyhpbmRpY2VzOiBudW1iZXJbXSk6IFByb21pc2U8YW55PiB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5kZWxldGVGcmFtZXMoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnZnJhbWVzOicsIGZyYW1lcyk7XHJcbiAgICByZXR1cm4gUGxvdGx5LmRlbGV0ZUZyYW1lcyh0aGlzLnBsb3QsIGluZGljZXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ubmdPbkRlc3Ryb3koKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnKTtcclxuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBpbmNsdWRlcyhhcnI6IGFueVtdLCB2YWw6IGFueSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiBhcnIuaW5kZXhPZih2YWwpICE9PSAtMTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5jbHVkZXNBcnIoYXJyOiBhbnlbXSwgdmFsczogYW55W10pOiBib29sZWFuIHtcclxuICByZXR1cm4gdmFscy5zb21lKHZhbCA9PiBpbmNsdWRlcyhhcnIsIHZhbCkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbG9uZSh2OiBhbnkpOiBhbnkge1xyXG4gIHJldHVybiAhdiA/IHYgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KCh2KSkpO1xyXG59XHJcbiJdfQ==