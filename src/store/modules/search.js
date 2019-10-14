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
      fetchSearchRequestList(data.keywordType, data.keyword, data.centre, data.pageNumber, localStorage['name'], localStorage['token']).then(res => {
        console.log(res)
        commit('SET_SEARCHREQUESTLIST', res.userData)
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
