
'use strict'

import axios from '@/utils/axios'

export default class BaseAPI {
    constructor(model, action) {
        this.model = model
        this.action = action
    }

    list() {
        const model = this.model
        const action = this.action
        return function index(params) {
            const url = `/api/v1/${model}/${action}`
            return axios.post(url, params)
        }
    }
}