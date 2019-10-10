import request from '../utils/request'

export function fetchCheckInList(query) {
  return request({
    url: '/GET/centres/F03/counters/A/checkInRequests/900001',
    method: 'POST',
    params: {}
  })
}
