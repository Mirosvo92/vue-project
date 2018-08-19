<template>
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        component: {}
      }
    }
  }
</script>

<style lang="scss">
  .content{
    flex-grow: 1;
  }
</style>
