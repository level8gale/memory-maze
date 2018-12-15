import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
      children: [
        {
          path: '/',
          component: require('@/components/MainPage/Index').default
        },
        {
          path: '/task/add',
          component: require('@/components/Task/Add').default
        },
        {
          path: '/task/progress',
          component: require('@/components/Task/Progress').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
