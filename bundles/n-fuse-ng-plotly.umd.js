(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('plotly.js'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@n-fuse/ng-plotly', ['exports', '@angular/core', 'plotly.js', '@angular/common'], factory) :
    (factory((global.nfLib = {}),global.ng.core,null,global.ng.common));
}(this, (function (exports,core,Plotly,common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [0, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

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
    var PlotlyComponent = (function () {
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
                return __awaiter(this, void 0, void 0, function () {
                    var tag;
                    return __generator(this, function (_a) {
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
                return __awaiter(this, void 0, void 0, function () {
                    var tag;
                    return __generator(this, function (_a) {
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
                if (layout === void 0) {
                    layout = this.layout;
                }
                return __awaiter(this, void 0, void 0, function () {
                    var tag;
                    return __generator(this, function (_a) {
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
                return __awaiter(this, void 0, void 0, function () {
                    var tag;
                    return __generator(this, function (_a) {
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
                return __awaiter(this, void 0, void 0, function () {
                    var tag;
                    return __generator(this, function (_a) {
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
                                Plotly.newPlot(this.plot, {
                                    data: this.data,
                                    layout: this.layout,
                                    config: this.configuration,
                                    frames: this.frames,
                                });
                                this.attachEventListeners(this.plot, this.events);
                                if (!(this.width || this.height))
                                    return [3 /*break*/, 2];
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
                return __awaiter(this, void 0, void 0, function () {
                    var tag;
                    return __generator(this, function (_a) {
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
                return __awaiter(this, void 0, void 0, function () {
                    var tag;
                    return __generator(this, function (_a) {
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
                return __awaiter(this, void 0, void 0, function () {
                    var tag;
                    return __generator(this, function (_a) {
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
                return __awaiter(this, void 0, void 0, function () {
                    var tag;
                    return __generator(this, function (_a) {
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
            { type: core.Component, args: [{
                        selector: 'plotly',
                        template: "<div\n  id=\"{{ plotId }}\"\n  class=\"{{ plotClass }}\">\n</div>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        host: {
                            '[style.width]': '"100%"',
                            '[style.height]': '"100%"',
                        }
                    },] },
        ];
        /** @nocollapse */
        PlotlyComponent.ctorParameters = function () {
            return [
                { type: core.ChangeDetectorRef }
            ];
        };
        PlotlyComponent.propDecorators = {
            debug: [{ type: core.Input }],
            plotId: [{ type: core.Input }],
            plotClass: [{ type: core.Input }],
            data: [{ type: core.Input }],
            layout: [{ type: core.Input }],
            configuration: [{ type: core.Input }],
            events: [{ type: core.Input }],
            frames: [{ type: core.Input }],
            width: [{ type: core.Input }],
            height: [{ type: core.Input }]
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
    var PlotlyModule = (function () {
        function PlotlyModule() {
        }
        PlotlyModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
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

    exports.PlotlyModule = PlotlyModule;
    exports.PlotlyComponent = PlotlyComponent;
    exports.PlotlyEvent = PlotlyEvent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibi1mdXNlLW5nLXBsb3RseS51bWQuanMubWFwIiwic291cmNlcyI6W251bGwsIm5nOi8vQG4tZnVzZS9uZy1wbG90bHkvcGxvdGx5L3Bsb3RseS5jb21wb25lbnQudHMiLCJuZzovL0BuLWZ1c2UvbmctcGxvdGx5L2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0geVtvcFswXSAmIDIgPyBcInJldHVyblwiIDogb3BbMF0gPyBcInRocm93XCIgOiBcIm5leHRcIl0pICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gWzAsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7ICB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAob1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLCBJbnB1dCwgU2ltcGxlQ2hhbmdlcyxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICogYXMgUGxvdGx5IGZyb20gJ3Bsb3RseS5qcyc7XHJcblxyXG5leHBvcnQgY29uc3QgUGxvdGx5RXZlbnQgPSB7XHJcbiAgSG92ZXI6ICdwbG90bHlfaG92ZXInLFxyXG4gIFVuaG92ZXI6ICdwbG90bHlfdW5ob3ZlcicsXHJcbiAgQ2xpY2s6ICdwbG90bHlfY2xpY2snLFxyXG4gIERvdWJsZUNsaWNrOiAncGxvdGx5X2RvdWJsZWNsaWNrJyxcclxuICBDbGlja0Fubm90YXRpb246ICdwbG90bHlfY2xpY2thbm5vdGF0aW9uJyxcclxuICBBZnRlclBsb3Q6ICdwbG90bHlfYWZ0ZXJwbG90JyxcclxuICBSZWRyYXc6ICdwbG90bHlfcmVkcmF3JyxcclxuICBSZXN0eWxlOiAncGxvdGx5X3Jlc3R5bGUnLFxyXG4gIFJlbGF5b3V0OiAncGxvdGx5X3JlbGF5b3V0JyxcclxuICBTZWxlY3Rpbmc6ICdwbG90bHlfc2VsZWN0aW5nJyxcclxuICBTZWxlY3RlZDogJ3Bsb3RseV9zZWxlY3RlZCcsXHJcbiAgRGVzZWxlY3Q6ICdwbG90bHlfZGVzZWxlY3QnLFxyXG59O1xyXG5cclxuY29uc3QgaXNXZWJraXQ6IGJvb2xlYW4gPSAnV2Via2l0QXBwZWFyYW5jZScgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlO1xyXG5cclxuY29uc3QgUmVzaXplRXZlbnQ6IHN0cmluZyA9ICdyZXNpemUnO1xyXG5cclxuY29uc3QgUGxvdGx5UGFyYW1ldGVyID0ge1xyXG4gIFBsb3RJZDogJ3Bsb3RJZCcsXHJcbiAgUGxvdENsYXNzOiAncGxvdENsYXNzJyxcclxuXHJcbiAgRGF0YTogJ2RhdGEnLFxyXG4gIExheW91dDogJ2xheW91dCcsXHJcbiAgQ29uZmlndXJhdGlvbjogJ2NvbmZpZ3VyYXRpb24nLFxyXG4gIEV2ZW50czogJ2V2ZW50cycsXHJcbiAgRnJhbWVzOiAnZnJhbWVzJyxcclxuXHJcbiAgV2lkdGg6ICd3aWR0aCcsXHJcbiAgSGVpZ2h0OiAnaGVpZ2h0JyxcclxufTtcclxuXHJcbmVudW0gQ2hhbmdlQWN0aW9uIHtcclxuICBOb25lLFxyXG4gIFJlc3R5bGUsXHJcbiAgUmVsYXlvdXQsXHJcbiAgUmVzaXplLFxyXG4gIFVwZGF0ZSxcclxuICBSZWRyYXcsXHJcbiAgUmVjcmVhdGUsXHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAncGxvdGx5JyxcclxuICB0ZW1wbGF0ZTogYDxkaXZcclxuICBpZD1cInt7IHBsb3RJZCB9fVwiXHJcbiAgY2xhc3M9XCJ7eyBwbG90Q2xhc3MgfX1cIj5cclxuPC9kaXY+XHJcbmAsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgaG9zdDoge1xyXG4gICAgJ1tzdHlsZS53aWR0aF0nOiAnXCIxMDAlXCInLFxyXG4gICAgJ1tzdHlsZS5oZWlnaHRdJzogJ1wiMTAwJVwiJyxcclxuICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQbG90bHlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVGFnOiBzdHJpbmcgPSAnUGxvdGx5Q29tcG9uZW50JztcclxuXHJcbiAgcHJpdmF0ZSB0YWc6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSByZWNlaXZlZFJlc2l6ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHByaXZhdGUgcmVzaXplSGFuZGxlcjogRXZlbnRMaXN0ZW5lck9iamVjdDtcclxuXHJcbiAgcHJpdmF0ZSBjaGFuZ2VBY3Rpb246IENoYW5nZUFjdGlvbjtcclxuXHJcbiAgcHVibGljIHBsb3QvKjogSFRNTEVsZW1lbnQgKi87XHJcbiAgcHVibGljIGFmdGVyUGxvdDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBwcml2YXRlIGRlYnVnOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIHB1YmxpYyBwbG90SWQ6IHN0cmluZyA9ICcnO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBwbG90Q2xhc3M6IHN0cmluZyA9ICcnO1xyXG5cclxuICBASW5wdXQoKSBwdWJsaWMgZGF0YTogYW55W107XHJcbiAgQElucHV0KCkgcHVibGljIGxheW91dDogYW55O1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBjb25maWd1cmF0aW9uOiBhbnk7XHJcbiAgQElucHV0KCkgcHVibGljIGV2ZW50czogYW55O1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBmcmFtZXM6IGFueVtdO1xyXG5cclxuICBASW5wdXQoKSBwdWJsaWMgd2lkdGg6IG51bWJlcjtcclxuICBASW5wdXQoKSBwdWJsaWMgaGVpZ2h0OiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgKSB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5jb25zdHJ1Y3RvcigpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcpO1xyXG5cclxuICAgIC8vIFdlYktpdCBkb3VibGUgcmVzaXplIGV2ZW50IHdvcmthcm91bmQuXHJcbiAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NTM0MzYzL3doeS1kb2VzLXRoZS1qcXVlcnktcmVzaXplLWV2ZW50LWZpcmUtdHdpY2VcclxuICAgIHRoaXMucmVzaXplSGFuZGxlciA9ICgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LnJlc2l6ZUhhbmRsZXIoKWA7XHJcbiAgICAgIGlmIChpc1dlYmtpdCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJlY2VpdmVkUmVzaXplKSB7XHJcbiAgICAgICAgICB0aGlzLnJlc2l6ZSgpO1xyXG4gICAgICAgICAgdGhpcy5yZWNlaXZlZFJlc2l6ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnJlY2VpdmVkUmVzaXplID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yZXNpemUoKTtcclxuICAgICAgfVxyXG4gICAgfSkuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMudGFnID0gYCR7UGxvdGx5Q29tcG9uZW50LlRhZ30uJHt0aGlzLnBsb3RJZH1gO1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ubmdPbkluaXQoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5uZ0FmdGVyVmlld0luaXQoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5yZWNyZWF0ZSgpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ubmdPbkNoYW5nZXMoKWA7XHJcbiAgICBpZiAoIXRoaXMucGxvdCkge1xyXG4gICAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnaWdub3JpbmcgY2hhbmdlcywgcGxvdCBub3QgeWV0IG9uY2UgaW5pdGlhbGl6ZWQnKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2NoYW5nZXM6JywgY2hhbmdlcyk7XHJcblxyXG4gICAgY29uc3QgY2hhbmdlZEtleXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMoY2hhbmdlcyk7XHJcblxyXG4gICAgaWYgKGluY2x1ZGVzQXJyKGNoYW5nZWRLZXlzLCBbXHJcbiAgICAgIFBsb3RseVBhcmFtZXRlci5XaWR0aCwgUGxvdGx5UGFyYW1ldGVyLkhlaWdodF0pKSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlQWN0aW9uID0gQ2hhbmdlQWN0aW9uLlJlc2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaW5jbHVkZXNBcnIoY2hhbmdlZEtleXMsIFtcclxuICAgICAgUGxvdGx5UGFyYW1ldGVyLkxheW91dCwgUGxvdGx5UGFyYW1ldGVyLlBsb3RJZCxcclxuICAgICAgUGxvdGx5UGFyYW1ldGVyLlBsb3RDbGFzc10pKSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlQWN0aW9uID0gQ2hhbmdlQWN0aW9uLlJlbGF5b3V0O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbmNsdWRlcyhjaGFuZ2VkS2V5cywgUGxvdGx5UGFyYW1ldGVyLkRhdGEpKSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlQWN0aW9uID0gQ2hhbmdlQWN0aW9uLlJlZHJhdztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaW5jbHVkZXNBcnIoY2hhbmdlZEtleXMsIFtcclxuICAgICAgUGxvdGx5UGFyYW1ldGVyLkNvbmZpZ3VyYXRpb24sIFBsb3RseVBhcmFtZXRlci5FdmVudHMsXHJcbiAgICAgIFBsb3RseVBhcmFtZXRlci5GcmFtZXNdKSkge1xyXG4gICAgICB0aGlzLmNoYW5nZUFjdGlvbiA9IENoYW5nZUFjdGlvbi5SZWNyZWF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYXBwbHlDaGFuZ2VzKCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhcHBseUNoYW5nZXMoKTogdm9pZCB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5hcHBseUNoYW5nZXMoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndGhpcy5jaGFuZ2VBY3Rpb246JywgQ2hhbmdlQWN0aW9uW3RoaXMuY2hhbmdlQWN0aW9uXSk7XHJcbiAgICBzd2l0Y2ggKHRoaXMuY2hhbmdlQWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgQ2hhbmdlQWN0aW9uLlJlc2l6ZTpcclxuICAgICAgICB0aGlzLnJlc2l6ZSgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIENoYW5nZUFjdGlvbi5SZWxheW91dDpcclxuICAgICAgICB0aGlzLnJlbGF5b3V0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQ2hhbmdlQWN0aW9uLlJlZHJhdzpcclxuICAgICAgICB0aGlzLnJlZHJhdygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIENoYW5nZUFjdGlvbi5SZWNyZWF0ZTpcclxuICAgICAgICB0aGlzLnJlY3JlYXRlKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNoYW5nZUFjdGlvbiA9IENoYW5nZUFjdGlvbi5Ob25lO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIHJlc3R5bGUodXBkYXRlOiBhbnksIHRyYWNlcz86IG51bWJlcltdKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LnJlc3R5bGUoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndXBkYXRlOicsIHVwZGF0ZSk7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndHJhY2VzOicsIHRyYWNlcyA9PT0gdW5kZWZpbmVkID8gJ2FsbCcgOiB0cmFjZXMpO1xyXG4gICAgcmV0dXJuIFBsb3RseS5yZXN0eWxlKHRoaXMucGxvdCwgdXBkYXRlLCB0cmFjZXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIHJlc2l6ZShldmVudD86IEV2ZW50KTogUHJvbWlzZTxhbnk+IHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LnJlc2l6ZSgpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdldmVudDonLCBldmVudCk7XHJcbiAgICBhd2FpdCBQbG90bHkuUGxvdHMucmVzaXplKHRoaXMucGxvdCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgcmVsYXlvdXQobGF5b3V0OiBhbnkgPSB0aGlzLmxheW91dCk6IFByb21pc2U8YW55PiB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5yZWxheW91dCgpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdsYXlvdXQ6JywgbGF5b3V0KTtcclxuICAgIGF3YWl0IFBsb3RseS5yZWxheW91dCh0aGlzLnBsb3QsIGxheW91dCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgdXBkYXRlKGRhdGFVcGRhdGU6IGFueSwgbGF5b3V0VXBkYXRlOiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30udXBkYXRlKClgO1xyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2RhdGFVcGRhdGU6JywgZGF0YVVwZGF0ZSk7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnbGF5b3V0VXBkYXRlOicsIGxheW91dFVwZGF0ZSk7XHJcbiAgICByZXR1cm4gUGxvdGx5LnVwZGF0ZSh0aGlzLnBsb3QsIGRhdGFVcGRhdGUsIGxheW91dFVwZGF0ZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgcmVkcmF3KCk6IFByb21pc2U8YW55PiB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5yZWRyYXcoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnKTtcclxuICAgIHRoaXMucGxvdC5kYXRhID0gdGhpcy5kYXRhO1xyXG4gICAgdGhpcy5wbG90LmxheW91dCA9IHRoaXMubGF5b3V0O1xyXG4gICAgcmV0dXJuIFBsb3RseS5yZWRyYXcodGhpcy5wbG90KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyByZWNyZWF0ZSgpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ucmVjcmVhdGUoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnKTtcclxuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICB0aGlzLnBsb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnBsb3RJZCk7XHJcbiAgICBpZiAoIXRoaXMucGxvdCkgcmV0dXJuO1xyXG5cclxuICAgIGlmICh0aGlzLndpZHRoKSB7XHJcbiAgICAgIHRoaXMucGxvdC5zdHlsZS53aWR0aCA9IHRoaXMud2lkdGggKyAnJSc7XHJcbiAgICAgIHRoaXMucGxvdC5zdHlsZVsnbWFyZ2luLWxlZnQnXSA9ICgxMDAgLSB0aGlzLndpZHRoKSAvIDIgKyAnJSc7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaGVpZ2h0KSB7XHJcbiAgICAgIHRoaXMucGxvdC5zdHlsZS5oZWlnaHQgPSB0aGlzLmhlaWdodCArICclJztcclxuICAgICAgdGhpcy5wbG90LnN0eWxlWydtYXJnaW4tdG9wJ10gPSAoMTAwIC0gdGhpcy5oZWlnaHQpIC8gMiArICclJztcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0aGlzLnBsb3Q6JywgdGhpcy5wbG90KTtcclxuXHJcbiAgICAvLyBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndGhpcy5kYXRhOicsIHRoaXMuZGF0YSk7XHJcbiAgICAvLyBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndGhpcy5sYXlvdXQ6JywgdGhpcy5sYXlvdXQpO1xyXG4gICAgLy8gaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ3RoaXMuY29uZmlndXJhdGlvbjonLCB0aGlzLmNvbmZpZ3VyYXRpb24pO1xyXG4gICAgLy8gaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ3RoaXMuZnJhbWVzOicsIHRoaXMuZnJhbWVzKTtcclxuXHJcbiAgICBjb25zdCByZXNpemVQbG90OiBib29sZWFuID0gISEodGhpcy53aWR0aCB8fCB0aGlzLmhlaWdodCk7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCB7IHJlc2l6ZVBsb3QgfSk7XHJcblxyXG4gICAgUGxvdGx5Lm5ld1Bsb3QodGhpcy5wbG90LCB7XHJcbiAgICAgIGRhdGE6IHRoaXMuZGF0YSxcclxuICAgICAgbGF5b3V0OiB0aGlzLmxheW91dCxcclxuICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZ3VyYXRpb24sXHJcbiAgICAgIGZyYW1lczogdGhpcy5mcmFtZXMsXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmF0dGFjaEV2ZW50TGlzdGVuZXJzKHRoaXMucGxvdCwgdGhpcy5ldmVudHMpO1xyXG5cclxuICAgIGlmICh0aGlzLndpZHRoIHx8IHRoaXMuaGVpZ2h0KSB7XHJcbiAgICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdyZXNpemluZycpO1xyXG4gICAgICBhd2FpdCB0aGlzLnJlc2l6ZSgpO1xyXG4gICAgICB0aGlzLmFmdGVyUGxvdCA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmFmdGVyUGxvdCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhdHRhY2hFdmVudExpc3RlbmVycyhwbG90OiBhbnksIGV2ZW50czogYW55KTogdm9pZCB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5hdHRhY2hFdmVudExpc3RlbmVycygpYDtcclxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdldmVudHM6JywgZXZlbnRzKTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhldmVudHMgfHwge30pLmZvckVhY2goayA9PiB7XHJcbiAgICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LiR7a30oKWA7XHJcbiAgICAgIHRoaXMucGxvdC5vbihrLCAoZGF0YSwgZXZlbnQpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnZGF0YTonLCBkYXRhKTtcclxuICAgICAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnZXZlbnQ6JywgZXZlbnQpO1xyXG4gICAgICAgIGV2ZW50c1trXShkYXRhLCBldmVudCwgdGhpcywgUGxvdGx5KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihSZXNpemVFdmVudCwgdGhpcy5yZXNpemVIYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmVFdmVudExpc3RlbmVycygpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LnJlbW92ZUV2ZW50TGlzdGVuZXJzKClgO1xyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZyk7XHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihSZXNpemVFdmVudCwgdGhpcy5yZXNpemVIYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBhZGRUcmFjZXModHJhY2VzOiBhbnkgfCBhbnlbXSwgaW5kZXg/OiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30uYWRkVHJhY2VzKClgO1xyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ3RyYWNlczonLCB0cmFjZXMpO1xyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2luZGV4OicsIGluZGV4KTtcclxuICAgIHJldHVybiBpbmRleCA9PT0gdW5kZWZpbmVkID8gUGxvdGx5LmFkZFRyYWNlcyh0aGlzLnBsb3QsIHRyYWNlcykgOlxyXG4gICAgICBQbG90bHkuYWRkVHJhY2VzKHRoaXMucGxvdCwgdHJhY2VzLCBpbmRleCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgZGVsZXRlVHJhY2VzKHRyYWNlczogbnVtYmVyIHwgbnVtYmVyW10pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30uZGVsZXRlVHJhY2VzKClgO1xyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ3RyYWNlczonLCB0cmFjZXMpO1xyXG4gICAgcmV0dXJuIFBsb3RseS5kZWxldGVUcmFjZXModGhpcy5wbG90LCB0cmFjZXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGFuaW1hdGUodXBkYXRlOiBhbnksIGFuaW1hdGlvbjogYW55KTogUHJvbWlzZTxhbnk+IHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LmFuaW1hdGUoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndXBkYXRlOicsIHVwZGF0ZSk7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnYW5pbWF0aW9uOicsIGFuaW1hdGlvbik7XHJcbiAgICByZXR1cm4gUGxvdGx5LmFuaW1hdGUodGhpcy5wbG90LCB1cGRhdGUsIGFuaW1hdGlvbik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgYWRkRnJhbWVzKGZyYW1lczogYW55W10sIGluZGljZXM/OiBudW1iZXJbXSk6IFByb21pc2U8YW55PiB7XHJcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5hZGRGcmFtZXMoKWA7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnZnJhbWVzOicsIGZyYW1lcyk7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnaW5kaWNlczonLCBpbmRpY2VzKTtcclxuICAgIHJldHVybiBQbG90bHkuYWRkRnJhbWVzKHRoaXMucGxvdCwgZnJhbWVzLCBpbmRpY2VzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBkZWxldGVGcmFtZXMoaW5kaWNlczogbnVtYmVyW10pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30uZGVsZXRlRnJhbWVzKClgO1xyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2ZyYW1lczonLCBmcmFtZXMpO1xyXG4gICAgcmV0dXJuIFBsb3RseS5kZWxldGVGcmFtZXModGhpcy5wbG90LCBpbmRpY2VzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9Lm5nT25EZXN0cm95KClgO1xyXG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZyk7XHJcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gaW5jbHVkZXMoYXJyOiBhbnlbXSwgdmFsOiBhbnkpOiBib29sZWFuIHtcclxuICByZXR1cm4gYXJyLmluZGV4T2YodmFsKSAhPT0gLTE7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluY2x1ZGVzQXJyKGFycjogYW55W10sIHZhbHM6IGFueVtdKTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIHZhbHMuc29tZSh2YWwgPT4gaW5jbHVkZXMoYXJyLCB2YWwpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xvbmUodjogYW55KTogYW55IHtcclxuICByZXR1cm4gIXYgPyB2IDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSgodikpKTtcclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBQbG90bHlDb21wb25lbnQsIFBsb3RseUV2ZW50IH0gZnJvbSAnLi9wbG90bHkvcGxvdGx5LmNvbXBvbmVudCc7XHJcblxyXG5leHBvcnQgeyBQbG90bHlDb21wb25lbnQsIFBsb3RseUV2ZW50IH07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gIGV4cG9ydHM6IFtQbG90bHlDb21wb25lbnRdLFxyXG4gIGRlY2xhcmF0aW9uczogW1Bsb3RseUNvbXBvbmVudF0sXHJcbiAgcHJvdmlkZXJzOiBbXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFBsb3RseU1vZHVsZSB7IH1cclxuIl0sIm5hbWVzIjpbIlBsb3RseS5yZXN0eWxlIiwiUGxvdGx5LlBsb3RzIiwiUGxvdGx5LnJlbGF5b3V0IiwiUGxvdGx5LnVwZGF0ZSIsIlBsb3RseS5yZWRyYXciLCJQbG90bHkubmV3UGxvdCIsIlBsb3RseS5hZGRUcmFjZXMiLCJQbG90bHkuZGVsZXRlVHJhY2VzIiwiUGxvdGx5LmFuaW1hdGUiLCJQbG90bHkuYWRkRnJhbWVzIiwiUGxvdGx5LmRlbGV0ZUZyYW1lcyIsIkNvbXBvbmVudCIsIkNoYW5nZURldGVjdGlvblN0cmF0ZWd5IiwiQ2hhbmdlRGV0ZWN0b3JSZWYiLCJJbnB1dCIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFB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QUUsQ0FBQzt3QkFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNoQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ1QsS0FBSyxDQUFDLENBQUM7d0JBQUMsS0FBSyxDQUFDOzRCQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQUMsTUFBTTt3QkFDOUIsS0FBSyxDQUFDOzRCQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs0QkFBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7d0JBQ3hELEtBQUssQ0FBQzs0QkFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7NEJBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFBQyxTQUFTO3dCQUNqRCxLQUFLLENBQUM7NEJBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzs0QkFBQyxTQUFTO3dCQUNqRDs0QkFDSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FBQyxTQUFTOzZCQUFFOzRCQUM1RyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENB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