import { createRouter, createWebHistory } from 'vue-router'
import {auth} from '@/firebase/config'

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
      component: () => import('@/views/home-view.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('@/views/auth-view.vue'),
      beforeEnter: requireNoAuth
    },
    {
      path: '/playlists/create',
      name: 'CreatePlaylist',
      component: () => import('@/views/playlists/create-playlist-view.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/playlists/:id',
      name: 'PlaylistDetails',
      component: () => import('@/views/playlists/playlist-details-view.vue'),
      beforeEnter: requireAuth,
      props: true
    },
    {
      path: '/help',
      name: 'Help',
      component: () => import('@/views/help-view.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/error-view.vue')
    },
  ],
})

export default router
