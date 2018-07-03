/*
  Copyright 2017 Esri

  Licensed under the Apache License, Version 2.0 (the "License");

  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software

  distributed under the License is distributed on an "AS IS" BASIS,

  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

  See the License for the specific language governing permissions and

  limitations under the License.​
*/

import ApplicationBase = require("ApplicationBase/ApplicationBase");

import i18n = require("dojo/i18n!./nls/resources");
import watchUtils = require("esri/core/watchUtils");
import requireUtils = require("esri/core/requireUtils");
import esri = __esri;
const CSS = {
  loading: "configurable-application--loading"
};

import {
  createMapFromItem,
  createView,
  getConfigViewProperties,
  getItemTitle,
  findQuery,
  goToMarker
} from "ApplicationBase/support/itemUtils";

import {
  setPageLocale,
  setPageDirection,
  setPageTitle
} from "ApplicationBase/support/domHelper";

import {
  ApplicationConfig,
  ApplicationBaseSettings
} from "ApplicationBase/interfaces";

class MapExample {

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  ApplicationBase
  //----------------------------------
  base: ApplicationBase = null;
  view: esri.MapView = null;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  public init(base: ApplicationBase): void {
    if (!base) {
      console.error("ApplicationBase is not defined");
      return;
    }

    setPageLocale(base.locale);
    setPageDirection(base.direction);

    this.base = base;

    const { config, results, settings } = base;
    const { find, marker } = config;
    const { webMapItems } = results;

    const validWebMapItems = webMapItems.map(response => {
      return response.value;
    });

    const firstItem = validWebMapItems[0];

    if (!firstItem) {
      console.error("Could not load an item to display");
      return;
    }

    config.title = !config.title ? getItemTitle(firstItem) : "";
    setPageTitle(config.title);

    const portalItem: any = this.base.results.applicationItem.value;
    const appProxies = (portalItem && portalItem.appProxies) ? portalItem.appProxies : null;

    const viewContainerNode = document.getElementById("viewContainer");
    const defaultViewProperties = getConfigViewProperties(config);

    validWebMapItems.forEach(item => {
      const viewNode = document.createElement("div");
      viewContainerNode.appendChild(viewNode);

      const container = {
        container: viewNode
      };

      const viewProperties = {
        ...defaultViewProperties,
        ...container
      };

      const { basemapUrl, basemapReferenceUrl } = config;

      createMapFromItem({ item, appProxies })
        .then(map => createView({
          ...viewProperties,
          map
        }).then((view) => {
          this.view = view as esri.MapView;
          this.setupView(find, marker);
        }));
    });
    document.body.classList.remove(CSS.loading);
  }
  setupView(find, marker) {
    findQuery(find, this.view);
    goToMarker(marker, this.view);
    this.setupPopup();
    this.addOptionalWidgets();
    this.addUrlFilterSupport();
  }
  setupPopup() {
    if (this.base.config.dockPopup) {
      this.view.popup.dockEnabled = true;
      this.view.popup.dockOptions = {
        position: "auto",
        breakpoint: false
      };
    }
    // always remove dock, zoom, close  
    this.view.popup.dockOptions.buttonEnabled = false;
    this.view.popup.highlightEnabled = true;
    this.view.popup.actions.removeAll();

    // Highlight layer options (WebGL must be enabled for FL)
    this.view.highlightOptions = {
      color: "#00FFFF" as any,
      haloOpacity: 1,
      fillOpacity: 1
    } as esri.MapViewHighlightOptions;

    // setup hover hit test 
    let lastHitTest = null;
    this.view.on("pointer-move", (evt) => {
      clearTimeout(lastHitTest);
      // add a tiny delay before testing move 
      lastHitTest = setTimeout(() => {
        this.handlePointerMove(evt);
      }, 50);
    });

  }
  async addUrlFilterSupport() {
    // filter by url param to see only some content
    if (this.base.config.filterQuery && this.base.config.filterLayer) {
      const layerId = this.base.config.filterLayer.id;
      const layerField = this.base.config.filterLayer.fields[0].fields[0];
      // get the layer and filter to show only selected features  
      const filterLayer = this.view.map.findLayerById(layerId) as esri.FeatureLayer;
      const expression = `${layerField}='${this.base.config.filterQuery}'`;
      // zoom to queried features 
      const flayerView = await this.view.whenLayerView(filterLayer) as esri.FeatureLayerView;
      watchUtils.whenFalseOnce(flayerView, "updating", async () => {
        filterLayer.definitionExpression = expression;
        const query = filterLayer.createQuery();
        query.where = expression;
        const results = await flayerView.queryExtent(query);
        this.view.goTo(results.extent);
      });
    }

  }
  async addOptionalWidgets() {
    if (this.base.config.search) {
      const searchRequire = await requireUtils.when(require, ["esri/widgets/Search"]);
      if (searchRequire && searchRequire.length && searchRequire.length > 0) {
        const Search = searchRequire[0];
        const searchWidget = new Search({
          view: this.view
        });
        this.view.ui.add(searchWidget, this.base.config.searchPosition);
      }
    }
    if (this.base.config.home) {
      const homeRequire = await requireUtils.when(require, ["esri/widgets/Home"]);
      if (homeRequire && homeRequire.length && homeRequire.length > 0) {
        const Home = homeRequire[0];
        const homeWidget = new Home({
          view: this.view
        });
        this.view.ui.add(homeWidget, "top-left");
      }
    }
    if (this.base.config.legend) {
      const requires = await requireUtils.when(require, ["esri/widgets/Legend", "esri/widgets/Expand"]);
      if (requires && requires.length && requires.length > 1) {
        const Legend = requires[0];
        const Expand = requires[1];
        const legendWidget = new Legend({
          view: this.view,
          style: "card"
        });
        const expand = new Expand({
          view: this.view,
          content: legendWidget
        });
        this.view.ui.add(expand, this.base.config.legendPosition);
      }
    }
  }
  async handlePointerMove(evt) {
    try {
      const results = await this.view.hitTest(evt);
      if (results && results.results && results.results.length > 0) {
        const feature: esri.Graphic = results.results[0].graphic;
        if (feature.layer.declaredClass === "esri.layers.FeatureLayer") {
          const layer = feature.layer as esri.FeatureLayer;

          if (layer.popupEnabled && layer.popupTemplate) {
            this.setCursor("pointer");
            // is the displayed feature currently showing? 
            if (this.view.popup.selectedFeature !== feature) {
              this.view.popup.open({
                features: [feature],
                updateLocationEnabled: true
              });
            }
          } else {
            this.setCursor("default");
          }
        }
      } else {
        this.view.popup.close();
      }
    } catch (e) {
      console.log("There was an error", e);
    }
  }
  setCursor(cursor) {
    const viewContainer: HTMLDivElement = this.view.container as HTMLDivElement;
    const currentCursor = viewContainer.style.cursor;
    if (currentCursor !== cursor) {
      viewContainer.style.cursor = cursor;
    }
  }
}


export = MapExample;
