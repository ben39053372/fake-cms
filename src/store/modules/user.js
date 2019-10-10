import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  password: '',
  centre: '',
  counter: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    localStorage.setItem('token', token)
  },
  SET_NAME: (state, name) => {
    state.name = name
    localStorage.setItem('name', name)
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
    localStorage.setItem('avatar', avatar)
  },
  SET_PASSWORDMD5: (state, passwordmd5) => {
    state.password = passwordmd5
    localStorage.setItem('password', passwordmd5)
  },
  SET_CENTRE: (state, centre) => {
    state.centre = centre
    localStorage.setItem('centre', centre)
  },
  SET_COUNTER: (state, counter) => {
    state.counter = counter
    localStorage.setItem('centre', counter)
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    console.log('userInfo', userInfo)
    console.log('userInfo', userInfo.username)
    console.log('userInfo', userInfo.password)
    const { username, password, centre, counter } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, centre, counter }).then(response => {
        //const { data } = response
        console.log(response)
        commit('SET_TOKEN', response.userAuth.staffToken)
        commit('SET_NAME', username)
        commit('SET_PASSWORDMD5', password)
        commit('SET_CENTRE', centre)
        commit('SET_COUNTER', counter)
        setToken(response.userAuth.staffToken)
        resolve()
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    console.log('getInfo')
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(window.localStorage.getItem('token'), window.localStorage.getItem('name'), window.localStorage.getItem('password')).then((res) => {
        console.log(res)
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        localStorage.clear()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

