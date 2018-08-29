/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, } from '@angular/core';
import * as Plotly from 'plotly.js';
export var /** @type {?} */ PlotlyEvent = {
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
    function (update, traces) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tag;
            return tslib_1.__generator(this, function (_a) {
                tag = this.tag + ".restyle()";
                if (this.debug)
                    console.log(tag, 'update:', update);
                if (this.debug)
                    console.log(tag, 'traces:', traces === undefined ? 'all' : traces);
                return [2 /*return*/, Plotly.restyle(this.plot, update, traces)];
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tag;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tag = this.tag + ".resize()";
                        if (this.debug)
                            console.log(tag, 'event:', event);
                        return [4 /*yield*/, Plotly.Plots.resize(this.plot)];
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tag;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tag = this.tag + ".relayout()";
                        if (this.debug)
                            console.log(tag, 'layout:', layout);
                        return [4 /*yield*/, Plotly.relayout(this.plot, layout)];
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tag;
            return tslib_1.__generator(this, function (_a) {
                tag = this.tag + ".update()";
                if (this.debug)
                    console.log(tag, 'dataUpdate:', dataUpdate);
                if (this.debug)
                    console.log(tag, 'layoutUpdate:', layoutUpdate);
                return [2 /*return*/, Plotly.update(this.plot, dataUpdate, layoutUpdate)];
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tag;
            return tslib_1.__generator(this, function (_a) {
                tag = this.tag + ".redraw()";
                if (this.debug)
                    console.log(tag);
                this.plot.data = this.data;
                this.plot.layout = this.layout;
                return [2 /*return*/, Plotly.redraw(this.plot)];
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tag, resizePlot;
            return tslib_1.__generator(this, function (_a) {
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
                        Plotly.newPlot(this.plot, {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tag;
            return tslib_1.__generator(this, function (_a) {
                tag = this.tag + ".addTraces()";
                if (this.debug)
                    console.log(tag, 'traces:', traces);
                if (this.debug)
                    console.log(tag, 'index:', index);
                return [2 /*return*/, index === undefined ? Plotly.addTraces(this.plot, traces) :
                        Plotly.addTraces(this.plot, traces, index)];
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tag;
            return tslib_1.__generator(this, function (_a) {
                tag = this.tag + ".deleteTraces()";
                if (this.debug)
                    console.log(tag, 'traces:', traces);
                return [2 /*return*/, Plotly.deleteTraces(this.plot, traces)];
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
    function (update, animation) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tag;
            return tslib_1.__generator(this, function (_a) {
                tag = this.tag + ".animate()";
                if (this.debug)
                    console.log(tag, 'update:', update);
                if (this.debug)
                    console.log(tag, 'animation:', animation);
                return [2 /*return*/, Plotly.animate(this.plot, update, animation)];
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tag;
            return tslib_1.__generator(this, function (_a) {
                tag = this.tag + ".addFrames()";
                if (this.debug)
                    console.log(tag, 'frames:', frames);
                if (this.debug)
                    console.log(tag, 'indices:', indices);
                return [2 /*return*/, Plotly.addFrames(this.plot, frames, indices)];
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tag;
            return tslib_1.__generator(this, function (_a) {
                tag = this.tag + ".deleteFrames()";
                if (this.debug)
                    console.log(tag, 'frames:', frames);
                return [2 /*return*/, Plotly.deleteFrames(this.plot, indices)];
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
export { PlotlyComponent };
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
    return vals.some(function (val) { return includes(arr, val); });
}
/**
 * @param {?} v
 * @return {?}
 */
function clone(v) {
    return !v ? v : JSON.parse(JSON.stringify((v)));
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxvdGx5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuLWZ1c2UvbmctcGxvdGx5LyIsInNvdXJjZXMiOlsicGxvdGx5L3Bsb3RseS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLHVCQUF1QixFQUNsQyxpQkFBaUIsRUFBRSxLQUFLLEdBQ3pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sS0FBSyxNQUFNLE1BQU0sV0FBVyxDQUFDO0FBRXBDLE1BQU0sQ0FBQyxxQkFBTSxXQUFXLEdBQUc7SUFDekIsS0FBSyxFQUFFLGNBQWM7SUFDckIsT0FBTyxFQUFFLGdCQUFnQjtJQUN6QixLQUFLLEVBQUUsY0FBYztJQUNyQixXQUFXLEVBQUUsb0JBQW9CO0lBQ2pDLGVBQWUsRUFBRSx3QkFBd0I7SUFDekMsU0FBUyxFQUFFLGtCQUFrQjtJQUM3QixNQUFNLEVBQUUsZUFBZTtJQUN2QixPQUFPLEVBQUUsZ0JBQWdCO0lBQ3pCLFFBQVEsRUFBRSxpQkFBaUI7SUFDM0IsU0FBUyxFQUFFLGtCQUFrQjtJQUM3QixRQUFRLEVBQUUsaUJBQWlCO0lBQzNCLFFBQVEsRUFBRSxpQkFBaUI7Q0FDNUIsQ0FBQztBQUVGLHFCQUFNLFFBQVEsR0FBWSxrQkFBa0IsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQztBQUUvRSxxQkFBTSxXQUFXLEdBQVcsUUFBUSxDQUFDO0FBRXJDLHFCQUFNLGVBQWUsR0FBRztJQUN0QixNQUFNLEVBQUUsUUFBUTtJQUNoQixTQUFTLEVBQUUsV0FBVztJQUV0QixJQUFJLEVBQUUsTUFBTTtJQUNaLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLGFBQWEsRUFBRSxlQUFlO0lBQzlCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE1BQU0sRUFBRSxRQUFRO0lBRWhCLEtBQUssRUFBRSxPQUFPO0lBQ2QsTUFBTSxFQUFFLFFBQVE7Q0FDakIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQW9EQSx5QkFDbUI7UUFEbkIsaUJBcUJDO1FBcEJrQixPQUFFLEdBQUYsRUFBRTs4QkF2QmEsS0FBSzt5QkFNWCxLQUFLO3FCQUVDLEtBQUs7c0JBRU4sRUFBRTt5QkFDQyxFQUFFO1FBY3BDLHFCQUFNLEdBQUcsR0FBYyxJQUFJLENBQUMsR0FBRyxtQkFBZ0IsQ0FBQztRQUNoRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7O1FBSWpDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQztZQUNwQixxQkFBTSxHQUFHLEdBQWMsS0FBSSxDQUFDLEdBQUcscUJBQWtCLENBQUM7WUFDbEQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDYixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztvQkFDeEIsS0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNkLEtBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO2lCQUM3QjtnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztpQkFDNUI7YUFDRjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNmO1NBQ0YsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNmOzs7O0lBRU0sa0NBQVE7Ozs7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFNLGVBQWUsQ0FBQyxHQUFHLFNBQUksSUFBSSxDQUFDLE1BQVEsQ0FBQztRQUNuRCxxQkFBTSxHQUFHLEdBQWMsSUFBSSxDQUFDLEdBQUcsZ0JBQWEsQ0FBQztRQUM3QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7SUFHNUIseUNBQWU7Ozs7O1FBQ3BCLHFCQUFNLEdBQUcsR0FBYyxJQUFJLENBQUMsR0FBRyx1QkFBb0IsQ0FBQztRQUNwRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQyxVQUFVLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxRQUFRLEVBQUUsRUFBZixDQUFlLENBQUMsQ0FBQzs7Ozs7O0lBRzVCLHFDQUFXOzs7O2NBQUMsT0FBc0I7O1FBQ3hDLHFCQUFNLEdBQUcsR0FBYyxJQUFJLENBQUMsR0FBRyxtQkFBZ0IsQ0FBQztRQUNoRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxpREFBaUQsQ0FBQyxDQUFDO1lBQ3BGLE1BQU0sQ0FBQztTQUNSO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUV0RCxxQkFBTSxXQUFXLEdBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVuRCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFO1lBQzNCLGVBQWUsQ0FBQyxLQUFLLEVBQUUsZUFBZSxDQUFDLE1BQU07U0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQztTQUN6QztRQUVELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUU7WUFDM0IsZUFBZSxDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsTUFBTTtZQUM5QyxlQUFlLENBQUMsU0FBUztTQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO1NBQzNDO1FBRUQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQztTQUN6QztRQUVELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUU7WUFDM0IsZUFBZSxDQUFDLGFBQWEsRUFBRSxlQUFlLENBQUMsTUFBTTtZQUNyRCxlQUFlLENBQUMsTUFBTTtTQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO1NBQzNDO1FBRUQsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsWUFBWSxFQUFFLEVBQW5CLENBQW1CLENBQUMsQ0FBQzs7Ozs7SUFHaEMsc0NBQVk7Ozs7UUFDbEIscUJBQU0sR0FBRyxHQUFjLElBQUksQ0FBQyxHQUFHLG9CQUFpQixDQUFDO1FBQ2pELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDeEYsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDMUIsS0FBSyxZQUFZLENBQUMsTUFBTTtnQkFDdEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNkLEtBQUssQ0FBQztZQUNSLEtBQUssWUFBWSxDQUFDLFFBQVE7Z0JBQ3hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDaEIsS0FBSyxDQUFDO1lBQ1IsS0FBSyxZQUFZLENBQUMsTUFBTTtnQkFDdEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNkLEtBQUssQ0FBQztZQUNSLEtBQUssWUFBWSxDQUFDLFFBQVE7Z0JBQ3hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDaEIsS0FBSyxDQUFDO1NBQ1Q7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7SUFHM0IsaUNBQU87Ozs7O2NBQUMsTUFBVyxFQUFFLE1BQWlCOzs7O2dCQUMzQyxHQUFHLEdBQWMsSUFBSSxDQUFDLEdBQUcsZUFBWSxDQUFDO2dCQUM1QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDcEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbkYsc0JBQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBQzs7Ozs7Ozs7SUFHdEMsZ0NBQU07Ozs7Y0FBQyxLQUFhOzs7Ozs7d0JBQ3pCLEdBQUcsR0FBYyxJQUFJLENBQUMsR0FBRyxjQUFXLENBQUM7d0JBQzNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7NEJBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO3dCQUNsRCxxQkFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQUFwQyxTQUFvQyxDQUFDOzs7Ozs7Ozs7O0lBRzFCLGtDQUFROzs7O2NBQUMsTUFBeUI7UUFBekIsdUJBQUEsRUFBQSxTQUFjLElBQUksQ0FBQyxNQUFNOzs7Ozs7d0JBQ3ZDLEdBQUcsR0FBYyxJQUFJLENBQUMsR0FBRyxnQkFBYSxDQUFDO3dCQUM3QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDOzRCQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDcEQscUJBQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFBOzt3QkFBeEMsU0FBd0MsQ0FBQzs7Ozs7Ozs7Ozs7SUFHOUIsZ0NBQU07Ozs7O2NBQUMsVUFBZSxFQUFFLFlBQWlCOzs7O2dCQUM5QyxHQUFHLEdBQWMsSUFBSSxDQUFDLEdBQUcsY0FBVyxDQUFDO2dCQUMzQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDNUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxlQUFlLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ2hFLHNCQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsWUFBWSxDQUFDLEVBQUM7Ozs7Ozs7SUFHL0MsZ0NBQU07Ozs7Ozs7Z0JBQ1gsR0FBRyxHQUFjLElBQUksQ0FBQyxHQUFHLGNBQVcsQ0FBQztnQkFDM0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUMvQixzQkFBTyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQzs7Ozs7OztJQUdyQixrQ0FBUTs7Ozs7Ozs7O3dCQUNiLEdBQUcsR0FBYyxJQUFJLENBQUMsR0FBRyxnQkFBYSxDQUFDO3dCQUM3QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDOzRCQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ2pDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO3dCQUU1QixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUNqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7NEJBQUMsTUFBTSxnQkFBQzt3QkFFdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7NEJBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDOzRCQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQzt5QkFDL0Q7d0JBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7NEJBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQzs0QkFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7eUJBQy9EO3dCQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7NEJBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFPcEQsVUFBVSxHQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUMxRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDOzRCQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsVUFBVSxZQUFBLEVBQUUsQ0FBQyxDQUFDO3dCQUVqRCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7NEJBQ3hCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTs0QkFDZixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07NEJBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsYUFBYTs0QkFDMUIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO3lCQUNwQixDQUFDLENBQUM7d0JBRUgsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzZCQUU5QyxDQUFBLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQSxFQUF6Qix3QkFBeUI7d0JBQzNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7NEJBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7d0JBQzdDLHFCQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBQTs7d0JBQW5CLFNBQW1CLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDOzs7d0JBRXRCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDOzs0QkFHeEIsc0JBQU87Ozs7Ozs7Ozs7SUFHRCw4Q0FBb0I7Ozs7O2NBQUMsSUFBUyxFQUFFLE1BQVc7O1FBQ2pELHFCQUFNLEdBQUcsR0FBYyxJQUFJLENBQUMsR0FBRyw0QkFBeUIsQ0FBQztRQUN6RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXBELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7WUFDakMscUJBQU0sR0FBRyxHQUFjLEtBQUksQ0FBQyxHQUFHLFNBQUksQ0FBQyxPQUFJLENBQUM7WUFDekMsS0FBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLFVBQUMsSUFBSSxFQUFFLEtBQUs7Z0JBQzFCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUM7b0JBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNoRCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDO29CQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDbEQsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQ3RDLENBQUMsQ0FBQztTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDOzs7OztJQUdwRCw4Q0FBb0I7Ozs7UUFDekIscUJBQU0sR0FBRyxHQUFjLElBQUksQ0FBQyxHQUFHLDRCQUF5QixDQUFDO1FBQ3pELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDOzs7Ozs7O0lBR2pELG1DQUFTOzs7OztjQUFDLE1BQW1CLEVBQUUsS0FBYzs7OztnQkFDbEQsR0FBRyxHQUFjLElBQUksQ0FBQyxHQUFHLGlCQUFjLENBQUM7Z0JBQzlDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNwRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDbEQsc0JBQU8sS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQ2hFLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLEVBQUM7Ozs7Ozs7O0lBR2xDLHNDQUFZOzs7O2NBQUMsTUFBeUI7Ozs7Z0JBQzNDLEdBQUcsR0FBYyxJQUFJLENBQUMsR0FBRyxvQkFBaUIsQ0FBQztnQkFDakQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3BELHNCQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsRUFBQzs7Ozs7Ozs7O0lBR25DLGlDQUFPOzs7OztjQUFDLE1BQVcsRUFBRSxTQUFjOzs7O2dCQUN4QyxHQUFHLEdBQWMsSUFBSSxDQUFDLEdBQUcsZUFBWSxDQUFDO2dCQUM1QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDcEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQzFELHNCQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLEVBQUM7Ozs7Ozs7OztJQUd6QyxtQ0FBUzs7Ozs7Y0FBQyxNQUFhLEVBQUUsT0FBa0I7Ozs7Z0JBQ2hELEdBQUcsR0FBYyxJQUFJLENBQUMsR0FBRyxpQkFBYyxDQUFDO2dCQUM5QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDcEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ3RELHNCQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLEVBQUM7Ozs7Ozs7O0lBR3pDLHNDQUFZOzs7O2NBQUMsT0FBaUI7Ozs7Z0JBQ25DLEdBQUcsR0FBYyxJQUFJLENBQUMsR0FBRyxvQkFBaUIsQ0FBQztnQkFDakQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3BELHNCQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsRUFBQzs7Ozs7OztJQUcxQyxxQ0FBVzs7OztRQUNoQixxQkFBTSxHQUFHLEdBQWMsSUFBSSxDQUFDLEdBQUcsbUJBQWdCLENBQUM7UUFDaEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7OzBCQS9QUSxpQkFBaUI7O2dCQWR4RCxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLFFBQVEsRUFBRSxxRUFJWDtvQkFDQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsSUFBSSxFQUFFO3dCQUNKLGVBQWUsRUFBRSxRQUFRO3dCQUN6QixnQkFBZ0IsRUFBRSxRQUFRO3FCQUMzQjtpQkFDRjs7OztnQkEzREMsaUJBQWlCOzs7d0JBeUVoQixLQUFLO3lCQUVMLEtBQUs7NEJBQ0wsS0FBSzt1QkFFTCxLQUFLO3lCQUNMLEtBQUs7Z0NBQ0wsS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7d0JBRUwsS0FBSzt5QkFDTCxLQUFLOzswQkF2RlI7O1NBOERhLGVBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcVE1QixrQkFBa0IsR0FBVSxFQUFFLEdBQVE7SUFDcEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Q0FDaEM7Ozs7OztBQUVELHFCQUFxQixHQUFVLEVBQUUsSUFBVztJQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQztDQUM3Qzs7Ozs7QUFFRCxlQUFlLENBQU07SUFDbkIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNqRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsIElucHV0LCBTaW1wbGVDaGFuZ2VzLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyBQbG90bHkgZnJvbSAncGxvdGx5LmpzJztcclxuXHJcbmV4cG9ydCBjb25zdCBQbG90bHlFdmVudCA9IHtcclxuICBIb3ZlcjogJ3Bsb3RseV9ob3ZlcicsXHJcbiAgVW5ob3ZlcjogJ3Bsb3RseV91bmhvdmVyJyxcclxuICBDbGljazogJ3Bsb3RseV9jbGljaycsXHJcbiAgRG91YmxlQ2xpY2s6ICdwbG90bHlfZG91YmxlY2xpY2snLFxyXG4gIENsaWNrQW5ub3RhdGlvbjogJ3Bsb3RseV9jbGlja2Fubm90YXRpb24nLFxyXG4gIEFmdGVyUGxvdDogJ3Bsb3RseV9hZnRlcnBsb3QnLFxyXG4gIFJlZHJhdzogJ3Bsb3RseV9yZWRyYXcnLFxyXG4gIFJlc3R5bGU6ICdwbG90bHlfcmVzdHlsZScsXHJcbiAgUmVsYXlvdXQ6ICdwbG90bHlfcmVsYXlvdXQnLFxyXG4gIFNlbGVjdGluZzogJ3Bsb3RseV9zZWxlY3RpbmcnLFxyXG4gIFNlbGVjdGVkOiAncGxvdGx5X3NlbGVjdGVkJyxcclxuICBEZXNlbGVjdDogJ3Bsb3RseV9kZXNlbGVjdCcsXHJcbn07XHJcblxyXG5jb25zdCBpc1dlYmtpdDogYm9vbGVhbiA9ICdXZWJraXRBcHBlYXJhbmNlJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XHJcblxyXG5jb25zdCBSZXNpemVFdmVudDogc3RyaW5nID0gJ3Jlc2l6ZSc7XHJcblxyXG5jb25zdCBQbG90bHlQYXJhbWV0ZXIgPSB7XHJcbiAgUGxvdElkOiAncGxvdElkJyxcclxuICBQbG90Q2xhc3M6ICdwbG90Q2xhc3MnLFxyXG5cclxuICBEYXRhOiAnZGF0YScsXHJcbiAgTGF5b3V0OiAnbGF5b3V0JyxcclxuICBDb25maWd1cmF0aW9uOiAnY29uZmlndXJhdGlvbicsXHJcbiAgRXZlbnRzOiAnZXZlbnRzJyxcclxuICBGcmFtZXM6ICdmcmFtZXMnLFxyXG5cclxuICBXaWR0aDogJ3dpZHRoJyxcclxuICBIZWlnaHQ6ICdoZWlnaHQnLFxyXG59O1xyXG5cclxuZW51bSBDaGFuZ2VBY3Rpb24ge1xyXG4gIE5vbmUsXHJcbiAgUmVzdHlsZSxcclxuICBSZWxheW91dCxcclxuICBSZXNpemUsXHJcbiAgVXBkYXRlLFxyXG4gIFJlZHJhdyxcclxuICBSZWNyZWF0ZSxcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdwbG90bHknLFxyXG4gIHRlbXBsYXRlOiBgPGRpdlxyXG4gIGlkPVwie3sgcGxvdElkIH19XCJcclxuICBjbGFzcz1cInt7IHBsb3RDbGFzcyB9fVwiPlxyXG48L2Rpdj5cclxuYCxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBob3N0OiB7XHJcbiAgICAnW3N0eWxlLndpZHRoXSc6ICdcIjEwMCVcIicsXHJcbiAgICAnW3N0eWxlLmhlaWdodF0nOiAnXCIxMDAlXCInLFxyXG4gIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIFBsb3RseUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBUYWc6IHN0cmluZyA9ICdQbG90bHlDb21wb25lbnQnO1xyXG5cclxuICBwcml2YXRlIHRhZzogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIHJlY2VpdmVkUmVzaXplOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSByZXNpemVIYW5kbGVyOiBFdmVudExpc3RlbmVyT2JqZWN0O1xyXG5cclxuICBwcml2YXRlIGNoYW5nZUFjdGlvbjogQ2hhbmdlQWN0aW9uO1xyXG5cclxuICBwdWJsaWMgcGxvdC8qOiBIVE1MRWxlbWVudCAqLztcclxuICBwdWJsaWMgYWZ0ZXJQbG90OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIHByaXZhdGUgZGVidWc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgcHVibGljIHBsb3RJZDogc3RyaW5nID0gJyc7XHJcbiAgQElucHV0KCkgcHVibGljIHBsb3RDbGFzczogc3RyaW5nID0gJyc7XHJcblxyXG4gIEBJbnB1dCgpIHB1YmxpYyBkYXRhOiBhbnlbXTtcclxuICBASW5wdXQoKSBwdWJsaWMgbGF5b3V0OiBhbnk7XHJcbiAgQElucHV0KCkgcHVibGljIGNvbmZpZ3VyYXRpb246IGFueTtcclxuICBASW5wdXQoKSBwdWJsaWMgZXZlbnRzOiBhbnk7XHJcbiAgQElucHV0KCkgcHVibGljIGZyYW1lczogYW55W107XHJcblxyXG4gIEBJbnB1dCgpIHB1YmxpYyB3aWR0aDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBoZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICApIHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LmNvbnN0cnVjdG9yKClgO1xyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZyk7XHJcblxyXG4gICAgLy8gV2ViS2l0IGRvdWJsZSByZXNpemUgZXZlbnQgd29ya2Fyb3VuZC5cclxuICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU1MzQzNjMvd2h5LWRvZXMtdGhlLWpxdWVyeS1yZXNpemUtZXZlbnQtZmlyZS10d2ljZVxyXG4gICAgdGhpcy5yZXNpemVIYW5kbGVyID0gKCgpID0+IHtcclxuICAgICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ucmVzaXplSGFuZGxlcigpYDtcclxuICAgICAgaWYgKGlzV2Via2l0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVjZWl2ZWRSZXNpemUpIHtcclxuICAgICAgICAgIHRoaXMucmVzaXplKCk7XHJcbiAgICAgICAgICB0aGlzLnJlY2VpdmVkUmVzaXplID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMucmVjZWl2ZWRSZXNpemUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnJlc2l6ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KS5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy50YWcgPSBgJHtQbG90bHlDb21wb25lbnQuVGFnfS4ke3RoaXMucGxvdElkfWA7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5uZ09uSW5pdCgpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9Lm5nQWZ0ZXJWaWV3SW5pdCgpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlY3JlYXRlKCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5uZ09uQ2hhbmdlcygpYDtcclxuICAgIGlmICghdGhpcy5wbG90KSB7XHJcbiAgICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdpZ25vcmluZyBjaGFuZ2VzLCBwbG90IG5vdCB5ZXQgb25jZSBpbml0aWFsaXplZCcpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnY2hhbmdlczonLCBjaGFuZ2VzKTtcclxuXHJcbiAgICBjb25zdCBjaGFuZ2VkS2V5czogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhjaGFuZ2VzKTtcclxuXHJcbiAgICBpZiAoaW5jbHVkZXNBcnIoY2hhbmdlZEtleXMsIFtcclxuICAgICAgUGxvdGx5UGFyYW1ldGVyLldpZHRoLCBQbG90bHlQYXJhbWV0ZXIuSGVpZ2h0XSkpIHtcclxuICAgICAgdGhpcy5jaGFuZ2VBY3Rpb24gPSBDaGFuZ2VBY3Rpb24uUmVzaXplO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbmNsdWRlc0FycihjaGFuZ2VkS2V5cywgW1xyXG4gICAgICBQbG90bHlQYXJhbWV0ZXIuTGF5b3V0LCBQbG90bHlQYXJhbWV0ZXIuUGxvdElkLFxyXG4gICAgICBQbG90bHlQYXJhbWV0ZXIuUGxvdENsYXNzXSkpIHtcclxuICAgICAgdGhpcy5jaGFuZ2VBY3Rpb24gPSBDaGFuZ2VBY3Rpb24uUmVsYXlvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGluY2x1ZGVzKGNoYW5nZWRLZXlzLCBQbG90bHlQYXJhbWV0ZXIuRGF0YSkpIHtcclxuICAgICAgdGhpcy5jaGFuZ2VBY3Rpb24gPSBDaGFuZ2VBY3Rpb24uUmVkcmF3O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbmNsdWRlc0FycihjaGFuZ2VkS2V5cywgW1xyXG4gICAgICBQbG90bHlQYXJhbWV0ZXIuQ29uZmlndXJhdGlvbiwgUGxvdGx5UGFyYW1ldGVyLkV2ZW50cyxcclxuICAgICAgUGxvdGx5UGFyYW1ldGVyLkZyYW1lc10pKSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlQWN0aW9uID0gQ2hhbmdlQWN0aW9uLlJlY3JlYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hcHBseUNoYW5nZXMoKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFwcGx5Q2hhbmdlcygpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LmFwcGx5Q2hhbmdlcygpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0aGlzLmNoYW5nZUFjdGlvbjonLCBDaGFuZ2VBY3Rpb25bdGhpcy5jaGFuZ2VBY3Rpb25dKTtcclxuICAgIHN3aXRjaCAodGhpcy5jaGFuZ2VBY3Rpb24pIHtcclxuICAgICAgY2FzZSBDaGFuZ2VBY3Rpb24uUmVzaXplOlxyXG4gICAgICAgIHRoaXMucmVzaXplKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQ2hhbmdlQWN0aW9uLlJlbGF5b3V0OlxyXG4gICAgICAgIHRoaXMucmVsYXlvdXQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBDaGFuZ2VBY3Rpb24uUmVkcmF3OlxyXG4gICAgICAgIHRoaXMucmVkcmF3KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQ2hhbmdlQWN0aW9uLlJlY3JlYXRlOlxyXG4gICAgICAgIHRoaXMucmVjcmVhdGUoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHRoaXMuY2hhbmdlQWN0aW9uID0gQ2hhbmdlQWN0aW9uLk5vbmU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgcmVzdHlsZSh1cGRhdGU6IGFueSwgdHJhY2VzPzogbnVtYmVyW10pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ucmVzdHlsZSgpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd1cGRhdGU6JywgdXBkYXRlKTtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0cmFjZXM6JywgdHJhY2VzID09PSB1bmRlZmluZWQgPyAnYWxsJyA6IHRyYWNlcyk7XHJcbiAgICByZXR1cm4gUGxvdGx5LnJlc3R5bGUodGhpcy5wbG90LCB1cGRhdGUsIHRyYWNlcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgcmVzaXplKGV2ZW50PzogRXZlbnQpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ucmVzaXplKClgO1xyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2V2ZW50OicsIGV2ZW50KTtcclxuICAgIGF3YWl0IFBsb3RseS5QbG90cy5yZXNpemUodGhpcy5wbG90KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyByZWxheW91dChsYXlvdXQ6IGFueSA9IHRoaXMubGF5b3V0KTogUHJvbWlzZTxhbnk+IHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LnJlbGF5b3V0KClgO1xyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2xheW91dDonLCBsYXlvdXQpO1xyXG4gICAgYXdhaXQgUGxvdGx5LnJlbGF5b3V0KHRoaXMucGxvdCwgbGF5b3V0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUoZGF0YVVwZGF0ZTogYW55LCBsYXlvdXRVcGRhdGU6IGFueSk6IFByb21pc2U8YW55PiB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS51cGRhdGUoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnZGF0YVVwZGF0ZTonLCBkYXRhVXBkYXRlKTtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdsYXlvdXRVcGRhdGU6JywgbGF5b3V0VXBkYXRlKTtcclxuICAgIHJldHVybiBQbG90bHkudXBkYXRlKHRoaXMucGxvdCwgZGF0YVVwZGF0ZSwgbGF5b3V0VXBkYXRlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyByZWRyYXcoKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LnJlZHJhdygpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcpO1xyXG4gICAgdGhpcy5wbG90LmRhdGEgPSB0aGlzLmRhdGE7XHJcbiAgICB0aGlzLnBsb3QubGF5b3V0ID0gdGhpcy5sYXlvdXQ7XHJcbiAgICByZXR1cm4gUGxvdGx5LnJlZHJhdyh0aGlzLnBsb3QpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIHJlY3JlYXRlKCk6IFByb21pc2U8YW55PiB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5yZWNyZWF0ZSgpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcpO1xyXG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVycygpO1xyXG5cclxuICAgIHRoaXMucGxvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMucGxvdElkKTtcclxuICAgIGlmICghdGhpcy5wbG90KSByZXR1cm47XHJcblxyXG4gICAgaWYgKHRoaXMud2lkdGgpIHtcclxuICAgICAgdGhpcy5wbG90LnN0eWxlLndpZHRoID0gdGhpcy53aWR0aCArICclJztcclxuICAgICAgdGhpcy5wbG90LnN0eWxlWydtYXJnaW4tbGVmdCddID0gKDEwMCAtIHRoaXMud2lkdGgpIC8gMiArICclJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5oZWlnaHQpIHtcclxuICAgICAgdGhpcy5wbG90LnN0eWxlLmhlaWdodCA9IHRoaXMuaGVpZ2h0ICsgJyUnO1xyXG4gICAgICB0aGlzLnBsb3Quc3R5bGVbJ21hcmdpbi10b3AnXSA9ICgxMDAgLSB0aGlzLmhlaWdodCkgLyAyICsgJyUnO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ3RoaXMucGxvdDonLCB0aGlzLnBsb3QpO1xyXG5cclxuICAgIC8vIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0aGlzLmRhdGE6JywgdGhpcy5kYXRhKTtcclxuICAgIC8vIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0aGlzLmxheW91dDonLCB0aGlzLmxheW91dCk7XHJcbiAgICAvLyBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndGhpcy5jb25maWd1cmF0aW9uOicsIHRoaXMuY29uZmlndXJhdGlvbik7XHJcbiAgICAvLyBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndGhpcy5mcmFtZXM6JywgdGhpcy5mcmFtZXMpO1xyXG5cclxuICAgIGNvbnN0IHJlc2l6ZVBsb3Q6IGJvb2xlYW4gPSAhISh0aGlzLndpZHRoIHx8IHRoaXMuaGVpZ2h0KTtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsIHsgcmVzaXplUGxvdCB9KTtcclxuXHJcbiAgICBQbG90bHkubmV3UGxvdCh0aGlzLnBsb3QsIHtcclxuICAgICAgZGF0YTogdGhpcy5kYXRhLFxyXG4gICAgICBsYXlvdXQ6IHRoaXMubGF5b3V0LFxyXG4gICAgICBjb25maWc6IHRoaXMuY29uZmlndXJhdGlvbixcclxuICAgICAgZnJhbWVzOiB0aGlzLmZyYW1lcyxcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYXR0YWNoRXZlbnRMaXN0ZW5lcnModGhpcy5wbG90LCB0aGlzLmV2ZW50cyk7XHJcblxyXG4gICAgaWYgKHRoaXMud2lkdGggfHwgdGhpcy5oZWlnaHQpIHtcclxuICAgICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ3Jlc2l6aW5nJyk7XHJcbiAgICAgIGF3YWl0IHRoaXMucmVzaXplKCk7XHJcbiAgICAgIHRoaXMuYWZ0ZXJQbG90ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYWZ0ZXJQbG90ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGF0dGFjaEV2ZW50TGlzdGVuZXJzKHBsb3Q6IGFueSwgZXZlbnRzOiBhbnkpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LmF0dGFjaEV2ZW50TGlzdGVuZXJzKClgO1xyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2V2ZW50czonLCBldmVudHMpO1xyXG5cclxuICAgIE9iamVjdC5rZXlzKGV2ZW50cyB8fCB7fSkuZm9yRWFjaChrID0+IHtcclxuICAgICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30uJHtrfSgpYDtcclxuICAgICAgdGhpcy5wbG90Lm9uKGssIChkYXRhLCBldmVudCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdkYXRhOicsIGRhdGEpO1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdldmVudDonLCBldmVudCk7XHJcbiAgICAgICAgZXZlbnRzW2tdKGRhdGEsIGV2ZW50LCB0aGlzLCBQbG90bHkpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFJlc2l6ZUV2ZW50LCB0aGlzLnJlc2l6ZUhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ucmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnKTtcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFJlc2l6ZUV2ZW50LCB0aGlzLnJlc2l6ZUhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGFkZFRyYWNlcyh0cmFjZXM6IGFueSB8IGFueVtdLCBpbmRleD86IG51bWJlcik6IFByb21pc2U8YW55PiB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5hZGRUcmFjZXMoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndHJhY2VzOicsIHRyYWNlcyk7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnaW5kZXg6JywgaW5kZXgpO1xyXG4gICAgcmV0dXJuIGluZGV4ID09PSB1bmRlZmluZWQgPyBQbG90bHkuYWRkVHJhY2VzKHRoaXMucGxvdCwgdHJhY2VzKSA6XHJcbiAgICAgIFBsb3RseS5hZGRUcmFjZXModGhpcy5wbG90LCB0cmFjZXMsIGluZGV4KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBkZWxldGVUcmFjZXModHJhY2VzOiBudW1iZXIgfCBudW1iZXJbXSk6IFByb21pc2U8YW55PiB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5kZWxldGVUcmFjZXMoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndHJhY2VzOicsIHRyYWNlcyk7XHJcbiAgICByZXR1cm4gUGxvdGx5LmRlbGV0ZVRyYWNlcyh0aGlzLnBsb3QsIHRyYWNlcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgYW5pbWF0ZSh1cGRhdGU6IGFueSwgYW5pbWF0aW9uOiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30uYW5pbWF0ZSgpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd1cGRhdGU6JywgdXBkYXRlKTtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdhbmltYXRpb246JywgYW5pbWF0aW9uKTtcclxuICAgIHJldHVybiBQbG90bHkuYW5pbWF0ZSh0aGlzLnBsb3QsIHVwZGF0ZSwgYW5pbWF0aW9uKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBhZGRGcmFtZXMoZnJhbWVzOiBhbnlbXSwgaW5kaWNlcz86IG51bWJlcltdKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LmFkZEZyYW1lcygpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdmcmFtZXM6JywgZnJhbWVzKTtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdpbmRpY2VzOicsIGluZGljZXMpO1xyXG4gICAgcmV0dXJuIFBsb3RseS5hZGRGcmFtZXModGhpcy5wbG90LCBmcmFtZXMsIGluZGljZXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGRlbGV0ZUZyYW1lcyhpbmRpY2VzOiBudW1iZXJbXSk6IFByb21pc2U8YW55PiB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5kZWxldGVGcmFtZXMoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnZnJhbWVzOicsIGZyYW1lcyk7XHJcbiAgICByZXR1cm4gUGxvdGx5LmRlbGV0ZUZyYW1lcyh0aGlzLnBsb3QsIGluZGljZXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ubmdPbkRlc3Ryb3koKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnKTtcclxuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBpbmNsdWRlcyhhcnI6IGFueVtdLCB2YWw6IGFueSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiBhcnIuaW5kZXhPZih2YWwpICE9PSAtMTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5jbHVkZXNBcnIoYXJyOiBhbnlbXSwgdmFsczogYW55W10pOiBib29sZWFuIHtcclxuICByZXR1cm4gdmFscy5zb21lKHZhbCA9PiBpbmNsdWRlcyhhcnIsIHZhbCkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbG9uZSh2OiBhbnkpOiBhbnkge1xyXG4gIHJldHVybiAhdiA/IHYgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KCh2KSkpO1xyXG59XHJcbiJdfQ==