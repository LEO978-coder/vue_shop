import {request} from './request'

export function getMunus() {
  return request({
    url: 'menus'
  })
}