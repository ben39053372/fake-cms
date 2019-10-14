import axios from 'axios'
import { MessageBox, Message, Notification } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API2, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response
    if (res.status === 200) {
      console.log(res.status)
      if (res.data.checkInQueue === undefined && res.data.inCentreCustomerList === undefined) {
        Notification({
          message: res.data.info,
          type: 'success',
          duration: 5 * 1000
        })
      }
      return res.data
    } else if (res.status === 403) {
      console.log(res.status + res.message + 'relogin ...')
      this.$store.dispatch('user/login', { username: localStorage['name'], password: localStorage['password'], centre: localStorage['centre'], counter: localStorage['counter'] })
      return res.data
    } else {
      console.log(res.status + res.message)
      Notification({
        message: res.message + res.error || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  error => {
    console.log('err' + error) // for debug
    console.log('reLogin')
    store.dispatch('user/login', { username: localStorage['name'], password: localStorage['password'], centre: localStorage['centre'], counter: localStorage['counter'] })
    Notification({
      message: error,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
