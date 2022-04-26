import {request} from './request'

export function getReportsData(id) {
  return request({
    url: `reports/type/${id}`
  })
}