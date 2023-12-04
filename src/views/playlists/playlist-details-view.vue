<template>
  <div v-if="error" class="text-error">{{ error }}</div>
  <div v-else-if="!error && document" class="form-card card bg-base-100 shadow-xl w-3/4">
    <div class="card-body items-center text-center">
      <h1 class="card-title text-2xl">{{ document.title }}</h1>
      <p class="text-base-content">{{ document.description }}</p>
      <div class="card-actions w-full justify-around items-center">
        <button class="btn btn-primary">
          Edit Playlist
        </button>
        <button class="btn btn-primary">
          Add Track
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import getDocument from '@/composables/getDocument'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const { document, error } = getDocument('playlists', props.id)
</script>

<style scoped></style>