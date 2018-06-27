require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/widgets/Legend",
  "esri/widgets/Search",
  "dojo/domReady!"
], function (WebMap, MapView, Legend, Search) {
  const map = new WebMap({
    portalItem: {
      // autocast
      id: "209aa768f537468cb5f76f35baa7e013"
    }
  });
  const view = new MapView({
    container: "viewDiv",
    map
  });
  /******************************************************************
   *
   * Widget example - Add legend widget
   *
   ******************************************************************/
  view.when(function () {
    const privateSchoolsPoly = map.layers.getItemAt(0);
    // Step 1: Create the widget
    const legend = new Legend({
      // Step 2: Specify any additional properties for the legend.
      view,
      style: "card",
      layerInfos: [{
        layer: privateSchoolsPoly,
        title: "Private school enrollment"
      }]
    });
    const searchWidget = new Search({
      view,
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