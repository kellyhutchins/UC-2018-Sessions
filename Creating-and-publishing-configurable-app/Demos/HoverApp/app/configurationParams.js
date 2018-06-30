{
    "configurationSettings": [{
        "category": "General",
        "fields": [{
            "type": "webmap"
        }, {
            "type": "boolean",
            "fieldName": "dockPopup",
            "label": "Dock the popup window"
        }, {
            "type": "boolean",
            "fieldName": "home",
            "label": "Add Home button"
        }, {
            "type": "conditional",
            "fieldName": "search",
            "label": "Add Search widget",
            "condition": false,
            "items": [{
                "type": "options",
                "fieldName": "searchPosition",
                "label": "Search location",
                "tooltip": "Select location for Search widget",
                "options": [{
                        "label": "Top right",
                        "value": "top-right"
                    }, {
                        "label": "Top left",
                        "value": "top-left"
                    },
                    {
                        "label": "Bottom right",
                        "value": "bottom-right"
                    },
                    {
                        "label": "Bottom left",
                        "value": "bottom-left"
                    }
                ]

            }]
        }, {
            "type": "conditional",
            "fieldName": "legend",
            "label": "Add Legend button",
            "condition": false,
            "items": [{
                "type": "options",
                "fieldName": "legendPosition",
                "label": "Legend location",
                "tooltip": "Select location for legend control",
                "options": [{
                        "label": "Top right",
                        "value": "top-right"
                    }, {
                        "label": "Top left",
                        "value": "top-left"
                    },
                    {
                        "label": "Bottom right",
                        "value": "bottom-right"
                    },
                    {
                        "label": "Bottom left",
                        "value": "bottom-left"
                    }
                ]

            }]
        }, {
            "type": "paragraph",
            "value": "Specify a layer and field used to filter the map. For example if I have a layer with book titles and I want to only display some books on the map I can pick the layer and the field with the title info. Then add a url param to the app ?filterQuery = <Name of Book>"
        }, {
            "type": "layerAndFieldSelector",
            "fieldName": "filterLayer",
            "label": "Filter layer",
            "fields": [{
                "multipleSelection": false,
                "fieldName": "filterField",
                "label": "Filter field"
            }],
            "layerOptions": {
                "supportedTypes": ["FeatureLayer", "FeatureCollection"],
                "geometryTypes": ["esriGeometryPoint", "esriGeometryLine", "esriGeometryPolyline", "esriGeometryPolygon", "esriGeometryMultipoint"]
            }
        }]
    }],
    "values": {
        "dockPopup": false,
        "legend": true,
        "legendPosition": "bottom-right",
        "home": true,
        "search": true,
        "searchPosition": "top-right"
    }
}