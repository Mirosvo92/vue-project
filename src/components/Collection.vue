<template>
  <div class="collection">
    <Tracks v-bind:dataTrack="dataTrack"></Tracks>
  </div>
</template>

<script>
  import Tracks from './Tracks.vue';
  export default {
    data(){
      return{
        dataTrack: {
          method: 'user.gettopalbums',
          limit: '40'
        }
      }
    },
    components: {Tracks}
  }
</script>

<style lang="scss">

</style>
