<template>
<!-- block of tracks -->
  <div class="tracks">
    <!-- song -->
    <div class="tracks__item" v-for="track in tracks">
      <img class="tracks__item-song" :src="track.image[2]['#text']" alt="song">
      <div _ngcontent-c11="" class="tracks__item-bottom">
        <div _ngcontent-c11="" class="tracks__item-bottom-content">

          <div _ngcontent-c11="" class="tracks__item-bottom-content-title">
            <div _ngcontent-c11=""  v-if="track.artist" >{{track.artist.name}}</div>
            <div _ngcontent-c11="">{{track.name}}</div>
          </div>
          <span _ngcontent-c11="" class="tracks__item-bottom-content-favorite"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {eventSearch} from '../main.js'
  export default {
    props: ['dataTrack'],
    data(){
      return{
        name: 'Tracks',
        tracks: []
      }
    },
    created: function(){
      if (this.dataTrack){
        this.$http.get(`http://ws.audioscrobbler.com/2.0/?method=${this.dataTrack.method}&api_key=b54ed2730d404ef000799945ec9aa5e5&&limit=${this.dataTrack.limit}&user=joanofarctan&format=json`)
          .then(response =>{
            return response.json();
          })
          .then(tracks =>{
            if (tracks.tracks){
              this.tracks = tracks.tracks.track;
            } else if (tracks.topalbums){
              this.tracks = tracks['topalbums']['album'];
              console.log(this.tracks);
            } else if (tracks.artists) {
              this.tracks = tracks['artists']['artist'];
              console.log(this.tracks);
            }
          })
      } else {
        eventSearch.$on('search', data =>{
          this.tracks = data;
        })
      }
    }
  }
</script>

<style lang="scss">

</style>
