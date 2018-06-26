import Map from "esri/Map";
import MapView from "esri/views/MapView";
import FeatureLayer from "esri/layers/FeatureLayer";
/******************************************************************
 *
 * Add featurelayers to the map example
 *
 ******************************************************************/

const privateSchoolsPoint = new FeatureLayer({
    // Private School locations by state
    url: "https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Private_Schools/FeatureServer"
});

const privateSchoolsPoly = new FeatureLayer({
    url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/PrivateSchoolEnrollmentNoRendering/FeatureServer/0"
});


const map = new Map({
    basemap: "gray-vector"
});
const view = new MapView({
    map,
    container: "viewDiv",
    zoom: 3,
    center: [-99.14, 36.48]
});

view.when(() => {
    // map.addMany([privateSchoolsPoly, privateSchoolsPoint]);
    map.add(privateSchoolsPoly);
});