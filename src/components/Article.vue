<template>
  <div class="article">
    <div class="article--inner">
      <div class="article--image">
        <img :src="article.image" />
      </div>
      <div class="article--content">
        <h2 class="article--title">{{ article.title }}</h2>
        <div class="article--author">{{ article.author }}</div>
        <div class="entry--content" v-html="article.content"></div>
      </div>
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
  margin: 0;
  padding: 6em 4em;
  display: flex;
  flex-direction: row;
}

.article--content {
  max-width: 48em;
}

.article--image {
  width: 6em;
  margin-right: 1em;
  flex: 0 0 6em;
  img {
    width: 100%;
    height: auto;
    border-radius: 50%;
  }
}

.article--title {
  font-size: modular-scale(5);
  margin-top: 0;
  margin-bottom: 0;
}

.article--author {
  font-size: modular-scale(0);
  font-weight: 700;
  margin-top: .5em;
  margin-bottom: 1.5em;
}
</style>
