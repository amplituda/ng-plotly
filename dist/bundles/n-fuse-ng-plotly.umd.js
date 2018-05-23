(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tslib'), require('@angular/core'), require('plotly.js'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@n-fuse/ng-plotly', ['exports', 'tslib', '@angular/core', 'plotly.js', '@angular/common'], factory) :
    (factory((global.nfLib = {}),global.tslib,global.ng.core,null,global.ng.common));
}(this, (function (exports,tslib_1,core,Plotly,common) { 'use strict';

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
                if (layout === void 0) {
                    layout = this.layout;
                }
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
                                if (!(this.width || this.height))
                                    return [3 /*break*/, 3];
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
                { type: core.ChangeDetectorRef, },
            ];
        };
        PlotlyComponent.propDecorators = {
            "debug": [{ type: core.Input },],
            "onResizeTimeOut": [{ type: core.Input },],
            "plotId": [{ type: core.Input },],
            "plotClass": [{ type: core.Input },],
            "data": [{ type: core.Input },],
            "layout": [{ type: core.Input },],
            "configuration": [{ type: core.Input },],
            "events": [{ type: core.Input },],
            "frames": [{ type: core.Input },],
            "width": [{ type: core.Input },],
            "height": [{ type: core.Input },],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibi1mdXNlLW5nLXBsb3RseS51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BuLWZ1c2UvbmctcGxvdGx5L3Bsb3RseS9wbG90bHkuY29tcG9uZW50LnRzIiwibmc6Ly9Abi1mdXNlL25nLXBsb3RseS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsIElucHV0LCBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIFBsb3RseSBmcm9tICdwbG90bHkuanMnO1xuXG5leHBvcnQgY29uc3QgUGxvdGx5RXZlbnQgPSB7XG4gIEhvdmVyOiAncGxvdGx5X2hvdmVyJyxcbiAgVW5ob3ZlcjogJ3Bsb3RseV91bmhvdmVyJyxcbiAgQ2xpY2s6ICdwbG90bHlfY2xpY2snLFxuICBEb3VibGVDbGljazogJ3Bsb3RseV9kb3VibGVjbGljaycsXG4gIENsaWNrQW5ub3RhdGlvbjogJ3Bsb3RseV9jbGlja2Fubm90YXRpb24nLFxuICBBZnRlclBsb3Q6ICdwbG90bHlfYWZ0ZXJwbG90JyxcbiAgUmVkcmF3OiAncGxvdGx5X3JlZHJhdycsXG4gIFJlc3R5bGU6ICdwbG90bHlfcmVzdHlsZScsXG4gIFJlbGF5b3V0OiAncGxvdGx5X3JlbGF5b3V0JyxcbiAgU2VsZWN0aW5nOiAncGxvdGx5X3NlbGVjdGluZycsXG4gIFNlbGVjdGVkOiAncGxvdGx5X3NlbGVjdGVkJyxcbiAgRGVzZWxlY3Q6ICdwbG90bHlfZGVzZWxlY3QnLFxufTtcblxuY29uc3QgUmVzaXplRXZlbnQ6IHN0cmluZyA9ICdyZXNpemUnO1xuXG5jb25zdCBQbG90bHlQYXJhbWV0ZXIgPSB7XG4gIFBsb3RJZDogJ3Bsb3RJZCcsXG4gIFBsb3RDbGFzczogJ3Bsb3RDbGFzcycsXG5cbiAgRGF0YTogJ2RhdGEnLFxuICBMYXlvdXQ6ICdsYXlvdXQnLFxuICBDb25maWd1cmF0aW9uOiAnY29uZmlndXJhdGlvbicsXG4gIEV2ZW50czogJ2V2ZW50cycsXG4gIEZyYW1lczogJ2ZyYW1lcycsXG5cbiAgV2lkdGg6ICd3aWR0aCcsXG4gIEhlaWdodDogJ2hlaWdodCcsXG59O1xuXG5lbnVtIENoYW5nZUFjdGlvbiB7XG4gIE5vbmUsXG4gIFJlc3R5bGUsXG4gIFJlbGF5b3V0LFxuICBSZXNpemUsXG4gIFVwZGF0ZSxcbiAgUmVkcmF3LFxuICBSZWNyZWF0ZSxcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGxvdGx5JyxcbiAgdGVtcGxhdGU6IGA8ZGl2XG4gIGlkPVwie3sgcGxvdElkIH19XCJcbiAgY2xhc3M9XCJ7eyBwbG90Q2xhc3MgfX1cIj5cbjwvZGl2PlxuYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICAnW3N0eWxlLndpZHRoXSc6ICdcIjEwMCVcIicsXG4gICAgJ1tzdHlsZS5oZWlnaHRdJzogJ1wiMTAwJVwiJyxcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBQbG90bHlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFRhZzogc3RyaW5nID0gJ1Bsb3RseUNvbXBvbmVudCc7XG5cbiAgcHJpdmF0ZSB0YWc6IHN0cmluZztcblxuICBwcml2YXRlIHJlc2l6aW5nOiBOb2RlSlMuVGltZXI7XG4gIHByaXZhdGUgcmVzaXplSGFuZGxlcjogRXZlbnRMaXN0ZW5lck9iamVjdDtcblxuICBwcml2YXRlIGNoYW5nZUFjdGlvbjogQ2hhbmdlQWN0aW9uO1xuXG4gIHB1YmxpYyBwbG90Lyo6IEhUTUxFbGVtZW50ICovO1xuICBwdWJsaWMgYWZ0ZXJQbG90OiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgcHJpdmF0ZSBkZWJ1ZzogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBwcml2YXRlIG9uUmVzaXplVGltZU91dDogbnVtYmVyID0gMjAwO1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBwbG90SWQ6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBwdWJsaWMgcGxvdENsYXNzOiBzdHJpbmcgPSAnJztcblxuICBASW5wdXQoKSBwdWJsaWMgZGF0YTogYW55W107XG4gIEBJbnB1dCgpIHB1YmxpYyBsYXlvdXQ6IGFueTtcbiAgQElucHV0KCkgcHVibGljIGNvbmZpZ3VyYXRpb246IGFueTtcbiAgQElucHV0KCkgcHVibGljIGV2ZW50czogYW55O1xuICBASW5wdXQoKSBwdWJsaWMgZnJhbWVzOiBhbnlbXTtcblxuICBASW5wdXQoKSBwdWJsaWMgd2lkdGg6IG51bWJlcjtcbiAgQElucHV0KCkgcHVibGljIGhlaWdodDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICApIHtcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5jb25zdHJ1Y3RvcigpYDtcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnKTtcblxuICAgIC8vIFdlYktpdCBkb3VibGUgcmVzaXplIGV2ZW50IHdvcmthcm91bmQuXG4gICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTUzNDM2My93aHktZG9lcy10aGUtanF1ZXJ5LXJlc2l6ZS1ldmVudC1maXJlLXR3aWNlXG4gICAgdGhpcy5yZXNpemVIYW5kbGVyID0gKCgpID0+IHtcbiAgICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LnJlc2l6ZUhhbmRsZXIoKWA7XG4gICAgICBpZiAodGhpcy5yZXNpemluZykge1xuICAgICAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCBgY2xlYXJUaW1lb3V0KCR7dGhpcy5yZXNpemluZ30pYCk7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2l6aW5nKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucmVzaXppbmcgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMucmVzaXplKCksIHRoaXMub25SZXNpemVUaW1lT3V0KTtcbiAgICB9KS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMudGFnID0gYCR7UGxvdGx5Q29tcG9uZW50LlRhZ30uJHt0aGlzLnBsb3RJZH1gO1xuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9Lm5nT25Jbml0KClgO1xuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcpO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5uZ0FmdGVyVmlld0luaXQoKWA7XG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlY3JlYXRlKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ubmdPbkNoYW5nZXMoKWA7XG4gICAgaWYgKCF0aGlzLnBsb3QpIHtcbiAgICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdpZ25vcmluZyBjaGFuZ2VzLCBwbG90IG5vdCB5ZXQgb25jZSBpbml0aWFsaXplZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnY2hhbmdlczonLCBjaGFuZ2VzKTtcblxuICAgIGNvbnN0IGNoYW5nZWRLZXlzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKGNoYW5nZXMpO1xuXG4gICAgaWYgKGluY2x1ZGVzQXJyKGNoYW5nZWRLZXlzLCBbXG4gICAgICBQbG90bHlQYXJhbWV0ZXIuV2lkdGgsIFBsb3RseVBhcmFtZXRlci5IZWlnaHRdKSkge1xuICAgICAgdGhpcy5jaGFuZ2VBY3Rpb24gPSBDaGFuZ2VBY3Rpb24uUmVzaXplO1xuICAgIH1cblxuICAgIGlmIChpbmNsdWRlc0FycihjaGFuZ2VkS2V5cywgW1xuICAgICAgUGxvdGx5UGFyYW1ldGVyLkxheW91dCwgUGxvdGx5UGFyYW1ldGVyLlBsb3RJZCxcbiAgICAgIFBsb3RseVBhcmFtZXRlci5QbG90Q2xhc3NdKSkge1xuICAgICAgdGhpcy5jaGFuZ2VBY3Rpb24gPSBDaGFuZ2VBY3Rpb24uUmVsYXlvdXQ7XG4gICAgfVxuXG4gICAgaWYgKGluY2x1ZGVzKGNoYW5nZWRLZXlzLCBQbG90bHlQYXJhbWV0ZXIuRGF0YSkpIHtcbiAgICAgIHRoaXMuY2hhbmdlQWN0aW9uID0gQ2hhbmdlQWN0aW9uLlJlZHJhdztcbiAgICB9XG5cbiAgICBpZiAoaW5jbHVkZXNBcnIoY2hhbmdlZEtleXMsIFtcbiAgICAgIFBsb3RseVBhcmFtZXRlci5Db25maWd1cmF0aW9uLCBQbG90bHlQYXJhbWV0ZXIuRXZlbnRzLFxuICAgICAgUGxvdGx5UGFyYW1ldGVyLkZyYW1lc10pKSB7XG4gICAgICB0aGlzLmNoYW5nZUFjdGlvbiA9IENoYW5nZUFjdGlvbi5SZWNyZWF0ZTtcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYXBwbHlDaGFuZ2VzKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseUNoYW5nZXMoKTogdm9pZCB7XG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30uYXBwbHlDaGFuZ2VzKClgO1xuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0aGlzLmNoYW5nZUFjdGlvbjonLCBDaGFuZ2VBY3Rpb25bdGhpcy5jaGFuZ2VBY3Rpb25dKTtcbiAgICBzd2l0Y2ggKHRoaXMuY2hhbmdlQWN0aW9uKSB7XG4gICAgICBjYXNlIENoYW5nZUFjdGlvbi5SZXNpemU6XG4gICAgICAgIHRoaXMucmVzaXplKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDaGFuZ2VBY3Rpb24uUmVsYXlvdXQ6XG4gICAgICAgIHRoaXMucmVsYXlvdXQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENoYW5nZUFjdGlvbi5SZWRyYXc6XG4gICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDaGFuZ2VBY3Rpb24uUmVjcmVhdGU6XG4gICAgICAgIHRoaXMucmVjcmVhdGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuY2hhbmdlQWN0aW9uID0gQ2hhbmdlQWN0aW9uLk5vbmU7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVzdHlsZSh1cGRhdGU6IGFueSwgdHJhY2VzPzogbnVtYmVyW10pOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LnJlc3R5bGUoKWA7XG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ3VwZGF0ZTonLCB1cGRhdGUpO1xuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0cmFjZXM6JywgdHJhY2VzID09PSB1bmRlZmluZWQgPyAnYWxsJyA6IHRyYWNlcyk7XG4gICAgcmV0dXJuIFBsb3RseS5yZXN0eWxlKHRoaXMucGxvdCwgdXBkYXRlLCB0cmFjZXMpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlc2l6ZShldmVudD86IEV2ZW50KTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5yZXNpemUoKWA7XG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2V2ZW50OicsIGV2ZW50KTtcbiAgICBhd2FpdCBQbG90bHkuUGxvdHMucmVzaXplKHRoaXMucGxvdCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVsYXlvdXQobGF5b3V0OiBhbnkgPSB0aGlzLmxheW91dCk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ucmVsYXlvdXQoKWA7XG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2xheW91dDonLCBsYXlvdXQpO1xuICAgIGF3YWl0IFBsb3RseS5yZWxheW91dCh0aGlzLnBsb3QsIGxheW91dCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlKGRhdGFVcGRhdGU6IGFueSwgbGF5b3V0VXBkYXRlOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LnVwZGF0ZSgpYDtcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnZGF0YVVwZGF0ZTonLCBkYXRhVXBkYXRlKTtcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnbGF5b3V0VXBkYXRlOicsIGxheW91dFVwZGF0ZSk7XG4gICAgcmV0dXJuIFBsb3RseS51cGRhdGUodGhpcy5wbG90LCBkYXRhVXBkYXRlLCBsYXlvdXRVcGRhdGUpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlZHJhdygpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LnJlZHJhdygpYDtcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnKTtcbiAgICB0aGlzLnBsb3QuZGF0YSA9IHRoaXMuZGF0YTtcbiAgICB0aGlzLnBsb3QubGF5b3V0ID0gdGhpcy5sYXlvdXQ7XG4gICAgcmV0dXJuIFBsb3RseS5yZWRyYXcodGhpcy5wbG90KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZWNyZWF0ZSgpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LnJlY3JlYXRlKClgO1xuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcpO1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgIHRoaXMucGxvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMucGxvdElkKTtcblxuICAgIGlmICh0aGlzLndpZHRoKSB7XG4gICAgICB0aGlzLnBsb3Quc3R5bGUud2lkdGggPSB0aGlzLndpZHRoICsgJyUnO1xuICAgICAgdGhpcy5wbG90LnN0eWxlWydtYXJnaW4tbGVmdCddID0gKDEwMCAtIHRoaXMud2lkdGgpIC8gMiArICclJztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oZWlnaHQpIHtcbiAgICAgIHRoaXMucGxvdC5zdHlsZS5oZWlnaHQgPSB0aGlzLmhlaWdodCArICclJztcbiAgICAgIHRoaXMucGxvdC5zdHlsZVsnbWFyZ2luLXRvcCddID0gKDEwMCAtIHRoaXMuaGVpZ2h0KSAvIDIgKyAnJSc7XG4gICAgfVxuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0aGlzLnBsb3Q6JywgdGhpcy5wbG90KTtcblxuICAgIC8vIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0aGlzLmRhdGE6JywgdGhpcy5kYXRhKTtcbiAgICAvLyBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndGhpcy5sYXlvdXQ6JywgdGhpcy5sYXlvdXQpO1xuICAgIC8vIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0aGlzLmNvbmZpZ3VyYXRpb246JywgdGhpcy5jb25maWd1cmF0aW9uKTtcbiAgICAvLyBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndGhpcy5mcmFtZXM6JywgdGhpcy5mcmFtZXMpO1xuICAgIGF3YWl0IFBsb3RseS5uZXdQbG90KHRoaXMucGxvdCwge1xuICAgICAgZGF0YTogdGhpcy5kYXRhLFxuICAgICAgbGF5b3V0OiB0aGlzLmxheW91dCxcbiAgICAgIGNvbmZpZzogdGhpcy5jb25maWd1cmF0aW9uLFxuICAgICAgZnJhbWVzOiB0aGlzLmZyYW1lcyxcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLndpZHRoIHx8IHRoaXMuaGVpZ2h0KSB7XG4gICAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAncmVzaXppbmcnKTtcbiAgICAgIGF3YWl0IHRoaXMucmVzaXplKCk7XG4gICAgICB0aGlzLmFmdGVyUGxvdCA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5hdHRhY2hFdmVudExpc3RlbmVycyh0aGlzLnBsb3QsIHRoaXMuZXZlbnRzKTtcblxuICAgIHJldHVybjtcbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoRXZlbnRMaXN0ZW5lcnMocGxvdDogYW55LCBldmVudHM6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LmF0dGFjaEV2ZW50TGlzdGVuZXJzKClgO1xuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdldmVudHM6JywgZXZlbnRzKTtcblxuICAgIE9iamVjdC5rZXlzKGV2ZW50cyB8fCB7fSkuZm9yRWFjaChrID0+IHtcbiAgICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LiR7a30oKWA7XG4gICAgICB0aGlzLnBsb3Qub24oaywgKGRhdGEsIGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdkYXRhOicsIGRhdGEpO1xuICAgICAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnZXZlbnQ6JywgZXZlbnQpO1xuICAgICAgICBldmVudHNba10oZGF0YSwgZXZlbnQsIHRoaXMsIFBsb3RseSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFJlc2l6ZUV2ZW50LCB0aGlzLnJlc2l6ZUhhbmRsZXIpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LnJlbW92ZUV2ZW50TGlzdGVuZXJzKClgO1xuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFJlc2l6ZUV2ZW50LCB0aGlzLnJlc2l6ZUhhbmRsZXIpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFkZFRyYWNlcyh0cmFjZXM6IGFueSB8IGFueVtdLCBpbmRleD86IG51bWJlcik6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30uYWRkVHJhY2VzKClgO1xuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICd0cmFjZXM6JywgdHJhY2VzKTtcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnaW5kZXg6JywgaW5kZXgpO1xuICAgIHJldHVybiBQbG90bHkuYWRkVHJhY2VzKHRoaXMucGxvdCwgdHJhY2VzLCBpbmRleCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGVsZXRlVHJhY2VzKHRyYWNlczogbnVtYmVyIHwgbnVtYmVyW10pOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LmRlbGV0ZVRyYWNlcygpYDtcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAndHJhY2VzOicsIHRyYWNlcyk7XG4gICAgUGxvdGx5LmRlbGV0ZVRyYWNlcyh0aGlzLnBsb3QsIHRyYWNlcyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYW5pbWF0ZSh1cGRhdGU6IGFueSwgYW5pbWF0aW9uOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHRhZzogc3RyaW5nID0gYCR7dGhpcy50YWd9LmFuaW1hdGUoKWA7XG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ3VwZGF0ZTonLCB1cGRhdGUpO1xuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdhbmltYXRpb246JywgYW5pbWF0aW9uKTtcbiAgICByZXR1cm4gUGxvdGx5LmFuaW1hdGUodGhpcy5wbG90LCB1cGRhdGUsIGFuaW1hdGlvbik7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWRkRnJhbWVzKGZyYW1lczogYW55W10sIGluZGljZXM/OiBudW1iZXJbXSk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30uYWRkRnJhbWVzKClgO1xuICAgIGlmICh0aGlzLmRlYnVnKSBjb25zb2xlLmxvZyh0YWcsICdmcmFtZXM6JywgZnJhbWVzKTtcbiAgICBpZiAodGhpcy5kZWJ1ZykgY29uc29sZS5sb2codGFnLCAnaW5kaWNlczonLCBpbmRpY2VzKTtcbiAgICByZXR1cm4gUGxvdGx5LmFkZEZyYW1lcyh0aGlzLnBsb3QsIGZyYW1lcywgaW5kaWNlcyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGVsZXRlRnJhbWVzKGluZGljZXM6IG51bWJlcltdKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCB0YWc6IHN0cmluZyA9IGAke3RoaXMudGFnfS5kZWxldGVGcmFtZXMoKWA7XG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZywgJ2ZyYW1lczonLCBmcmFtZXMpO1xuICAgIHJldHVybiBQbG90bHkuZGVsZXRlRnJhbWVzKHRoaXMucGxvdCwgaW5kaWNlcyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgY29uc3QgdGFnOiBzdHJpbmcgPSBgJHt0aGlzLnRhZ30ubmdPbkRlc3Ryb3koKWA7XG4gICAgaWYgKHRoaXMuZGVidWcpIGNvbnNvbGUubG9nKHRhZyk7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVycygpO1xuICB9XG59XG5cblxuZnVuY3Rpb24gaW5jbHVkZXMoYXJyOiBhbnlbXSwgdmFsOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIGFyci5pbmRleE9mKHZhbCkgIT09IC0xO1xufVxuXG5mdW5jdGlvbiBpbmNsdWRlc0FycihhcnI6IGFueVtdLCB2YWxzOiBhbnlbXSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdmFscy5zb21lKHZhbCA9PiBpbmNsdWRlcyhhcnIsIHZhbCkpO1xufVxuXG5mdW5jdGlvbiBjbG9uZSh2OiBhbnkpOiBhbnkge1xuICByZXR1cm4gIXYgPyB2IDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSgodikpKTtcbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUGxvdGx5Q29tcG9uZW50LCBQbG90bHlFdmVudCB9IGZyb20gJy4vcGxvdGx5L3Bsb3RseS5jb21wb25lbnQnO1xuXG5leHBvcnQgeyBQbG90bHlDb21wb25lbnQsIFBsb3RseUV2ZW50IH07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbUGxvdGx5Q29tcG9uZW50XSxcbiAgZGVjbGFyYXRpb25zOiBbUGxvdGx5Q29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbXSxcbn0pXG5leHBvcnQgY2xhc3MgUGxvdGx5TW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIlBsb3RseS5yZXN0eWxlIiwiUGxvdGx5LlBsb3RzIiwiUGxvdGx5LnJlbGF5b3V0IiwiUGxvdGx5LnVwZGF0ZSIsIlBsb3RseS5yZWRyYXciLCJQbG90bHkubmV3UGxvdCIsIlBsb3RseS5hZGRUcmFjZXMiLCJQbG90bHkuZGVsZXRlVHJhY2VzIiwiUGxvdGx5LmFuaW1hdGUiLCJQbG90bHkuYWRkRnJhbWVzIiwiUGxvdGx5LmRlbGV0ZUZyYW1lcyIsIkNvbXBvbmVudCIsIkNoYW5nZURldGVjdGlvblN0cmF0ZWd5IiwiQ2hhbmdl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