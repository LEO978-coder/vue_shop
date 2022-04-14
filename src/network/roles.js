import {request} from './request'

export function getRolesList() {
  return request({
    url: 'roles'
  })
}

export function getRemoveRight(roleId, rightId) {
  return request({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}

export function getRightsList() {
  return request({
    url: 'rights/tree'
  })
}

export function submitRightList(roleId, rids) {
  return request({
    url: `roles/${roleId}/rights`,
    params: {
      rids
    },
    method: 'post'
  })
}