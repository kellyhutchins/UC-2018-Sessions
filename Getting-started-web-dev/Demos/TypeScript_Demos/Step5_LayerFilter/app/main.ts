import Map from "esri/Map";
import MapView from "esri/views/MapView";
import FeatureLayer from "esri/layers/FeatureLayer";
import SimpleRenderer from "esri/renderers/SimpleRenderer";
import PopupTemplate from "esri/PopupTemplate";
import watchUtils = require("esri/core/watchUtils");

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
   * Popup example
   *
   ******************************************************************/

// Step 1: Create the template
const popupTemplate = new PopupTemplate({
    title: "Private School enrollment",
    content: [{
        // Specify the type of popup element - fields
        type: "fields",
        fieldInfos: [{
            fieldName: "state_name",
            visible: true,
            label: "State name: "
        },
        {
            fieldName: "PrivateMaj",
            visible: true,
            label: "Majority grade level for private schools: "
        },
        {
            fieldName: "PrivateSch",
            visible: true,
            label: "Private school ratio to total number of schools: ",
            format: {
                places: 2,
                digitSeparator: true
            }
        },
        {
            fieldName: "TotalPriva",
            visible: true,
            label: "Total number of private schools: "
        },
        {
            fieldName: "Enrollment",
            visible: true,
            label: "Total number students enrolled in private schools: "
        },
        {
            fieldName: "PrivateEnr",
            visible: true,
            label: "Total number of private school students enrolled in ratio to total student school enrollment: ",
            format: {
                places: 2,
                digitSeparator: true
            }
        }
        ]
    },
    {
        type: "media",
        mediaInfos: [{
            title: "Ratio private and public school enrollment",
            type: "pie-chart",
            caption: "Private school enrollment in comparison to public school",
            value: {
                theme: "Julie",
                fields: ["PrivateEnr", "PublicEnro"],
                tooltipField: "PrivateEnr"
            }
        },
        {
            title: "Total number of private schools",
            type: "bar-chart",
            caption: "Total number of Private Schools in comparison to public. (Does not pertain to student enrollment.)",
            value: {
                theme: "Julie",
                fields: ["PrivateSch", "PublicScho"],
                tooltipField: "PrivateSch"
            }
        }
        ]
    }
    ]
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
    renderer,
    popupTemplate
});

const map = new Map({
    basemap: "gray-vector",
    layers: [privateSchoolsPoly, privateSchoolsPoint]
});
const view = new MapView({
    map,
    container: "viewDiv",
    zoom: 3,
    center: [-99.14, 36.48],
    popup: {
        dockEnabled: true,
        dockOptions: {
            buttonEnabled: false,
            breakpoint: false
        }
    },
    highlightOptions: {
        // yellow with 50% transparency
        color: "#ffff99",
        fillOpacity: 0.5
    }
});
setupLayerFilter(view);
async function setupLayerFilter(view) {
    await view.when;
    const layerView = await view.whenLayerView(privateSchoolsPoly);
    let featuresMap = {};
    let highlight;
    watchUtils.whenFalseOnce(layerView, "updating", async () => {
        const select = document.getElementById("selectState") as HTMLSelectElement;

        const query = privateSchoolsPoly.createQuery();
        query.orderByFields = ["state_name"];
        const results = await privateSchoolsPoly.queryFeatures(query);
        results.features.forEach((feature) => {
            const featureId = feature.attributes.FID;
            const option = document.createElement("option");
            option.value = featureId;
            option.innerHTML = feature.attributes.state_name;;
            select.appendChild(option);
            featuresMap[featureId] = feature;
        });

        select.addEventListener("change", (e) => {
            const featureId = select.value;

            if(highlight) {
                highlight.remove();
            }
            highlight = layerView.highlight(parseInt(featureId));

            view.goTo(featuresMap[featureId]);
        });

        view.ui.add("container", "top-right");

    });

}


