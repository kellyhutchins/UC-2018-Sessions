<!-- .slide: data-background="../reveal.js/img/title.png" -->
<!-- .slide: class="title" -->
<br>
<br>
<br>
### ArcGIS API for JavaScript:
### An Introduction
<br>
Heather Gonzago and Kelly  Hutchins

----

<!-- .slide: data-background="../reveal.js/img/slide3.png" -->
### **Agenda**
</br>
 - Setup
 - First steps
 - Working with layers
 - Symbols and renderers
 - Make the map interactive
 - Widgets

----

### **Presentations accessible via GitHub**
  </br>
  - This session focuses on version 4.x</br>
  </br>
  - Concepts remain similar between versions 3.x and 4.x</br>
  </br>
  - <a href="https://github.com/kellyhutchins/UC-2018-Sessions" target="_blank">https://github.com/kellyhutchins/UC-2018-Sessions</a>

----

### **Where do I begin?**
<a href="https://developers.arcgis.com/javascript/" target="_blank">
<img src="Images/landingPage_3.png" alt="JavaScript landing page" width="1200" height="656">
</a>

----

### **Which version of the API is best?**
<a href="https://developers.arcgis.com/javascript/latest/guide/choose-version/index.html" target="_blank">
<img src="Images/Choose_Your_Own_Version.png" alt="API functionality matrix" width="1000" height="633">
</a>

----

### **Developer Setup**
</br>
<a href="https://www.slant.co/topics/1686/~javascript-ides-or-editors" target="_blank">
<img src="Images/ides.png" alt="IDEs" width="806" height="443">
</a>

----

### **JSAPI Resources**
</br>
<a href="https://github.com/Esri/jsapi-resources" target="_blank">
<img style="float: right;" alt="JSAPI resources" src="Images/jsapiResources_2.png" width="790" height="577">
</a>
 - Includes
   - JSHint file
   - TypeScript definition file
   - Build tools, e.g. Bower
   - OAuth popup callback

----

### **Get the API**
</br>
 - <a href="https://developers.arcgis.com/javascript/latest/guide/get-api/index.html#cdn" target="_blank">CDN</a>
 - Custom builds
 - <a href="https://developers.arcgis.com/downloads/" target="_blank">Download builds</a>
</br>
</br>
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 100%;"><code data-trim> 
&lt;link rel=&quot;stylesheet&quot; href=&quot;https://js.arcgis.com/4.8/esri/css/main.css&quot;&gt; 
&lt;script src=&quot;https://js.arcgis.com/4.8/&quot;&gt;&lt;/script&gt;
</code></pre>

----

### CSS
</br>
- <a href="https://developers.arcgis.com/javascript/latest/guide/styling/index.html" target="_blank"><b>Main.css</b></a> contains styles for entire API
   <pre><code data-trim>
   &lt;link rel=&quot;stylesheet&quot; href=&quot;https://js.arcgis.com/4.8/esri/css/main.css&quot;&gt;
   </code></pre>
- <b>View.css</b> is smaller in size but better choice if only needing basic CSS (maps, widgets, etc.)
  <pre><code data-trim>
   &lt;link rel=&quot;stylesheet&quot; href=&quot;https://js.arcgis.com/4.8/esri/css/view.css&quot;&gt;
   </code></pre>
- Themes
    <pre><code data-trim>
   &lt;link rel=&quot;stylesheet&quot; href=&quot;https://js.arcgis.com/4.8/esri/themes/theme-name/main.css&quot;&gt;
   </code></pre>
- Custom CSS (SASS)

----

### **First steps**
</br>
- How will app be written?
- Separate files or one combined file?
</br>
</br>
<img style="float: center;" src="Images/Step1_Combined.png">

----

### **Demo: Make a map**
</br>
<a href="Demos/Step1_Map/" target="_blank">
  <img style="float: center;" src="Images/Step1_Demo.png">
</a>

----

### **MapView**

Visualize data within Map or Scene
<pre><code data-trim>
const view = new MapView({
  container: "viewDiv",
  map: map,
  zoom: 3,
  center: [-99.14, 36.48]
});
</code></pre>
<pre><code data-trim>
const view = new SceneView({
  container: "viewDiv",
  map: map,
  camera: {
    heading: 210,
    tilt: 78,
    position: {
      x: -8249335,
      y: 4832005,
      z: 50.7,
      spatialReference: {
        wkid: 3857
      }
    }
  }
});
</code></pre>

----

### **Common Gotchas**

