var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/WebMap", "esri/views/MapView", "esri/widgets/Legend", "esri/widgets/Expand", "esri/widgets/Bookmarks"], function (require, exports, WebMap_1, MapView_1, Legend_1, Expand_1, Bookmarks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    WebMap_1 = __importDefault(WebMap_1);
    MapView_1 = __importDefault(MapView_1);
    Legend_1 = __importDefault(Legend_1);
    Expand_1 = __importDefault(Expand_1);
    Bookmarks_1 = __importDefault(Bookmarks_1);
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
        var bookmarks = new Expand_1.default({
            content: new Bookmarks_1.default({
                view: view // Bookmarks view
            }),
            view: view,
            expandIconClass: "esri-icon-bookmark",
            expandTooltip: "Bookmarks",
            group: "top-right"
        });
        var legend = new Expand_1.default({
            content: new Legend_1.default({
                view: view,
                style: "card"
            }),
            view: view,
            expandIconClass: "esri-icon-layers",
            expandTooltip: "Legend",
            group: "top-right"
        });
        if (legend) {
            legend.expand();
        }
        // Step 3: Add the widgets to the view's UI, specify the group position as well
        view.ui.add([legend, bookmarks], "top-right");
    });
});
//# sourceMappingURL=main.js.map