<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details w-full flex flex-row gap-24 pt-10 px-0 xl:px-4">

    <!-- playlist information -->
    <div class="flex-3 flex flex-col items-center gap-3">
      <div class="overflow-hidden rounded-lg">
        <img :src="playlist.coverUrl" alt="playlist cover" width="300" height="300"
          class="cover-image box-border m-0 object-cover">
      </div>
      <div class="flex flex-col gap-2 text-center">
        <h1 class="m-0">{{ playlist.title }}</h1>
        <p class="m-0 text-sm text-slate-400">Created by {{ playlist.userName }}</p>
        <p class="m-0">{{ playlist.description }}</p>
      </div>
      <div v-if="ownership" class="join w-full">
        <button type="button" class="btn btn-sm join-item w-1/3">Edit</button>
        <button type="button" onclick="delete_modal.showModal()" class="btn btn-sm join-item w-1/3">Delete</button>
        <button type="button" class="btn btn-sm join-item w-1/3">Add Song</button>
      </div>
    </div>

    <!-- song list -->
    <div v-if="!playlist.length" class="flex-1 flex flex-col text-start w-full">
      This playlist doesn't have any songs yet...
    </div>
    <table-data v-else :songs="playlist.songs" />
    <dialog id="delete_modal" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Delete {{ playlist.title }}</h3>
        <p class="py-4">Are you sure you want to delete the {{ playlist.title }} playlist?</p>
        <div class="modal-action">
          <form class="flex gap-2" method="dialog">
            <button class="btn btn-error" @click="deletePlaylist">Delete</button>
            <button class="btn">Cancel</button>
          </form>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    <dialog v-if="isPending" class="modal loading-modal" open>
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </dialog>
  </div>
</template>

<script setup>
import useStorage from '@/composables/useStorage'
import useDocument from '@/composables/useDocument'
import getDocument from '@/composables/getDocument'
import getUser from '@/composables/getUser'
import { computed } from 'vue'
import router from '@/router'
import TableData from '@/components/table-data.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const { user } = getUser()
const { error, document: playlist } = getDocument('playlists', props.id)
const { deleteDocument, isPending } = useDocument('playlists', props.id)
const { deleteImage } = useStorage()

const ownership = computed(() => {
  return playlist.value && user.value && playlist.value.userId === user.value.uid
})

const deletePlaylist = async () => {
  const path = playlist.value.filePath
  await deleteDocument()
  await deleteImage(path)
  router.push({ name: 'Home' })
}
</script>

<style>
.playlist-details .cover-image {
  width: 300px;
  height: 300px;
}
</style>