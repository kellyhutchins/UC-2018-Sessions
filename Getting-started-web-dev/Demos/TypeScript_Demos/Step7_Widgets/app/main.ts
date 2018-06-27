import WebMap from "esri/WebMap";
import MapView from "esri/views/MapView";
import Legend from "esri/widgets/Legend";
import Search from "esri/widgets/Search";

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
    const legend = new Legend({
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
        } as esri.FeatureLayerSource]
    });
    // Step 3: Add the widget to the view's UI, specify the docking position as well
    view.ui.add(legend, "bottom-left");
    view.ui.add(searchWidget, "top-right");

});