require([
  "esri/Map",
  "esri/layers/FeatureLayer",
  "esri/views/MapView",
  "esri/core/watchUtils",
  "esri/PopupTemplate",
  "dojo/domReady!"
], function (Map, FeatureLayer, MapView, watchUtils, PopupTemplate) {
  let highlight;
  const defaultSym = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol
    outline: {
      // autocasts as new SimpleLineSymbol
      color: "#a3acd1",
      width: 0.5
    }
  };

  /******************************************************************
   *
   * LayerRenderer
   *
   ******************************************************************/

  const renderer = {
    type: "simple", // autocasts as new SimpleRenderer
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
  };

  /***********************************
   *  Create renderer for school locations
   ************************************/

  const schoolLocationRenderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: {
      type: "picture-marker", // autocasts as new SimpleMarkerSymbol()
      url: "https://static.arcgis.com/images/Symbols/Firefly/FireflyD7.png",
      width: "18.75",
      height: "18.75"
    }
  };

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

  /******************************************************************
   *
   * Popup
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
            label: "Private school ration to total number of schools: ",
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
              fields: ["PrivateEnr", "PublicEnro"],
              tooltipField: "PrivateEnr"
            }
          }
        ]
      }
    ]
  });

  const privateSchoolsPoly = new FeatureLayer({
    url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/PrivateSchoolEnrollmentNoRendering/FeatureServer/0",
    outFields: ["*"],
    opacity: 0.8,
    renderer: renderer,
    popupTemplate: popupTemplate
  });

  // Set map's basemap and add the layers
  const map = new Map({
    basemap: "gray-vector",
    layers: [privateSchoolsPoly, privateSchoolsPoint]
  });

  // Set the MapView with additional properties
  const view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 3,
    center: [-99.14, 36.48],
    popup: {
      dockOptions: {
        position: "bottom-right"
      }
    },
    highlightOptions: {
      // yellow with 50% transparency
      color: "#ffff99",
      fillOpacity: 0.5
    }
  });
  // Create an object to hold key/value pairs for feature navigation
  let featuresMap = {};
  view.when(function () {
    view.whenLayerView(privateSchoolsPoly).then(function (layerView) {
      watchUtils.whenFalseOnce(layerView, "updating", function () {
        // If the layer is loaded and ready, query all the features
        const select = document.getElementById("selectState");
        const query = layerView.layer.createQuery();
        // Order the states alphabetically
        query.orderByFields = ["state_name"];
        // Query the features within the LayerView then
        // iterate through each and set the dropdown list to display
        // the state name alphabetically
        layerView.queryFeatures(query).then(function (results) {
          results.features.forEach(function (feature) {
            const featureId = feature.attributes.FID;
            const option = document.createElement("option");
            option.value = featureId;
            option.innerHTML = feature.attributes.state_name;
            select.appendChild(option);
            // Create a collection of features
            // to be used for zooming to the selection
            featuresMap[featureId] = feature;
          });
        });

        // Listen for the change event on the dropdown
        // and highlight the selected feature based off
        // of its FID
        select.addEventListener("change", function (e) {
          const featureId = select.value;

          if (highlight) {
            highlight.remove();
          }

          // Highlight query results
          // featureId is String so convert to Number
          highlight = layerView.highlight(parseInt(featureId));

          // Navigate to the selected feature;
          view.goTo(featuresMap[featureId]);
        });

        view.ui.add("container", "top-right");
      });
    });
  });
});