<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="playlist" class="w-full flex flex-row gap-24 pt-10 px-0 xl:px-4">

    <!-- playlist information -->
    <div class="flex-3 flex flex-col items-center gap-3">
      <div class="overflow-hidden rounded-lg">
        <img :src="playlist.coverUrl" alt="playlist cover" width="300" height="300" class="box-border m-0">
      </div>
      <div class="flex flex-col gap-2 text-center">
        <h1 class="m-0">{{ playlist.title }}</h1>
        <p class="m-0 text-sm text-slate-400">Created by {{ playlist.userName }}</p>
        <p class="m-0">{{ playlist.description }}</p>
      </div>
      <div v-if="ownership" class="join w-full">
        <button class="btn btn-sm join-item w-1/3">Edit</button>
        <button class="btn btn-sm join-item w-1/3">Delete</button>
        <button class="btn btn-sm join-item w-1/3">Add Song</button>
      </div>
    </div>

    <!-- song list -->
    <div v-if="!playlist.length" class="flex-1 flex flex-col text-start w-full">
      This playlist doesn't have any songs yet...
    </div>
    <table-data v-else :songs="playlist.songs" />
  </div>
</template>

<script setup>
import getDocument from '@/composables/getDocument'
import getUser from '@/composables/getUser'
import { computed } from 'vue'
import TableData from '@/components/table-data.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const { user } = getUser()
const { error, document: playlist } = getDocument('playlists', props.id)

const ownership = computed(() => {
  return playlist.value && user.value && playlist.value.userId === user.value.uid
})
</script>
