import request from '../utils/request'

const apiKey = process.env.VUE_APP_APIKEY

export function fetchCheckInList(centre, counter, staff, token) {
  return request({
    url: `/GET/centres/${centre}/counters/${counter}/checkInRequests/${staff}`,
    method: 'POST',
    data: {
      'apiKey': apiKey,
      'staffToken': token
    }
  })
}
