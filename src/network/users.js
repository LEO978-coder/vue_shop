import {request} from './request'

export function getUsers(query, pagenum, pagesize) {
  return request({
    url: 'users',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

export function getState(uId, state) {
  return request({
    url: `users/${uId}/state/${state}`,
    method: 'put'
  })
}

export function getAddUser(email, mobile, password, username) {
  return request({
    url: 'users',
    method: 'post',
    params: {
      email,
      mobile,
      password,
      username
    }
  })
}

export function getEditUser(id) {
  return request({
    url: 'users/' + id,
    method: 'get'
  })
}

export function getEditUserInfo(id, email, mobile) {
  return request({
    url: 'users/' + id,
    method: 'put',
    params: {
      email,
      mobile
    },
  })
}

export function getDeleteUser(id) {
  return request({
    url: 'users/' + id,
    method: 'delete'
  })
}
