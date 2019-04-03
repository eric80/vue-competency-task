import Vue from 'vue'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import router from '@/router'

import auth from './modules/auth'
import users from './modules/users'

const modules = {
  auth,
  users
}

Vue.use(Vuex)

const store = new Vuex.Store({
  modules
})

sync(store, router)

export default store
