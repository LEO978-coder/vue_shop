import {request} from './request'

export function getShopList() {
  return request({
    url: 'categories'
  })
}

export function getParamsList(id, sel) {
  return request({
    url: `categories/${id}/attributes`,
    params: {
      sel
    }
  })
}

export function addParams(id, attr_name, attr_sel) {
  return request({
    url: `categories/${id}/attributes`,
    method: 'post',
    params: {
      attr_name,
      attr_sel
    }
  })
}

export function editParams(id, attrId, attr_name, attr_sel, attr_vals) {
  return request({
    url: `categories/${id}/attributes/${attrId}`,
    method: 'put',
    params: {
      attr_name,
      attr_sel,
      attr_vals
    }
  })
}