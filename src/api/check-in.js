import request from '../utils/request'

const apiKey = process.env.VUE_APP_APIKEY

export const fetchCheckInList = (centre, counter, staff, token) => {
  return request({
    url: `/GET/centres/${centre}/counters/${counter}/checkInRequests/${staff}`,
    method: 'POST',
    data: {
      'apiKey': apiKey,
      'staffToken': token
    }
  })
}

export const confirmCheckIn = (requestId, lockerKeyNum, tCouponUsed, isLeaveMemberCard, isUseOneTowelDaily, staffNum, token) => {
  return request({
    url: `/PUT/checkInRequest/${requestId}/confirmCheckIn/${lockerKeyNum}/${tCouponUsed}/${isLeaveMemberCard}/${isUseOneTowelDaily}/${staffNum}`,
    method: 'POST',
    data: {
      'apiKey': apiKey,
      'staffToken': token
    }
  })
}

export const cancelCheckIn = (requestId, staffNum, token) => {
  return request({
    url: `/PUT/checkInRequest/${requestId}/cancelCheckIn/${staffNum}`,
    method: 'POST',
    data: {
      'apiKey': apiKey,
      'staffToken': token
    }
  })
}
