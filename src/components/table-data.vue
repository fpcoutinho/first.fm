<script async setup >
const emit = defineEmits(['deleteSong'])

const props = defineProps({
  songs: {
    type: Array,
    required: true
  },
  ownership: {
    type: Boolean,
    required: true
  }
})

const deleteSong = (id) => {
  emit('deleteSong', { songId: id })
}
</script>

<template>
  <table class="table m-0">
    <!-- head -->
    <thead>
      <tr>
        <th>Title</th>
        <th>Artist</th>
        <th>Album</th>
        <th>Genre</th>
        <th>Year</th>
        <th v-if="ownership"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(song, index) in props.songs" :key="index" class="hover">
        <td>{{ song.title }}</td>
        <td>{{ song.artist }}</td>
        <td>{{ song.album }}</td>
        <td>{{ song.genre }}</td>
        <td>{{ song.year }}</td>
        <th v-if="ownership">
          <button type="button" class="btn btn-error btn-xs" @click="deleteSong(song.id)">remove</button>
        </th>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th>Title</th>
        <th>Artist</th>
        <th>Album</th>
        <th>Genre</th>
        <th>Year</th>
        <th v-if="ownership"></th>
      </tr>
    </tfoot>
  </table>
</template>
