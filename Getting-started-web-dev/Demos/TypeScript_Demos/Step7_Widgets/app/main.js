var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/WebMap", "esri/views/MapView", "esri/widgets/Legend", "esri/widgets/Search"], function (require, exports, WebMap_1, MapView_1, Legend_1, Search_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    WebMap_1 = __importDefault(WebMap_1);
    MapView_1 = __importDefault(MapView_1);
    Legend_1 = __importDefault(Legend_1);
    Search_1 = __importDefault(Search_1);
    var map = new WebMap_1.default({
        portalItem: {
            // autocast
            id: "209aa768f537468cb5f76f35baa7e013"
        }
    });
    var view = new MapView_1.default({
        map: map,
        container: "viewDiv",
        zoom: 3,
        center: [-99.14, 36.48]
    });
    view.when(function () {
        var privateSchoolsPoly = map.layers.getItemAt(0);
        // Step 1: Create the widget 
        var legend = new Legend_1.default({
            view: view,
            style: "card",
            layerInfos: [{
                    layer: privateSchoolsPoly,
                    title: "Private school enrollment"
                }]
        });
        var searchWidget = new Search_1.default({
            view: view,
            sources: [{
                    featureLayer: {
                        url: privateSchoolsPoly.url,
                        outFields: ["*"],
                        popupTemplate: privateSchoolsPoly.popupTemplate
                    },
                    searchFields: ["state_abbr", "state_name"],
                    displayField: "state_name",
                    exactMatch: false,
                    outFields: ["*"],
                    name: "State name",
                    placeholder: "Search by state name",
                    suggestionsEnabled: true
                }]
        });
        // Step 3: Add the widget to the view's UI, specify the docking position as well
        view.ui.add(legend, "bottom-left");
        view.ui.add(searchWidget, "top-right");
    });
});
//# sourceMappingURL=main.js.map