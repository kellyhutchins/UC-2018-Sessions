var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer"], function (require, exports, Map_1, MapView_1, FeatureLayer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Map_1 = __importDefault(Map_1);
    MapView_1 = __importDefault(MapView_1);
    FeatureLayer_1 = __importDefault(FeatureLayer_1);
    /******************************************************************
     *
     * Add featurelayers to the map example
     *
     ******************************************************************/
    var privateSchoolsPoint = new FeatureLayer_1.default({
        // Private School locations by state
        url: "https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Private_Schools/FeatureServer"
    });
    var privateSchoolsPoly = new FeatureLayer_1.default({
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/PrivateSchoolEnrollmentNoRendering/FeatureServer/0"
    });
    var map = new Map_1.default({
        basemap: "gray-vector"
    });
    var view = new MapView_1.default({
        map: map,
        container: "viewDiv",
        zoom: 3,
        center: [-99.14, 36.48]
    });
    view.when(function () {
        // map.addMany([privateSchoolsPoly, privateSchoolsPoint]);
        map.add(privateSchoolsPoly);
    });
});
//# sourceMappingURL=main.js.map