'use strict'

import axios from '../utils/axios'

export class BaseAPI {
  constructor({ model, section }) {
    this.model = model
    this.section = section
  }

  getModule() {
    return `/${this.model}/${this.section}`
  }

  list(data) {
    return axios.request({
      method: 'POST',
      url: `${this.getModule()}/list`,
      data,
    })
  }

  create(data) {
    return axios.request({
      method: 'POST',
      url: `${this.getModule()}`,
      data,
    })
  }

  read(id) {
    return axios.request({
      method: 'GET',
      url: `${this.getModule()}/${id}`,
    })
  }

  update(data) {
    return axios.request({
      method: 'PUT',
      url: `${this.getModule()}`,
      data,
    })
  }

  delete(id) {
    return axios.request({
      method: 'DELETE',
      url: `${this.getModule()}/${id}`,
    })
  }
}
