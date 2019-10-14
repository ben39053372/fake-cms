import { fetchSearchRequestList } from '../../api/search'

const state = {
  searchRequestList: []
}

const mutations = {
  SET_SEARCHREQUESTLIST: (state, newList) => {
    state.searchRequestList = newList
  }
}

const actions = {
  getSearchRequestList({ commit }, data) {
    return new Promise((resolve, reject) => {
      fetchSearchRequestList(data.keywordType, data.keyword, localStorage['centre'], data.pageNumber, localStorage['name']).then(res => {
        console.log(res)
        commit('SET_SEARCHREQUESTLIST', res.userData)
        resolve()
      }).catch(err => {
        console.log(err)
        reject(err)
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
