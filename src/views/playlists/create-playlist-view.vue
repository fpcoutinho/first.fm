<template>
  <div class="form-card card bg-base-100 shadow-xl w-3/4">
    <div class="card-body items-center text-center">
      <h1 class="card-title text-2xl">Create a Playlist</h1>
      <form class="prose w-full flex flex-col gap-2" @submit.prevent="createPlaylist">
        <div class="form-control w-full">
          <label class="label" for="title">
            <span class="label-text font-bold">Title</span>
          </label>
          <input type="text" id="title" name="playlist title" placeholder="Playlist title"
            class="input input-bordered w-full" v-model="title" required />
        </div>
        <div class="form-control w-full">
          <label class="label" for="description">
            <span class="label-text font-bold">Description</span>
          </label>
          <textarea id="description" name="playlist description" placeholder="Playlist description..."
            class="input input-bordered h-24 w-full" v-model="description" required></textarea>
        </div>
        <div class="form-control w-full">
          <label class="label" for="image">
            <span class="label-text font-bold">Cover Image</span>
          </label>
          <input type="file" id="image" name="playlist image" class="file-input file-input-bordered w-full"
            @change="pickImage" />
          <div class="label">
            <span class="label-text text-error">{{ fileError }}</span>
          </div>
        </div>
        <div class="form-control w-full">
          <button class="btn btn-primary" type="submit" :disabled="fileError">Create Playlist</button>
        </div>
      </form>
      <div class="card-actions w-full justify-around items-center"></div>
    </div>
  </div>
  <dialog v-if="isPending" class="modal loading-modal" open>
    <span class="loading loading-spinner loading-lg text-primary"></span>
  </dialog>
</template>

<script setup>
import { ref } from 'vue'
import getUser from '@/composables/getUser'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import { timestamp } from '../../firebase/config'

const { collectionError, addDocument } = useCollection('playlists')
const { filePath, url, storageError, uploadImage } = useStorage()
const { user } = getUser()

const title = ref('')
const description = ref('')
const image = ref(null)
const fileError = ref(null)
const isPending = ref(false)

const createPlaylist = async () => {
  if (image.value) {
    isPending.value = true
    await uploadImage(image.value)
    if (!storageError) {
      await addDocument({
        title: title.value,
        description: description.value,
        coverUrl: url.value,
        filePath: filePath.value,
        songs: [],
        createdAt: timestamp(),
        userId: user.value.uid,
        userName: user.value.displayName,
      })
      isPending.value = false
      if (!collectionError) {
        title.value = ''
        description.value = ''
        image.value = null
        fileError.value = null
      } else {
        console.log(collectionError.value)
      }
    } else {
      console.log(storageError.value)
    }
  }
}

const types = ['image/png', 'image/jpeg']

const pickImage = (e) => {
  const file = e.target.files[0]

  if (file && types.includes(file.type)) {
    image.value = file
    fileError.value = null
  } else {
    image.value = null
    fileError.value = 'Please select an image file (png or jpeg).'
  }
}
</script>
