import WebMap from "esri/WebMap";
import MapView from "esri/views/MapView";

/******************************************************************
 *
 * Webmap example
 *
 ******************************************************************/

// Step 1: Pass a webmap instance to the map and specify the id for the webmap item
const map = new WebMap({
    portalItem: { // autocast (no need to specifically require it above)
        id: "209aa768f537468cb5f76f35baa7e013"
    }
});

const view = new MapView({
    container: "viewDiv",
    // Step 2: Set the view's map to that of the specified webmap above
    map
});