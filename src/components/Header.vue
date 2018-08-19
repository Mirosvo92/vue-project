<template>
  <header class="header">
    <!-- mobile icons -->
    <div class="header-icons">
      <span class="header-icons__item"><i class="fas fa-bars fa-2x white"></i></span>
      <span class="header-icons__item"><i class="fas fa-search fa-2x white"></i></span>
    </div>
    <!-- nav -->
    <nav class="main-nav">
      <ul class="main-nav__list">
        <li class="main-nav__list-item"><router-link class="main-nav__list-item-link" exact active-class="main-nav__list-item-link--active"  to="/">{{ $t("message.home") }}</router-link></li>
        <li class="main-nav__list-item"><router-link class="main-nav__list-item-link" active-class="main-nav__list-item-link--active" to="/collection">{{ $t("message.collection") }} </router-link></li>
        <li class="main-nav__list-item"><router-link class="main-nav__list-item-link" active-class="main-nav__list-item-link--active" to="/upload">{{ $t("message.upload") }}</router-link></li>
      </ul>
      <span class="main-nav__close"><i class="fas fa-times main-color fa-2x"></i></span>
    </nav>
    <!-- search -->
    <div class="search">
      <input @input="search" class="search__input" type="text" placeholder="Search">
      <span class="search__close"><i class="fas fa-times main-color fa-2x"></i></span>
    </div>

    <!-- user link -->
    <div class="user-link" :class="{'user-link--none': isUser}">
      <ul class="user-link__list">
        <li class="user-link__list-item"><router-link class="main-nav__list-item-link" active-class="main-nav__list-item-link--active" to="/auth">{{ $t("message.signIn") }} </router-link></li>
        <li class="user-link__list-item"><router-link class="main-nav__list-item-link" active-class="main-nav__list-item-link--active" to="/create-account">{{ $t("message.createAccount") }}</router-link></li>

      </ul>
      <span class="user-link__close"><i class="fas fa-times main-color fa-2x"></i></span>
    </div>

    <!-- user active -->
    <div class="header-user" @click="openSetting" :class="{'header-user--active': isUser}">
      <div class="header-user__wrapper">
        <img class="round" v-if="userImage" :src="userImage">
        <div v-else class="round"></div>
        <span class="header-user__name">{{userName}}</span>
        <!-- user setting -->
        <ul class="user-setting" :class="{'user-setting--active': isOpenSettings}">
          <li class="user-setting__item"><router-link class="user-setting__item-link" active-class="main-nav__list-item-link--active" to="/private-room">Profile Settings</router-link></li>
          <li class="user-setting__item"><button class="user-setting__item-link" @click="signOut" >Sign Out</button></li>
        </ul>
      </div>
    </div>
    <!-- language -->
    <div class="language" @click="openLanguageDroDown">
      <span class="language__item language__item--arrow">
        {{currantLanguage}}
      </span>
      <ul class="language__list" :class="{'language__list--active': isOpenLanguage}">
        <li class="language__item" @click="setLang('en')">En</li>
        <li class="language__item" @click="setLang('ru')" >RU</li>
      </ul>
    </div>
  </header>
</template>

