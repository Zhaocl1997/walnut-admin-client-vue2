
'use strict'

import axios from '@/utils/axios'
import settings from '@/utils/setting'

export default class BaseAPI {
    constructor(model) {
        this.model = model
    }

    base(action) {
        const model = this.model
        return function index(params) {
            const url = `/api/${settings.APIVersion}/${model}/${action}`
            return axios.post(url, params)
        }
    }

    index() {
        return this.base('index')
    }

    create() {
        return this.base('create')
    }

    read() {
        return this.base('read')
    }

    update() {
        return this.base('update')
    }

    delete() {
        return this.base('delete')
    }
}