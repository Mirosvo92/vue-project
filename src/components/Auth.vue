<template>
  <div class="registration" :class="{'registration__active': isActive}">
    <div class="registration__wrapper">
      <!-- form -->
      <div class="form-registration" action="">
        <button class="form-registration__button form-registration__button--fb" @click="fbAuts"><span class="button-icon-fb" ><i class="fab fa-facebook-f fa-2x"></i></span>Continue with Facebook</button>
        <button class="form-registration__button form-registration__button--gm" @click="gmAuth" ><span class="button-icon-gm"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48" version="1.1" width="50px" height="50px">
<g id="surface1">
<path style=" fill:#FFC107;" d="M 43.609375 20.082031 L 42 20.082031 L 42 20 L 24 20 L 24 28 L 35.304688 28 C 33.652344 32.65625 29.222656 36 24 36 C 17.371094 36 12 30.628906 12 24 C 12 17.371094 17.371094 12 24 12 C 27.058594 12 29.84375 13.152344 31.960938 15.039063 L 37.617188 9.382813 C 34.046875 6.054688 29.269531 4 24 4 C 12.953125 4 4 12.953125 4 24 C 4 35.046875 12.953125 44 24 44 C 35.046875 44 44 35.046875 44 24 C 44 22.660156 43.863281 21.351563 43.609375 20.082031 Z "/>
<path style=" fill:#FF3D00;" d="M 6.304688 14.691406 L 12.878906 19.511719 C 14.65625 15.109375 18.960938 12 24 12 C 27.058594 12 29.84375 13.152344 31.960938 15.039063 L 37.617188 9.382813 C 34.046875 6.054688 29.269531 4 24 4 C 16.316406 4 9.65625 8.335938 6.304688 14.691406 Z "/>
<path style=" fill:#4CAF50;" d="M 24 44 C 29.164063 44 33.859375 42.023438 37.410156 38.808594 L 31.21875 33.570313 C 29.210938 35.089844 26.714844 36 24 36 C 18.796875 36 14.382813 32.683594 12.71875 28.054688 L 6.195313 33.078125 C 9.503906 39.554688 16.226563 44 24 44 Z "/>
<path style=" fill:#1976D2;" d="M 43.609375 20.082031 L 42 20.082031 L 42 20 L 24 20 L 24 28 L 35.304688 28 C 34.511719 30.238281 33.070313 32.164063 31.214844 33.570313 C 31.21875 33.570313 31.21875 33.570313 31.21875 33.570313 L 37.410156 38.808594 C 36.972656 39.203125 44 34 44 24 C 44 22.660156 43.863281 21.351563 43.609375 20.082031 Z "/>
</g>
</svg></span>Continue with Google</button>
        <form class="main-form" @submit.prevent="onSubmit"  autocomplete="off">
          <!-- input -->
          <input class="form-registration__input"
                 type="text"
                 :class="{'error-input': $v.email.$error}"
                 @blur="$v.email.$touch()"
                 v-model="email"
                 placeholder="Your email*"
          />
          <!-- input password -->
          <input class="form-registration__input"
                 type="password"
                 :class="{'error-input': $v.password.$error}"
                 @blur="$v.password.$touch()"
                 v-model="password"
                 placeholder="Your password (at least 6 characters)*"/>
          <!-- submit -->
          <button :disabled="$v.$invalid" class="form-registration__button form-registration__button--continue"

          >Continue</button>
        </form>
        <!-- agreement -->
        <a class="form-registration__help-link" href="">Need help?</a>
        <!-- agreement -->
        <div class="form-registration__agreement">
          <span class="form-registration__agreement-text">By signing in, you agree to our </span>&nbsp;
          <a class="form-registration__agreement-link" href="">Terms of Use.</a>
        </div>
      </div>
    </div>
    <div class="background-registration" @click="closePage"></div>
  </div>
</template>

