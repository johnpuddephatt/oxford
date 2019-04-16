<template>
  <div id="app">
    <Map v-bind:geoJsonPath="geoJsonPath"></Map>
    <router-view @mapLayerChange="onMapLayerChange" :showSidebar="showSidebar"/>
    <div class="sidebar-toggle-wrap" v-bind:class="{hidden: !showSidebar}">
      <button class="button sidebar-toggle" v-on:click="showSidebar = !showSidebar">
        {{ showSidebar? '« Hide' : 'Show »' }}
      </button>
    </div>
  </div>
</template>

<script>
  import L from 'leaflet'
  import Map from './components/Map.vue'

  export default {
    components: {
      Map
    },
    data () {
      return {
        geoJsonPath: '',
        showSidebar : true,
      }
    },
    methods: {
      onMapLayerChange(value) {
        this.geoJsonPath = value;
      }
    },
  }
</script>

<style lang="scss">
@import 'scss/_variables.scss';
@import 'scss/_transitions.scss';


* {
 box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-size: $base-font-size;
  color: $base-font-color;
  line-height: 1.6;
  letter-spacing: 0.01em;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1,h2,h3,h4,h5,h6 {
  font-family: 'DIN-Black', Helvetica, Arial, sans-serif;

}

a {
  color: $blue
}

.sidebar {
  &::after{
    background-color: white;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    border-top: 1.5em solid $blue;
  }
  width: $sidebar-width;
  min-width: $sidebar-min-width;
  padding: 3em 1.5em;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: visible;
  z-index: 9;
  &.hidden {
    transform: translateX(-100%);
    overflow: visible;
  }
}

.sidebar-toggle-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 20vw;
  min-width: 20rem;
  transition: transform $speed ease;
  z-index: 99;
  &.hidden {
    // transform: translateX(-100%);
    .sidebar-toggle {
      transform: translateX(0);
    }
  }
}

.sidebar-toggle {
  transition: transform $speed ease;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2em;
  transform: translateX(0%);
}

</style>
