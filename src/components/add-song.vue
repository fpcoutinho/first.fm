<template>
  <dialog :id="props.id" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="font-bold text-lg text-center">Add a song to {{ props.parentPlaylist.title }}</h3>
      <form class="py-4 prose w-full flex flex-col gap-2" @submit.prevent="addSong">
        <div class="form-control w-full">
          <label class="label" for="title"><span class="label-text font-bold">Title</span></label>
          <input class="input input-bordered input-sm w-full" id="title" v-model="song.title" type="text" required>
        </div>
        <div class="form-control w-full">
          <label class="label" for="artist"><span class="label-text font-bold">Artist</span></label>
          <input class="input input-bordered input-sm w-full" id="artist" v-model="song.artist" type="text" required>
        </div>
        <div class="form-control w-full">
          <label class="label" for="album"><span class="label-text font-bold">Album</span></label>
          <input class="input input-bordered input-sm w-full" id="album" v-model="song.album" type="text" required>
        </div>
        <div class="form-control w-full">
          <label class="label" for="genre"><span class="label-text font-bold">Genre</span></label>
          <input class="input input-bordered input-sm w-full" id="genre" v-model="song.genre" type="text" required>
        </div>
        <div class="form-control w-full">
          <label class="label" for="year"><span class="label-text font-bold">Year</span></label>
          <input class="input input-bordered input-sm w-full" id="year" v-model="song.year" type="number" required>
        </div>
        <div class="form-control pt-4 w-full">
          <button class="btn btn-primary" type="submit">Add Song</button>
        </div>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup>
import { ref } from 'vue'
import useDocument from '@/composables/useDocument'

const props = defineProps({
  parentPlaylist: {
    type: Object,
    required: true
  },
  id: {
    type: String,
    required: true
  }
})

const { updateDocument } = useDocument('playlists', props.parentPlaylist.id)

const song = ref({
  title: '',
  artist: '',
  album: '',
  genre: '',
  year: 2023,
  id: ''
})

const addSong = async () => {
  song.value.id = Date.now().toString()
  const songs = [...props.parentPlaylist.songs, song.value]
  await updateDocument({
    songs: songs
  })
  const dialog = document.getElementById(props.id)
  dialog.close()
}
</script>
