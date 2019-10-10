import request from '@/utils/request'
import MD5 from 'md5'
const apiKey = process.env.VUE_APP_APIKEY
export function login(data) {
  console.log(process.env.VUE_APP_APIKEY)
  return request({
    url: `/PUT/staffs/${data.username}/${data.centre}/login`,
    method: 'post',
    data: {
      'apiKey': apiKey,
      'deviceId': '',
      'passwordMD5': MD5(data.username + data.password)
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout(token, name, pw) {
  console.log(token)
  console.log(name)
  console.log(MD5(name + pw))
  return request({
    url: `/PUT/staffs/${name}/logout`,
    method: 'post',
    data: {
      'apiKey': apiKey,
      'deviceId': '',
      'passwordMD5': MD5(name + pw),
      'staffToken': token
    }
  })
}
