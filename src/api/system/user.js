
'use strict'

import axios from '@/utils/axios'

export function signin(data) {
    return axios({
        url: '/api/v1/user/login',
        method: 'post',
        data
    })
}