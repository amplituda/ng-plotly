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
        this.afterPlot = false;
        this.debug = false;
        this.onResizeTimeOut = 200;
        this.plotId = '';
        this.plotClass = '';
        var /** @type {?} */ tag = this.tag + ".constructor()";
        if (this.debug)
            console.log(tag);
        // WebKit double resize event workaround.
        // https://stackoverflow.com/questions/5534363/why-does-the-jquery-resize-event-fire-twice
        this.resizeHandler = (function () {
            var /** @type {?} */ tag = _this.tag + ".resizeHandler()";
            if (_this.resizing) {
                if (_this.debug)
                    console.log(tag, "clearTimeout(" + _this.resizing + ")");
                clearTimeout(_this.resizing);
            }
            _this.resizing = setTimeout(function () { return _this.resize(); }, _this.onResizeTimeOut);
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
            var tag;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tag = this.tag + ".recreate()";
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
                        return [4 /*yield*/, Plotly.newPlot(this.plot, {
                                data: this.data,
                                layout: this.layout,
                                config: this.configuration,
                                frames: this.frames,
                            })];
                    case 1:
                        // if (this.debug) console.log(tag, 'this.data:', this.data);
                        // if (this.debug) console.log(tag, 'this.layout:', this.layout);
                        // if (this.debug) console.log(tag, 'this.configuration:', this.configuration);
                        // if (this.debug) console.log(tag, 'this.frames:', this.frames);
                        // if (this.debug) console.log(tag, 'this.data:', this.data);
                        // if (this.debug) console.log(tag, 'this.layout:', this.layout);
                        // if (this.debug) console.log(tag, 'this.configuration:', this.configuration);
                        // if (this.debug) console.log(tag, 'this.frames:', this.frames);
                        _a.sent();
                        if (!(this.width || this.height)) return [3 /*break*/, 3];
                        if (this.debug)
                            console.log(tag, 'resizing');
                        return [4 /*yield*/, this.resize()];
                    case 2:
                        _a.sent();
                        this.afterPlot = true;
                        _a.label = 3;
                    case 3:
                        this.attachEventListeners(this.plot, this.events);
                        return [2 /*return*/];
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
                return [2 /*return*/, Plotly.addTraces(this.plot, traces, index)];
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
                Plotly.deleteTraces(this.plot, traces);
                return [2 /*return*/];
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
        { type: ChangeDetectorRef, },
    ]; };
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
    return PlotlyComponent;
}());
export { PlotlyComponent };
function PlotlyComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PlotlyComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PlotlyComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    PlotlyComponent.propDecorators;
    /** @type {?} */
    PlotlyComponent.Tag;
    /** @type {?} */
    PlotlyComponent.prototype.tag;
    /** @type {?} */
    PlotlyComponent.prototype.resizing;
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
    PlotlyComponent.prototype.onResizeTimeOut;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxvdGx5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuLWZ1c2UvbmctcGxvdGx5LyIsInNvdXJjZXMiOlsicGxvdGx5L3Bsb3RseS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLHVCQUF1QixFQUNsQyxpQkFBaUIsRUFBRSxLQUFLLEdBQ3pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sS0FBSyxNQUFNLE1BQU0sV0FBVyxDQUFDO0FBRXBDLE1BQU0sQ0FBQyxxQkFBTSxXQUFXLEdBQUc7SUFDekIsS0FBSyxFQUFFLGNBQWM7SUFDckIsT0FBTyxFQUFFLGdCQUFnQjtJQUN6QixLQUFLLEVBQUUsY0FBYztJQUNyQixXQUFXLEVBQUUsb0JBQW9CO0lBQ2pDLGVBQWUsRUFBRSx3QkFBd0I7SUFDekMsU0FBUyxFQUFFLGtCQUFrQjtJQUM3QixNQUFNLEVBQUUsZUFBZTtJQUN2QixPQUFPLEVBQUUsZ0JBQWdCO0lBQ3pCLFFBQVEsRUFBRSxpQkFBaUI7SUFDM0IsU0FBUyxFQUFFLGtCQUFrQjtJQUM3QixRQUFRLEVBQUUsaUJBQWlCO0lBQzNCLFFBQVEsRUFBRSxpQkFBaUI7Q0FDNUIsQ0FBQztBQUVGLHFCQUFNLFdBQVcsR0FBVyxRQUFRLENBQUM7QUFFckMscUJBQU0sZUFBZSxHQUFHO0lBQ3RCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLFNBQVMsRUFBRSxXQUFXO0lBRXRCLElBQUksRUFBRSxNQUFNO0lBQ1osTUFBTSxFQUFFLFFBQVE7SUFDaEIsYUFBYSxFQUFFLGVBQWU7SUFDOUIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsTUFBTSxFQUFFLFFBQVE7SUFFaEIsS0FBSyxFQUFFLE9BQU87SUFDZCxNQUFNLEVBQUUsUUFBUTtDQUNqQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBcURBLHlCQUNtQjtRQURuQixpQkFnQkM7UUFma0IsT0FBRSxHQUFGLEVBQUU7eUJBbEJPLEtB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LEtBQUs7MkJBRUwsS0FBSzs4QkFDTCxLQUFLO3lCQUVMLEtBQUs7MkJBQ0wsS0FBSztrQ0FDTCxLQUFLOzJCQUNMLEtBQUs7MkJBQ0wsS0FBSzswQkFFTCxLQUFLOzJCQUNMLEtBQUs7OzBCQXRGUjs7U0E0RGEsZUFBZTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlQNUIsa0JBQWtCLEdBQVUsRUFBRSxHQUFRO0lBQ3BDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0NBQ2hDOzs7Ozs7QUFFRCxxQkFBcUIsR0FBVSxFQUFFLElBQVc7SUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFsQixDQUFrQixDQUFDLENBQUM7Q0FDN0M7Ozs7O0FBRUQsZUFBZSxDQUFNO0lBQ25CLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDakQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsIElucHV0LCBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFBsb3RseSBmcm9tICdwbG90bHkuanMnO1xuXG5leHBvcnQgY29uc3QgUGxvdGx5RXZlbnQgPSB7XG4gIEhvdmVyOiAncGxvdGx5X2hvdmVyJyxcbiAgVW5ob3ZlcjogJ3Bsb3RseV91bmhvdmVyJyxcbiAgQ2xpY2s6ICdwbG90bHlfY2xpY2snLFxuICBEb3VibGVDbGljazogJ3Bsb3RseV9kb3VibGVjbGljaycsXG4gIENsaWNrQW5ub3RhdGlvbjogJ3Bsb3RseV9jbGlja2Fubm90YXRpb24nLFxuICBBZnRlclBsb3Q6ICdwbG90bHlfYWZ0ZXJwbG90JyxcbiAgUmVkcmF3OiAncGxvdGx5X3JlZHJhdycsXG4gIFJlc3R5bGU6ICdwbG90bHlfcmVzdHlsZScsXG4gIFJlbGF5b3V0OiAncGxvdGx5X3JlbGF5b3V0JyxcbiAgU2VsZWN0aW5nOiAncGxvdGx5X3NlbGVjdGluZycsXG4gIFNlbGVjdGVkOiAncGxvdGx5X3NlbGVjdGVkJyxcbiAgRGVzZWxlY3Q6ICdwbG90bHlfZGVzZWxlY3QnLFxufTtcblxuY29uc3QgUmVzaXplRXZlbnQ6IHN0cmluZyA9ICdyZXNpemUnO1xuXG5jb25zdCBQbG90bHlQYXJhbWV0ZXIgPSB7XG4gIFBsb3RJZDogJ3Bsb3RJZCcsXG4gIFBsb3RDbGFzczogJ3Bsb3RDbGFzcycsXG5cbiAgRGF0YTogJ2RhdGEnLFxuICBMYXlvdXQ6ICdsYXlvdXQnLFxuICBDb25maWd1cmF0aW9uOiAnY29uZmlndXJhdGlvbicsXG4gIEV2ZW50czogJ2V2ZW50cycsXG4gIEZyYW1lczogJ2ZyYW1lcycsXG5cbiAgV2lkdGg6ICd3aWR0aCcsXG4gIEhlaWdodDogJ2hlaWdodCcsXG59O1xuXG5lbnVtIENoYW5nZUFjdGlvbiB7XG4gIE5vbmUsXG4gIFJlc3R5bGUsXG4gIFJlbGF5b3V0LFxuICBSZXNpemUsXG4gIFVwZGF0ZSxcbiAgUmVkcmF3LFxuICBSZWNyZWF0ZSxcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGxvdGx5JyxcbiAgdGVtcGxhdGU6IGA8ZGl2XG4gIGlkPVwie3sgcGxvdElkIH19XCJcbiAgY2xhc3M9XCJ7eyBwbG90Q2xhc3MgfX1cIj5cbjwvZGl2PlxuYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICAnW3N0eWxlLndpZHRoXSc6ICdcIjEwMCVcIicsXG4gICAgJ1tzdHlsZS5oZWlnaHRdJzogJ1wiMTAwJVwiJyxcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBQbG90bHlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFRhZzogc3RyaW5nID0gJ1Bsb3RseUNvbXBvbmVudCc7XG5cbiAgcHJpdmF0ZSB0YWc6IHN0cmluZztcblxuICBwcml2YXRlIHJlc2l6aW5nOiBOb2RlSlMuVGltZXI7XG4gIHByaXZhdGUgcmVzaXplSGFuZGxlcjogRXZlbnRMaXN0ZW5lck9iamVjdDtcblxuICBwcml2YXRlIGNoYW5nZUFjdGlvbjogQ2hhbmdlQWN0aW9uO1xuXG4gIHB1YmxpYyBwbG90Lyo6IEhUTUxFbGVtZW50ICovO1xuICBwdWJsaWMgYWZ0ZXJQbG90OiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgcHJpdmF0ZSBkZWJ1ZzogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBwcml2YXRlIG9uUmVzaXplVGltZU91dDogbnVtYmVyID0gMjAwO1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBwbG90SWQ6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBwdWJsaWMgcGxvdENsYXNzOiBzdHJpbmcgPSAnJztcblxuICBASW5wdXQoKSBwdWJsaWMgZGF0YTogYW55W107XG4gIEBJbnB1dCgpIHB1YmxpYyBsYXlvdXQ6IGFueTtcbiAgQElucHV0KCkgcHVibGljIGNvbmZpZ3VyYXRpb246IGFueTtcbiAgQElucHV0KCkgcHVibGljIGV2ZW50czogYW55O1xuICBASW5wdXQoKSBwdWJsaWMgZnJhbWVzOiBhbnlbXTtcblxuICBASW5wdXQoKSBwdWJsaWMgd2lkdGg6IG51bWJlcjtcbiAgQElucHV0KCkgcHVibGljIGhlaWdodDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICApIHtcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5jb25zdHJ1Y3RvcigpYDtcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnKTtcblxuICAgIC8vIFdlYktpdCBkb3VibGUgcmVzaXplIGV2ZW50IHdvcmthcm91bmQuXG4gICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTUzNDM2My93aHktZG9lcy10aGUtanF1ZXJ5LXJlc2l6ZS1ldmVudC1maXJlLXR3aWNlXG4gICAgdGhpcy5yZXNpemVIYW5kbGVyID0gKCgpID0+IHtcbiAgICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LnJlc2l6ZUhhbmRsZXIoKWA7XG4gICAgICBpZiAodGhpcy5yZXNpemluZykge1xuICAgICAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCBgY2xlYXJUaW1lb3V0KCR7dGhpcy5yZXNpemluZ30pYCk7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2l6aW5nKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucmVzaXppbmcgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMucmVzaXplKCksIHRoaXMub25SZXNpemVUaW1lT3V0KTtcbiAgICB9KS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMudGFnID0gYCR7UGxvdGx5Q29tcG9uZW50LlRhZ30uJHt0aGlzLnBsb3RJZH1gO1xuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9Lm5nT25Jbml0KClgO1xuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcpO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5uZ0FmdGVyVmlld0luaXQoKWA7XG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlY3JlYXRlKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ubmdPbkNoYW5nZXMoKWA7XG4gICAgaWYgKCF0aGlzLnBsb3QpIHtcbiAgICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdpZ25vcmluZyBjaGFuZ2VzLCBwbG90IG5vdCB5ZXQgb25jZSBpbml0aWFsaXplZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnY2hhbmdlczonLCBjaGFuZ2VzKTtcblxuICAgIGNvbnN0IGNoYW5nZWRLZXlzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKGNoYW5nZXMpO1xuXG4gICAgaWYgKGluY2x1ZGVzQXJyKGNoYW5nZWRLZXlzLCBbXG4gICAgICBQbG90bHlQYXJhbWV0ZXIuV2lkdGgsIFBsb3RseVBhcmFtZXRlci5IZWlnaHRdKSkge1xuICAgICAgdGhpcy5jaGFuZ2VBY3Rpb24gPSBDaGFuZ2VBY3Rpb24uUmVzaXplO1xuICAgIH1cblxuICAgIGlmIChpbmNsdWRlc0FycihjaGFuZ2VkS2V5cywgW1xuICAgICAgUGxvdGx5UGFyYW1ldGVyLkxheW91dCwgUGxvdGx5UGFyYW1ldGVyLlBsb3RJZCxcbiAgICAgIFBsb3RseVBhcmFtZXRlci5QbG90Q2xhc3NdKSkge1xuICAgICAgdGhpcy5jaGFuZ2VBY3Rpb24gPSBDaGFuZ2VBY3Rpb24uUmVsYXlvdXQ7XG4gICAgfVxuXG4gICAgaWYgKGluY2x1ZGVzKGNoYW5nZWRLZXlzLCBQbG90bHlQYXJhbWV0ZXIuRGF0YSkpIHtcbiAgICAgIHRoaXMuY2hhbmdlQWN0aW9uID0gQ2hhbmdlQWN0aW9uLlJlZHJhdztcbiAgICB9XG5cbiAgICBpZiAoaW5jbHVkZXNBcnIoY2hhbmdlZEtleXMsIFtcbiAgICAgIFBsb3RseVBhcmFtZXRlci5Db25maWd1cmF0aW9uLCBQbG90bHlQYXJhbWV0ZXIuRXZlbnRzLFxuICAgICAgUGxvdGx5UGFyYW1ldGVyLkZyYW1lc10pKSB7XG4gICAgICB0aGlzLmNoYW5nZUFjdGlvbiA9IENoYW5nZUFjdGlvbi5SZWNyZWF0ZTtcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYXBwbHlDaGFuZ2VzKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseUNoYW5nZXMoKTogdm9pZCB7XG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30uYXBwbHlDaGFuZ2VzKClgO1xuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0aGlzLmNoYW5nZUFjdGlvbjonLCBDaGFuZ2VBY3Rpb25bdGhpcy5jaGFuZ2VBY3Rpb25dKTtcbiAgICBzd2l0Y2ggKHRoaXMuY2hhbmdlQWN0aW9uKSB7XG4gICAgICBjYXNlIENoYW5nZUFjdGlvbi5SZXNpemU6XG4gICAgICAgIHRoaXMucmVzaXplKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDaGFuZ2VBY3Rpb24uUmVsYXlvdXQ6XG4gICAgICAgIHRoaXMucmVsYXlvdXQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENoYW5nZUFjdGlvbi5SZWRyYXc6XG4gICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDaGFuZ2VBY3Rpb24uUmVjcmVhdGU6XG4gICAgICAgIHRoaXMucmVjcmVhdGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuY2hhbmdlQWN0aW9uID0gQ2hhbmdlQWN0aW9uLk5vbmU7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVzdHlsZSh1cGRhdGU6IGFueSwgdHJhY2VzPzogbnVtYmVyW10pOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LnJlc3R5bGUoKWA7XG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ3VwZGF0ZTonLCB1cGRhdGUpO1xuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0cmFjZXM6JywgdHJhY2VzID09PSB1bmRlZmluZWQgPyAnYWxsJyA6IHRyYWNlcyk7XG4gICAgcmV0dXJuIFBsb3RseS5yZXN0eWxlKHRoaXMucGxvdCwgdXBkYXRlLCB0cmFjZXMpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlc2l6ZShldmVudD86IEV2ZW50KTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5yZXNpemUoKWA7XG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2V2ZW50OicsIGV2ZW50KTtcbiAgICBhd2FpdCBQbG90bHkuUGxvdHMucmVzaXplKHRoaXMucGxvdCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVsYXlvdXQobGF5b3V0OiBhbnkgPSB0aGlzLmxheW91dCk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ucmVsYXlvdXQoKWA7XG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2xheW91dDonLCBsYXlvdXQpO1xuICAgIGF3YWl0IFBsb3RseS5yZWxheW91dCh0aGlzLnBsb3QsIGxheW91dCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlKGRhdGFVcGRhdGU6IGFueSwgbGF5b3V0VXBkYXRlOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LnVwZGF0ZSgpYDtcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnZGF0YVVwZGF0ZTonLCBkYXRhVXBkYXRlKTtcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnbGF5b3V0VXBkYXRlOicsIGxheW91dFVwZGF0ZSk7XG4gICAgcmV0dXJuIFBsb3RseS51cGRhdGUodGhpcy5wbG90LCBkYXRhVXBkYXRlLCBsYXlvdXRVcGRhdGUpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlZHJhdygpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LnJlZHJhdygpYDtcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnKTtcbiAgICB0aGlzLnBsb3QuZGF0YSA9IHRoaXMuZGF0YTtcbiAgICB0aGlzLnBsb3QubGF5b3V0ID0gdGhpcy5sYXlvdXQ7XG4gICAgcmV0dXJuIFBsb3RseS5yZWRyYXcodGhpcy5wbG90KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZWNyZWF0ZSgpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LnJlY3JlYXRlKClgO1xuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcpO1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgIHRoaXMucGxvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMucGxvdElkKTtcblxuICAgIGlmICh0aGlzLndpZHRoKSB7XG4gICAgICB0aGlzLnBsb3Quc3R5bGUud2lkdGggPSB0aGlzLndpZHRoICsgJyUnO1xuICAgICAgdGhpcy5wbG90LnN0eWxlWydtYXJnaW4tbGVmdCddID0gKDEwMCAtIHRoaXMud2lkdGgpIC8gMiArICclJztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oZWlnaHQpIHtcbiAgICAgIHRoaXMucGxvdC5zdHlsZS5oZWlnaHQgPSB0aGlzLmhlaWdodCArICclJztcbiAgICAgIHRoaXMucGxvdC5zdHlsZVsnbWFyZ2luLXRvcCddID0gKDEwMCAtIHRoaXMuaGVpZ2h0KSAvIDIgKyAnJSc7XG4gICAgfVxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0aGlzLnBsb3Q6JywgdGhpcy5wbG90KTtcblxuICAgIC8vIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0aGlzLmRhdGE6JywgdGhpcy5kYXRhKTtcbiAgICAvLyBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndGhpcy5sYXlvdXQ6JywgdGhpcy5sYXlvdXQpO1xuICAgIC8vIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0aGlzLmNvbmZpZ3VyYXRpb246JywgdGhpcy5jb25maWd1cmF0aW9uKTtcbiAgICAvLyBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndGhpcy5mcmFtZXM6JywgdGhpcy5mcmFtZXMpO1xuICAgIGF3YWl0IFBsb3RseS5uZXdQbG90KHRoaXMucGxvdCwge1xuICAgICAgZGF0YTogdGhpcy5kYXRhLFxuICAgICAgbGF5b3V0OiB0aGlzLmxheW91dCxcbiAgICAgIGNvbmZpZzogdGhpcy5jb25maWd1cmF0aW9uLFxuICAgICAgZnJhbWVzOiB0aGlzLmZyYW1lcyxcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLndpZHRoIHx8IHRoaXMuaGVpZ2h0KSB7XG4gICAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAncmVzaXppbmcnKTtcbiAgICAgIGF3YWl0IHRoaXMucmVzaXplKCk7XG4gICAgICB0aGlzLmFmdGVyUGxvdCA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5hdHRhY2hFdmVudExpc3RlbmVycyh0aGlzLnBsb3QsIHRoaXMuZXZlbnRzKTtcblxuICAgIHJldHVybjtcbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoRXZlbnRMaXN0ZW5lcnMocGxvdDogYW55LCBldmVudHM6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LmF0dGFjaEV2ZW50TGlzdGVuZXJzKClgO1xuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdldmVudHM6JywgZXZlbnRzKTtcblxuICAgIE9iamVjdC5rZXlzKGV2ZW50cyB8fCB7fSkuZm9yRWFjaChrID0+IHtcbiAgICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LiR7a30oKWA7XG4gICAgICB0aGlzLnBsb3Qub24oaywgKGRhdGEsIGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdkYXRhOicsIGRhdGEpO1xuICAgICAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnZXZlbnQ6JywgZXZlbnQpO1xuICAgICAgICBldmVudHNba10oZGF0YSwgZXZlbnQsIHRoaXMsIFBsb3RseSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFJlc2l6ZUV2ZW50LCB0aGlzLnJlc2l6ZUhhbmRsZXIpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LnJlbW92ZUV2ZW50TGlzdGVuZXJzKClgO1xuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFJlc2l6ZUV2ZW50LCB0aGlzLnJlc2l6ZUhhbmRsZXIpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFkZFRyYWNlcyh0cmFjZXM6IGFueSB8IGFueVtdLCBpbmRleD86IG51bWJlcik6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30uYWRkVHJhY2VzKClgO1xuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0cmFjZXM6JywgdHJhY2VzKTtcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnaW5kZXg6JywgaW5kZXgpO1xuICAgIHJldHVybiBQbG90bHkuYWRkVHJhY2VzKHRoaXMucGxvdCwgdHJhY2VzLCBpbmRleCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGVsZXRlVHJhY2VzKHRyYWNlczogbnVtYmVyIHwgbnVtYmVyW10pOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LmRlbGV0ZVRyYWNlcygpYDtcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndHJhY2VzOicsIHRyYWNlcyk7XG4gICAgUGxvdGx5LmRlbGV0ZVRyYWNlcyh0aGlzLnBsb3QsIHRyYWNlcyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYW5pbWF0ZSh1cGRhdGU6IGFueSwgYW5pbWF0aW9uOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LmFuaW1hdGUoKWA7XG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ3VwZGF0ZTonLCB1cGRhdGUpO1xuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdhbmltYXRpb246JywgYW5pbWF0aW9uKTtcbiAgICByZXR1cm4gUGxvdGx5LmFuaW1hdGUodGhpcy5wbG90LCB1cGRhdGUsIGFuaW1hdGlvbik7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWRkRnJhbWVzKGZyYW1lczogYW55W10sIGluZGljZXM/OiBudW1iZXJbXSk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30uYWRkRnJhbWVzKClgO1xuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdmcmFtZXM6JywgZnJhbWVzKTtcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnaW5kaWNlczonLCBpbmRpY2VzKTtcbiAgICByZXR1cm4gUGxvdGx5LmFkZEZyYW1lcyh0aGlzLnBsb3QsIGZyYW1lcywgaW5kaWNlcyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGVsZXRlRnJhbWVzKGluZGljZXM6IG51bWJlcltdKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5kZWxldGVGcmFtZXMoKWA7XG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2ZyYW1lczonLCBmcmFtZXMpO1xuICAgIHJldHVybiBQbG90bHkuZGVsZXRlRnJhbWVzKHRoaXMucGxvdCwgaW5kaWNlcyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ubmdPbkRlc3Ryb3koKWA7XG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZyk7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVycygpO1xuICB9XG59XG5cblxuZnVuY3Rpb24gaW5jbHVkZXMoYXJyOiBhbnlbXSwgdmFsOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIGFyci5pbmRleE9mKHZhbCkgIT09IC0xO1xufVxuXG5mdW5jdGlvbiBpbmNsdWRlc0FycihhcnI6IGFueVtdLCB2YWxzOiBhbnlbXSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdmFscy5zb21lKHZhbCA9PiBpbmNsdWRlcyhhcnIsIHZhbCkpO1xufVxuXG5mdW5jdGlvbiBjbG9uZSh2OiBhbnkpOiBhbnkge1xuICByZXR1cm4gIXYgPyB2IDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSgodikpKTtcbn1cbiJdfQ==