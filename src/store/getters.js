const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  requestList: state => state.checkIn.requestList,
  checkedInList: state => state.checkOut.checkedInList,
  searchRequestList: state => state.search.searchRequestList
}
export default getters
