var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/renderers/SimpleRenderer", "esri/PopupTemplate"], function (require, exports, Map_1, MapView_1, FeatureLayer_1, SimpleRenderer_1, PopupTemplate_1) {
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
        basemap: "gray-vector"
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
        }
    });
    view.when(function () {
        map.addMany([privateSchoolsPoly, privateSchoolsPoint]);
        // map.add(privateSchoolsPoly);
    });
});
//# sourceMappingURL=main.js.map