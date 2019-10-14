import request from '../utils/request'

const apiKey = process.env.VUE_APP_APIKEY

export const fetchCheckedInList = (centreCode, staffNum, token) => {
  return request({
    url: `/GET/centres/${centreCode}/customers/${staffNum}`,
    method: 'POST',
    data: {
      'apiKey': apiKey,
      'staffToken': token
    }
  })
}

export const confirmCheckOut = (centreCode, lockerkeynum, staffNum, token) => {
  return request({
    url: `/PUT/centres/${centreCode}/lockers/${lockerkeynum}/confirmCheckOut/${staffNum}`,
    method: 'POST',
    data: {
      'apiKey': apiKey,
      'staffToken': token
    }
  })
}
