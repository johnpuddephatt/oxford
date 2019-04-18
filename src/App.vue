<template>
  <div id="app">
    <Map v-bind:geoJsonPath="geoJsonPath"></Map>
    <router-view @mapLayerChange="onMapLayerChange"/>
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
  line-height: $base-line-height;
  letter-spacing: 0.01em;
}

#app {
  font-family: $base-font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1,h2,h3,h4,h5,h6 {
  font-family: $heading-font-family;
  color: $heading-font-color;
  line-height: $heading-line-height;
  letter-spacing: 0.03em;

}

a {
  color: $base-font-color;
}

p {
  margin: 0 0 .75em;
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
  padding-top: 1em;
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: visible;
  z-index: 9;
}

.sidebar--title {
  font-size: modular-scale(3);
  margin-top: .25em;
  margin-bottom: 0;
}

.sidebar--subtitle {
  font-weight: 500;
  margin-top: 1em;
}

.sidebar--header {
  padding: 2em 2em 0;
  p:last-child {
    margin-bottom: 0;
  }
}

.sidebar--body {
  flex: 1 1 auto;
  padding: 0 2em;
}

.sidebar--hide-button,
.sidebar--show-button {
  margin-top: auto;
  width: 100%;
  display: block;
  -webkit-appearance: none;
  background: none;
  line-height: 3em;
  font-size: modular-scale(-1);
  border: none;
  padding: 0 1em;
  border-top: 1px solid $light-gray;
  color: $medium-gray;
  transition: color $speed ease;
  &:hover {
    color: $blue;
  }
}

.sidebar--show-button {
  background-color: white;
  position: absolute;
  bottom: 0;
  left: 0;
  width: auto;
  border: 1px solid $light-gray;
}

.sidebar--back {
  text-decoration: none;
  color: $medium-gray;
  font-size: modular-scale(-1);
  transition: all $speed ease;
  &:hover {
    color: $blue;
  }
}

.sidebar--item-list {
  position: relative;
  z-index: 1;

  padding: 1em 2em 0;
  margin-top: auto;
}

.sidebar--scroller {
  flex: 1;
  overflow: hidden;
  position: relative;
  margin-top: .5em;
  > * {
     height: 100%;
     overflow-y: auto;
     padding-top: 1em;
     // padding-bottom: 1em;
  }
  &::before, &::after {
    pointer-events: none;
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    z-index: 99;
    width: 100%;
    height: 2em;
    background-image: linear-gradient(to bottom, #ffffff 0%, transparentize(#ffffff, 1) 100%);
  }
  &::after {
    bottom: 0;
    top: auto;
    background-image: linear-gradient(to top, #ffffff 0%, transparentize(#ffffff, 1) 100%);
  }
}

.sidebar--item-list--item {
  margin: 2.5em 0;
  .coming-soon * {
    color: $light-gray;
  }
  &:first-child {
    // margin-top: 1.25em;
  }
  &:last-child {
    margin-bottom: 1.25em;
  }
  .has-icon {
    padding-left: 2.75em;
    position: relative;
  }

}

.sidebar--item--icon {
  width: 2em;
  height: auto;
  position: absolute;
  left: 0;
  top: 2em;
  path {
    stroke: $medium-gray;
    transition: stroke $speed ease;
  }

}

.sidebar--item-list--link {
  display: block;
  text-decoration: none;
  margin: 0;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: -2em;
    top: -1.5em;
    bottom: -1.5em;
    right: -6em;
    background-image: linear-gradient(to right, $green 85%, transparentize($green, 1) 100%);
    transform: translateX(-100%);
    transition: transform 1s ease;
  }
  &:hover,
  &:focus {
    &::after {
      transform: translateX(0%);
    }
    .sidebar--item--icon {
      path {
        stroke: $blue;
      }
    }
  }
}

.sidebar--item-list--title {
  margin: .25em 0;
}

.sidebar--item-list--index {
  font-size: modular-scale(-1);
  .badge {
    background-color: $light-gray;
    display: inline-block;
    border-radius: 3px;
    text-transform: lowercase;
    color: $blue;
    margin-left: .5em;
    padding: 0 .5em;
    font-weight: 500;
  }
}
</style>
