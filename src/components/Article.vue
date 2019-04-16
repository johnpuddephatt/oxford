<template>
  <div class="article">
    <div class="article--inner">
      <div>{{ article.author }}</div>
      <h2 class="article-title">{{ article.title }}</h2>
      <div class="entry-content" v-html="article.content"></div>
    </div>
  </div>
</template>


<script>

export default {
  name: 'Article',
  props: ['article'],
  data () {
    return {
    }
  }
};

</script>

<style scoped lang="scss">

@import '../scss/variables.scss';

.article {
  background-color: $light-green;
  position: fixed;
  top: -1.5em;
  bottom: 0;
  right: 0;
  width: calc(100% - #{$sidebar-width});
  max-width: calc(100% - #{$sidebar-min-width});
  z-index: -1;
  overflow: hidden;
  overflow-y: auto;
  &::before, &::after {
    content: '';
    position: fixed;
    right: 0;
    top: 0;
    width: calc(100% - #{$sidebar-width});
    max-width: calc(100% - #{$sidebar-min-width});
    height: 5em;
    background-image: linear-gradient(to bottom, $light-green 0%, transparentize($light-green, 1) 100%);
  }
  &::after {
    top: auto;
    bottom: 0;
    background-image: linear-gradient(to top, $light-green 0%, transparentize($light-green, 1) 100%);
  }
}

.article--inner {
  max-width: 48em;
  margin: 0 auto;
  height: 100%;
  border: 4em solid $light-green;
}

.article-title {
  font-size: 3em;
  margin-top: .5em;
}
</style>
