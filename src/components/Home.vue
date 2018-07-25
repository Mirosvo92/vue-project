<template>
  <div class="home-page">
    <!-- block of tracks -->
    <div class="home-page__tracks">
      <Tracks v-bind:dataTrack="dataTrack"></Tracks>
    </div>
  </div>
</template>

<script>
  import Tracks from './Tracks.vue';
  export default {
    data(){
      return{
        name: 'Home',
        tracks: [],
        dataTrack: {
          method: 'tag.gettoptracks',
          limit: '40'
        }
      }
    },
    components: {Tracks}
  }
</script>

<style lang="scss">
  .home-page{
    &__header-block{
      margin-bottom: 25px;
      display: flex;
      justify-content: space-between;
    }
  }

  .performer{
    max-width: 486px;
    width: 43%;
  }

  .album-collection{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 50%;
    &__item{
      width: 41.45%;
      margin-bottom: 18px;
      text-align: right;
      box-shadow: 1px 6px 22px -1px rgba(0,0,0,0.75);
    }
  }

  .home-page__tracks{
    margin-top: 57px;
  }

  .tracks{
    margin-left: -20px;
    margin-right: -20px;
    display: flex;
    flex-wrap: wrap;
    &__item{
      margin-bottom: 35px;
      width: 20%;
      padding: 0 20px;
    }
    &__item-song{
      width: 100%;
      box-shadow: 1px 6px 22px -1px rgba(0,0,0,0.75);
    }
  }

  @media (max-width: 1250px) {
    .album-collection{
      width: 49%;
    }
  }

  @media (max-width: 968px) {
    .tracks {
      &__item {
        width: 25%;
      }
    }
  }

  @media (max-width: 768px) {

    .home-page__header-block{
      flex-direction: column;
      align-items: center;
    }

    .home-page {
      padding: 40px 30px 32px 30px;
    }

    .performer{
      width: 100%;
    }

    .album-collection{
      margin-top: 40px;
      width: 100%;
      &__item{
        width: 45%;
        text-align: center;
      }
    }

    .tracks {
      &__item {
        width: 50%;
        display: flex;
        justify-content: center;
      }
    }

  }

  @media (max-width: 480px) {

    .album-collection{
      &__item{
        width: 100%;
      }
    }

    .tracks {
      &__item {
        width: 100%;
        display: flex;
        justify-content: center;
      }
    }

  }

</style>
