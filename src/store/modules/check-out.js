import { fetchCheckedInList } from '@/api/check-out'
const state = {
  checkedInList: []
}

const mutations = {
  SET_CHECKEDINLIST: (state, newList) => {
    state.checkedInList = newList
  }
}

const actions = {
  getCheckedInList({ commit }) {
    return new Promise((resolve, reject) => {
      fetchCheckedInList(localStorage['centre'], localStorage['name'], localStorage['token']).then(res => {
        console.log(res)
        commit('SET_CHECKEDINLIST', res.inCentreCustomerList)
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

