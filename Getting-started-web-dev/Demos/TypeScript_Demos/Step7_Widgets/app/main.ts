import WebMap from "esri/WebMap";
import MapView from "esri/views/MapView";
import Legend from "esri/widgets/Legend";
import Expand from "esri/widgets/Expand";
import Bookmarks from "esri/widgets/Bookmarks";


import esri = __esri;

const map = new WebMap({
  portalItem: {
    // autocast
    id: "209aa768f537468cb5f76f35baa7e013"
  }
});

const view = new MapView({
    map,
    container: "viewDiv",
    zoom: 3,
    center: [-99.14, 36.48]
});

view.when(() => {
  const privateSchoolsPoly = map.layers.getItemAt(0) as esri.FeatureLayer;
    // Step 1: Create the widget
    const bookmarks = new Expand({
      content: new Bookmarks({
          view // Bookmarks view
      }),
      view, // Expand view
      expandIconClass: "esri-icon-bookmark",
      expandTooltip: "Bookmarks",
      group: "top-right" 
    });

    const legend = new Expand({
        content: new Legend({
            view, // Legend view
            style: "card"
        }),
        view, // Expand view
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