import { userService } from '../../services'
import router from '@/router'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null, message: '' }

const authentication = {
  namespaced: true,
  state: initialState,

  getters: {
  },

  actions: {
    login ({ dispatch, commit }, { username, password }) {
      commit('loginRequest', { username })

      userService.login(username, password)
        .then(
          (user) => {
            commit('loginSuccess', user)
            router.push('/')
          },
          (error) => {
            commit('loginFailure', error.message)
          }
        )
    },
    logout ({ commit }) {
      userService.logout()
      commit('logout')
    }
  },

  mutations: {
    loginRequest (state, user) {
      state.status = { loggingIn: true }
      state.user = user
    },
    loginSuccess (state, user) {
      state.status = { loggedIn: true }
      state.user = user
    },
    loginFailure (state, msg) {
      state.message = msg
      state.user = null
    },
    logout (state) {
      state.status = {}
      state.user = null
    }
  }
}

export default authentication
