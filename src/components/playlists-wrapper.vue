<template>
  <div class="playlists w-full flex flex-col gap-6">
    <router-link v-for="playlist in props.playlists" :key="playlist.id"
      :to="{ name: 'PlaylistDetails', params: { id: playlist.id } }" class="no-underline">
      <div class="card card-side bg-base-100 shadow-xl">
        <figure class="playlist-cover">
          <img :src="playlist.coverUrl" alt="playlist image" />
        </figure>
        <div class="card-body">
          <h3 class="card-title">{{ playlist.title }}</h3>
          <p>{{ snippet(playlist.description) }}</p>
          <p>{{ playlist.songs.length }} songs.</p>
          <p>Created by <span class="text-secondary">{{ playlist.userName }}</span>,
            {{ formattedDate(playlist.createdAt) }}.
          </p>
        </div>
      </div>
    </router-link>
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
.playlists .card {
  height: 250px;
}

.playlists .card:hover {
  transform: scale(1.01);
  transition: transform 0.2s ease-in-out;
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