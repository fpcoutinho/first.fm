<script async setup >
import { computed, ref } from 'vue'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const props = defineProps({
  songs: {
    type: Array,
    required: true
  }
})

const search = ref('')
const filterTableData = computed(() => {
  if (!props.songs) return []

  return props.songs.filter(
    (data) =>
      !search.value ||
      data.local.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>

<template>
  <div class="overflow-auto w-full">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>Title</th>
          <th>Artist</th>
          <th>Album</th>
          <th>Genre</th>
          <th>Data</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(song, index) in filterTableData" :key="index" class="hover">
          <td>{{ song.title }}</td>
          <td>{{ song.artist }}</td>
          <td>{{ song.album }}</td>
          <td>{{ song.genre }}</td>
          <td>
            {{ format(new Date(song.data), "yyyy", { locale: ptBR }) }}
          </td>
          <th>
            <button type="button" class="btn btn-error btn-xs">remove</button>
          </th>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>Title</th>
          <th>Artist</th>
          <th>Album</th>
          <th>Genre</th>
          <th>Data</th>
          <th></th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
