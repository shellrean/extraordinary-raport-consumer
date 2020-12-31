import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    errors: [],
    isLoading: false,
    loadPage: false,
    token: localStorage.getItem('token'),
    baseURL: process.env.VUE_APP_URL
  },
  getters: {
    isAuth: state => {
      return state.token != "null" && state.token != null
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
