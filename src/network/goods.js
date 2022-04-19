import {request} from './request'

export function getGoodsList(query, pagenum, pagesize) {
  return request({
    url: 'goods',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

export function deleteGoodsListItem(id) {
  return request({
    url: `goods/${id}`,
    method: 'delete'
  })
}