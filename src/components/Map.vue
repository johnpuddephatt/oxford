<template>
  <div id="map">
    <l-map
       :zoom="zoom"
       :center="center"
       :bounds="bounds"
       :options="mapOptions"
       @update:center="centerUpdate"
       @update:zoom="zoomUpdate"
       @update:bounds="boundsUpdated"
       @layeradd="layerAdded"
     >
     <l-tile-layer
       :url="url"
       :attribution="attribution"
     />
     <l-control-zoom :position="'bottomright'" />

     <l-geo-json v-if="this.geojson"
      :geojson="geojson"
      :options="options"
      :options-style="styleFunction"
      ref="geojsonlayer"
    />
     <!-- <l-marker :lat-lng="withPopup">
       <l-popup>
         <div @click="innerClick">
           I am a popup
           <p v-show="showParagraph">
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi. Donec finibus semper metus id malesuada.
           </p>
         </div>
       </l-popup>
     </l-marker>
     <l-marker :lat-lng="withTooltip">
       <l-tooltip :options="{permanent: true, interactive: true}">
         <div @click="innerClick">
           I am a tooltip
           <p v-show="showParagraph">
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi. Donec finibus semper metus id malesuada.
           </p>
         </div>
       </l-tooltip>
     </l-marker> -->
   </l-map>
 </div>
</template>


<script>
import { LMap, LTileLayer, LMarker, LPopup, LTooltip, LGeoJson, LControlZoom } from 'vue2-leaflet';
export default {
  name: 'Map',
  props: ['geoJsonPath'],
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
    LGeoJson,
    LControlZoom
  },
  data () {
    return {
      geojson: null,
      fillColor: '#e4ce7f',
      zoom: 13,
      bounds: null,
      maxBounds: L.latLngBounds([[40.70081290280357, -74.26963806152345], [40.82991732677597, -74.08716201782228]]),
      show: true,
      enableTooltip: true,
      center: L.latLng(51.7520, -1.2577),
      url: 'https://api.mapbox.com/styles/v1/johnpuddephatt/cjtajqi1z19f31gl80guf6t1k/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9obnB1ZGRlcGhhdHQiLCJhIjoiY2p0YWpidHBzMDZuajN5cGZ1cjJ1NDQ3dCJ9.KfXAwXnUBlD8ZUBXbl6Yxw',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      id: 'mapbox.streets',
      withPopup: L.latLng(51.7410, -1.2786),
      withTooltip: L.latLng(47.414220, -1.250482),
      currentZoom: 11.5,
      currentCenter: L.latLng(47.413220, -1.219482),
      showParagraph: false,
      mapOptions: {
        zoomControl: false,
        zoomSnap: 0.5
      },
      colors: {
        Charity: '#A3E4B6',
        Utility: '#6F6F9C',
        Farm: '#4B7E56',
        Investor: '#F8B051',
        Developer: '#FE5A22',
        Estate: '#FB6768',
        Public: '#94BB72',
        Industry: '#904C7A',
        College: '#357790',
        Church: '#F4E488'
      }
    };
  },
  methods: {
    zoomUpdate (zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate (center) {
      this.currentCenter = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    },
    showLongText () {
      this.showParagraph = !this.showParagraph;
    },
    innerClick () {
      alert('Click!');
    },
    layerUpdate (path) {
      this.loading = true;
      this.axios.get(path).then(response => {
        this.geojson = response.data;
        this.loading = false;
        window.setTimeout(() => {
          this.bounds = this.$refs.geojsonlayer.getBounds();
        }, 500);
      });
    },
    layerAdded(e) {
    }
  },
  watch: {
    geoJsonPath: function (path) {
      if(path) {
        this.layerUpdate(path);
      }
      else {
        this.geojson = null
      }
    }
  },
  computed: {
    options () {
      return {
        onEachFeature: this.onEachFeatureFunction
      };
    },
    styleFunction () {
      const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
      return () => {
        return {
          weight: 0,
          color: '#EC00F1',
          opacity: 1,
          fillColor: fillColor,
          fillOpacity: 1
        };
      };
    },
    onEachFeatureFunction () {

      if (!this.enableTooltip) {
        return () => {};
      }
      else {
        return (feature, layer) => {
          layer.bindTooltip('<div>Owner: ' + feature.properties.owner + '</div><div>Type: ' + feature.properties.ownertype + '</div><div>Source: ' + feature.properties.source + '</div>', { permanent: false, sticky: true });
          this.colors[feature.properties.type];
          layer.options.fillColor = this.colors[feature.properties.ownertype];
        };
      }
    },
  },
  created () {
  }

};

</script>

<style lang="scss">

  @import '~leaflet/dist/leaflet.css';

  #map {
    width: 100vw;
    height: 100vh;
    position: fixed;
    right: 0;
    z-index: -99;
    transition: width .3s ease;
  }

  .leaflet-interactive {
    animation: fadeIn 2s ease;
    opacity: 0.5;
    stroke-width: .15em;
    stroke: currentColor;
    transition: opacity 1s ease;
    &:hover {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
