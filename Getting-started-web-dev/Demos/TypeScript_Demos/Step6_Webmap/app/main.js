var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/WebMap", "esri/views/MapView"], function (require, exports, WebMap_1, MapView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    WebMap_1 = __importDefault(WebMap_1);
    MapView_1 = __importDefault(MapView_1);
    /******************************************************************
     *
     * Webmap example
     *
     ******************************************************************/
    // Step 1: Pass a webmap instance to the map and specify the id for the webmap item
    var map = new WebMap_1.default({
        portalItem: {
            id: "209aa768f537468cb5f76f35baa7e013"
        }
    });
    var view = new MapView_1.default({
        container: "viewDiv",
        // Step 2: Set the view's map to that of the specified webmap above
        map: map
    });
});
//# sourceMappingURL=main.js.map