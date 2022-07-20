/* eslint-disable */
import axios from 'axios'

class API {
  instance
  defaultHeader
  constructor(params = {
    baseURL: '/',
    headers: {}
  }) {
    this.instance = axios.create({
      baseURL: params.baseURL,
      timeout: 60 * 1000,
    })
  }
  get(url, params = {}, config = {}) {
    return this.instance({
      method: 'get',
      url,
      params,
      ...config,
    }).then((response) => {
      return Promise.resolve(response)
    }).catch((error) => {
      return Promise.reject(error)
    })
  }
  post(url, data = {}, config = {}) {
    return this.instance({
      method: 'post',
      url,
      data,
      ...config,
    }).then((response) => {
      return Promise.resolve(response)
    }).catch((error) => {
      return Promise.reject(error)
    })
  }
}
export default API
