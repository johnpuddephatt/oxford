<template>
  <transition appear name="slide-in-out">
    <div class="sidebar sidebar__story" v-if="showSidebar" key="sidebar">
      <div class="sidebar--header">
        <router-link class="sidebar--back" :to="{ name: 'stories'}">« View all stories</router-link>
        <h2 class="sidebar--title">{{ story.title }}</h2>
      </div>
      <div class="sidebar--scroller">
        <div class="sidebar--body" v-html="story.content"></div>
      </div>


      <div class="sidebar--item-list" v-if="dataLoaded">
        <div v-for="(article, slug) in story.articles" class="sidebar--item-list--item" :key="story.slug">
          <router-link class="sidebar--item-list--link sidebar--item-list--link__article" :to="{ name: 'story', params: { slug: slug }}">
            <img class="article-image" :src="article.image" alt="Image of "/>
            <div class="article-text">
              <h3 class="article-title">{{ article.title }}</h3>
              <div class="article-author">{{ article.author }}</div>
            </div>
            <svg class="article-button" xmlns="http://www.w3.org/2000/svg" width="812" height="594.2" viewBox="0 0 812 594.2"><path vector-effect="non-scaling-stroke" fill="none" stroke="#FFF" stroke-width="25" stroke-miterlimit="10" d="M0 297.5h805m0 4L603.6 4.8m0 584.7L805 292.8"/></svg>
          </router-link>
        </div>
      </div>

      <button class="sidebar--hide-button" v-on:click="showSidebar = false">
        « Hide sidebar
      </button>



      <transition name="slide-in-out">
        <Article v-bind:article="story.articles[slug]" v-if="slug" v-bind:key="slug" />
      </transition>

    </div>

    <button class="sidebar--show-button" v-on:click="showSidebar = true" v-else key="show-sidebar">
      Show sidebar
    </button>
  </transition>
</template>

<script>
import Article from '../components/Article.vue'

export default {
  name: 'story',
  props: ['geoJsonPath','id', 'slug'],
  components: {
    Article
  },
  data () {
    return {
      story: '',
      dataLoaded : false,
      showSidebar: true
    }
  },
  created() {
    this.fetchContent();
  },
  methods: {
    fetchContent() {
      this.axios.get('/story/' + this.id + '.html').then(result => {
        // window.setTimeout(() => {
          this.story = result.data,
          this.dataLoaded = true;
          window.foo = result.data.articles;
          this.$emit('mapLayerChange', this.story.geoJsonPath)
        // }, 500);
      });
    },
  }
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';

.sidebar__story {
  z-index: 99;
  &::after {
    border-top-color: $green;
  }
}

.sidebar--item-list--link__article {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.article-image {
  width: 4em;
  height: 4em;
  border-radius: 50%;
  margin-right: .75em;
}

.article-title {
  margin-top: 0;
  margin-bottom: .25em;
}

.article-text {
  margin-right: .75em;
}

.article-button {
  flex: 0 0 2em;
  background-color: $blue;
  border-radius: 50%;
  width: 2em;
  height: 2em;
  padding: .5em;
  margin-left: auto;
  * {
    stroke-width: 0.125rem;
  }

}
</style>
