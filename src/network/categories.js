import {request} from './request'

export function getCategoriesDataList(type, pagenum, pagesize) {
  return request({
    url: 'categories',
    params: {
      type,
      pagenum,
      pagesize
    }
  })
}

// 获取父级分类的列表
export function getParentCateList(type=2) {
  return request({
    url: 'categories',
    params: {
      type
    }
  })
}

export function subCate(cat_pid, cat_name, cat_level) {
  return request({
    url: 'categories',
    method: 'post',
    params: {
      cat_pid,
      cat_name,
      cat_level
    }
  })
}