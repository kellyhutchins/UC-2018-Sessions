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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/renderers/SimpleRenderer", "esri/PopupTemplate", "esri/core/watchUtils"], function (require, exports, Map_1, MapView_1, FeatureLayer_1, SimpleRenderer_1, PopupTemplate_1, watchUtils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Map_1 = __importDefault(Map_1);
    MapView_1 = __importDefault(MapView_1);
    FeatureLayer_1 = __importDefault(FeatureLayer_1);
    SimpleRenderer_1 = __importDefault(SimpleRenderer_1);
    PopupTemplate_1 = __importDefault(PopupTemplate_1);
    var defaultSym = {
        type: "simple-fill",
        outline: {
            // autocasts as new SimpleLineSymbol()
            color: "#a3acd1",
            width: 0.5
        }
    };
    /******************************************************************
     *
     * LayerRenderer example
     *
     ******************************************************************/
    // Step 1: Create individual symbols to represent each unique value
    var renderer = new SimpleRenderer_1.default({
        symbol: defaultSym,
        label: "Private school enrollment ratio",
        visualVariables: [{
                type: "color",
                field: "PrivateEnr",
                stops: [{
                        value: 0.044,
                        color: "#edf8fb",
                        label: "< 0.044"
                    },
                    {
                        value: 0.059,
                        color: "#b3cde3"
                    },
                    {
                        value: 0.0748,
                        color: "#8c96c6",
                        label: "0.0748"
                    },
                    {
                        value: 0.0899,
                        color: "#8856a7"
                    },
                    {
                        value: 0.105,
                        color: "#994c99",
                        label: "> 0.105"
                    }
                ]
            }]
    });
    /***********************************
     *  Create renderer for school locations
     ************************************/
    var schoolLocationRenderer = new SimpleRenderer_1.default({
        symbol: {
            type: "picture-marker",
            url: "https://static.arcgis.com/images/Symbols/Firefly/FireflyD7.png",
            width: "18.75",
            height: "18.75"
        }
    });
    /******************************************************************
       *
       * Popup example
       *
       ******************************************************************/
    // Step 1: Create the template
    var popupTemplate = new PopupTemplate_1.default({
        title: "Private School enrollment",
        content: [{
                // Specify the type of popup element - fields
                type: "fields",
                fieldInfos: [{
                        fieldName: "state_name",
                        visible: true,
                        label: "State name: "
                    },
                    {
                        fieldName: "PrivateMaj",
                        visible: true,
                        label: "Majority grade level for private schools: "
                    },
                    {
                        fieldName: "PrivateSch",
                        visible: true,
                        label: "Private school ratio to total number of schools: ",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    },
                    {
                        fieldName: "TotalPriva",
                        visible: true,
                        label: "Total number of private schools: "
                    },
                    {
                        fieldName: "Enrollment",
                        visible: true,
                        label: "Total number students enrolled in private schools: "
                    },
                    {
                        fieldName: "PrivateEnr",
                        visible: true,
                        label: "Total number of private school students enrolled in ratio to total student school enrollment: ",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                ]
            },
            {
                type: "media",
                mediaInfos: [{
                        title: "Ratio private and public school enrollment",
                        type: "pie-chart",
                        caption: "Private school enrollment in comparison to public school",
                        value: {
                            theme: "Julie",
                            fields: ["PrivateEnr", "PublicEnro"],
                            tooltipField: "PrivateEnr"
                        }
                    },
                    {
                        title: "Total number of private schools",
                        type: "bar-chart",
                        caption: "Total number of Private Schools in comparison to public. (Does not pertain to student enrollment.)",
                        value: {
                            theme: "Julie",
                            fields: ["PrivateSch", "PublicScho"],
                            tooltipField: "PrivateSch"
                        }
                    }
                ]
            }
        ]
    });
    /******************************************************************
     *
     * Create feature layers
     *
     ******************************************************************/
    var privateSchoolsPoint = new FeatureLayer_1.default({
        // Private School locations
        url: "https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Private_Schools/FeatureServer",
        renderer: schoolLocationRenderer,
        minScale: 6000000,
        maxScale: 0
    });
    var privateSchoolsPoly = new FeatureLayer_1.default({
        // Private schools per state
        // layer with rendering
        // url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/OverlaySchools/FeatureServer/0"
        // layer without rendering
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/PrivateSchoolEnrollmentNoRendering/FeatureServer/0",
        opacity: 0.8,
        renderer: renderer,
        popupTemplate: popupTemplate
    });
    var map = new Map_1.default({
        basemap: "gray-vector",
        layers: [privateSchoolsPoly, privateSchoolsPoint]
    });
    var view = new MapView_1.default({
        map: map,
        container: "viewDiv",
        zoom: 3,
        center: [-99.14, 36.48],
        popup: {
            dockEnabled: true,
            dockOptions: {
                buttonEnabled: false,
                breakpoint: false
            }
        },
        highlightOptions: {
            // yellow with 50% transparency
            color: "#ffff99",
            fillOpacity: 0.5
        }
    });
    setupLayerFilter(view);
    function setupLayerFilter(view) {
        return __awaiter(this, void 0, void 0, function () {
            var layerView, featuresMap, highlight;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, view.when];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, view.whenLayerView(privateSchoolsPoly)];
                    case 2:
                        layerView = _a.sent();
                        featuresMap = {};
                        watchUtils.whenFalseOnce(layerView, "updating", function () { return __awaiter(_this, void 0, void 0, function () {
                            var select, query, results;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        select = document.getElementById("selectState");
                                        query = privateSchoolsPoly.createQuery();
                                        query.orderByFields = ["state_name"];
                                        return [4 /*yield*/, privateSchoolsPoly.queryFeatures(query)];
                                    case 1:
                                        results = _a.sent();
                                        results.features.forEach(function (feature) {
                                            var featureId = feature.attributes.FID;
                                            var option = document.createElement("option");
                                            option.value = featureId;
                                            option.innerHTML = feature.attributes.state_name;
                                            ;
                                            select.appendChild(option);
                                            featuresMap[featureId] = feature;
                                        });
                                        select.addEventListener("change", function (e) {
                                            var featureId = select.value;
                                            if (highlight) {
                                                highlight.remove();
                                            }
                                            highlight = layerView.highlight(parseInt(featureId));
                                            view.goTo(featuresMap[featureId]);
                                        });
                                        view.ui.add("container", "top-right");
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    }
});
//# sourceMappingURL=main.js.map