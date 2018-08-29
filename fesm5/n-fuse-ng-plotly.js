import { __awaiter, __generator } from 'tslib';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, NgModule } from '@angular/core';
import * as Plotly from 'plotly.js';
import { restyle, Plots, relayout, update, redraw, newPlot, addTraces, deleteTraces, animate, addFrames, deleteFrames } from 'plotly.js';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ PlotlyEvent = {
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
var /** @type {?} */ isWebkit = 'WebkitAppearance' in document.documentElement.style;
var /** @type {?} */ ResizeEvent = 'resize';
var /** @type {?} */ PlotlyParameter = {
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
var ChangeAction = {
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
var PlotlyComponent = /** @class */ (function () {
    function PlotlyComponent(cd) {
        var _this = this;
        this.cd = cd;
        this.receivedResize = false;
        this.afterPlot = false;
        this.debug = false;
        this.plotId = '';
        this.plotClass = '';
        var /** @type {?} */ tag = this.tag + ".constructor()";
        if (this.debug)
            console.log(tag);
        // WebKit double resize event workaround.
        // https://stackoverflow.com/questions/5534363/why-does-the-jquery-resize-event-fire-twice
        this.resizeHandler = (function () {
            var /** @type {?} */ tag = _this.tag + ".resizeHandler()";
            if (isWebkit) {
                if (_this.receivedResize) {
                    _this.resize();
                    _this.receivedResize = false;
                }
                else {
                    _this.receivedResize = true;
                }
            }
            else {
                _this.resize();
            }
        }).bind(this);
    }
    /**
     * @return {?}
     */
    PlotlyComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.tag = PlotlyComponent.Tag + "." + this.plotId;
        var /** @type {?} */ tag = this.tag + ".ngOnInit()";
        if (this.debug)
            console.log(tag);
    };
    /**
     * @return {?}
     */
    PlotlyComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ tag = this.tag + ".ngAfterViewInit()";
        if (this.debug)
            console.log(tag);
        setTimeout(function () { return _this.recreate(); });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    PlotlyComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        var /** @type {?} */ tag = this.tag + ".ngOnChanges()";
        if (!this.plot) {
            if (this.debug)
                console.log(tag, 'ignoring changes, plot not yet once initialized');
            return;
        }
        if (this.debug)
            console.log(tag, 'changes:', changes);
        var /** @type {?} */ changedKeys = Object.keys(changes);
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
        setTimeout(function () { return _this.applyChanges(); });
    };
    /**
     * @return {?}
     */
    PlotlyComponent.prototype.applyChanges = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ tag = this.tag + ".applyChanges()";
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
    };
    /**
     * @param {?} update
     * @param {?=} traces
     * @return {?}
     */
    PlotlyComponent.prototype.restyle = /**
     * @param {?} update
     * @param {?=} traces
     * @return {?}
     */
    function (update$$1, traces) {
        return __awaiter(this, void 0, void 0, function () {
            var tag;
            return __generator(this, function (_a) {
                tag = this.tag + ".restyle()";
                if (this.debug)
                    console.log(tag, 'update:', update$$1);
                if (this.debug)
                    console.log(tag, 'traces:', traces === undefined ? 'all' : traces);
                return [2 /*return*/, restyle(this.plot, update$$1, traces)];
            });
        });
    };
    /**
     * @param {?=} event
     * @return {?}
     */
    PlotlyComponent.prototype.resize = /**
     * @param {?=} event
     * @return {?}
     */
    function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var tag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tag = this.tag + ".resize()";
                        if (this.debug)
                            console.log(tag, 'event:', event);
                        return [4 /*yield*/, Plots.resize(this.plot)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {?=} layout
     * @return {?}
     */
    PlotlyComponent.prototype.relayout = /**
     * @param {?=} layout
     * @return {?}
     */
    function (layout) {
        if (layout === void 0) { layout = this.layout; }
        return __awaiter(this, void 0, void 0, function () {
            var tag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tag = this.tag + ".relayout()";
                        if (this.debug)
                            console.log(tag, 'layout:', layout);
                        return [4 /*yield*/, relayout(this.plot, layout)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {?} dataUpdate
     * @param {?} layoutUpdate
     * @return {?}
     */
    PlotlyComponent.prototype.update = /**
     * @param {?} dataUpdate
     * @param {?} layoutUpdate
     * @return {?}
     */
    function (dataUpdate, layoutUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var tag;
            return __generator(this, function (_a) {
                tag = this.tag + ".update()";
                if (this.debug)
                    console.log(tag, 'dataUpdate:', dataUpdate);
                if (this.debug)
                    console.log(tag, 'layoutUpdate:', layoutUpdate);
                return [2 /*return*/, update(this.plot, dataUpdate, layoutUpdate)];
            });
        });
    };
    /**
     * @return {?}
     */
    PlotlyComponent.prototype.redraw = /**
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var tag;
            return __generator(this, function (_a) {
                tag = this.tag + ".redraw()";
                if (this.debug)
                    console.log(tag);
                this.plot.data = this.data;
                this.plot.layout = this.layout;
                return [2 /*return*/, redraw(this.plot)];
            });
        });
    };
    /**
     * @return {?}
     */
    PlotlyComponent.prototype.recreate = /**
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var tag, resizePlot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tag = this.tag + ".recreate()";
                        if (this.debug)
                            console.log(tag);
                        this.removeEventListeners();
                        this.plot = document.getElementById(this.plotId);
                        if (!this.plot)
                            return [2 /*return*/];
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
                        resizePlot = !!(this.width || this.height);
                        if (this.debug)
                            console.log(tag, { resizePlot: resizePlot });
                        newPlot(this.plot, {
                            data: this.data,
                            layout: this.layout,
                            config: this.configuration,
                            frames: this.frames,
                        });
                        this.attachEventListeners(this.plot, this.events);
                        if (!(this.width || this.height)) return [3 /*break*/, 2];
                        if (this.debug)
                            console.log(tag, 'resizing');
                        return [4 /*yield*/, this.resize()];
                    case 1:
                        _a.sent();
                        this.afterPlot = true;
                        return [3 /*break*/, 3];
                    case 2:
                        this.afterPlot = true;
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {?} plot
     * @param {?} events
     * @return {?}
     */
    PlotlyComponent.prototype.attachEventListeners = /**
     * @param {?} plot
     * @param {?} events
     * @return {?}
     */
    function (plot, events) {
        var _this = this;
        var /** @type {?} */ tag = this.tag + ".attachEventListeners()";
        if (this.debug)
            console.log(tag, 'events:', events);
        Object.keys(events || {}).forEach(function (k) {
            var /** @type {?} */ tag = _this.tag + "." + k + "()";
            _this.plot.on(k, function (data, event) {
                if (_this.debug)
                    console.log(tag, 'data:', data);
                if (_this.debug)
                    console.log(tag, 'event:', event);
                events[k](data, event, _this, Plotly);
            });
        });
        window.addEventListener(ResizeEvent, this.resizeHandler);
    };
    /**
     * @return {?}
     */
    PlotlyComponent.prototype.removeEventListeners = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ tag = this.tag + ".removeEventListeners()";
        if (this.debug)
            console.log(tag);
        window.removeEventListener(ResizeEvent, this.resizeHandler);
    };
    /**
     * @param {?} traces
     * @param {?=} index
     * @return {?}
     */
    PlotlyComponent.prototype.addTraces = /**
     * @param {?} traces
     * @param {?=} index
     * @return {?}
     */
    function (traces, index) {
        return __awaiter(this, void 0, void 0, function () {
            var tag;
            return __generator(this, function (_a) {
                tag = this.tag + ".addTraces()";
                if (this.debug)
                    console.log(tag, 'traces:', traces);
                if (this.debug)
                    console.log(tag, 'index:', index);
                return [2 /*return*/, index === undefined ? addTraces(this.plot, traces) :
                        addTraces(this.plot, traces, index)];
            });
        });
    };
    /**
     * @param {?} traces
     * @return {?}
     */
    PlotlyComponent.prototype.deleteTraces = /**
     * @param {?} traces
     * @return {?}
     */
    function (traces) {
        return __awaiter(this, void 0, void 0, function () {
            var tag;
            return __generator(this, function (_a) {
                tag = this.tag + ".deleteTraces()";
                if (this.debug)
                    console.log(tag, 'traces:', traces);
                return [2 /*return*/, deleteTraces(this.plot, traces)];
            });
        });
    };
    /**
     * @param {?} update
     * @param {?} animation
     * @return {?}
     */
    PlotlyComponent.prototype.animate = /**
     * @param {?} update
     * @param {?} animation
     * @return {?}
     */
    function (update$$1, animation) {
        return __awaiter(this, void 0, void 0, function () {
            var tag;
            return __generator(this, function (_a) {
                tag = this.tag + ".animate()";
                if (this.debug)
                    console.log(tag, 'update:', update$$1);
                if (this.debug)
                    console.log(tag, 'animation:', animation);
                return [2 /*return*/, animate(this.plot, update$$1, animation)];
            });
        });
    };
    /**
     * @param {?} frames
     * @param {?=} indices
     * @return {?}
     */
    PlotlyComponent.prototype.addFrames = /**
     * @param {?} frames
     * @param {?=} indices
     * @return {?}
     */
    function (frames, indices) {
        return __awaiter(this, void 0, void 0, function () {
            var tag;
            return __generator(this, function (_a) {
                tag = this.tag + ".addFrames()";
                if (this.debug)
                    console.log(tag, 'frames:', frames);
                if (this.debug)
                    console.log(tag, 'indices:', indices);
                return [2 /*return*/, addFrames(this.plot, frames, indices)];
            });
        });
    };
    /**
     * @param {?} indices
     * @return {?}
     */
    PlotlyComponent.prototype.deleteFrames = /**
     * @param {?} indices
     * @return {?}
     */
    function (indices) {
        return __awaiter(this, void 0, void 0, function () {
            var tag;
            return __generator(this, function (_a) {
                tag = this.tag + ".deleteFrames()";
                if (this.debug)
                    console.log(tag, 'frames:', frames);
                return [2 /*return*/, deleteFrames(this.plot, indices)];
            });
        });
    };
    /**
     * @return {?}
     */
    PlotlyComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ tag = this.tag + ".ngOnDestroy()";
        if (this.debug)
            console.log(tag);
        this.removeEventListeners();
    };
    PlotlyComponent.Tag = 'PlotlyComponent';
    PlotlyComponent.decorators = [
        { type: Component, args: [{
                    selector: 'plotly',
                    template: "<div\n  id=\"{{ plotId }}\"\n  class=\"{{ plotClass }}\">\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        '[style.width]': '"100%"',
                        '[style.height]': '"100%"',
                    }
                },] },
    ];
    /** @nocollapse */
    PlotlyComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
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
    return PlotlyComponent;
}());
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
    return vals.some(function (val) { return includes(arr, val); });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PlotlyModule = /** @class */ (function () {
    function PlotlyModule() {
    }
    PlotlyModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [PlotlyComponent],
                    declarations: [PlotlyComponent],
                    providers: [],
                },] },
    ];
    return PlotlyModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { PlotlyModule, PlotlyComponent, PlotlyEvent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibi1mdXNlLW5nLXBsb3RseS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQG4tZnVzZS9uZy1wbG90bHkvcGxvdGx5L3Bsb3RseS5jb21wb25lbnQudHMiLCJuZzovL0BuLWZ1c2UvbmctcGxvdGx5L2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsIElucHV0LCBTaW1wbGVDaGFuZ2VzLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyBQbG90bHkgZnJvbSAncGxvdGx5LmpzJztcclxuXHJcbmV4cG9ydCBjb25zdCBQbG90bHlFdmVudCA9IHtcclxuICBIb3ZlcjogJ3Bsb3RseV9ob3ZlcicsXHJcbiAgVW5ob3ZlcjogJ3Bsb3RseV91bmhvdmVyJyxcclxuICBDbGljazogJ3Bsb3RseV9jbGljaycsXHJcbiAgRG91YmxlQ2xpY2s6ICdwbG90bHlfZG91YmxlY2xpY2snLFxyXG4gIENsaWNrQW5ub3RhdGlvbjogJ3Bsb3RseV9jbGlja2Fubm90YXRpb24nLFxyXG4gIEFmdGVyUGxvdDogJ3Bsb3RseV9hZnRlcnBsb3QnLFxyXG4gIFJlZHJhdzogJ3Bsb3RseV9yZWRyYXcnLFxyXG4gIFJlc3R5bGU6ICdwbG90bHlfcmVzdHlsZScsXHJcbiAgUmVsYXlvdXQ6ICdwbG90bHlfcmVsYXlvdXQnLFxyXG4gIFNlbGVjdGluZzogJ3Bsb3RseV9zZWxlY3RpbmcnLFxyXG4gIFNlbGVjdGVkOiAncGxvdGx5X3NlbGVjdGVkJyxcclxuICBEZXNlbGVjdDogJ3Bsb3RseV9kZXNlbGVjdCcsXHJcbn07XHJcblxyXG5jb25zdCBpc1dlYmtpdDogYm9vbGVhbiA9ICdXZWJraXRBcHBlYXJhbmNlJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XHJcblxyXG5jb25zdCBSZXNpemVFdmVudDogc3RyaW5nID0gJ3Jlc2l6ZSc7XHJcblxyXG5jb25zdCBQbG90bHlQYXJhbWV0ZXIgPSB7XHJcbiAgUGxvdElkOiAncGxvdElkJyxcclxuICBQbG90Q2xhc3M6ICdwbG90Q2xhc3MnLFxyXG5cclxuICBEYXRhOiAnZGF0YScsXHJcbiAgTGF5b3V0OiAnbGF5b3V0JyxcclxuICBDb25maWd1cmF0aW9uOiAnY29uZmlndXJhdGlvbicsXHJcbiAgRXZlbnRzOiAnZXZlbnRzJyxcclxuICBGcmFtZXM6ICdmcmFtZXMnLFxyXG5cclxuICBXaWR0aDogJ3dpZHRoJyxcclxuICBIZWlnaHQ6ICdoZWlnaHQnLFxyXG59O1xyXG5cclxuZW51bSBDaGFuZ2VBY3Rpb24ge1xyXG4gIE5vbmUsXHJcbiAgUmVzdHlsZSxcclxuICBSZWxheW91dCxcclxuICBSZXNpemUsXHJcbiAgVXBkYXRlLFxyXG4gIFJlZHJhdyxcclxuICBSZWNyZWF0ZSxcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdwbG90bHknLFxyXG4gIHRlbXBsYXRlOiBgPGRpdlxyXG4gIGlkPVwie3sgcGxvdElkIH19XCJcclxuICBjbGFzcz1cInt7IHBsb3RDbGFzcyB9fVwiPlxyXG48L2Rpdj5cclxuYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBob3N0OiB7XHJcbiAgICAnW3N0eWxlLndpZHRoXSc6ICdcIjEwMCVcIicsXHJcbiAgICAnW3N0eWxlLmhlaWdodF0nOiAnXCIxMDAlXCInLFxyXG4gIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIFBsb3RseUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBUYWc6IHN0cmluZyA9ICdQbG90bHlDb21wb25lbnQnO1xyXG5cclxuICBwcml2YXRlIHRhZzogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIHJlY2VpdmVkUmVzaXplOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSByZXNpemVIYW5kbGVyOiBFdmVudExpc3RlbmVyT2JqZWN0O1xyXG5cclxuICBwcml2YXRlIGNoYW5nZUFjdGlvbjogQ2hhbmdlQWN0aW9uO1xyXG5cclxuICBwdWJsaWMgcGxvdC8qOiBIVE1MRWxlbWVudCAqLztcclxuICBwdWJsaWMgYWZ0ZXJQbG90OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIHByaXZhdGUgZGVidWc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgcHVibGljIHBsb3RJZDogc3RyaW5nID0gJyc7XHJcbiAgQElucHV0KCkgcHVibGljIHBsb3RDbGFzczogc3RyaW5nID0gJyc7XHJcblxyXG4gIEBJbnB1dCgpIHB1YmxpYyBkYXRhOiBhbnlbXTtcclxuICBASW5wdXQoKSBwdWJsaWMgbGF5b3V0OiBhbnk7XHJcbiAgQElucHV0KCkgcHVibGljIGNvbmZpZ3VyYXRpb246IGFueTtcclxuICBASW5wdXQoKSBwdWJsaWMgZXZlbnRzOiBhbnk7XHJcbiAgQElucHV0KCkgcHVibGljIGZyYW1lczogYW55W107XHJcblxyXG4gIEBJbnB1dCgpIHB1YmxpYyB3aWR0aDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBoZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICApIHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LmNvbnN0cnVjdG9yKClgO1xyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZyk7XHJcblxyXG4gICAgLy8gV2ViS2l0IGRvdWJsZSByZXNpemUgZXZlbnQgd29ya2Fyb3VuZC5cclxuICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU1MzQzNjMvd2h5LWRvZXMtdGhlLWpxdWVyeS1yZXNpemUtZXZlbnQtZmlyZS10d2ljZVxyXG4gICAgdGhpcy5yZXNpemVIYW5kbGVyID0gKCgpID0+IHtcclxuICAgICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ucmVzaXplSGFuZGxlcigpYDtcclxuICAgICAgaWYgKGlzV2Via2l0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVjZWl2ZWRSZXNpemUpIHtcclxuICAgICAgICAgIHRoaXMucmVzaXplKCk7XHJcbiAgICAgICAgICB0aGlzLnJlY2VpdmVkUmVzaXplID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMucmVjZWl2ZWRSZXNpemUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnJlc2l6ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KS5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy50YWcgPSBgJHtQbG90bHlDb21wb25lbnQuVGFnfS4ke3RoaXMucGxvdElkfWA7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5uZ09uSW5pdCgpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9Lm5nQWZ0ZXJWaWV3SW5pdCgpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlY3JlYXRlKCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5uZ09uQ2hhbmdlcygpYDtcclxuICAgIGlmICghdGhpcy5wbG90KSB7XHJcbiAgICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdpZ25vcmluZyBjaGFuZ2VzLCBwbG90IG5vdCB5ZXQgb25jZSBpbml0aWFsaXplZCcpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnY2hhbmdlczonLCBjaGFuZ2VzKTtcclxuXHJcbiAgICBjb25zdCBjaGFuZ2VkS2V5czogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhjaGFuZ2VzKTtcclxuXHJcbiAgICBpZiAoaW5jbHVkZXNBcnIoY2hhbmdlZEtleXMsIFtcclxuICAgICAgUGxvdGx5UGFyYW1ldGVyLldpZHRoLCBQbG90bHlQYXJhbWV0ZXIuSGVpZ2h0XSkpIHtcclxuICAgICAgdGhpcy5jaGFuZ2VBY3Rpb24gPSBDaGFuZ2VBY3Rpb24uUmVzaXplO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbmNsdWRlc0FycihjaGFuZ2VkS2V5cywgW1xyXG4gICAgICBQbG90bHlQYXJhbWV0ZXIuTGF5b3V0LCBQbG90bHlQYXJhbWV0ZXIuUGxvdElkLFxyXG4gICAgICBQbG90bHlQYXJhbWV0ZXIuUGxvdENsYXNzXSkpIHtcclxuICAgICAgdGhpcy5jaGFuZ2VBY3Rpb24gPSBDaGFuZ2VBY3Rpb24uUmVsYXlvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGluY2x1ZGVzKGNoYW5nZWRLZXlzLCBQbG90bHlQYXJhbWV0ZXIuRGF0YSkpIHtcclxuICAgICAgdGhpcy5jaGFuZ2VBY3Rpb24gPSBDaGFuZ2VBY3Rpb24uUmVkcmF3O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbmNsdWRlc0FycihjaGFuZ2VkS2V5cywgW1xyXG4gICAgICBQbG90bHlQYXJhbWV0ZXIuQ29uZmlndXJhdGlvbiwgUGxvdGx5UGFyYW1ldGVyLkV2ZW50cyxcclxuICAgICAgUGxvdGx5UGFyYW1ldGVyLkZyYW1lc10pKSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlQWN0aW9uID0gQ2hhbmdlQWN0aW9uLlJlY3JlYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hcHBseUNoYW5nZXMoKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFwcGx5Q2hhbmdlcygpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LmFwcGx5Q2hhbmdlcygpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0aGlzLmNoYW5nZUFjdGlvbjonLCBDaGFuZ2VBY3Rpb25bdGhpcy5jaGFuZ2VBY3Rpb25dKTtcclxuICAgIHN3aXRjaCAodGhpcy5jaGFuZ2VBY3Rpb24pIHtcclxuICAgICAgY2FzZSBDaGFuZ2VBY3Rpb24uUmVzaXplOlxyXG4gICAgICAgIHRoaXMucmVzaXplKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQ2hhbmdlQWN0aW9uLlJlbGF5b3V0OlxyXG4gICAgICAgIHRoaXMucmVsYXlvdXQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBDaGFuZ2VBY3Rpb24uUmVkcmF3OlxyXG4gICAgICAgIHRoaXMucmVkcmF3KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQ2hhbmdlQWN0aW9uLlJlY3JlYXRlOlxyXG4gICAgICAgIHRoaXMucmVjcmVhdGUoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHRoaXMuY2hhbmdlQWN0aW9uID0gQ2hhbmdlQWN0aW9uLk5vbmU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgcmVzdHlsZSh1cGRhdGU6IGFueSwgdHJhY2VzPzogbnVtYmVyW10pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ucmVzdHlsZSgpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd1cGRhdGU6JywgdXBkYXRlKTtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0cmFjZXM6JywgdHJhY2VzID09PSB1bmRlZmluZWQgPyAnYWxsJyA6IHRyYWNlcyk7XHJcbiAgICByZXR1cm4gUGxvdGx5LnJlc3R5bGUodGhpcy5wbG90LCB1cGRhdGUsIHRyYWNlcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgcmVzaXplKGV2ZW50PzogRXZlbnQpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ucmVzaXplKClgO1xyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2V2ZW50OicsIGV2ZW50KTtcclxuICAgIGF3YWl0IFBsb3RseS5QbG90cy5yZXNpemUodGhpcy5wbG90KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyByZWxheW91dChsYXlvdXQ6IGFueSA9IHRoaXMubGF5b3V0KTogUHJvbWlzZTxhbnk+IHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LnJlbGF5b3V0KClgO1xyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2xheW91dDonLCBsYXlvdXQpO1xyXG4gICAgYXdhaXQgUGxvdGx5LnJlbGF5b3V0KHRoaXMucGxvdCwgbGF5b3V0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUoZGF0YVVwZGF0ZTogYW55LCBsYXlvdXRVcGRhdGU6IGFueSk6IFByb21pc2U8YW55PiB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS51cGRhdGUoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnZGF0YVVwZGF0ZTonLCBkYXRhVXBkYXRlKTtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdsYXlvdXRVcGRhdGU6JywgbGF5b3V0VXBkYXRlKTtcclxuICAgIHJldHVybiBQbG90bHkudXBkYXRlKHRoaXMucGxvdCwgZGF0YVVwZGF0ZSwgbGF5b3V0VXBkYXRlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyByZWRyYXcoKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LnJlZHJhdygpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcpO1xyXG4gICAgdGhpcy5wbG90LmRhdGEgPSB0aGlzLmRhdGE7XHJcbiAgICB0aGlzLnBsb3QubGF5b3V0ID0gdGhpcy5sYXlvdXQ7XHJcbiAgICByZXR1cm4gUGxvdGx5LnJlZHJhdyh0aGlzLnBsb3QpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIHJlY3JlYXRlKCk6IFByb21pc2U8YW55PiB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5yZWNyZWF0ZSgpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcpO1xyXG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVycygpO1xyXG5cclxuICAgIHRoaXMucGxvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMucGxvdElkKTtcclxuICAgIGlmICghdGhpcy5wbG90KSByZXR1cm47XHJcblxyXG4gICAgaWYgKHRoaXMud2lkdGgpIHtcclxuICAgICAgdGhpcy5wbG90LnN0eWxlLndpZHRoID0gdGhpcy53aWR0aCArICclJztcclxuICAgICAgdGhpcy5wbG90LnN0eWxlWydtYXJnaW4tbGVmdCddID0gKDEwMCAtIHRoaXMud2lkdGgpIC8gMiArICclJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5oZWlnaHQpIHtcclxuICAgICAgdGhpcy5wbG90LnN0eWxlLmhlaWdodCA9IHRoaXMuaGVpZ2h0ICsgJyUnO1xyXG4gICAgICB0aGlzLnBsb3Quc3R5bGVbJ21hcmdpbi10b3AnXSA9ICgxMDAgLSB0aGlzLmhlaWdodCkgLyAyICsgJyUnO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ3RoaXMucGxvdDonLCB0aGlzLnBsb3QpO1xyXG5cclxuICAgIC8vIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0aGlzLmRhdGE6JywgdGhpcy5kYXRhKTtcclxuICAgIC8vIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0aGlzLmxheW91dDonLCB0aGlzLmxheW91dCk7XHJcbiAgICAvLyBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndGhpcy5jb25maWd1cmF0aW9uOicsIHRoaXMuY29uZmlndXJhdGlvbik7XHJcbiAgICAvLyBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndGhpcy5mcmFtZXM6JywgdGhpcy5mcmFtZXMpO1xyXG5cclxuICAgIGNvbnN0IHJlc2l6ZVBsb3Q6IGJvb2xlYW4gPSAhISh0aGlzLndpZHRoIHx8IHRoaXMuaGVpZ2h0KTtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsIHsgcmVzaXplUGxvdCB9KTtcclxuXHJcbiAgICBQbG90bHkubmV3UGxvdCh0aGlzLnBsb3QsIHtcclxuICAgICAgZGF0YTogdGhpcy5kYXRhLFxyXG4gICAgICBsYXlvdXQ6IHRoaXMubGF5b3V0LFxyXG4gICAgICBjb25maWc6IHRoaXMuY29uZmlndXJhdGlvbixcclxuICAgICAgZnJhbWVzOiB0aGlzLmZyYW1lcyxcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYXR0YWNoRXZlbnRMaXN0ZW5lcnModGhpcy5wbG90LCB0aGlzLmV2ZW50cyk7XHJcblxyXG4gICAgaWYgKHRoaXMud2lkdGggfHwgdGhpcy5oZWlnaHQpIHtcclxuICAgICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ3Jlc2l6aW5nJyk7XHJcbiAgICAgIGF3YWl0IHRoaXMucmVzaXplKCk7XHJcbiAgICAgIHRoaXMuYWZ0ZXJQbG90ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYWZ0ZXJQbG90ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGF0dGFjaEV2ZW50TGlzdGVuZXJzKHBsb3Q6IGFueSwgZXZlbnRzOiBhbnkpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LmF0dGFjaEV2ZW50TGlzdGVuZXJzKClgO1xyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2V2ZW50czonLCBldmVudHMpO1xyXG5cclxuICAgIE9iamVjdC5rZXlzKGV2ZW50cyB8fCB7fSkuZm9yRWFjaChrID0+IHtcclxuICAgICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30uJHtrfSgpYDtcclxuICAgICAgdGhpcy5wbG90Lm9uKGssIChkYXRhLCBldmVudCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdkYXRhOicsIGRhdGEpO1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdldmVudDonLCBldmVudCk7XHJcbiAgICAgICAgZXZlbnRzW2tdKGRhdGEsIGV2ZW50LCB0aGlzLCBQbG90bHkpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFJlc2l6ZUV2ZW50LCB0aGlzLnJlc2l6ZUhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ucmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnKTtcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFJlc2l6ZUV2ZW50LCB0aGlzLnJlc2l6ZUhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGFkZFRyYWNlcyh0cmFjZXM6IGFueSB8IGFueVtdLCBpbmRleD86IG51bWJlcik6IFByb21pc2U8YW55PiB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5hZGRUcmFjZXMoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndHJhY2VzOicsIHRyYWNlcyk7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnaW5kZXg6JywgaW5kZXgpO1xyXG4gICAgcmV0dXJuIGluZGV4ID09PSB1bmRlZmluZWQgPyBQbG90bHkuYWRkVHJhY2VzKHRoaXMucGxvdCwgdHJhY2VzKSA6XHJcbiAgICAgIFBsb3RseS5hZGRUcmFjZXModGhpcy5wbG90LCB0cmFjZXMsIGluZGV4KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBkZWxldGVUcmFjZXModHJhY2VzOiBudW1iZXIgfCBudW1iZXJbXSk6IFByb21pc2U8YW55PiB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5kZWxldGVUcmFjZXMoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndHJhY2VzOicsIHRyYWNlcyk7XHJcbiAgICByZXR1cm4gUGxvdGx5LmRlbGV0ZVRyYWNlcyh0aGlzLnBsb3QsIHRyYWNlcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgYW5pbWF0ZSh1cGRhdGU6IGFueSwgYW5pbWF0aW9uOiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30uYW5pbWF0ZSgpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd1cGRhdGU6JywgdXBkYXRlKTtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdhbmltYXRpb246JywgYW5pbWF0aW9uKTtcclxuICAgIHJldHVybiBQbG90bHkuYW5pbWF0ZSh0aGlzLnBsb3QsIHVwZGF0ZSwgYW5pbWF0aW9uKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBhZGRGcmFtZXMoZnJhbWVzOiBhbnlbXSwgaW5kaWNlcz86IG51bWJlcltdKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LmFkZEZyYW1lcygpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdmcmFtZXM6JywgZnJhbWVzKTtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdpbmRpY2VzOicsIGluZGljZXMpO1xyXG4gICAgcmV0dXJuIFBsb3RseS5hZGRGcmFtZXModGhpcy5wbG90LCBmcmFtZXMsIGluZGljZXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGRlbGV0ZUZyYW1lcyhpbmRpY2VzOiBudW1iZXJbXSk6IFByb21pc2U8YW55PiB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5kZWxldGVGcmFtZXMoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnZnJhbWVzOicsIGZyYW1lcyk7XHJcbiAgICByZXR1cm4gUGxvdGx5LmRlbGV0ZUZyYW1lcyh0aGlzLnBsb3QsIGluZGljZXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ubmdPbkRlc3Ryb3koKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnKTtcclxuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBpbmNsdWRlcyhhcnI6IGFueVtdLCB2YWw6IGFueSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiBhcnIuaW5kZXhPZih2YWwpICE9PSAtMTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5jbHVkZXNBcnIoYXJyOiBhbnlbXSwgdmFsczogYW55W10pOiBib29sZWFuIHtcclxuICByZXR1cm4gdmFscy5zb21lKHZhbCA9PiBpbmNsdWRlcyhhcnIsIHZhbCkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbG9uZSh2OiBhbnkpOiBhbnkge1xyXG4gIHJldHVybiAhdiA/IHYgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KCh2KSkpO1xyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFBsb3RseUNvbXBvbmVudCwgUGxvdGx5RXZlbnQgfSBmcm9tICcuL3Bsb3RseS9wbG90bHkuY29tcG9uZW50JztcclxuXHJcbmV4cG9ydCB7IFBsb3RseUNvbXBvbmVudCwgUGxvdGx5RXZlbnQgfTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgZXhwb3J0czogW1Bsb3RseUNvbXBvbmVudF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbUGxvdGx5Q29tcG9uZW50XSxcclxuICBwcm92aWRlcnM6IFtdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGxvdGx5TW9kdWxlIHsgfVxyXG4iXSwibmFtZXMiOlsidXBkYXRlIiwiUGxvdGx5LnJlc3R5bGUiLCJQbG90bHkuUGxvdHMiLCJQbG90bHkucmVsYXlvdXQiLCJQbG90bHkudXBkYXRlIiwiUGxvdGx5LnJlZHJhdyIsIlBsb3RseS5uZXdQbG90IiwiUGxvdGx5LmFkZFRyYWNlcyIsIlBsb3RseS5kZWxldGVUcmFjZXMiLCJQbG90bHkuYW5pbWF0ZSIsIlBsb3RseS5hZGRGcmFtZXMiLCJQbG90bHkuZGVsZXRlRnJhbWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O3FCQU1hLFdBQVcsR0FBRztJQUN6QixLQUFLLEVBQUUsY0FBYztJQUNyQixPQUFPLEVBQUUsZ0JBQWdCO0lBQ3pCLEtBQUssRUFBRSxjQUFjO0lBQ3JCLFdBQVcsRUFBRSxvQkFBb0I7SUFDakMsZUFBZSxFQUFFLHdCQUF3QjtJQUN6QyxTQUFTLEVBQUUsa0JBQWtCO0lBQzdCLE1BQU0sRUFBRSxlQUFlO0lBQ3ZCLE9BQU8sRUFBRSxnQkFBZ0I7SUFDekIsUUFBUSxFQUFFLGlCQUFpQjtJQUMzQixTQUFTLEVBQUUsa0JBQWtCO0lBQzdCLFFBQVEsRUFBRSxpQkFBaUI7SUFDM0IsUUFBUSxFQUFFLGlCQUFpQjtDQUM1QixDQUFDO0FBRUYscUJBQU0sUUFBUSxHQUFZLGtCQUFrQixJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO0FBRS9FLHFCQUFNLFdBQVcsR0FBVyxRQUFRLENBQUM7QUFFckMscUJBQU0sZUFBZSxHQUFHO0lBQ3RCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLFNBQVMsRUFBRSxXQUFXO0lBRXRCLElBQUksRUFBRSxNQUFNO0lBQ1osTUFBTSxFQUFFLFFBQVE7SUFDaEIsYUFBYSxFQUFFLGVBQWU7SUFDOUIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsTUFBTSxFQUFFLFFBQVE7SUFFaEIsS0FBSyxFQUFFLE9BQU87SUFDZCxNQUFNLEVBQUUsUUFBUTtDQUNqQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBb0RBLHlCQUNtQjtRQURuQixpQkFxQkM7UUFwQmtCLE9BQUUsR0FBRixFQUFFOzhCQXZCYSxLQUFLO3lCQU1YLEtBQUs7cUJBRUMsS0FBSztzQkFFTixFQUFFO3lCQUNDLEVBQUU7UUFjcEMscUJBQU0sR0FBRyxHQUFjLElBQUksQ0FBQyxHQUFHLG1CQUFnQixDQUFDO1FBQ2hELElBQUksSUFBSSxDQUFDLEtB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