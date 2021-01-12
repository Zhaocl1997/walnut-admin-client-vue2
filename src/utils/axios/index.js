'use strict'

import axios from 'axios'
// import { getToken, removeToken } from './auth'
// import config from './config'
import { ElNotification } from 'element-plus'
import router from '/@/router'

import { WalnutAxios } from './axios'

const baseURL =
  import.meta.env.VITE_PROXY +
  import.meta.env.VITE_API_PREFIX +
  import.meta.env.VITE_API_VERSION

// // 创建axios实例
// const service = axios.create({
//     // axios中请求配置有baseURL选项，表示请求URL公共部分
//     baseURL,
//     // 超时
//     timeout: 500000,
//     // 携带认证信息cookie
//     // withCredentials: true
// })

// // 请求拦截器
// service.interceptors.request.use(config => {
//     // config.headers['Authorization'] = 'Bearer ' + getToken()
//     return config
// }, error => {
//     return Promise.reject(error)
// })

// // 响应拦截器
// service.interceptors.response.use(res => {
//     console.log('[Walnut Request]', res);

//     switch (res.status) {
//         case 200:
//             switch (res.data.code) {
//                 case '000000':
//                     // success
//                     return res.data.data

//                 case '888888':
//                     // 未认证
//                     // removeToken()
//                     router.push('/signin')
//                     ElNotification.error({
//                         title: res.data.message
//                     })
//                     return Promise.reject()

//                 case '999999':
//                     // 服务器错误
//                     ElNotification.error({
//                         title: res.data.message
//                     })
//                     return Promise.reject()

//                 default:
//                     break;
//             }
//             break;

//         case 400:
//             break;

//         case 401:
//             break;

//         case 403:
//             break;

//         case 404:
//             break;

//         case 500:
//             break;

//         default:
//             break;
//     }

//     // const code = res.data.code
//     // if (code === 401) {
//     //     // MessageBox.confirm(
//     //     //     //'登录状态已过期，您可以继续留在该页面，或者重新登录',
//     //     //     '登录状态已过期，请重新登录',
//     //     //     '系统提示',
//     //     //     {
//     //     //         confirmButtonText: '重新登录',
//     //     //         //cancelButtonText: '取消',
//     //     //         showCancelButton: false,
//     //     //         type: 'warning'
//     //     //     }
//     //     // ).then(() => {
//     //     //     store.dispatch('LogOut').then(() => {
//     //     //         location.reload() // 为了重新实例化vue-router对象 避免bug
//     //     //     })
//     //     // })
//     // } else if (code !== 200) {
//     //     // ElNotification.error({
//     //     //     title: res.data.msg
//     //     // })
//     //     return Promise.reject('error')
//     // } else {
//     //     if (res.data.code === '000000') {
//     //         return res.data.data
//     //     }
//     // }
// }, error => {
//     // Message({
//     //     message: error.message,
//     //     type: 'error',
//     //     duration: 5 * 1000
//     // })
//     return Promise.reject(error)
// })

const walnutHttp = new WalnutAxios({
  baseURL,
  timeout: 500000,
})
export default walnutHttp
// export default service
