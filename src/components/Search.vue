<template>
  <div class="search-page">
    <Tracks v-bind:dataTrack="dataTrack"></Tracks>
  </div>
</template>

<script>
  import Tracks from './Tracks.vue';
  import {eventSearch} from '../main.js'
  export default {
    data(){
      return{
        name: 'Search',
        dataTrack: null
      }
    },
    created: function () {

    },
    components: {Tracks}
  }
</script>
