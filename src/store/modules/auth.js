import { userService } from '../../services'
import router from '@/router'

const initialState = {
  user: {},
  loggedIn: false,
  status: {
    error: false,
    message: ''
  }
}

const authentication = {
  namespaced: true,
  state: initialState,

  getters: {
    getUser (state) {
      return JSON.parse(localStorage.getItem('user'))
    },
    isLoggedIn (state) {
      return state.loggedIn
    },
    getStatus (state) {
      return state.status
    }
  },

  actions: {
    login ({ dispatch, commit }, { username, password }) {
      userService.login(username, password)
        .then(
          (user) => {
            commit('loginSuccess', user)
            if (user.role === 'admin') {
              router.push('/')
            } else {
              router.push('/user')
            }
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
    loginSuccess (state, user) {
      state.user = user
      state.loggedIn = true
      state.status.error = false
    },
    loginFailure (state, msg) {
      state.status.message = msg
      state.user = null
      state.status.error = true
    },
    logout (state) {
      state.loggedIn = false
      state.user = null
      localStorage.removeItem('user')
    }
  }
}

export default authentication
