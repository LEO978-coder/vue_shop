import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import {Form, FormItem, Input, Button, Message } from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.prototype.$message = Message


// 配置请求的根路径
// import axios from 'axios'
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// Vue.prototype.$http = axios



new Vue({
  render: h => h(App),
  router
}).$mount('#app')