<script>
  let provider = new firebase.auth.FacebookAuthProvider();
  import { required, email, minLength } from 'vuelidate/lib/validators';
  import firebase from 'firebase';

  export default {
    data(){
      return{
        isActive: true,
        email: '',
        password: ''
      }
    },
    validations:{
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    },
    methods:{
      fbAuts(){
        let self = this;
        firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(function(result) {
          // The signed-in user info.
          let user = result.user;
          if (user) {
            self.$router.push('/');
            self.$store.commit('setDataUser', user);
          }
        }).catch(function(error) {
          console.log(error);
        });
      },
      gmAuth(){
        let self = this;
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function(result) {
          let user = result.user;
          if (user) {
            self.$router.push('/');
            self.$store.commit('setDataUser', user);
          }
        }).catch(function(error) {
          console.log(error);
        });
      },
      closePage(){
        this.isActive = !this.isActive;
        this.$router.push('/');
      },
      onSubmit(){
        let self = this;
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(function(result) {
          console.log('result', result);
          let user = result.user;
          if (user) {
            self.$router.push('/');
            self.$store.commit('setDataUser', user);
          }
        }).catch(function(error) {
          console.log(error);
        });
      }
    }
  }
</script>

<style lang="scss">

  .registration{
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    overflow: hidden;
    &__active{
      display: block;
      height: 100%;
      padding-top: 2rem;
      padding-bottom: 2rem;
      opacity: 1;
      overflow-y: auto;
      -webkit-transition: height 0.001s ease, opacity 0.2s ease 0.001s;
      transition: height 0.001s ease, opacity 0.2s ease 0.001s;
    }
    &__wrapper{
      margin: auto;
      position: relative;
      z-index: 3;
      max-width: 495px;
      width: 100%;
      max-height: 540px;
      height: 100%;
      background-color: #fff;
    }
  }

  .background-registration{
    position: absolute;
    z-index: 1;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.65);
  }

  .main-form{
    margin-top: 15px;
    max-width: 400px;
    width: 100%;
  }

  .form-registration__input{
    margin-bottom: 15px;
  }

  .form-block{
    margin-bottom: 21px;
    width: 100%;
    &__name{
      margin-bottom: 10px;
      display: block;
      font-size: 18px;
      color: #000000;
      font-weight: 500;
    }
    &__input{
      padding-left: 10px;
      width: 100%;
      height: 40px;
      border: 1px solid #000000;
      border-radius: 3px;
    }
  }

  .form-registration{
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    &__button{
      position: relative;
      padding-left: 61px;
      max-width: 400px;
      width: 100%;
      height: 40px;
      font-size: 18px;
      font-weight: 500;
      text-align: left;
      color: #fff;
      border-radius: 3px;

    }
    &__button--fb{
      background-color: #2D4B91;
    }
    &__button--gm{
      margin-top: 11px;
      background-color: #4285F4;
    }
    &__text{
      margin: 12px 0;
      color: #000000;
      font-size: 18px;
      font-weight: 300;
    }
    &__input{
      padding-left: 10px;
      max-width: 400px;
      width: 100%;
      height: 40px;
      border: 1px solid #000000;
      border-radius: 3px;
      &::placeholder{
        padding: 16px 0 13px 10px;
        font-size: 12px;
        font-weight: 300;
        color: rgba(0,0,0,0.6);
      }
    }
    &__button--continue{
      margin-top: 12px;
      padding-left: 0;
      background-color: #E84F3C;
      font-size: 18px;
      font-weight: 500;
      line-height: 40px;
      text-align: center;
      color: #fff;
    }
    &__help-link{
      margin-top: 9px;
      display: block;
      max-width: 400px;
      width: 100%;
      text-align: right;
      font-size: 9px;
      color: #3588DD;
      &:hover{
        text-decoration: underline;
      }
    }
    &__agreement{
      margin-top: 25px;
      display: flex;
      justify-content: center;
    }
    &__agreement-text{
      font-size: 9px;
      color: #949494;
    }
    &__agreement-link{
      font-size: 9px;
      color: #3588DD;
      &:hover{
        text-decoration: underline;
      }
    }

  }

  .button-icon-fb{
    position: absolute;
    left: 13px;
    top: 3px;
  }

  .button-icon-gm {
    position: absolute;
    left: 1px;
    top: 1.2px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 38px;
    width: 39px;
    border-radius: 3px;
    background-color: #FFFFFF;
    svg{
      width: 17px;
      height: 18px;
    }
  }

  @media (max-width: 480px) {
    .form-registration{
      &__button{
        font-size: 13px;
      }
    }

    .button-icon-fb{
      top: 6px;
    }
  }

</style>