- Module order makes a difference 
- Missing module <img style="float:right;" src="Images/requireNotDefined.png">
- Missing CSS <img style="float:right;" src="Images/missingCSS.png">

----

### **Add layers**
</br>
<img style="float:right;" src="Images/add-layers.png">
 - <a href="https://developers.arcgis.com/javascript/latest/api-reference/index.html#modules-in-esri-layers" target="_blank">Various layer types</a>
1. Load module </br>
2. Create layers </br>
3. Set properties </br>
4. Add to map or scene</br>
</br>
 - Basic steps remain the same

----

### **Properties**
- No need for a bunch of get/set statements
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 50%;"><code data-trim> 
const map = new Map();
map.basemap = "streets";
map.ground = "world-elevation";
const view = new MapView();
view.center = [-100, 40];
view.zoom = 6;
</code></pre>
- <a href="https://developers.arcgis.com/javascript/latest/guide/working-with-props/index.html" target="_blank">Properties</a> can be set in constructor
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 50%;"><code data-trim> 
const map = new Map({
    basemap: "streets",
    ground: "world-elevation"
});
const view = new MapView({
    map: map, 
    center: [-100, 40], 
    zoom: 6
  });
</code></pre>

----

### **Watch for property changes**
</br>
- <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#watch" target="_blank">Watch</a> for changes </br>
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 99%;"><code data-trim>
layer.watch("loadStatus", function(status) { // do something});
</code></pre></br>
</br>
- Can also use <a href="https://developers.arcgis.com/javascript/beta/api-reference/esri-core-watchUtils.html" target="_blank">esri/core/watchUtils</a> utility methods</br>
</br>
- See this in action with the <a href="https://developers.arcgis.com/javascript/latest/sample-code/watch-for-changes/index.html" target="_blank">Watch for Changes</a> sample

----

### **Demo: Add layer to sample app**
</br>
<a href="Demos/Step2_Layer/" target="_blank">
  <img style="float: center;" src="Images/Step2_Demo.png">
</a>

----

### **Renderers**
</br>
- <a href="https://developers.arcgis.com/javascript/latest/sample-code/get-started-visualization/index.html" target="_blank">Define</a> a set of symbols to use for the layer</br>
</br>
- Sets the rules on how the symbols are used</br>
</br>
- Basic coding pattern
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 99%;"><code data-trim>
const layerRenderer = new UniqueValueRenderer(); // Set the renderer
const featurelayer = new FeatureLayer({
    url: "featurelayer url",
    renderer: layerRenderer // Pass in renderer to featurelayer using default properties
})
</code></pre>

----

### **Symbols**
</br>
- Renderers use symbology, e.g. points, lines, polygons</br>
</br>
- Set the renderer's symbol
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 75%;"><code data-trim>
const symbol = new SimpleMarkerSymbol({
    // Set the properties
});
</code></pre>
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 75%;"><code data-trim>
const renderer = new UniqueValueRenderer({
    defaultSymbol: symbol, // Set symbol for renderer
    // Provide additional properties if necessary
});
</code></pre>

----

### **Autocasting**
</br>
- No need to <b>Require()</b> the module</br>
</br>
- Look for the <img style="float: center;" src="Images/autocast-label.png"> label in SDK's API Reference</br>
</br>
- <a href="https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=layers-portal" target="_blank">Create a layer from portal item sample </a> shows autocasting in action</br>
</br>
- Read more about <a href="https://developers.arcgis.com/javascript/latest/guide/autocasting/index.html" target="_blank">Autocasting</a> in the Guide</br>

----

### **Demo: Update a feature layer's renderer**
</br>
<a href="Demos/Step3_LayerRenderer/" target="_blank">
  <img style="float: center;" src="Images/Step3_Demo.png">
</a>

----

### **Map interaction using popups**
</br>
<img style="float: right;" src="Images/popupcombined.png">

- Responds to mouse clicks
</br></br>
- Provides info on:
  - feature attributes
  - location
  - search results
</br></br>
- Customizable

----

### **PopupTemplate**
- View has associated popup, can set content here
- FeatureLayer has associated <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html" target="_blank">popupTemplate</a> property
- Position the popup using *dockOptions*
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 75%;"><code data-trim>
const popupTemplate = new PopupTemplate({
    title: "Title of the popup",
    content: [{
      // Set the content here
    }]
});
</code></pre>
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 75%;"><code data-trim>
const featurelayer = new FeatureLayer({
    url: "url to the feature layer",
    outFields: ["*"],
    popupTemplate: popupTemplate,
    renderer: renderer
});
</code></pre>

----

### **Demo: Add a popup to the map**
</br>
<a href="Demos/Step4_Popup/" target="_blank">
  <img style="float: center;" src="Images/Step4_Demo.png">
</a>

----

### **Querying features**

- FeatureLayerView
  - Query and highlight graphics in the view
  - Use with large datasets
- FeatureLayer <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#querying" target="_blank">queries</a>
</br>
</br>

<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 75%;"><code data-trim>
layerView.queryFeatures(query).then(function(results) {
  results.features.forEach(function(feature) {
    const featureId = feature.attributes.FID;
    ...
</code></pre>
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 75%;"><code data-trim>
const select = document.getElementById("selectState");
select.addEventListener("change", function(e) {
  const featureId = select.value;
  highlight = layerView.highlight(parseInt(featureId));
  ...
</code></pre>

----

### **Demo: Query features within a layer**

<a href="Demos/Step5_LayerFilter/" target="_blank">
  <img style="float: center;" src="Images/Step5_Demo.png">
</a>


----

### **Using web maps**
</br>
- Reduces coding effort</br>
</br>
- Retains all customizations with rendering, popups, etc. 
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 99%;"><code data-trim>
const map = new WebMap({
    portalItem: {
      id: "209aa768f537468cb5f76f35baa7e013" // Remember, portalItem is autocasted
    }
});
</code></pre>

----

### **Demo: Add a web map to an application**
</br>
<a href="Demos/Step6_Webmap/" target="_blank">
  <img style="float: center;" src="Images/Step6_Demo.png">
</a>

----

### **Widgets**
</br>
- <a href="https://developers.arcgis.com/javascript/latest/api-reference/index.html#modules-in-esri-widgets" target="_blank">Encapsulates functionality</a>
- Similar coding pattern across all widgets
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 99%;"><code data-trim>
view.when(function){
    var featurelayer = map.layers.getItemAt(0);
    // Create widget and set its properties
    const legend = new Expand({ 
      content: new Legend({
        view: view,
        style: "card"
      }),
      view: view, // Expand view
      group: "top-right"
    });
  });
</code></pre>

----

### ** View UI**

- Position widgets
  - Add
  - Move
  - Remove
  </br>

<pre style="padding: 5px; margin: 10px auto; width: 50%;"><code data-trim>
view.ui.add([legend, bookmarks], "top-right");
</code></pre>

----

### **Demo: Add widgets to the application**
</br>
<a href="Demos/Step7_Widgets/" target="_blank">
  <img style="float: center;" src="Images/Step7_Demo.png">
</a>

----

### **Where can I get more info?**

- SDK Documentation
- Esri-related training and webinars
- JavaScript online training, free and not-so-free
- User forums, e.g. GeoNet, StackExchange, Spatial Community in Slack, etc.</br>
</br>
<a href="https://developers.arcgis.com/javascript/latest/guide/community/index.html" target="_blank">
<img style="float:bottom;" src="Images/Community.png" alt="Community" width="900" height="395">

----

### **See us here**

| Workshop  |  Location |  Time Frame |
|---|---|---|
| Intro repeat | SDCC 30E |Tuesday 7/10, 4PM |     
| ArcGIS API for JavaScript: What's New | SDCC 31B  | Tuesday 7/10, 10AM |     
| Building 3D Apps with ArcGIS API for JavaScript  | SDCC 08  | Tuesday 7/10, 2:30PM  |      
| ArcGIS API for JavaScript: The Road Ahead | SDCC 07 A/B | Wednesday 7/11, 8:30AM |
| ArcGIS API for JavaScript: Best Practices for Building Apps | SDCC 31A | Wednesday 7/11, 2:30PM | 
| Debugging ArcGIS API for JavaScript Applications | Demo Theater 06 | Wednesday 7/11, 2:30PM |

----

### **See us here (continued)**

| Workshop  |  Location |  Time Frame |
|---|---|---|
| Developing Your Own Widget | SDCC 04 | Thursday 7/12. 8:30AM |
| 2D Visualization | SDCC 33C | Thursday 7/12, 8:30AM |
| Building Mobile Apps | SDCC 16A | Thursday 7/12, 8:30AM |
| 3D Visualization | SDCC 33C | Thursday 7/12, 10AM |
| Working with Feature Layers, Dynamic Map Services, and OGC in the API| SDCC Ballroom 06D | Thursday 7/12, 10AM |

----

### **Questions???**

----

<!-- .slide: data-background="../reveal.js/img/survey.png" -->




