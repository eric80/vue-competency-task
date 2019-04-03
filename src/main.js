import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router.js'
import store from './store'
import { configureFakeBackend } from './utils/fake-backend'

import 'vuetify/dist/vuetify.min.css'
import './styles/app.scss'

Vue.use(Vuetify)

Vue.config.productionTip = false

// setup fake backend
configureFakeBackend()

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
