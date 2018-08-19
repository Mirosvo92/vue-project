import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'
import firebase from 'firebase';
import store from './store/index.js';
import ViewResourse from 'vue-resource';
import VueI18n from 'vue-i18n';
import Vuelidate from 'vuelidate';
import VueFirestore from 'vue-firestore'

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(ViewResourse);
Vue.use(VueI18n);
Vue.use(Vuelidate);
Vue.use(VueFirestore);


// Initialize Firebase
let config = {
  apiKey: "AIzaSyBtqtRN2Yg4SHiHRrXqT513F07av8PQwvw",
  authDomain: "agilieproject.firebaseapp.com",
  databaseURL: "https://agilieproject.firebaseio.com",
  projectId: "agilieproject",
  storageBucket: "agilieproject.appspot.com",
  messagingSenderId: "198182316585"
};
firebase.initializeApp(config);

export const firestore = firebase.firestore();

const messages = {
  en: {
    message: {
      hello: 'hello world',
      home: 'Home',
      collection: 'Collection',
      upload: 'Upload',
      signIn: "Sign In",
      createAccount: 'Create account'
    }
  },
  ru: {
    message: {
      hello: 'Привет мир',
      home: 'Главная',
      collection: 'Коллекция',
      upload: 'Загрузить',
      signIn: "Войти",
      createAccount: 'Создать аккаунт'
    }
  }
};

const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
});

export const eventSearch = new Vue();
export const eventChangedProfile = new Vue();

/* eslint-disable no-new */
export const app = new Vue({
  el: '#app',
  i18n,
  store,
  router: router,
  components: { App },
  template: '<App/>',
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.state.userProfile = user;
        this.$store.state.user = true;
        this.$store.state.userName = user.displayName;
        this.$store.state.userImage = user.photoURL;
      } else {
        this.$store.state.user = null
      }
    })
  },
});





