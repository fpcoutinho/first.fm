import { createRouter, createWebHistory } from 'vue-router'
import {auth} from '../firebase/config'

const requireAuth = (to, from, next) => {
  let user = auth.currentUser
  if (!user) {
    next({ name: 'Auth' })
  } else {
    next()
  }
}

const requireNoAuth = (to, from, next) => {
  let user = auth.currentUser
  if (user) {
    next({ name: 'Home' })
  } else {
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/home-view.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('../views/auth-view.vue'),
      beforeEnter: requireNoAuth
    },
  ],
})

export default router
