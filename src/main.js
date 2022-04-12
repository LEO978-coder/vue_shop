import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import {Form,
        FormItem,
        Input, 
        Button, 
        Message, 
        Container, 
        Header, 
        Aside,
        Main, 
        Menu, 
        Submenu, 
        MenuItem, 
        MenuItemGroup,
        Breadcrumb,
        BreadcrumbItem,
        Card,
        Row,
        Col,
        Table,
        TableColumn,
        Switch,
        Tooltip,
        Pagination,
        Dialog,
        Popconfirm,
        MessageBox } from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Popconfirm)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

// 配置请求的根路径
// import axios from 'axios'
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// Vue.prototype.$http = axios



new Vue({
  render: h => h(App),
  router
}).$mount('#app')
