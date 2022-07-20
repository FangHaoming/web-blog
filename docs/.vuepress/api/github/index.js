import API from '../api'

const instance = new API({
  baseURL: 'https://api.github.com/',
  headers: {
    authorization: localStorage.getItem('Vssue.github.access_token')
  }
})

export default {
  // 获取用户信息
  queryUser() {
    return instance.get('/user')
  }
}