<script>

  import firebase from 'firebase';
  import {eventSearch} from '../main.js'
  import {eventChangedProfile} from '../main.js'
  export default {
    data(){
      return{
        name: 'Header',
        isOpenSettings: false,
        isOpenLanguage: false,
        searchValue: ''
      }
    },
    computed: {
      isUser(){
        return this.$store.state.user;
      },
      userName() {
        return this.$store.state.userName;
      },
      userImage() {
        return this.$store.state.userImage;
      },
      currantLanguage() {
        return this.$store.state.lang;
      },
    },
    methods:{
      search(event){
        const apiLink = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${event.target.value}&api_key=b54ed2730d404ef000799945ec9aa5e5&format=json`;
        this.$http.get(apiLink)
          .then(response =>{
              return response.json();
            })
          .then(tracks =>{
              if (tracks['results'] && tracks['results']['trackmatches'] && tracks['results']['trackmatches']['track']) {
                this.$router.push('/search');
                eventSearch.$emit('search', tracks['results']['trackmatches']['track']);
              } else {
                this.$router.push('/');
              }
          })

      },
      openSetting(){
        this.isOpenSettings = !this.isOpenSettings;
      },
      signOut(){
        firebase.auth().signOut()
          .then(() => this.$router.push('/'))
          .catch(error => console.log(error));
      },
      setLang: function(language){
        this.$store.dispatch('setLang', language);
      },
      openLanguageDroDown: function () {
        this.isOpenLanguage = !this.isOpenLanguage;
      }
    },
    created: function (){
      if (this.$router.currentRoute.path == '/search'){
        this.$router.push('/');
      }
      eventChangedProfile.$on('updateProfile', data =>{
        this.$store.state.userName = data.userName;
      })
    }
  }
</script>

<style lang="scss">
  .header{
    padding-left: 49px;
    padding-right: 61px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 70px;
    width: 100%;
    background-color: #282828;
  }
  //nav
  .main-nav{
    padding-right: 52px;
    width: 32%;
    &__list{
      display: flex;
      justify-content: space-between;
  }
    &__list-item{
      &:nth-of-type(2){
        margin-left: 10px;
    }
  }
    &__list-item-link{
      font-size: 18px;
      font-weight: 500;
      color: #fff;
      &:hover{
        cursor: pointer;
        color: #E84F3C;
    }
  }
    &__close{
      display: none;
  }
    &__list-item-link--active{
      color: #E84F3C;
  }
  }
  //search
  .search{
    width: 34%;
    &__input{
      padding-left: 20px;
      height: 40px;
      width: 100%;
      border-radius: 33px;
      background-color: #FFFFFF;
      box-shadow: 0 4px 8px 0 rgba(232,79,60,0.62);
      &::placeholder{
        font-weight: 400;
        font-size: 16px;
        line-height: 16px;
        color: #E84F3C;
    }
  }
    &__close{
      display: none;
  }
  }
  //user link
  .user-link{
    width: 27%;
    padding-left: 54px;
    padding-right: 19px;
    &__list{
      display: flex;
      justify-content: space-between;
  }
    &__list-item{
      position: relative;
  }
    &__list-item--none{
      display: none;
  }
    &__list-item-link{
      font-size: 18px;
      font-weight: 500;
      color: #fff;
      &:hover{
        cursor: pointer;
        color: #E84F3C;
    }
  }
    &__close{
      display: none;
  }
    &__list-item-link--active{
      color: #E84F3C;
  }
    &--none{
      display: none;
  }
  }

  //language
  .language{
    position: relative;
    width: 3%;
    padding-left: 7px;
    &__item{
      font-size: 18px;
      font-weight: 500;
      color: #fff;
      &:hover {
        cursor: pointer;
        color: #E84F3C;
    }
  }
    &__item--arrow{
      &:before{
        content: '';
        position: absolute;
        right: -13px;
        top: 13px;
        width: 7px;
        height: 2.35px;
        background-color: #fff;
        -webkit-transform: rotate(-42deg);
        transform: rotate(-42deg);
    }
      &:after{
        content: '';
        position: absolute;
        right: -8px;
        top: 13px;
        width: 7px;
        height: 2.35px;
        background-color: #fff;
        transform: rotate(42deg);
    }
      &:hover{
        cursor: pointer;
        color: #E84F3C;
        &:before{
          cursor: pointer;
          background-color: #E84F3C;
      }
        &:after{
          cursor: pointer;
          background-color: #E84F3C;
      }
    }
  }
    &__list{
      display: none;
      position: absolute;
      top: 43px;
      left: -4px;
      width: 65px;
      padding: 13px;
      background-color: #282828;
  }
    &__list--active{
      display: block;
    }
  }

  //mobile icons

  .header-icons{
    display: none;
  }

  .round{
    margin-right: 7px;
    display: inline-block;
    vertical-align: middle;
    width: 32px;
    height: 32px;
    background-color: #E84F3C;
    border-radius: 50%;
  }


  .header-user{
    display: none;
    position: relative;
    width: 27%;
    padding-left: 54px;
    padding-right: 19px;
    &__name{
      font-size: 18px;
      font-weight: 500;
      color: #E84F3C;
   }
    &--active{
      display: block;
    }
  }



  .user-setting{
    display: none;
    position: absolute;
    z-index: 3;
    max-width: 121px;
    width: 100%;
    left: 91px;
    top: 37px;
    background-color: #282828;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    &__item{
      padding: 4px 0 10px 13px;
      border-bottom: 1px solid #FFFFFF;;
  }
    &__item-link{
      font-size: 10px;
      color: #FFFFFF;
      &:hover{
        text-decoration: underline;
    }
  }
    &--active{
      display: block;
    }
  }

  @media (max-width: 1200px) {

  .header {
    padding-left: 15px;
    padding-right: 38px;
  }

  .main-nav{
    padding-right: 0;
    width: 30%;
  }

  .search{
    width: 30%;
  }

  .user-link{
    padding-left: 0;
    padding-right: 0;
    width: 24%;
  }

  .language{
    &__item--arrow{
      &:before{
        right: -20px;
    }
      &:after{
        right: -15px;
    }
  }
  }

  }

  @media (max-width: 968px) {

  .language{
    max-width: 40px;
    width: 100%;
    text-align: right;
  }

  .search{
    display: none;
    position: absolute;
    z-index: 1;
    right: -2px;
    top: 13px;
    left: 7px;
    width: 98%;
    cursor: pointer;
    &__close{
      position: absolute;
      right: -45px;
      top: 4px;
      display: block;
      width: 40px;
      height: 40px;
  }
  }

  .main-nav{
    display: none;
    position: fixed;
    top: 70px;
    left: 15px;
    padding-top: 25px;
    height: 100%;
    width: 36%;
    background-image: url(../assets/images/BG.svg);
    background-position: center top;
    background-size: 76%;
    background-color: #E84F3C;
    &__list{
      padding-top: 25px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }
    &__list-item{
      margin-bottom: 25px;
      &:nth-of-type(2){
        margin-left: 0;
    }
  }
    &__close{
      right: -30px;
      display: block;
      position: absolute;
      top: 2px;
  }
  }

  .user-link{
    display: none;
    position: fixed;
    top: 70px;
    left: 14px;
    padding-top: 25px;
    height: 100%;
    width: 36%;
    background-image: url(../assets/images/BG.svg);
    background-position: center top;
    background-size: 76%;
    background-color: #E84F3C;
    &__list{
      padding-top: 25px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }
    &__list-item{
      margin-bottom: 25px;
      &:nth-of-type(2){
        margin-left: 0;
    }
  }
    &__close{
      right: -30px;
      display: block;
      position: absolute;
      top: 2px;
  }
  }

  .header-icons{
    display: flex;
    justify-content: space-between;
    max-width: 95px;
    width: 100%;
  }

  .round{
    display: none;
  }

  .header-user{
    width: 70%;
    text-align: center;
    padding: 0;
    &--none{
      display: none;
    }
  }

  }

  @media (max-width: 480px) {

  .main-nav{
    width: 77%;
  }

  .user-link{
    width: 77%;
  }

  }

</style>
