<template>
  <div class="create-account">
    <div class="home-page">
      <h2 class="title-page">Create account</h2>
      <!-- form -->
      <form class="create-account" @submit.prevent="onSubmit"  autocomplete="off">
        <div class="create-account__block">
          <!-- name -->
          <div class="form-block">
            <span class="form-block__name">name*</span>
            <input class="form-block__input"
                   :class="{'error-input': $v.name.$error}"
                   @blur="$v.name.$touch()"
                   v-model="name"
                   type="text"
                   name="name"
                   />
          </div>
          <!-- mail -->
          <div class="form-block">
            <span class="form-block__name">email*</span>
            <input class="form-block__input"
                   type="text"
                   :class="{'error-input': $v.email.$error}"
                   @blur="$v.email.$touch()"
                   v-model="email"
                   name="email"/>
          </div>
          <!-- password -->
          <div class="form-block">
            <span class="form-block__name">Password (at least 6 characters)*</span>
            <input class="form-block__input"
                   :class="{'error-input': $v.password.$error}"
                   @blur="$v.password.$touch()"
                   v-model="password"
                   type="password"
                   name="password"/>
          </div>
        </div>
        <!-- create account -->
        <button class="save-button" :disabled="$v.$invalid">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
  import { required, email, minLength } from 'vuelidate/lib/validators';
  import firebase from 'firebase';
  export default {
    data(){
      return {
        name: '',
        email: '',
        password: ''
      }
    },
    validations:{
      email: {
        required,
        email
      },
      name: {
        required,
      },
      password: {
        required,
        minLength: minLength(6)
      }
    },
    methods: {
      onSubmit(){
        let self = this;
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(function(result) {
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
  .create-account{
    margin: 0 auto;
    margin-top: 25px;
    width: 70%;
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

  .save-button{
    margin-bottom: 25px;
    width: 141px;
    height: 50px;
    font-size: 20px;
    font-weight: 500;
    color: #FFFFFF;
    text-align: center;
    line-height: 25px;
    border-radius: 20px;
    background-color: #E84F3C;
    -webkit-transition: all .5s ease;
    transition: all .5s ease;
    &:hover{
      cursor: pointer;
      text-decoration: underline;
    }
  }
</style>
