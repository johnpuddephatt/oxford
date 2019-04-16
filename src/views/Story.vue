<template>
  <transition appear name="slide-in-out">
    <div class="sidebar sidebar__story" v-if="showSidebar">
      <router-link :to="{ name: 'stories'}">Back</router-link>

      <h1>{{ story.title }}</h1>
      <div v-html="story.content"></div>

      <router-link v-for="(article, slug) in story.articles" :to="{ name: 'story', params: { slug: slug }}" :key="story.id">
        <div>{{ article.title }}</div>
        <small>{{ article.author }}</small>
      </router-link>

      <transition name="slide-in-out">
        <Article v-bind:article="story.articles[slug]" v-if="slug" v-bind:key="slug" />
      </transition>

    </div>
  </transition>
</template>

<script>
import Article from '../components/Article.vue'

export default {
  name: 'story',
  props: ['geoJsonPath','id', 'slug', 'showSidebar'],
  components: {
    Article
  },
  data () {
    return {
      story: '',
      dataLoaded : false,
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
</style>
