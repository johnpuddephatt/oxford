<template>
  <transition appear name="slide-in-out">
    <div class="sidebar sidebar__stories" v-if="showSidebar" key="sidebar">
      <div class="sidebar--header">
        <h3 class="sidebar--title">Who Owns Oxford?</h3>
        <p class="sidebar--subtitle">Each story explores a particular area, or issue.</p>
      </div>
      <div class="sidebar--scroller" v-if="dataLoaded">
        <div class="sidebar--item-list">
          <div class="sidebar--item-list--item" v-for="(story, key) in stories" :key="story.id">
            <div class="coming-soon has-icon" v-if="story.coming_soon == 'true'">
              <svg class="sidebar--item--icon" xmlns="http://www.w3.org/2000/svg" width="46.3" height="69.5" viewBox="0 0 46.3 69.5"><path fill="none" stroke="#000" stroke-width="2.297" stroke-miterlimit="10" d="M23.2 1.5c-12 0-21.7 9.7-21.7 21.7 0 3.8 1 7.4 2.8 10.6l.9 1.5 17.9 31.2L41 35.3c.3-.4.5-.8.8-1.3l.2-.3c1.8-3.1 2.8-6.7 2.8-10.6 0-11.9-9.7-21.6-21.6-21.6zm0 13.4c4.6 0 8.3 3.7 8.3 8.3 0 4.6-3.7 8.3-8.3 8.3-4.6 0-8.3-3.7-8.3-8.3 0-4.6 3.7-8.3 8.3-8.3z"/></svg>
              {{ story.published }}
              <div class="sidebar--item-list--index">Story {{ key + 1 }} <span class="badge">Coming soon</span></div>
              <h3 class="sidebar--item-list--title">{{story.title}}</h3>
              <p class="sidebar--item-list--intro">{{story.intro}}</p>
            </div>
            <router-link v-else class="sidebar--item-list--link has-icon" :to="{ name: 'story', params: { id: story.id }}">
              <svg class="sidebar--item--icon" xmlns="http://www.w3.org/2000/svg" width="46.3" height="69.5" viewBox="0 0 46.3 69.5"><path fill="none" stroke="#000" stroke-width="2.297" stroke-miterlimit="10" d="M23.2 1.5c-12 0-21.7 9.7-21.7 21.7 0 3.8 1 7.4 2.8 10.6l.9 1.5 17.9 31.2L41 35.3c.3-.4.5-.8.8-1.3l.2-.3c1.8-3.1 2.8-6.7 2.8-10.6 0-11.9-9.7-21.6-21.6-21.6zm0 13.4c4.6 0 8.3 3.7 8.3 8.3 0 4.6-3.7 8.3-8.3 8.3-4.6 0-8.3-3.7-8.3-8.3 0-4.6 3.7-8.3 8.3-8.3z"/></svg>
              <div class="sidebar--item-list--index">Story {{ key + 1 }}</div>
              <h3 class="sidebar--item-list--title">{{story.title}}</h3>
              <p class="sidebar--item-list--intro">{{story.intro}}</p>
            </router-link>
          </div>
        </div>
      </div>
      <button class="sidebar--hide-button" v-on:click="showSidebar = false">
        <span>«</span> Hide sidebar
      </button>
    </div>
    <button class="sidebar--show-button" v-on:click="showSidebar = true" v-else key="show-sidebar">
      Show sidebar <span>»</span>
    </button>
  </transition>
</template>

<script>
export default {
  name: 'stories',
  data() {
    return {
      dataLoaded: false,
      stories: [],
      showSidebar: true
    }
  },
  created() {
    this.fetchCollectionList();
    this.$emit('mapLayerChange', null)
  },
  methods: {
    fetchCollectionList() {
      this.axios.get('/data/stories.html').then(result => {
        this.stories = result.data.stories,
        this.dataLoaded = true;
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../scss/_variables.scss';
</style>
