
'use strict'

import axios from '@/utils/axios'

export default class BaseAPI {
    constructor(model, action) {
        this.model = model
        this.action = action
    }

    list() {
        return async function index(params) {
            const url = `/api/v1/${model}/${action}`
            const result = await axios.post(url, params)
            if (result.status === true) {
                return result.data
            }
        }
    }
}