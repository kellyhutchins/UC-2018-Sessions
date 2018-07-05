require([
  "esri/Map",
  "esri/layers/FeatureLayer",
  "esri/views/MapView",
  "dojo/domReady!"
], function (Map, FeatureLayer, MapView) {
  /******************************************************************
   *
   * Add featurelayers to the map
   *
   ******************************************************************/

  const privateSchoolsPoint = new FeatureLayer({
    // Private School locations by state
    url: "https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Private_Schools/FeatureServer"
  });

  const privateSchoolsPoly = new FeatureLayer({
    url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/PrivateSchoolEnrollmentNoRendering/FeatureServer/0"
  });

  // Set map's basemap
  const map = new Map({
    basemap: "gray-vector"
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 3,
    center: [-99.14, 36.48]
  });

  view.when(function () {
    // map.addMany([privateSchoolsPoly, privateSchoolsPoint]);
    map.add(privateSchoolsPoly);
  });
});