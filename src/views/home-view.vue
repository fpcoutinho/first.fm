<template>
  <div>
    <h1>Home</h1>
    <div v-if="errorGet" class="text-error">{{ errorGet }}</div>
    <user-playlists v-else :playlists="playlists" />
  </div>
</template>

<script setup>
import UserPlaylists from '../components/user-playlists.vue'
import getUser from '../composables/getUser'
import getCollection from '../composables/getCollection'
import { watch, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { user } = getUser()
const { documents, errorGet } = getCollection('playlists')

const playlists = computed(() => {
  if (documents.value) return documents.value.filter((playlist) => playlist.userId === user.value.uid)
  else return []
})

watch(user, () => {
  if (!user.value) {
    router.push({ name: 'Auth' })
  }
})
</script>
