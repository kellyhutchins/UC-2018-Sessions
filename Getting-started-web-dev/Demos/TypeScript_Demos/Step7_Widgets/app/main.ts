import Map from "esri/Map";
import MapView from "esri/views/MapView";

const map = new Map({
    basemap: "gray-vector"
});
const view = new MapView({
    map,
    container: "viewDiv",
    zoom: 3,
    center: [-99.14, 36.48]
});