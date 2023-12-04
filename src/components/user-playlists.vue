<template>
  <div class="playlists">
    <div v-for="playlist in props.playlists" class="card card-side bg-base-100 shadow-xl" :key="playlist.id">
      <figure class="playlist-cover">
        <img :src="playlist.coverUrl" alt="playlist image" />
      </figure>
      <div class="card-body">
        <h3 class="card-title">{{ playlist.title }}</h3>
        <p>{{ snippet(playlist.description) }}</p>
        <p>{{ playlist.songs.length }} songs</p>
        <p>{{ formattedDate(playlist.createdAt) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDistanceToNow } from 'date-fns'

const props = defineProps({
  playlists: {
    type: Array,
    required: true
  }
})

const snippet = (text) => {
  if (text.length > 100) {
    return text.slice(0, 100) + '...'
  }
  return text
}

const formattedDate = (timestamp) => {
  return formatDistanceToNow(timestamp.toDate(), { addSuffix: true })
}
</script>

<style>
.playlists {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.playlists .card {
  height: 250px;
}

.playlists .card .card-body .card-title,
.playlists .card .card-body p {
  margin: 0;
}

.playlist-cover {
  width: 250px;
  height: 250px;
  margin: 0;
}

.playlist-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>