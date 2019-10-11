import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
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
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      //config.headers['X-Token'] = getToken()
    }
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
    console.log('request.js : res:', res.status)
    // if the custom code is not 20000, it is judged as an error.
    if (res.status !== 200) {
      // send Message
      Message({
        message: res.message + res.error || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // if (res.status === 40311) {
      //   console.log('reLogin')
      //   this.$store.dispatch('user/login', { username: localStorage['name'], password: localStorage['password'], centre: localStorage['centre'], counter: localStorage['counter'] })
      // } else {
      //   console.log('hgdkssa')
      // }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      
      console.log('http res status :', res.status)
      return res.data
    }

    if()
  },
  error => {
    console.log('err' + error) // for debug
    console.log('reLogin')
    store.dispatch('user/login', { username: localStorage['name'], password: localStorage['password'], centre: localStorage['centre'], counter: localStorage['counter'] })
    Message({
      message: error,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
