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
        this.afterPlot = false;
        this.debug = false;
        this.onResizeTimeOut = 200;
        this.plotId = '';
        this.plotClass = '';
        const /** @type {?} */ tag = `${this.tag}.constructor()`;
        if (this.debug)
            console.log(tag);
        // WebKit double resize event workaround.
        // https://stackoverflow.com/questions/5534363/why-does-the-jquery-resize-event-fire-twice
        this.resizeHandler = (() => {
            const /** @type {?} */ tag = `${this.tag}.resizeHandler()`;
            if (this.resizing) {
                if (this.debug)
                    console.log(tag, `clearTimeout(${this.resizing})`);
                clearTimeout(this.resizing);
            }
            this.resizing = setTimeout(() => this.resize(), this.onResizeTimeOut);
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
            yield newPlot(this.plot, {
                data: this.data,
                layout: this.layout,
                config: this.configuration,
                frames: this.frames,
            });
            if (this.width || this.height) {
                if (this.debug)
                    console.log(tag, 'resizing');
                yield this.resize();
                this.afterPlot = true;
            }
            this.attachEventListeners(this.plot, this.events);
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
            return addTraces(this.plot, traces, index);
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
            deleteTraces(this.plot, traces);
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
    { type: ChangeDetectorRef, },
];
PlotlyComponent.propDecorators = {
    "debug": [{ type: Input },],
    "onResizeTimeOut": [{ type: Input },],
    "plotId": [{ type: Input },],
    "plotClass": [{ type: Input },],
    "data": [{ type: Input },],
    "layout": [{ type: Input },],
    "configuration": [{ type: Input },],
    "events": [{ type: Input },],
    "frames": [{ type: Input },],
    "width": [{ type: Input },],
    "height": [{ type: Input },],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibi1mdXNlLW5nLXBsb3RseS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQG4tZnVzZS9uZy1wbG90bHkvcGxvdGx5L3Bsb3RseS5jb21wb25lbnQudHMiLCJuZzovL0BuLWZ1c2UvbmctcGxvdGx5L2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LFxuICBDaGFuZ2VEZXRlY3RvclJlZiwgSW5wdXQsIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgUGxvdGx5IGZyb20gJ3Bsb3RseS5qcyc7XG5cbmV4cG9ydCBjb25zdCBQbG90bHlFdmVudCA9IHtcbiAgSG92ZXI6ICdwbG90bHlfaG92ZXInLFxuICBVbmhvdmVyOiAncGxvdGx5X3VuaG92ZXInLFxuICBDbGljazogJ3Bsb3RseV9jbGljaycsXG4gIERvdWJsZUNsaWNrOiAncGxvdGx5X2RvdWJsZWNsaWNrJyxcbiAgQ2xpY2tBbm5vdGF0aW9uOiAncGxvdGx5X2NsaWNrYW5ub3RhdGlvbicsXG4gIEFmdGVyUGxvdDogJ3Bsb3RseV9hZnRlcnBsb3QnLFxuICBSZWRyYXc6ICdwbG90bHlfcmVkcmF3JyxcbiAgUmVzdHlsZTogJ3Bsb3RseV9yZXN0eWxlJyxcbiAgUmVsYXlvdXQ6ICdwbG90bHlfcmVsYXlvdXQnLFxuICBTZWxlY3Rpbmc6ICdwbG90bHlfc2VsZWN0aW5nJyxcbiAgU2VsZWN0ZWQ6ICdwbG90bHlfc2VsZWN0ZWQnLFxuICBEZXNlbGVjdDogJ3Bsb3RseV9kZXNlbGVjdCcsXG59O1xuXG5jb25zdCBSZXNpemVFdmVudDogc3RyaW5nID0gJ3Jlc2l6ZSc7XG5cbmNvbnN0IFBsb3RseVBhcmFtZXRlciA9IHtcbiAgUGxvdElkOiAncGxvdElkJyxcbiAgUGxvdENsYXNzOiAncGxvdENsYXNzJyxcblxuICBEYXRhOiAnZGF0YScsXG4gIExheW91dDogJ2xheW91dCcsXG4gIENvbmZpZ3VyYXRpb246ICdjb25maWd1cmF0aW9uJyxcbiAgRXZlbnRzOiAnZXZlbnRzJyxcbiAgRnJhbWVzOiAnZnJhbWVzJyxcblxuICBXaWR0aDogJ3dpZHRoJyxcbiAgSGVpZ2h0OiAnaGVpZ2h0Jyxcbn07XG5cbmVudW0gQ2hhbmdlQWN0aW9uIHtcbiAgTm9uZSxcbiAgUmVzdHlsZSxcbiAgUmVsYXlvdXQsXG4gIFJlc2l6ZSxcbiAgVXBkYXRlLFxuICBSZWRyYXcsXG4gIFJlY3JlYXRlLFxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwbG90bHknLFxuICB0ZW1wbGF0ZTogYDxkaXZcbiAgaWQ9XCJ7eyBwbG90SWQgfX1cIlxuICBjbGFzcz1cInt7IHBsb3RDbGFzcyB9fVwiPlxuPC9kaXY+XG5gLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDoge1xuICAgICdbc3R5bGUud2lkdGhdJzogJ1wiMTAwJVwiJyxcbiAgICAnW3N0eWxlLmhlaWdodF0nOiAnXCIxMDAlXCInLFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIFBsb3RseUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVGFnOiBzdHJpbmcgPSAnUGxvdGx5Q29tcG9uZW50JztcblxuICBwcml2YXRlIHRhZzogc3RyaW5nO1xuXG4gIHByaXZhdGUgcmVzaXppbmc6IE5vZGVKUy5UaW1lcjtcbiAgcHJpdmF0ZSByZXNpemVIYW5kbGVyOiBFdmVudExpc3RlbmVyT2JqZWN0O1xuXG4gIHByaXZhdGUgY2hhbmdlQWN0aW9uOiBDaGFuZ2VBY3Rpb247XG5cbiAgcHVibGljIHBsb3QvKjogSFRNTEVsZW1lbnQgKi87XG4gIHB1YmxpYyBhZnRlclBsb3Q6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKSBwcml2YXRlIGRlYnVnOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHByaXZhdGUgb25SZXNpemVUaW1lT3V0OiBudW1iZXIgPSAyMDA7XG5cbiAgQElucHV0KCkgcHVibGljIHBsb3RJZDogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIHB1YmxpYyBwbG90Q2xhc3M6IHN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBkYXRhOiBhbnlbXTtcbiAgQElucHV0KCkgcHVibGljIGxheW91dDogYW55O1xuICBASW5wdXQoKSBwdWJsaWMgY29uZmlndXJhdGlvbjogYW55O1xuICBASW5wdXQoKSBwdWJsaWMgZXZlbnRzOiBhbnk7XG4gIEBJbnB1dCgpIHB1YmxpYyBmcmFtZXM6IGFueVtdO1xuXG4gIEBJbnB1dCgpIHB1YmxpYyB3aWR0aDogbnVtYmVyO1xuICBASW5wdXQoKSBwdWJsaWMgaGVpZ2h0OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICkge1xuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LmNvbnN0cnVjdG9yKClgO1xuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcpO1xuXG4gICAgLy8gV2ViS2l0IGRvdWJsZSByZXNpemUgZXZlbnQgd29ya2Fyb3VuZC5cbiAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NTM0MzYzL3doeS1kb2VzLXRoZS1qcXVlcnktcmVzaXplLWV2ZW50LWZpcmUtdHdpY2VcbiAgICB0aGlzLnJlc2l6ZUhhbmRsZXIgPSAoKCkgPT4ge1xuICAgICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ucmVzaXplSGFuZGxlcigpYDtcbiAgICAgIGlmICh0aGlzLnJlc2l6aW5nKSB7XG4gICAgICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsIGBjbGVhclRpbWVvdXQoJHt0aGlzLnJlc2l6aW5nfSlgKTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzaXppbmcpO1xuICAgICAgfVxuICAgICAgdGhpcy5yZXNpemluZyA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5yZXNpemUoKSwgdGhpcy5vblJlc2l6ZVRpbWVPdXQpO1xuICAgIH0pLmJpbmQodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy50YWcgPSBgJHtQbG90bHlDb21wb25lbnQuVGFnfS4ke3RoaXMucGxvdElkfWA7XG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ubmdPbkluaXQoKWA7XG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZyk7XG4gIH1cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9Lm5nQWZ0ZXJWaWV3SW5pdCgpYDtcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucmVjcmVhdGUoKSk7XG4gIH1cblxuICBwcml2YXRlIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5uZ09uQ2hhbmdlcygpYDtcbiAgICBpZiAoIXRoaXMucGxvdCkge1xuICAgICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2lnbm9yaW5nIGNoYW5nZXMsIHBsb3Qgbm90IHlldCBvbmNlIGluaXRpYWxpemVkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdjaGFuZ2VzOicsIGNoYW5nZXMpO1xuXG4gICAgY29uc3QgY2hhbmdlZEtleXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMoY2hhbmdlcyk7XG5cbiAgICBpZiAoaW5jbHVkZXNBcnIoY2hhbmdlZEtleXMsIFtcbiAgICAgIFBsb3RseVBhcmFtZXRlci5XaWR0aCwgUGxvdGx5UGFyYW1ldGVyLkhlaWdodF0pKSB7XG4gICAgICB0aGlzLmNoYW5nZUFjdGlvbiA9IENoYW5nZUFjdGlvbi5SZXNpemU7XG4gICAgfVxuXG4gICAgaWYgKGluY2x1ZGVzQXJyKGNoYW5nZWRLZXlzLCBbXG4gICAgICBQbG90bHlQYXJhbWV0ZXIuTGF5b3V0LCBQbG90bHlQYXJhbWV0ZXIuUGxvdElkLFxuICAgICAgUGxvdGx5UGFyYW1ldGVyLlBsb3RDbGFzc10pKSB7XG4gICAgICB0aGlzLmNoYW5nZUFjdGlvbiA9IENoYW5nZUFjdGlvbi5SZWxheW91dDtcbiAgICB9XG5cbiAgICBpZiAoaW5jbHVkZXMoY2hhbmdlZEtleXMsIFBsb3RseVBhcmFtZXRlci5EYXRhKSkge1xuICAgICAgdGhpcy5jaGFuZ2VBY3Rpb24gPSBDaGFuZ2VBY3Rpb24uUmVkcmF3O1xuICAgIH1cblxuICAgIGlmIChpbmNsdWRlc0FycihjaGFuZ2VkS2V5cywgW1xuICAgICAgUGxvdGx5UGFyYW1ldGVyLkNvbmZpZ3VyYXRpb24sIFBsb3RseVBhcmFtZXRlci5FdmVudHMsXG4gICAgICBQbG90bHlQYXJhbWV0ZXIuRnJhbWVzXSkpIHtcbiAgICAgIHRoaXMuY2hhbmdlQWN0aW9uID0gQ2hhbmdlQWN0aW9uLlJlY3JlYXRlO1xuICAgIH1cblxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hcHBseUNoYW5nZXMoKSk7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5Q2hhbmdlcygpOiB2b2lkIHtcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5hcHBseUNoYW5nZXMoKWA7XG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ3RoaXMuY2hhbmdlQWN0aW9uOicsIENoYW5nZUFjdGlvblt0aGlzLmNoYW5nZUFjdGlvbl0pO1xuICAgIHN3aXRjaCAodGhpcy5jaGFuZ2VBY3Rpb24pIHtcbiAgICAgIGNhc2UgQ2hhbmdlQWN0aW9uLlJlc2l6ZTpcbiAgICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENoYW5nZUFjdGlvbi5SZWxheW91dDpcbiAgICAgICAgdGhpcy5yZWxheW91dCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ2hhbmdlQWN0aW9uLlJlZHJhdzpcbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENoYW5nZUFjdGlvbi5SZWNyZWF0ZTpcbiAgICAgICAgdGhpcy5yZWNyZWF0ZSgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5jaGFuZ2VBY3Rpb24gPSBDaGFuZ2VBY3Rpb24uTm9uZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZXN0eWxlKHVwZGF0ZTogYW55LCB0cmFjZXM/OiBudW1iZXJbXSk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ucmVzdHlsZSgpYDtcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndXBkYXRlOicsIHVwZGF0ZSk7XG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ3RyYWNlczonLCB0cmFjZXMgPT09IHVuZGVmaW5lZCA/ICdhbGwnIDogdHJhY2VzKTtcbiAgICByZXR1cm4gUGxvdGx5LnJlc3R5bGUodGhpcy5wbG90LCB1cGRhdGUsIHRyYWNlcyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVzaXplKGV2ZW50PzogRXZlbnQpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LnJlc2l6ZSgpYDtcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnZXZlbnQ6JywgZXZlbnQpO1xuICAgIGF3YWl0IFBsb3RseS5QbG90cy5yZXNpemUodGhpcy5wbG90KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZWxheW91dChsYXlvdXQ6IGFueSA9IHRoaXMubGF5b3V0KTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5yZWxheW91dCgpYDtcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnbGF5b3V0OicsIGxheW91dCk7XG4gICAgYXdhaXQgUGxvdGx5LnJlbGF5b3V0KHRoaXMucGxvdCwgbGF5b3V0KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUoZGF0YVVwZGF0ZTogYW55LCBsYXlvdXRVcGRhdGU6IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30udXBkYXRlKClgO1xuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdkYXRhVXBkYXRlOicsIGRhdGFVcGRhdGUpO1xuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdsYXlvdXRVcGRhdGU6JywgbGF5b3V0VXBkYXRlKTtcbiAgICByZXR1cm4gUGxvdGx5LnVwZGF0ZSh0aGlzLnBsb3QsIGRhdGFVcGRhdGUsIGxheW91dFVwZGF0ZSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVkcmF3KCk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ucmVkcmF3KClgO1xuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcpO1xuICAgIHRoaXMucGxvdC5kYXRhID0gdGhpcy5kYXRhO1xuICAgIHRoaXMucGxvdC5sYXlvdXQgPSB0aGlzLmxheW91dDtcbiAgICByZXR1cm4gUGxvdGx5LnJlZHJhdyh0aGlzLnBsb3QpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlY3JlYXRlKCk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ucmVjcmVhdGUoKWA7XG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZyk7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVycygpO1xuXG4gICAgdGhpcy5wbG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5wbG90SWQpO1xuXG4gICAgaWYgKHRoaXMud2lkdGgpIHtcbiAgICAgIHRoaXMucGxvdC5zdHlsZS53aWR0aCA9IHRoaXMud2lkdGggKyAnJSc7XG4gICAgICB0aGlzLnBsb3Quc3R5bGVbJ21hcmdpbi1sZWZ0J10gPSAoMTAwIC0gdGhpcy53aWR0aCkgLyAyICsgJyUnO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmhlaWdodCkge1xuICAgICAgdGhpcy5wbG90LnN0eWxlLmhlaWdodCA9IHRoaXMuaGVpZ2h0ICsgJyUnO1xuICAgICAgdGhpcy5wbG90LnN0eWxlWydtYXJnaW4tdG9wJ10gPSAoMTAwIC0gdGhpcy5oZWlnaHQpIC8gMiArICclJztcbiAgICB9XG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ3RoaXMucGxvdDonLCB0aGlzLnBsb3QpO1xuXG4gICAgLy8gaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ3RoaXMuZGF0YTonLCB0aGlzLmRhdGEpO1xuICAgIC8vIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0aGlzLmxheW91dDonLCB0aGlzLmxheW91dCk7XG4gICAgLy8gaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ3RoaXMuY29uZmlndXJhdGlvbjonLCB0aGlzLmNvbmZpZ3VyYXRpb24pO1xuICAgIC8vIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0aGlzLmZyYW1lczonLCB0aGlzLmZyYW1lcyk7XG4gICAgYXdhaXQgUGxvdGx5Lm5ld1Bsb3QodGhpcy5wbG90LCB7XG4gICAgICBkYXRhOiB0aGlzLmRhdGEsXG4gICAgICBsYXlvdXQ6IHRoaXMubGF5b3V0LFxuICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZ3VyYXRpb24sXG4gICAgICBmcmFtZXM6IHRoaXMuZnJhbWVzLFxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMud2lkdGggfHwgdGhpcy5oZWlnaHQpIHtcbiAgICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdyZXNpemluZycpO1xuICAgICAgYXdhaXQgdGhpcy5yZXNpemUoKTtcbiAgICAgIHRoaXMuYWZ0ZXJQbG90ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLmF0dGFjaEV2ZW50TGlzdGVuZXJzKHRoaXMucGxvdCwgdGhpcy5ldmVudHMpO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcHJpdmF0ZSBhdHRhY2hFdmVudExpc3RlbmVycyhwbG90OiBhbnksIGV2ZW50czogYW55KTogdm9pZCB7XG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30uYXR0YWNoRXZlbnRMaXN0ZW5lcnMoKWA7XG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2V2ZW50czonLCBldmVudHMpO1xuXG4gICAgT2JqZWN0LmtleXMoZXZlbnRzIHx8IHt9KS5mb3JFYWNoKGsgPT4ge1xuICAgICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30uJHtrfSgpYDtcbiAgICAgIHRoaXMucGxvdC5vbihrLCAoZGF0YSwgZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2RhdGE6JywgZGF0YSk7XG4gICAgICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdldmVudDonLCBldmVudCk7XG4gICAgICAgIGV2ZW50c1trXShkYXRhLCBldmVudCwgdGhpcywgUGxvdGx5KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoUmVzaXplRXZlbnQsIHRoaXMucmVzaXplSGFuZGxlcik7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ucmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKWA7XG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZyk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoUmVzaXplRXZlbnQsIHRoaXMucmVzaXplSGFuZGxlcik7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWRkVHJhY2VzKHRyYWNlczogYW55IHwgYW55W10sIGluZGV4PzogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5hZGRUcmFjZXMoKWA7XG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ3RyYWNlczonLCB0cmFjZXMpO1xuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdpbmRleDonLCBpbmRleCk7XG4gICAgcmV0dXJuIFBsb3RseS5hZGRUcmFjZXModGhpcy5wbG90LCB0cmFjZXMsIGluZGV4KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZWxldGVUcmFjZXModHJhY2VzOiBudW1iZXIgfCBudW1iZXJbXSk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30uZGVsZXRlVHJhY2VzKClgO1xuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0cmFjZXM6JywgdHJhY2VzKTtcbiAgICBQbG90bHkuZGVsZXRlVHJhY2VzKHRoaXMucGxvdCwgdHJhY2VzKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhbmltYXRlKHVwZGF0ZTogYW55LCBhbmltYXRpb246IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30uYW5pbWF0ZSgpYDtcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndXBkYXRlOicsIHVwZGF0ZSk7XG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2FuaW1hdGlvbjonLCBhbmltYXRpb24pO1xuICAgIHJldHVybiBQbG90bHkuYW5pbWF0ZSh0aGlzLnBsb3QsIHVwZGF0ZSwgYW5pbWF0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZGRGcmFtZXMoZnJhbWVzOiBhbnlbXSwgaW5kaWNlcz86IG51bWJlcltdKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5hZGRGcmFtZXMoKWA7XG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2ZyYW1lczonLCBmcmFtZXMpO1xuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdpbmRpY2VzOicsIGluZGljZXMpO1xuICAgIHJldHVybiBQbG90bHkuYWRkRnJhbWVzKHRoaXMucGxvdCwgZnJhbWVzLCBpbmRpY2VzKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkZWxldGVGcmFtZXMoaW5kaWNlczogbnVtYmVyW10pOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LmRlbGV0ZUZyYW1lcygpYDtcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnZnJhbWVzOicsIGZyYW1lcyk7XG4gICAgcmV0dXJuIFBsb3RseS5kZWxldGVGcmFtZXModGhpcy5wbG90LCBpbmRpY2VzKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5uZ09uRGVzdHJveSgpYDtcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnKTtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBpbmNsdWRlcyhhcnI6IGFueVtdLCB2YWw6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gYXJyLmluZGV4T2YodmFsKSAhPT0gLTE7XG59XG5cbmZ1bmN0aW9uIGluY2x1ZGVzQXJyKGFycjogYW55W10sIHZhbHM6IGFueVtdKTogYm9vbGVhbiB7XG4gIHJldHVybiB2YWxzLnNvbWUodmFsID0+IGluY2x1ZGVzKGFyciwgdmFsKSk7XG59XG5cbmZ1bmN0aW9uIGNsb25lKHY6IGFueSk6IGFueSB7XG4gIHJldHVybiAhdiA/IHYgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KCh2KSkpO1xufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQbG90bHlDb21wb25lbnQsIFBsb3RseUV2ZW50IH0gZnJvbSAnLi9wbG90bHkvcGxvdGx5LmNvbXBvbmVudCc7XG5cbmV4cG9ydCB7IFBsb3RseUNvbXBvbmVudCwgUGxvdGx5RXZlbnQgfTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGV4cG9ydHM6IFtQbG90bHlDb21wb25lbnRdLFxuICBkZWNsYXJhdGlvbnM6IFtQbG90bHlDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtdLFxufSlcbmV4cG9ydCBjbGFzcyBQbG90bHlNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsidXBkYXRlIiwiUGxvdGx5LnJlc3R5bGUiLCJQbG90bHkuUGxvdHMiLCJQbG90bHkucmVsYXlvdXQiLCJQbG90bHkudXBkYXRlIiwiUGxvdGx5LnJlZHJhdyIsIlBsb3RseS5uZXdQbG90IiwiUGxvdGx5LmFkZFRyYWNlcyIsIlBsb3RseS5kZWxldGVUcmFjZXMiLCJQbG90bHkuYW5pbWF0ZSIsIlBsb3RseS5hZGRGcmFtZXMiLCJQbG90bHkuZGVsZXRlRnJhbWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O3VCQU1hLFdBQVcsR0FBRztJQUN6QixLQUFLLEVBQUUsY0FBYztJQUNyQixPQUFPLEVBQUUsZ0JBQWdCO0lBQ3pCLEtBQUssRUFBRSxjQUFjO0lBQ3JCLFdBQVcsRUFBRSxvQkFBb0I7SUFDakMsZUFBZSxFQUFFLHdCQUF3QjtJQUN6QyxTQUFTLEVBQUUsa0JBQWtCO0lBQzdCLE1BQU0sRUFBRSxlQUFlO0lBQ3ZCLE9BQU8sRUFBRSxnQkFBZ0I7SUFDekIsUUFBUSxFQUFFLGlCQUFpQjtJQUMzQixTQUFTLEVBQUUsa0JBQWtCO0lBQzdCLFFBQVEsRUFBRSxpQkFBaUI7SUFDM0IsUUFBUSxFQUFFLGlCQUFpQjtDQUM1QixDQUFDO0FBRUYsdUJBQU0sV0FBVyxHQUFXLFFBQVEsQ0FBQztBQUVyQyx1QkFBTSxlQUFlLEdBQUc7SUFDdEIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsU0FBUyxFQUFFLFdBQVc7SUFFdEIsSUFBSSxFQUFFLE1BQU07SUFDWixNQUFNLEVBQUUsUUFBUTtJQUNoQixhQUFhLEVBQUUsZUFBZTtJQUM5QixNQUFNLEVBQUUsUUFBUTtJQUNoQixNQUFNLEVBQUUsUUFBUTtJQUVoQixLQUFLLEVBQUUsT0FBTztJQUNkLE1BQU0sRUFBRSxRQUFRO0NBQ2pCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCRjs7OztJQTRCRSxZQUNtQjtRQUFBLE9BQUUsR0FBRixFQUFFO3lCQWxCTyxLQUFLO3FCQUVDLEtBQUs7K0JBQ0ksR0FBRztzQkFFYixFQUFFO3lCQUNDLEVBQUU7UUFjcEMsdUJBQU0sR0FBRyxHQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsZ0JBQWdCLENBQUM7UUFDaEQsSUFBSSxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7OztRQUlqQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUM7WUFDcEIsdUJBQU0sR0FBRyxHQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsa0JBQWtCLENBQUM7WUFDbEQsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNqQixJQUFJLElBQUksQ0FBQyxLQUFLO29CQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLGdCQUFnQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztnQkFDbkUsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM3QjtZQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUN2RSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNmOzs7O0lBRU0sUUFBUTtRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxlQUFlLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNuRCx1QkFBTSxHQUFHLEdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxhQUFhLENBQUM7UUFDN0MsSUFBSSxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7O0lBRzVCLGVBQWU7UUFDcEIsdUJBQU0sR0FBRyxHQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsb0JBQW9CLENBQUM7UUFDcEQsSUFBSSxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakMsVUFBVSxDQUFDLE1BQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Ozs7OztJQUc1QixXQUFXLENBQUMsT0FBc0I7UUFDeEMsdUJBQU0sR0FBRyxHQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsZ0JBQWdCLENBQUM7UUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZCxJQUFJLElBQUksQ0FBQyxLQUFLO2dCQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLGlEQUFpRCxDQUFDLENBQUM7WUFDcEYsT0FBTztTQUNSO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUV0RCx1QkFBTSxXQUFXLEdBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVuRCxJQUFJLFdBQVcsQ0FBQyxXQUFXLEVBQUU7WUFDM0IsZUFBZSxDQUFDLEtBQUssRUFBRSxlQUFlLENBQUMsTUFBTTtTQUFDLENBQUMsRUFBRTtZQUNqRCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUM7U0FDekM7UUFFRCxJQUFJLFdBQVcsQ0FBQyxXQUFXLEVBQUU7WUFDM0IsZUFBZSxDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsTUFBTTtZQUM5QyxlQUFlLENBQUMsU0FBUztTQUFDLENBQUMsRUFBRTtZQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7U0FDM0M7UUFFRCxJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUUsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQy9DLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQztTQUN6QztRQUVELElBQUksV0FBVyxDQUFDLFdBQVcsRUFBRTtZQUMzQixlQUFlLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQyxNQUFNO1lBQ3JELGVBQWUsQ0FBQyxNQUFNO1NBQUMsQ0FBQyxFQUFFO1lBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztTQUMzQztRQUVELFVBQVUsQ0FBQyxNQUFNLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDOzs7OztJQUdoQyxZQUFZO1FBQ2xCLHVCQUFNLEdBQUcsR0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLGlCQUFpQixDQUFDO1FBQ2pELElBQUksSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDeEYsUUFBUSxJQUFJLENBQUMsWUFBWTtZQUN2QixLQUFLLFlBQVksQ0FBQyxNQUFNO2dCQUN0QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2QsTUFBTTtZQUNSLEtBQUssWUFBWSxDQUFDLFFBQVE7Z0JBQ3hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDaEIsTUFBTTtZQUNSLEtBQUssWUFBWSxDQUFDLE1BQU07Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDZCxNQUFNO1lBQ1IsS0FBSyxZQUFZLENBQUMsUUFBUTtnQkFDeEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNoQixNQUFNO1NBQ1Q7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7SUFHM0IsT0FBTyxDQUFDQSxTQUFXLEVBQUUsTUFBaUI7O1lBQ2pELHVCQUFNLEdBQUcsR0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQztZQUM1QyxJQUFJLElBQUksQ0FBQyxLQUFLO2dCQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRUEsU0FBTSxDQUFDLENBQUM7WUFDcEQsSUFBSSxJQUFJLENBQUMsS0FBSztnQkFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLFNBQVMsR0FBRyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUM7WUFDbkYsT0FBT0MsT0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUVELFNBQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzs7Ozs7OztJQUd0QyxNQUFNLENBQUMsS0FBYTs7WUFDL0IsdUJBQU0sR0FBRyxHQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDO1lBQzNDLElBQUksSUFBSSxDQUFDLEtBQUs7Z0JBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xELE1BQU1FLEtBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7O0lBRzFCLFFBQVEsQ0FBQyxTQUFjLElBQUksQ0FBQyxNQUFNOztZQUM3Qyx1QkFBTSxHQUFHLEdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxhQUFhLENBQUM7WUFDN0MsSUFBSSxJQUFJLENBQUMsS0FBSztnQkFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDcEQsTUFBTUMsUUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7O0lBRzlCLE1BQU0sQ0FBQyxVQUFlLEVBQUUsWUFBaUI7O1lBQ3BELHVCQUFNLEdBQUcsR0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQztZQUMzQyxJQUFJLElBQUksQ0FBQyxLQUFLO2dCQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUM1RCxJQUFJLElBQUksQ0FBQyxLQUFLO2dCQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLGVBQWUsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUNoRSxPQUFPQyxNQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7Ozs7OztJQUcvQyxNQUFNOztZQUNqQix1QkFBTSxHQUFHLEdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUM7WUFDM0MsSUFBSSxJQUFJLENBQUMsS0FBSztnQkFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUMvQixPQUFPQyxNQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7SUFHckIsUUFBUTs7WUFDbkIsdUJBQU0sR0FBRyxHQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsYUFBYSxDQUFDO1lBQzdDLElBQUksSUFBSSxDQUFDLEtBQUs7Z0JBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUU1QixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRWpELElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQzthQUMvRDtZQUVELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQzthQUMvRDtZQUNELElBQUksSUFBSSxDQUFDLEtBQUs7Z0JBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7WUFNMUQsTUFBTUMsT0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQzlCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsYUFBYTtnQkFDMUIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2FBQ3BCLENBQUMsQ0FBQztZQUVILElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUM3QixJQUFJLElBQUksQ0FBQyxLQUFLO29CQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUM3QyxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7YUFDdkI7WUFFRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFbEQsT0FBTzs7Ozs7Ozs7SUFHRCxvQkFBb0IsQ0FBQyxJQUFTLEVBQUUsTUFBVztRQUNqRCx1QkFBTSxHQUFHLEdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyx5QkFBeUIsQ0FBQztRQUN6RCxJQUFJLElBQUksQ0FBQyxLQUFLO1lBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXBELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pDLHVCQUFNLEdBQUcsR0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUs7Z0JBQzFCLElBQUksSUFBSSxDQUFDLEtBQUs7b0JBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLElBQUksQ0FBQyxLQUFLO29CQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDbEQsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQ3RDLENBQUMsQ0FBQztTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDOzs7OztJQUdwRCxvQkFBb0I7UUFDekIsdUJBQU0sR0FBRyxHQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcseUJBQXlCLENBQUM7UUFDekQsSUFBSSxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7Ozs7Ozs7SUFHakQsU0FBUyxDQUFDLE1BQW1CLEVBQUUsS0FBYzs7WUFDeEQsdUJBQU0sR0FBRyxHQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsY0FBYyxDQUFDO1lBQzlDLElBQUksSUFBSSxDQUFDLEtBQUs7Z0JBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3BELElBQUksSUFBSSxDQUFDLEtBQUs7Z0JBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xELE9BQU9DLFNBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7SUFHdkMsWUFBWSxDQUFDLE1BQXlCOztZQUNqRCx1QkFBTSxHQUFHLEdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxpQkFBaUIsQ0FBQztZQUNqRCxJQUFJLElBQUksQ0FBQyxLQUFLO2dCQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNwREMsWUFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7OztJQUc1QixPQUFPLENBQUNSLFNBQVcsRUFBRSxTQUFjOztZQUM5Qyx1QkFBTSxHQUFHLEdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxZQUFZLENBQUM7WUFDNUMsSUFBSSxJQUFJLENBQUMsS0FBSztnQkFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUVBLFNBQU0sQ0FBQyxDQUFDO1lBQ3BELElBQUksSUFBSSxDQUFDLEtBQUs7Z0JBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzFELE9BQU9TLE9BQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFVCxTQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7Ozs7Ozs7O0lBR3pDLFNBQVMsQ0FBQyxNQUFhLEVBQUUsT0FBa0I7O1lBQ3RELHVCQUFNLEdBQUcsR0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLGNBQWMsQ0FBQztZQUM5QyxJQUFJLElBQUksQ0FBQyxLQUFLO2dCQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNwRCxJQUFJLElBQUksQ0FBQyxLQUFLO2dCQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN0RCxPQUFPVSxTQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7O0lBR3pDLFlBQVksQ0FBQyxPQUFpQjs7WUFDekMsdUJBQU0sR0FBRyxHQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsaUJBQWlCLENBQUM7WUFDakQsSUFBSSxJQUFJLENBQUMsS0FBSztnQkFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDcEQsT0FBT0MsWUFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7SUFHMUMsV0FBVztRQUNoQix1QkFBTSxHQUFHLEdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQztRQUNoRCxJQUFJLElBQUksQ0FBQyxLQUFLO1lBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzs7O3NCQW5QUSxpQkFBaUI7O1lBZHhELFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsUUFBUTtnQkFDbEIsUUFBUSxFQUFFOzs7O0NBSVg7Z0JBQ0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLElBQUksRUFBRTtvQkFDSixlQUFlLEVBQUUsUUFBUTtvQkFDekIsZ0JBQWdCLEVBQUUsUUFBUTtpQkFDM0I7YUFDRjs7OztZQXpEQyxpQkFBaUI7OztzQkF1RWhCLEtBQUs7Z0NBQ0wsS0FBSzt1QkFFTCxLQUFLOzBCQUNMLEtBQUs7cUJBRUwsS0FBSzt1QkFDTCxLQUFLOzhCQUNMLEtBQUs7dUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3NCQUVMLEtBQUs7dUJBQ0wsS0FBSzs7Ozs7OztBQStOUixrQkFBa0IsR0FBVSxFQUFFLEdBQVE7SUFDcEMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0NBQ2hDOzs7Ozs7QUFFRCxxQkFBcUIsR0FBVSxFQUFFLElBQVc7SUFDMUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7Q0FDN0M7Ozs7OztBQzNURDs7O1lBTUMsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO2dCQUMxQixZQUFZLEVBQUUsQ0FBQyxlQUFlLENBQUM7Z0JBQy9CLFNBQVMsRUFBRSxFQUFFO2FBQ2Q7Ozs7Ozs7Ozs7Ozs7OzsifQ==