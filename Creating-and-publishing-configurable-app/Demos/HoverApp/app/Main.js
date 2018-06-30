/*
  Copyright 2017 Esri

  Licensed under the Apache License, Version 2.0 (the "License");

  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software

  distributed under the License is distributed on an "AS IS" BASIS,

  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

  See the License for the specific language governing permissions and

  limitations under the License.​
*/
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "esri/core/watchUtils", "esri/core/requireUtils", "ApplicationBase/support/itemUtils", "ApplicationBase/support/domHelper"], function (require, exports, watchUtils, requireUtils, itemUtils_1, domHelper_1) {
    "use strict";
    var CSS = {
        loading: "configurable-application--loading"
    };
    var MapExample = /** @class */ (function () {
        function MapExample() {
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  ApplicationBase
            //----------------------------------
            this.base = null;
            this.view = null;
        }
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        MapExample.prototype.init = function (base) {
            var _this = this;
            if (!base) {
                console.error("ApplicationBase is not defined");
                return;
            }
            domHelper_1.setPageLocale(base.locale);
            domHelper_1.setPageDirection(base.direction);
            this.base = base;
            var config = base.config, results = base.results, settings = base.settings;
            var find = config.find, marker = config.marker;
            var webMapItems = results.webMapItems;
            var validWebMapItems = webMapItems.map(function (response) {
                return response.value;
            });
            var firstItem = validWebMapItems[0];
            if (!firstItem) {
                console.error("Could not load an item to display");
                return;
            }
            config.title = !config.title ? itemUtils_1.getItemTitle(firstItem) : "";
            domHelper_1.setPageTitle(config.title);
            var portalItem = this.base.results.applicationItem.value;
            var appProxies = (portalItem && portalItem.appProxies) ? portalItem.appProxies : null;
            var viewContainerNode = document.getElementById("viewContainer");
            var defaultViewProperties = itemUtils_1.getConfigViewProperties(config);
            validWebMapItems.forEach(function (item) {
                var viewNode = document.createElement("div");
                viewContainerNode.appendChild(viewNode);
                var container = {
                    container: viewNode
                };
                var viewProperties = __assign({}, defaultViewProperties, container);
                var basemapUrl = config.basemapUrl, basemapReferenceUrl = config.basemapReferenceUrl;
                itemUtils_1.createMapFromItem({ item: item, appProxies: appProxies })
                    .then(function (map) { return itemUtils_1.createView(__assign({}, viewProperties, { map: map })).then(function (view) {
                    _this.view = view;
                    _this.setupView(find, marker);
                }); });
            });
            document.body.classList.remove(CSS.loading);
        };
        MapExample.prototype.setupView = function (find, marker) {
            itemUtils_1.findQuery(find, this.view);
            itemUtils_1.goToMarker(marker, this.view);
            this.setupPopup();
            this.addOptionalWidgets();
            this.addUrlFilterSupport();
        };
        MapExample.prototype.setupPopup = function () {
            var _this = this;
            if (this.base.config.dockPopup) {
                this.view.popup.dockEnabled = true;
                this.view.popup.dockOptions = {
                    position: "auto",
                    breakpoint: false
                };
            }
            // always remove dock, zoom, close  
            this.view.popup.dockOptions.buttonEnabled = false;
            this.view.popup.highlightEnabled = true;
            this.view.popup.actions.removeAll();
            // Highlight layer options (WebGL must be enabled for FL)
            this.view.highlightOptions = {
                color: "#00FFFF",
                haloOpacity: 1,
                fillOpacity: 1
            };
            // setup hover hit test 
            var lastHitTest = null;
            this.view.on("pointer-move", function (evt) {
                clearTimeout(lastHitTest);
                // add a tiny delay before testing move 
                lastHitTest = setTimeout(function () {
                    _this.handlePointerMove(evt);
                }, 50);
            });
        };
        MapExample.prototype.addUrlFilterSupport = function () {
            return __awaiter(this, void 0, void 0, function () {
                var layerId, layerField, filterLayer_1, expression_1, flayerView_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.base.config.filterQuery && this.base.config.filterLayer)) return [3 /*break*/, 2];
                            layerId = this.base.config.filterLayer.id;
                            layerField = this.base.config.filterLayer.fields[0].fields[0];
                            filterLayer_1 = this.view.map.findLayerById(layerId);
                            expression_1 = layerField + "='" + this.base.config.filterQuery + "'";
                            return [4 /*yield*/, this.view.whenLayerView(filterLayer_1)];
                        case 1:
                            flayerView_1 = _a.sent();
                            watchUtils.whenFalseOnce(flayerView_1, "updating", function () { return __awaiter(_this, void 0, void 0, function () {
                                var query, results;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            filterLayer_1.definitionExpression = expression_1;
                                            query = filterLayer_1.createQuery();
                                            query.where = expression_1;
                                            return [4 /*yield*/, flayerView_1.queryExtent(query)];
                                        case 1:
                                            results = _a.sent();
                                            this.view.goTo(results.extent);
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        MapExample.prototype.addOptionalWidgets = function () {
            return __awaiter(this, void 0, void 0, function () {
                var searchRequire, Search, searchWidget, homeRequire, Home, homeWidget, requires, Legend, Expand, legendWidget, expand;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.base.config.search) return [3 /*break*/, 2];
                            return [4 /*yield*/, requireUtils.when(require, ["esri/widgets/Search"])];
                        case 1:
                            searchRequire = _a.sent();
                            if (searchRequire && searchRequire.length && searchRequire.length > 0) {
                                Search = searchRequire[0];
                                searchWidget = new Search({
                                    view: this.view
                                });
                                this.view.ui.add(searchWidget, this.base.config.searchPosition);
                            }
                            _a.label = 2;
                        case 2:
                            if (!this.base.config.home) return [3 /*break*/, 4];
                            return [4 /*yield*/, requireUtils.when(require, ["esri/widgets/Home"])];
                        case 3:
                            homeRequire = _a.sent();
                            if (homeRequire && homeRequire.length && homeRequire.length > 0) {
                                Home = homeRequire[0];
                                homeWidget = new Home({
                                    view: this.view
                                });
                                this.view.ui.add(homeWidget, "top-left");
                            }
                            _a.label = 4;
                        case 4:
                            if (!this.base.config.legend) return [3 /*break*/, 6];
                            return [4 /*yield*/, requireUtils.when(require, ["esri/widgets/Legend", "esri/widgets/Expand"])];
                        case 5:
                            requires = _a.sent();
                            if (requires && requires.length && requires.length > 1) {
                                Legend = requires[0];
                                Expand = requires[1];
                                legendWidget = new Legend({
                                    view: this.view,
                                    style: "card"
                                });
                                expand = new Expand({
                                    view: this.view,
                                    content: legendWidget
                                });
                                this.view.ui.add(expand, this.base.config.legendPosition);
                            }
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        MapExample.prototype.handlePointerMove = function (evt) {
            return __awaiter(this, void 0, void 0, function () {
                var results, feature, layer, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.view.hitTest(evt)];
                        case 1:
                            results = _a.sent();
                            if (results && results.results && results.results.length > 0) {
                                feature = results.results[0].graphic;
                                if (feature.layer.declaredClass === "esri.layers.FeatureLayer") {
                                    layer = feature.layer;
                                    if (layer.popupEnabled && layer.popupTemplate) {
                                        this.setCursor("pointer");
                                        // is the displayed feature currently showing? 
                                        if (this.view.popup.selectedFeature !== feature) {
                                            this.view.popup.open({
                                                features: [feature],
                                                updateLocationEnabled: true
                                            });
                                        }
                                    }
                                    else {
                                        this.setCursor("default");
                                    }
                                }
                            }
                            else {
                                this.view.popup.close();
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            console.log("There was an error", e_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        MapExample.prototype.setCursor = function (cursor) {
            var viewContainer = this.view.container;
            var currentCursor = viewContainer.style.cursor;
            if (currentCursor !== cursor) {
                viewContainer.style.cursor = cursor;
            }
        };
        return MapExample;
    }());
    return MapExample;
});
//# sourceMappingURL=Main.js.map