require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/widgets/Legend",
  "esri/widgets/Bookmarks",
  "esri/widgets/Expand",
  "dojo/domReady!"
], function (WebMap, MapView, Legend, Bookmarks, Expand) {
  const map = new WebMap({
    portalItem: {
      // autocast
      id: "209aa768f537468cb5f76f35baa7e013"
    }
  });
  const view = new MapView({
    container: "viewDiv",
    map: map
  });
  /******************************************************************
   *
   * Add Expand, Legend, and Bookmarks widgets
   *
   ******************************************************************/
  view.when(function () {
    const privateSchoolsPoly = map.layers.getItemAt(0);
    // Step 1: Create the Expand widget to hold
    // the Legend widget and 
    // Step 2. Specify properties
    const legend = new Expand({
      content: new Legend({
        view: view,
        style: "card"
      }),
      view: view, // Expand view
      expandIconClass: "esri-icon-layers",
      expandTooltip: "Legend",
      group: "top-right"
    });

    // Create the Expand widget to hold the Bookmarks
    // widget and specify properties
    const bookmarks = new Expand({
      content: new Bookmarks({
        view: view // Bookmarks view
      }),
      view: view, // Expand view
      expandIconClass: "esri-icon-bookmark",
      expandTooltip: "Bookmarks",
      group: "top-right" 
    });

    if (legend) {
      legend.expand();
    }

    // Step 3: Add the widgets to the view's UI, specify the docking position as well
    view.ui.add([legend, bookmarks], "top-right");
  });
});