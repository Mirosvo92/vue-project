import {app} from '../main';

export const mutations = {
  [types.SET_LANG] (state, payload) {
    app.$i18n.locale = payload
  }
};
export const actions = {
  setLang({commit}, payload) {
    commit(types.SET_LANG, payload)
  }
};
