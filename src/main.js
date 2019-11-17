import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.less'
import axios from 'axios'
import '../node_modules/nprogress/nprogress.css'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
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
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
