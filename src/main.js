import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import appointmentsModule from './store/appointmentsModule'

Vue.config.productionTip = false

Vue.use(Vuex)
window._ = require('lodash');

let store = new Vuex.Store({ 
  modules: {
    appointmentsModule
  },
  strict: true
})


new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
