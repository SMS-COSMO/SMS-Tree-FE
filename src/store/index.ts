import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      test: localStorage.getItem('test') || '0',
    };
  },
  mutations: {
    update(state, data) {
      state.test = data.test;
      localStorage.setItem('test', state.test);
    },
  },
});
