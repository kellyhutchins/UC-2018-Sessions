import Map from "esri/Map";
import MapView from "esri/views/MapView";
import FeatureLayer from "esri/layers/FeatureLayer";
import SimpleRenderer from "esri/renderers/SimpleRenderer";

const defaultSym = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    outline: {
        // autocasts as new SimpleLineSymbol()
        color: "#a3acd1",
        width: 0.5
    }
};


/******************************************************************
 *
 * LayerRenderer example
 *
 ******************************************************************/

// Step 1: Create individual symbols to represent each unique value

const renderer = new SimpleRenderer({
    symbol: defaultSym,
    label: "Private school enrollment ratio",
    visualVariables: [{
        type: "color",
        field: "PrivateEnr",
        stops: [{
            value: 0.044,
            color: "#edf8fb",
            label: "< 0.044"
        },
        {
            value: 0.059,
            color: "#b3cde3"
        },
        {
            value: 0.0748,
            color: "#8c96c6",
            label: "0.0748"
        },
        {
            value: 0.0899,
            color: "#8856a7"
        },
        {
            value: 0.105,
            color: "#994c99",
            label: "> 0.105"
        }
        ]
    }]
});

/***********************************
 *  Create renderer for school locations
 ************************************/

const schoolLocationRenderer = new SimpleRenderer({
    symbol: {
        type: "picture-marker", // autocasts as new SimpleMarkerSymbol()
        url: "https://static.arcgis.com/images/Symbols/Firefly/FireflyD7.png",
        width: "18.75",
        height: "18.75"
    }
});
/******************************************************************
 *
 * Create feature layers
 *
 ******************************************************************/

const privateSchoolsPoint = new FeatureLayer({
    // Private School locations
    url: "https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Private_Schools/FeatureServer",
    renderer: schoolLocationRenderer,
    minScale: 6000000, // only show at state level and below
    maxScale: 0
});

const privateSchoolsPoly = new FeatureLayer({
    // Private schools per state
    // layer with rendering
    // url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/OverlaySchools/FeatureServer/0"
    // layer without rendering
    url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/PrivateSchoolEnrollmentNoRendering/FeatureServer/0",
    opacity: 0.8,
    renderer
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
    map.addMany([privateSchoolsPoly, privateSchoolsPoint]);
    // map.add(privateSchoolsPoly);
});

