import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.less'
import axios from 'axios'
import JSONbig from 'json-bigint'
import '../node_modules/nprogress/nprogress.css'
import moment from 'moment'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 精确数字转换
axios.defaults.transformResponse = [function (data, headers) {
  // console.log(data, headers, JSONbig)
  return JSONbig.parse(data)
}]
// 请求拦截（配置发送请求的信息）
axios.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('user')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // 处理请求之前的配置
  return config
}, function (error) {
  // 请求失败的处理
  console.log(0, '---')
  return Promise.reject(error)
})

// 响应拦截（配置请求回来的信息）
axios.interceptors.response.use(function (response) {
  // 处理响应数据
  return response
}, function (error) {
  // 处理响应失败
  return Promise.reject(error)
})

Vue.use(ElementUI, {
  size: 'small'
})
// 全局过滤器：任何组件模板都可以访问
// 参数1：过滤器名称
// 参数2：函数
// 调用方式：在模板中{{ 数据 | 过滤器 }}
// | 管道符前面的数据就会作为参数传递给过滤器函数
Vue.filter('dateFormat', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(value).format(format)
})
Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
