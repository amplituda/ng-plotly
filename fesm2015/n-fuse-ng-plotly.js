import { __awaiter } from 'tslib';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, NgModule } from '@angular/core';
import * as Plotly from 'plotly.js';
import { restyle, Plots, relayout, update, redraw, newPlot, addTraces, deleteTraces, animate, addFrames, deleteFrames } from 'plotly.js';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ PlotlyEvent = {
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
class PlotlyComponent {
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
    restyle(update$$1, traces) {
        return __awaiter(this, void 0, void 0, function* () {
            const /** @type {?} */ tag = `${this.tag}.restyle()`;
            if (this.debug)
                console.log(tag, 'update:', update$$1);
            if (this.debug)
                console.log(tag, 'traces:', traces === undefined ? 'all' : traces);
            return restyle(this.plot, update$$1, traces);
        });
    }
    /**
     * @param {?=} event
     * @return {?}
     */
    resize(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const /** @type {?} */ tag = `${this.tag}.resize()`;
            if (this.debug)
                console.log(tag, 'event:', event);
            yield Plots.resize(this.plot);
        });
    }
    /**
     * @param {?=} layout
     * @return {?}
     */
    relayout(layout = this.layout) {
        return __awaiter(this, void 0, void 0, function* () {
            const /** @type {?} */ tag = `${this.tag}.relayout()`;
            if (this.debug)
                console.log(tag, 'layout:', layout);
            yield relayout(this.plot, layout);
        });
    }
    /**
     * @param {?} dataUpdate
     * @param {?} layoutUpdate
     * @return {?}
     */
    update(dataUpdate, layoutUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const /** @type {?} */ tag = `${this.tag}.update()`;
            if (this.debug)
                console.log(tag, 'dataUpdate:', dataUpdate);
            if (this.debug)
                console.log(tag, 'layoutUpdate:', layoutUpdate);
            return update(this.plot, dataUpdate, layoutUpdate);
        });
    }
    /**
     * @return {?}
     */
    redraw() {
        return __awaiter(this, void 0, void 0, function* () {
            const /** @type {?} */ tag = `${this.tag}.redraw()`;
            if (this.debug)
                console.log(tag);
            this.plot.data = this.data;
            this.plot.layout = this.layout;
            return redraw(this.plot);
        });
    }
    /**
     * @return {?}
     */
    recreate() {
        return __awaiter(this, void 0, void 0, function* () {
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
            newPlot(this.plot, {
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
        return __awaiter(this, void 0, void 0, function* () {
            const /** @type {?} */ tag = `${this.tag}.addTraces()`;
            if (this.debug)
                console.log(tag, 'traces:', traces);
            if (this.debug)
                console.log(tag, 'index:', index);
            return index === undefined ? addTraces(this.plot, traces) :
                addTraces(this.plot, traces, index);
        });
    }
    /**
     * @param {?} traces
     * @return {?}
     */
    deleteTraces(traces) {
        return __awaiter(this, void 0, void 0, function* () {
            const /** @type {?} */ tag = `${this.tag}.deleteTraces()`;
            if (this.debug)
                console.log(tag, 'traces:', traces);
            return deleteTraces(this.plot, traces);
        });
    }
    /**
     * @param {?} update
     * @param {?} animation
     * @return {?}
     */
    animate(update$$1, animation) {
        return __awaiter(this, void 0, void 0, function* () {
            const /** @type {?} */ tag = `${this.tag}.animate()`;
            if (this.debug)
                console.log(tag, 'update:', update$$1);
            if (this.debug)
                console.log(tag, 'animation:', animation);
            return animate(this.plot, update$$1, animation);
        });
    }
    /**
     * @param {?} frames
     * @param {?=} indices
     * @return {?}
     */
    addFrames(frames, indices) {
        return __awaiter(this, void 0, void 0, function* () {
            const /** @type {?} */ tag = `${this.tag}.addFrames()`;
            if (this.debug)
                console.log(tag, 'frames:', frames);
            if (this.debug)
                console.log(tag, 'indices:', indices);
            return addFrames(this.plot, frames, indices);
        });
    }
    /**
     * @param {?} indices
     * @return {?}
     */
    deleteFrames(indices) {
        return __awaiter(this, void 0, void 0, function* () {
            const /** @type {?} */ tag = `${this.tag}.deleteFrames()`;
            if (this.debug)
                console.log(tag, 'frames:', frames);
            return deleteFrames(this.plot, indices);
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PlotlyModule {
}
PlotlyModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [PlotlyComponent],
                declarations: [PlotlyComponent],
                providers: [],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { PlotlyModule, PlotlyComponent, PlotlyEvent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibi1mdXNlLW5nLXBsb3RseS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQG4tZnVzZS9uZy1wbG90bHkvcGxvdGx5L3Bsb3RseS5jb21wb25lbnQudHMiLCJuZzovL0BuLWZ1c2UvbmctcGxvdGx5L2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsIElucHV0LCBTaW1wbGVDaGFuZ2VzLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyBQbG90bHkgZnJvbSAncGxvdGx5LmpzJztcclxuXHJcbmV4cG9ydCBjb25zdCBQbG90bHlFdmVudCA9IHtcclxuICBIb3ZlcjogJ3Bsb3RseV9ob3ZlcicsXHJcbiAgVW5ob3ZlcjogJ3Bsb3RseV91bmhvdmVyJyxcclxuICBDbGljazogJ3Bsb3RseV9jbGljaycsXHJcbiAgRG91YmxlQ2xpY2s6ICdwbG90bHlfZG91YmxlY2xpY2snLFxyXG4gIENsaWNrQW5ub3RhdGlvbjogJ3Bsb3RseV9jbGlja2Fubm90YXRpb24nLFxyXG4gIEFmdGVyUGxvdDogJ3Bsb3RseV9hZnRlcnBsb3QnLFxyXG4gIFJlZHJhdzogJ3Bsb3RseV9yZWRyYXcnLFxyXG4gIFJlc3R5bGU6ICdwbG90bHlfcmVzdHlsZScsXHJcbiAgUmVsYXlvdXQ6ICdwbG90bHlfcmVsYXlvdXQnLFxyXG4gIFNlbGVjdGluZzogJ3Bsb3RseV9zZWxlY3RpbmcnLFxyXG4gIFNlbGVjdGVkOiAncGxvdGx5X3NlbGVjdGVkJyxcclxuICBEZXNlbGVjdDogJ3Bsb3RseV9kZXNlbGVjdCcsXHJcbn07XHJcblxyXG5jb25zdCBpc1dlYmtpdDogYm9vbGVhbiA9ICdXZWJraXRBcHBlYXJhbmNlJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XHJcblxyXG5jb25zdCBSZXNpemVFdmVudDogc3RyaW5nID0gJ3Jlc2l6ZSc7XHJcblxyXG5jb25zdCBQbG90bHlQYXJhbWV0ZXIgPSB7XHJcbiAgUGxvdElkOiAncGxvdElkJyxcclxuICBQbG90Q2xhc3M6ICdwbG90Q2xhc3MnLFxyXG5cclxuICBEYXRhOiAnZGF0YScsXHJcbiAgTGF5b3V0OiAnbGF5b3V0JyxcclxuICBDb25maWd1cmF0aW9uOiAnY29uZmlndXJhdGlvbicsXHJcbiAgRXZlbnRzOiAnZXZlbnRzJyxcclxuICBGcmFtZXM6ICdmcmFtZXMnLFxyXG5cclxuICBXaWR0aDogJ3dpZHRoJyxcclxuICBIZWlnaHQ6ICdoZWlnaHQnLFxyXG59O1xyXG5cclxuZW51bSBDaGFuZ2VBY3Rpb24ge1xyXG4gIE5vbmUsXHJcbiAgUmVzdHlsZSxcclxuICBSZWxheW91dCxcclxuICBSZXNpemUsXHJcbiAgVXBkYXRlLFxyXG4gIFJlZHJhdyxcclxuICBSZWNyZWF0ZSxcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdwbG90bHknLFxyXG4gIHRlbXBsYXRlOiBgPGRpdlxyXG4gIGlkPVwie3sgcGxvdElkIH19XCJcclxuICBjbGFzcz1cInt7IHBsb3RDbGFzcyB9fVwiPlxyXG48L2Rpdj5cclxuYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBob3N0OiB7XHJcbiAgICAnW3N0eWxlLndpZHRoXSc6ICdcIjEwMCVcIicsXHJcbiAgICAnW3N0eWxlLmhlaWdodF0nOiAnXCIxMDAlXCInLFxyXG4gIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIFBsb3RseUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBUYWc6IHN0cmluZyA9ICdQbG90bHlDb21wb25lbnQnO1xyXG5cclxuICBwcml2YXRlIHRhZzogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIHJlY2VpdmVkUmVzaXplOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSByZXNpemVIYW5kbGVyOiBFdmVudExpc3RlbmVyT2JqZWN0O1xyXG5cclxuICBwcml2YXRlIGNoYW5nZUFjdGlvbjogQ2hhbmdlQWN0aW9uO1xyXG5cclxuICBwdWJsaWMgcGxvdC8qOiBIVE1MRWxlbWVudCAqLztcclxuICBwdWJsaWMgYWZ0ZXJQbG90OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIHByaXZhdGUgZGVidWc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgcHVibGljIHBsb3RJZDogc3RyaW5nID0gJyc7XHJcbiAgQElucHV0KCkgcHVibGljIHBsb3RDbGFzczogc3RyaW5nID0gJyc7XHJcblxyXG4gIEBJbnB1dCgpIHB1YmxpYyBkYXRhOiBhbnlbXTtcclxuICBASW5wdXQoKSBwdWJsaWMgbGF5b3V0OiBhbnk7XHJcbiAgQElucHV0KCkgcHVibGljIGNvbmZpZ3VyYXRpb246IGFueTtcclxuICBASW5wdXQoKSBwdWJsaWMgZXZlbnRzOiBhbnk7XHJcbiAgQElucHV0KCkgcHVibGljIGZyYW1lczogYW55W107XHJcblxyXG4gIEBJbnB1dCgpIHB1YmxpYyB3aWR0aDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBoZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICApIHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LmNvbnN0cnVjdG9yKClgO1xyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZyk7XHJcblxyXG4gICAgLy8gV2ViS2l0IGRvdWJsZSByZXNpemUgZXZlbnQgd29ya2Fyb3VuZC5cclxuICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU1MzQzNjMvd2h5LWRvZXMtdGhlLWpxdWVyeS1yZXNpemUtZXZlbnQtZmlyZS10d2ljZVxyXG4gICAgdGhpcy5yZXNpemVIYW5kbGVyID0gKCgpID0+IHtcclxuICAgICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ucmVzaXplSGFuZGxlcigpYDtcclxuICAgICAgaWYgKGlzV2Via2l0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVjZWl2ZWRSZXNpemUpIHtcclxuICAgICAgICAgIHRoaXMucmVzaXplKCk7XHJcbiAgICAgICAgICB0aGlzLnJlY2VpdmVkUmVzaXplID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMucmVjZWl2ZWRSZXNpemUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnJlc2l6ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KS5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy50YWcgPSBgJHtQbG90bHlDb21wb25lbnQuVGFnfS4ke3RoaXMucGxvdElkfWA7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5uZ09uSW5pdCgpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9Lm5nQWZ0ZXJWaWV3SW5pdCgpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlY3JlYXRlKCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5uZ09uQ2hhbmdlcygpYDtcclxuICAgIGlmICghdGhpcy5wbG90KSB7XHJcbiAgICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdpZ25vcmluZyBjaGFuZ2VzLCBwbG90IG5vdCB5ZXQgb25jZSBpbml0aWFsaXplZCcpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnY2hhbmdlczonLCBjaGFuZ2VzKTtcclxuXHJcbiAgICBjb25zdCBjaGFuZ2VkS2V5czogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhjaGFuZ2VzKTtcclxuXHJcbiAgICBpZiAoaW5jbHVkZXNBcnIoY2hhbmdlZEtleXMsIFtcclxuICAgICAgUGxvdGx5UGFyYW1ldGVyLldpZHRoLCBQbG90bHlQYXJhbWV0ZXIuSGVpZ2h0XSkpIHtcclxuICAgICAgdGhpcy5jaGFuZ2VBY3Rpb24gPSBDaGFuZ2VBY3Rpb24uUmVzaXplO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbmNsdWRlc0FycihjaGFuZ2VkS2V5cywgW1xyXG4gICAgICBQbG90bHlQYXJhbWV0ZXIuTGF5b3V0LCBQbG90bHlQYXJhbWV0ZXIuUGxvdElkLFxyXG4gICAgICBQbG90bHlQYXJhbWV0ZXIuUGxvdENsYXNzXSkpIHtcclxuICAgICAgdGhpcy5jaGFuZ2VBY3Rpb24gPSBDaGFuZ2VBY3Rpb24uUmVsYXlvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGluY2x1ZGVzKGNoYW5nZWRLZXlzLCBQbG90bHlQYXJhbWV0ZXIuRGF0YSkpIHtcclxuICAgICAgdGhpcy5jaGFuZ2VBY3Rpb24gPSBDaGFuZ2VBY3Rpb24uUmVkcmF3O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbmNsdWRlc0FycihjaGFuZ2VkS2V5cywgW1xyXG4gICAgICBQbG90bHlQYXJhbWV0ZXIuQ29uZmlndXJhdGlvbiwgUGxvdGx5UGFyYW1ldGVyLkV2ZW50cyxcclxuICAgICAgUGxvdGx5UGFyYW1ldGVyLkZyYW1lc10pKSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlQWN0aW9uID0gQ2hhbmdlQWN0aW9uLlJlY3JlYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hcHBseUNoYW5nZXMoKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFwcGx5Q2hhbmdlcygpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LmFwcGx5Q2hhbmdlcygpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0aGlzLmNoYW5nZUFjdGlvbjonLCBDaGFuZ2VBY3Rpb25bdGhpcy5jaGFuZ2VBY3Rpb25dKTtcclxuICAgIHN3aXRjaCAodGhpcy5jaGFuZ2VBY3Rpb24pIHtcclxuICAgICAgY2FzZSBDaGFuZ2VBY3Rpb24uUmVzaXplOlxyXG4gICAgICAgIHRoaXMucmVzaXplKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQ2hhbmdlQWN0aW9uLlJlbGF5b3V0OlxyXG4gICAgICAgIHRoaXMucmVsYXlvdXQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBDaGFuZ2VBY3Rpb24uUmVkcmF3OlxyXG4gICAgICAgIHRoaXMucmVkcmF3KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQ2hhbmdlQWN0aW9uLlJlY3JlYXRlOlxyXG4gICAgICAgIHRoaXMucmVjcmVhdGUoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHRoaXMuY2hhbmdlQWN0aW9uID0gQ2hhbmdlQWN0aW9uLk5vbmU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgcmVzdHlsZSh1cGRhdGU6IGFueSwgdHJhY2VzPzogbnVtYmVyW10pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ucmVzdHlsZSgpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd1cGRhdGU6JywgdXBkYXRlKTtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0cmFjZXM6JywgdHJhY2VzID09PSB1bmRlZmluZWQgPyAnYWxsJyA6IHRyYWNlcyk7XHJcbiAgICByZXR1cm4gUGxvdGx5LnJlc3R5bGUodGhpcy5wbG90LCB1cGRhdGUsIHRyYWNlcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgcmVzaXplKGV2ZW50PzogRXZlbnQpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ucmVzaXplKClgO1xyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2V2ZW50OicsIGV2ZW50KTtcclxuICAgIGF3YWl0IFBsb3RseS5QbG90cy5yZXNpemUodGhpcy5wbG90KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyByZWxheW91dChsYXlvdXQ6IGFueSA9IHRoaXMubGF5b3V0KTogUHJvbWlzZTxhbnk+IHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LnJlbGF5b3V0KClgO1xyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2xheW91dDonLCBsYXlvdXQpO1xyXG4gICAgYXdhaXQgUGxvdGx5LnJlbGF5b3V0KHRoaXMucGxvdCwgbGF5b3V0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUoZGF0YVVwZGF0ZTogYW55LCBsYXlvdXRVcGRhdGU6IGFueSk6IFByb21pc2U8YW55PiB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS51cGRhdGUoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnZGF0YVVwZGF0ZTonLCBkYXRhVXBkYXRlKTtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdsYXlvdXRVcGRhdGU6JywgbGF5b3V0VXBkYXRlKTtcclxuICAgIHJldHVybiBQbG90bHkudXBkYXRlKHRoaXMucGxvdCwgZGF0YVVwZGF0ZSwgbGF5b3V0VXBkYXRlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyByZWRyYXcoKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LnJlZHJhdygpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcpO1xyXG4gICAgdGhpcy5wbG90LmRhdGEgPSB0aGlzLmRhdGE7XHJcbiAgICB0aGlzLnBsb3QubGF5b3V0ID0gdGhpcy5sYXlvdXQ7XHJcbiAgICByZXR1cm4gUGxvdGx5LnJlZHJhdyh0aGlzLnBsb3QpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIHJlY3JlYXRlKCk6IFByb21pc2U8YW55PiB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5yZWNyZWF0ZSgpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcpO1xyXG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVycygpO1xyXG5cclxuICAgIHRoaXMucGxvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMucGxvdElkKTtcclxuICAgIGlmICghdGhpcy5wbG90KSByZXR1cm47XHJcblxyXG4gICAgaWYgKHRoaXMud2lkdGgpIHtcclxuICAgICAgdGhpcy5wbG90LnN0eWxlLndpZHRoID0gdGhpcy53aWR0aCArICclJztcclxuICAgICAgdGhpcy5wbG90LnN0eWxlWydtYXJnaW4tbGVmdCddID0gKDEwMCAtIHRoaXMud2lkdGgpIC8gMiArICclJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5oZWlnaHQpIHtcclxuICAgICAgdGhpcy5wbG90LnN0eWxlLmhlaWdodCA9IHRoaXMuaGVpZ2h0ICsgJyUnO1xyXG4gICAgICB0aGlzLnBsb3Quc3R5bGVbJ21hcmdpbi10b3AnXSA9ICgxMDAgLSB0aGlzLmhlaWdodCkgLyAyICsgJyUnO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ3RoaXMucGxvdDonLCB0aGlzLnBsb3QpO1xyXG5cclxuICAgIC8vIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0aGlzLmRhdGE6JywgdGhpcy5kYXRhKTtcclxuICAgIC8vIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0aGlzLmxheW91dDonLCB0aGlzLmxheW91dCk7XHJcbiAgICAvLyBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndGhpcy5jb25maWd1cmF0aW9uOicsIHRoaXMuY29uZmlndXJhdGlvbik7XHJcbiAgICAvLyBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndGhpcy5mcmFtZXM6JywgdGhpcy5mcmFtZXMpO1xyXG5cclxuICAgIGNvbnN0IHJlc2l6ZVBsb3Q6IGJvb2xlYW4gPSAhISh0aGlzLndpZHRoIHx8IHRoaXMuaGVpZ2h0KTtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsIHsgcmVzaXplUGxvdCB9KTtcclxuXHJcbiAgICBQbG90bHkubmV3UGxvdCh0aGlzLnBsb3QsIHtcclxuICAgICAgZGF0YTogdGhpcy5kYXRhLFxyXG4gICAgICBsYXlvdXQ6IHRoaXMubGF5b3V0LFxyXG4gICAgICBjb25maWc6IHRoaXMuY29uZmlndXJhdGlvbixcclxuICAgICAgZnJhbWVzOiB0aGlzLmZyYW1lcyxcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYXR0YWNoRXZlbnRMaXN0ZW5lcnModGhpcy5wbG90LCB0aGlzLmV2ZW50cyk7XHJcblxyXG4gICAgaWYgKHRoaXMud2lkdGggfHwgdGhpcy5oZWlnaHQpIHtcclxuICAgICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ3Jlc2l6aW5nJyk7XHJcbiAgICAgIGF3YWl0IHRoaXMucmVzaXplKCk7XHJcbiAgICAgIHRoaXMuYWZ0ZXJQbG90ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYWZ0ZXJQbG90ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGF0dGFjaEV2ZW50TGlzdGVuZXJzKHBsb3Q6IGFueSwgZXZlbnRzOiBhbnkpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LmF0dGFjaEV2ZW50TGlzdGVuZXJzKClgO1xyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2V2ZW50czonLCBldmVudHMpO1xyXG5cclxuICAgIE9iamVjdC5rZXlzKGV2ZW50cyB8fCB7fSkuZm9yRWFjaChrID0+IHtcclxuICAgICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30uJHtrfSgpYDtcclxuICAgICAgdGhpcy5wbG90Lm9uKGssIChkYXRhLCBldmVudCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdkYXRhOicsIGRhdGEpO1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdldmVudDonLCBldmVudCk7XHJcbiAgICAgICAgZXZlbnRzW2tdKGRhdGEsIGV2ZW50LCB0aGlzLCBQbG90bHkpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFJlc2l6ZUV2ZW50LCB0aGlzLnJlc2l6ZUhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ucmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnKTtcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFJlc2l6ZUV2ZW50LCB0aGlzLnJlc2l6ZUhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGFkZFRyYWNlcyh0cmFjZXM6IGFueSB8IGFueVtdLCBpbmRleD86IG51bWJlcik6IFByb21pc2U8YW55PiB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5hZGRUcmFjZXMoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndHJhY2VzOicsIHRyYWNlcyk7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnaW5kZXg6JywgaW5kZXgpO1xyXG4gICAgcmV0dXJuIGluZGV4ID09PSB1bmRlZmluZWQgPyBQbG90bHkuYWRkVHJhY2VzKHRoaXMucGxvdCwgdHJhY2VzKSA6XHJcbiAgICAgIFBsb3RseS5hZGRUcmFjZXModGhpcy5wbG90LCB0cmFjZXMsIGluZGV4KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBkZWxldGVUcmFjZXModHJhY2VzOiBudW1iZXIgfCBudW1iZXJbXSk6IFByb21pc2U8YW55PiB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5kZWxldGVUcmFjZXMoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndHJhY2VzOicsIHRyYWNlcyk7XHJcbiAgICByZXR1cm4gUGxvdGx5LmRlbGV0ZVRyYWNlcyh0aGlzLnBsb3QsIHRyYWNlcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgYW5pbWF0ZSh1cGRhdGU6IGFueSwgYW5pbWF0aW9uOiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30uYW5pbWF0ZSgpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd1cGRhdGU6JywgdXBkYXRlKTtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdhbmltYXRpb246JywgYW5pbWF0aW9uKTtcclxuICAgIHJldHVybiBQbG90bHkuYW5pbWF0ZSh0aGlzLnBsb3QsIHVwZGF0ZSwgYW5pbWF0aW9uKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBhZGRGcmFtZXMoZnJhbWVzOiBhbnlbXSwgaW5kaWNlcz86IG51bWJlcltdKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LmFkZEZyYW1lcygpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdmcmFtZXM6JywgZnJhbWVzKTtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdpbmRpY2VzOicsIGluZGljZXMpO1xyXG4gICAgcmV0dXJuIFBsb3RseS5hZGRGcmFtZXModGhpcy5wbG90LCBmcmFtZXMsIGluZGljZXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGRlbGV0ZUZyYW1lcyhpbmRpY2VzOiBudW1iZXJbXSk6IFByb21pc2U8YW55PiB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5kZWxldGVGcmFtZXMoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnZnJhbWVzOicsIGZyYW1lcyk7XHJcbiAgICByZXR1cm4gUGxvdGx5LmRlbGV0ZUZyYW1lcyh0aGlzLnBsb3QsIGluZGljZXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ubmdPbkRlc3Ryb3koKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnKTtcclxuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBpbmNsdWRlcyhhcnI6IGFueVtdLCB2YWw6IGFueSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiBhcnIuaW5kZXhPZih2YWwpICE9PSAtMTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5jbHVkZXNBcnIoYXJyOiBhbnlbXSwgdmFsczogYW55W10pOiBib29sZWFuIHtcclxuICByZXR1cm4gdmFscy5zb21lKHZhbCA9PiBpbmNsdWRlcyhhcnIsIHZhbCkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbG9uZSh2OiBhbnkpOiBhbnkge1xyXG4gIHJldHVybiAhdiA/IHYgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KCh2KSkpO1xyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFBsb3RseUNvbXBvbmVudCwgUGxvdGx5RXZlbnQgfSBmcm9tICcuL3Bsb3RseS9wbG90bHkuY29tcG9uZW50JztcclxuXHJcbmV4cG9ydCB7IFBsb3RseUNvbXBvbmVudCwgUGxvdGx5RXZlbnQgfTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgZXhwb3J0czogW1Bsb3RseUNvbXBvbmVudF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbUGxvdGx5Q29tcG9uZW50XSxcclxuICBwcm92aWRlcnM6IFtdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGxvdGx5TW9kdWxlIHsgfVxyXG4iXSwibmFtZXMiOlsidXBkYXRlIiwiUGxvdGx5LnJlc3R5bGUiLCJQbG90bHkuUGxvdHMiLCJQbG90bHkucmVsYXlvdXQiLCJQbG90bHkudXBkYXRlIiwiUGxvdGx5LnJlZHJhdyIsIlBsb3RseS5uZXdQbG90IiwiUGxvdGx5LmFkZFRyYWNlcyIsIlBsb3RseS5kZWxldGVUcmFjZXMiLCJQbG90bHkuYW5pbWF0ZSIsIlBsb3RseS5hZGRGcmFtZXMiLCJQbG90bHkuZGVsZXRlRnJhbWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O3VCQU1hLFdBQVcsR0FBRztJQUN6QixLQUFLLEVBQUUsY0FBYztJQUNyQixPQUFPLEVBQUUsZ0JBQWdCO0lBQ3pCLEtBQUssRUFBRSxjQUFjO0lBQ3JCLFdBQVcsRUFBRSxvQkFBb0I7SUFDakMsZUFBZSxFQUFFLHdCQUF3QjtJQUN6QyxTQUFTLEVBQUUsa0JBQWtCO0lBQzdCLE1BQU0sRUFBRSxlQUFlO0lBQ3ZCLE9BQU8sRUFBRSxnQkFBZ0I7SUFDekIsUUFBUSxFQUFFLGlCQUFpQjtJQUMzQixTQUFTLEVBQUUsa0JBQWtCO0lBQzdCLFFBQVEsRUFBRSxpQkFBaUI7SUFDM0IsUUFBUSxFQUFFLGlCQUFpQjtDQUM1QixDQUFDO0FBRUYsdUJBQU0sUUFBUSxHQUFZLGtCQUFrQixJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO0FBRS9FLHVCQUFNLFdBQVcsR0FBVyxRQUFRLENBQUM7QUFFckMsdUJBQU0sZUFBZSxHQUFHO0lBQ3RCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLFNBQVMsRUFBRSxXQUFXO0lBRXRCLElBQUksRUFBRSxNQUFNO0lBQ1osTUFBTSxFQUFFLFFBQVE7SUFDaEIsYUFBYSxFQUFFLGVBQWU7SUFDOUIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsTUFBTSxFQUFFLFFBQVE7SUFFaEIsS0FBSyxFQUFFLE9BQU87SUFDZCxNQUFNLEVBQUUsUUFBUTtDQUNqQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkY7Ozs7SUEyQkUsWUFDbUI7UUFBQSxPQUFFLEdBQUYsRUFBRTs4QkF2QmEsS0FBSzt5QkFNWCxLQUFLO3FCQUVDLEtBQUs7c0JBRU4sRUFBRTt5QkFDQyxFQUFFO1FBY3BDLHVCQUFNLEdBQUcsR0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLGdCQUFnQixDQUFDO1FBQ2hELElBQUksSUFBSSxDQUFDLEtBQUs7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