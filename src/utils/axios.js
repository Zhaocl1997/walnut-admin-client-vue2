
'use strict'

import axios from 'axios'
import { getToken } from './auth'
import config from './config'

// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: config.apiUrl,
    // 超时
    timeout: 500000,
    // 携带认证信息cookie
    // withCredentials: true
})

// 请求拦截器
service.interceptors.request.use(config => {
    if (config.type === 'form') {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    config.headers['Authorization'] = 'Bearer ' + getToken()
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {   
    console.log(res.data);
    
    return res.data
    
    const code = res.data.code
    if (code === 401) {
        // MessageBox.confirm(
        //     //'登录状态已过期，您可以继续留在该页面，或者重新登录',
        //     '登录状态已过期，请重新登录',
        //     '系统提示',
        //     {
        //         confirmButtonText: '重新登录',
        //         //cancelButtonText: '取消',
        //         showCancelButton: false,
        //         type: 'warning'
        //     }
        // ).then(() => {
        //     store.dispatch('LogOut').then(() => {
        //         location.reload() // 为了重新实例化vue-router对象 避免bug
        //     })
        // })
    } else if (code !== 200) {
        // Notification.error({
        //     title: res.data.msg
        // })
        return Promise.reject('error')
    } else {
        return res.data
    }
}, error => {
    console.log(error)
    // Message({
    //     message: error.message,
    //     type: 'error',
    //     duration: 5 * 1000
    // })
    // return Promise.reject(error)
})

export default service