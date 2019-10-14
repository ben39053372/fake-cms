import request from '../utils/request'

const apiKey = process.env.VUE_APP_APIKEY

export const fetchSearchRequestList = (keywordType, keyword, centreCode, pageNumber, staffNum, token) => {
  return request({
    url: `/GET/customers/${keywordType}/${keyword}/${centreCode}/${pageNumber}/${staffNum}`,
    method: 'POST',
    data: {
      'apiKey': apiKey,
      'staffToken': token
    }
  })
}
