import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/stories',
      name: 'stories',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "stories" */ './views/Stories.vue'),
    },
    {
      path: '/stories/:id/:slug?',
      name: 'story',
      component: () => import(/* webpackChunkName: "stories" */ './views/Story.vue'),
      props: true
    },
    // {
    //   path: '/stories/:id/:author',
    //   name: 'article',
    //   component: () => import(/* webpackChunkName: "stories" */ './views/Story.vue'),
    //   props: true
    // }
  ]
})
