// index.ts
import request from '@/utils/request'
import { Base64 } from 'js-base64'

// 示例
export const login = (data) => {
  return request({
    url: '/auth/login',
    method: 'post',
    data: {
      ...data,
      password: Base64.encode(data.password)
    }
  })
}