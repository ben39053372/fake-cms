import request from '@/utils/request'
import MD5 from 'md5'
export function login(data) {
  return request({
    url: `/PUT/staffs/${data.username}/${data.center}/login`,
    method: 'post',
    data: {
      'apiKey': 'androidStaffApiKey',
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
      'apiKey': 'androidStaffApiKey',
      'deviceId': '',
      'passwordMD5': MD5(name + pw),
      'staffToken': token
    }
  })
}
