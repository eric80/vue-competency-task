import Vue from 'vue'
import Router from 'vue-router'

import AdminPage from './views/Admin'
import UserPage from './views/User'
import LoginPage from './views/auth/Login'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: AdminPage
    },
    {
      path: '/user',
      component: UserPage
    },
    {
      path: '/login',
      component: LoginPage
    },

    // otherwise redirect to home
    {
      path: '*', redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})

export default router
