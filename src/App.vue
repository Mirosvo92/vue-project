<template>
    <div id="app">
      <div class="container">
        <div class="main-wrapper">
          <Header></Header>
          <Content></Content>
          <Footer></Footer>
        </div>
      </div>
    </div>
</template>

<script>
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'
  import Content from './components/Content.vue'
  export default {
    name: 'App',
    components: {Header, Footer, Content}
  }
</script>

<style lang="scss">
  @import "css/reset.scss";
  @import "css/main.scss";
  body{
    font-family: "Gotham Pro",  sans-serif;
    font-size: 16px;
    background-image: url("assets/images/BG.svg");
    background-position: center;
    background-color: #E84F3C;
  }

  .footer{
    min-height: 70px;
    width: 100%;
    background-color: #282828;
  }

  .main-wrapper{
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow-x: hidden;
    background-color: #fff;
  }

  .flex-grow{
    flex-grow: 1;
  }
  //grid
  .container {
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
  }

  @media (min-width: 1280px) {
    .container {
      width: 1250px;
    }
  }

  .row {
    margin-left: -15px;
    margin-right: -15px;
  }

  //common style
  .center-block {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .none{
    display: none;
  }

  .main-color{
    color: #E84F3C;
  }

  .all-space-parent{
    width: 100%;
    height: 100%;
  }

  .white{
    color: #fff;
  }
</style>
