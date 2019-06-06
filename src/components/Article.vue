<template>
  <div class="article">
    <router-link class="button article--back-button" :to="{ name: 'story', params: { id: storyID }}">Close article</router-link>

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
  props: ['article', 'storyID'],
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
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
  z-index: 999;
  @include min-width($medium-screen) {
    top: -1.5em;
    left: auto;
    z-index: -1;
    width: calc(100% - #{$sidebar-width});
    max-width: calc(100% - #{$sidebar-min-width});
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
}

.article--inner {
  margin: 0;
  padding: 4em 2em;
  @include min-width($large-screen) {
    padding: 6em 4em;
  }
  display: flex;
  flex-direction: row;
}

.article--content {
  max-width: 48em;
}

.article--image {
  display: none;
  @include min-width($large-screen) {
    display: block;
  }
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

.article--back-button {
  display: block;
  background-color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  text-decoration: none;
  line-height: 3em;
  width: auto;
  border: 1px solid $light-gray;
  font-size: modular-scale(-1);
  @include min-width($medium-screen) {
    font-size: modular-scale(0);
    width: 4em;
    border: none;
    height: 4em;
    text-indent: -9999px;
    top: 1em;
    right: 1em;
    left: auto;
    bottom: auto;
    background-color: $green;
    border-radius: 50%;
    &::after {
      content: '×';
      text-indent: 0;
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: modular-scale(4);
      color: white;
      transform: translate(-50%,-50%);
    }

  }
}

</style>
