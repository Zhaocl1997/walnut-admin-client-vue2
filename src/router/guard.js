
'use strict'

import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css'

import { getToken } from '@/utils/auth'
import { getUserInfo } from '@/api/system/user'
import { getUserMenu } from '@/api/system/menu'

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

router.beforeEach((to, from, next) => {
    NProgress.start()

    if (getToken()) {
        getUserInfo().then(res => {
            console.log(res);

            getUserMenu().then(result => {
                console.log(result);

            })
        })
        // // 判断当前用户是否已拉取完user_info信息
        // store.dispatch('GetInfo').then(res => {
        //     // 拉取user_info
        //     const roles = res.roles
        //     store.dispatch('GenerateRoutes', { roles }).then(accessRoutes => {
        //         // 测试 默认静态页面
        //         // store.dispatch('permission/generateRoutes', { roles }).then(accessRoutes => {
        //         // 根据roles权限生成可访问的路由表
        //         router.addRoutes(accessRoutes) // 动态添加可访问路由表
        //         next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
        //     })
        // })
        //     .catch(err => {
        //         store.dispatch('FedLogOut').then(() => {
        //             Message.error(err)
        //             next({ path: '/' })
        //         })
        //     })
    } else {
        // // 没有token
        // if (whiteList.indexOf(to.path) !== -1) {
        //     // 在免登录白名单，直接进入
        //     next()
        // } else {
        //     next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
        //     NProgress.done()
        // }
    }
    next()
    // NProgress.done()
})

router.afterEach(() => {
    NProgress.done()
})