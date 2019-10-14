import { fetchCheckInList } from '@/api/check-in'

const state = {
  requestList: []
}

const mutations = {
  SET_REQUESTLIST: (state, newList) => {
    state.requestList = newList
  }
}

const actions = {
  getReqList({ commit }) {
    return new Promise((resolve, reject) => {
      fetchCheckInList(localStorage['centre'], localStorage['counter'], localStorage['name'], localStorage['token']).then(res => {
        console.log('actions res:', res)
        commit('SET_REQUESTLIST', res.checkInQueue)
        resolve()
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

