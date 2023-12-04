<template>
  <header class="navbar bg-base-100 fixed top-0 p-0 xl:px-20 w-full overflow-hidden z-10">
    <div class="flex-1">
      <router-link :to="{ name: 'Home' }" class="btn btn-ghost text-xl">First.fm</router-link>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li>
          <label class="swap swap-rotate w-9 h-9" title="Trocar Tema" aria-label="Trocar Tema">
            <input type="checkbox" :checked="isDark" @change="toggleTheme" class="theme-controller" value="sunset" />
            <span class="material-symbols-outlined swap-on fill-current">
              dark_mode
            </span>
            <span class="material-symbols-outlined swap-off fill-current">
              light_mode
            </span>
          </label>
        </li>
        <li v-if="user"><span>Hello, {{ user.displayName }}!</span></li>
        <li v-if="user">
          <router-link :to="{ name: 'CreatePlaylist' }">Create Playlist</router-link>
        </li>
        <li v-if="user"><button type="button" onclick="logout_modal.showModal()">Logout</button></li>
      </ul>
    </div>
  </header>
  <dialog id="logout_modal" class="modal modal-bottom sm:modal-middle font-open-sans">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Log out</h3>
      <p class="py-4">Are you sure you want to log out?</p>
      <div class="modal-action">
        <form class="flex gap-2" method="dialog">
          <button class="btn btn-primary" @click="signout">Log out</button>
          <button class="btn">Cancel</button>
        </form>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useLogout from '@/composables/useLogout'
import getUser from '@/composables/getUser'

const { user } = getUser()

const isDark = ref(localStorage.getItem('theme') === 'dark')
const toggleTheme = () => {
  if (isDark.value) {
    localStorage.setItem('theme', 'light')
  } else {
    localStorage.setItem('theme', 'dark')
  }
}

const router = useRouter()
const { logout, error } = useLogout()
const signout = async () => {
  logout().then(() => {
    if (!error.value) {
      router.push({ name: 'Auth' })
    }
  })
}
</script>
