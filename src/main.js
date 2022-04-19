import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ZkTable from 'vue-table-with-tree-grid'

Vue.component(ZkTable.name, ZkTable)

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
        MessageBox,
        Tag,
        Empty,
        Tree,
        Select,
        Option,
        Cascader,
        Alert,
        Tabs,
        TabPane,
        Steps,
        Step} from 'element-ui'

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
Vue.use(Tag)
Vue.use(Empty)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Steps)
Vue.use(Step)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

// 配置请求的根路径
// import axios from 'axios'
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// Vue.prototype.$http = axios

// 全局定义时间过滤器
Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
