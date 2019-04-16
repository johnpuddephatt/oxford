<template>
  <transition appear name="slide-in-out">
    <div class="sidebar sidebar__stories" v-if="showSidebar">
      <h3>Who Owns Oxford?</h3>
      <p>Choose a story below.</p>
      <div class="story-list" v-if="dataLoaded">
        <div class="story-list--item" v-for="(story, key) in stories" :key="story.id">
          <router-link v-if="story.published == 'true'" class="story-list--link" :to="{ name: 'story', params: { id: story.id }}">
            <div class="story-list--index">Story {{ key + 1 }}</div>
            <h3 class="story-list--title">{{story.title}}</h3>
            <p class="story-list--intro">{{story.intro}}</p>
          </router-link>
          <div v-else>
            {{ story.published }}
            <div class="story-list--index">Story {{ key + 1 }} <span class="badge">Coming soon</span></div>
            <h3 class="story-list--title">{{story.title}}</h3>
            <p class="story-list--intro">{{story.intro}}</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'stories',
  props: ['showSidebar'],
  data() {
    return {
      dataLoaded: false,
      stories: [],
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

.story-list {
  position: relative;
  z-index: 1;
}

.story-list--item {
  margin: 2em 0;
  color: $medium-gray;
}

.story-list--link {
  display: block;
  text-decoration: none;
  margin: 0;
  position: relative;
  color: $base-font-color;
  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: -1.5em;
    top: -1em;
    bottom: -1em;
    right: -12em;
    background-image: linear-gradient(to right, $green 60%, transparentize($green, 1) 100%);
    transform: translateX(-100%);
    transition: transform 1s ease;
  }
  &:hover,
  &:focus {
    &::after {
      transform: translateX(0%);
    }
  }
}

h3 {
  margin: 0;
}
</style>
