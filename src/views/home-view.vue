<template>
  <h1>All Playlists</h1>
  <div v-if="errorGet" class="text-error">{{ errorGet }}</div>
  <div v-else-if="!documents" class="text-center pt-12">
    <span class="text-lg">It looks like you don't have any playlists yet...</span>
  </div>
  <playlists-wrapper v-else :playlists="documents" />
</template>

<script setup>
import PlaylistsWrapper from '@/components/playlists-wrapper.vue'
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'
import { watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { user } = getUser()
const { documents, errorGet } = getCollection('playlists')

watch(user, () => {
  if (!user.value) {
    router.push({ name: 'Auth' })
  }
})
</script>
