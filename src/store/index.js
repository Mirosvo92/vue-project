import Vue from 'vue'
import Vuex from 'vuex'
import {app} from '../main'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: false,
    userName: '',
    lang: 'en',
  },
  mutations: {
    setDataUser(state, payload) {
      state.user = true;
      state.userName = payload.displayName;
    },
    ['SET_LANG'] (state, payload) {
      app.$i18n.locale = payload;
      state.lang = payload;
    },
  },
  actions: {
    setLang({commit}, payload) {
      commit('SET_LANG', payload);
    }
  }
})
