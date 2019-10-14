import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import checkIn from './modules/check-in'
import checkOut from './modules/check-out'
import search from './modules/search'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    checkIn,
    checkOut,
    search
  },
  getters
})

export default store
