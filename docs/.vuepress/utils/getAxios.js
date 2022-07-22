export default function (instance) {
  return {
    get: function (url, params = {}, config = {}) {
      return instance({
        method: 'get',
        url,
        params,
        ...config,
      }).then((response) => {
        return Promise.resolve(response)
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    post: function (url, data = {}, config = {}) {
      return instance({
        method: 'post',
        url,
        data,
        ...config,
      }).then((response) => {
        return Promise.resolve(response)
      }).catch((error) => {
        return Promise.reject(error)
      })
    },
    patch: function (url, data = {}, config = {}) {
      return instance({
        method: 'patch',
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
}