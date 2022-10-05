import { createStore } from 'vuex'

export default createStore({
  state: {
    totalFromVuex: 10
  },
  getters: {
    doubleDuTotal(state){
      return state.totalFromVuex * 2;
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
