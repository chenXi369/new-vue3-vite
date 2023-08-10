// index.ts
import axios from 'axios'
import { getToken } from '@/utils/auth'
import cache from '@/plugins/cache'
import { showFailToast } from 'vant';

// 创建实例
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

axios.defaults.headers['Content-Type'] = 'application/json'
// 添加请求拦截器
axiosInstance.interceptors.request.use(function (config) {
  // 是否需要设置 token
  // const isToken = (config.headers || {}).isToken === false
  // 是否需要防止数据重复提交
  const isRepeatSubmit = (config.headers || {}).repeatSubmit === false

  // 让每个请求携带自定义token 请根据实际情况自行修改
  config.headers['Authorization'] = 'Bearer ' + getToken()
  // config.headers['Referer'] = process.env.VUE_APP_BASE_API
  // get请求映射params参数
  if (config.method === "get" && config.params) {
    let url = config.url + "?" + tansParams(config.params);
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  if (
    !isRepeatSubmit &&
    (config.method === "post" || config.method === "put")
  ) {
    const requestObj = {
      url: config.url,
      data:
        typeof config.data === "object"
          ? JSON.stringify(config.data)
          : config.data,
      time: new Date().getTime(),
    };
    const sessionObj = cache.session.getJSON("sessionObj");
    if (
      sessionObj === undefined ||
      sessionObj === null ||
      sessionObj === ""
    ) {
      cache.session.setJSON("sessionObj", requestObj);
    } else {
      const s_url = sessionObj.url; // 请求地址
      const s_data = sessionObj.data; // 请求数据
      const s_time = sessionObj.time; // 请求时间
      const interval = 1000; // 间隔时间(ms)，小于此时间视为重复提交
      if (
        s_data === requestObj.data &&
        requestObj.time - s_time < interval &&
        s_url === requestObj.url
      ) {
        const message = '数据正在处理，请勿重复提交'
        console.warn(`[${s_url}]: ` + message)
        showFailToast(message)

        return Promise.reject(new Error(message))
      } else {
        cache.session.setJSON("sessionObj", requestObj)
      }
    }
  }
  return config
}, function (error) {
  // 对请求错误做的操作
  
  return Promise.reject(error)
})

// 添加响应拦截器
axiosInstance.interceptors.response.use(function (response) {
  // 对2xx的状态码触发该函数
  // 对响应做的操作
  return response
}, function (error) {
  // 对响应错误做的操作
  showFailToast('服务器错误')
  return Promise.reject(error)
})

export default axiosInstance
