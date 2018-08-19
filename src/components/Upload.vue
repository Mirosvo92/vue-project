<template>
  <div class="upload">
    <Tracks v-bind:dataTrack="dataTrack"></Tracks>
  </div>
</template>

<script>
  import Tracks from './Tracks.vue';
  export default {
    data(){
      return{
        dataTrack: {
          method: 'library.getartists',
          limit: '40'
        }
      }
    },
    components: {Tracks}
  }
</script>

<style lang="scss">

</style>
