import Vue from 'vue'
import VueRouter from 'vue-router'

// 1. 安装插件
Vue.use(VueRouter)

const Login = () => import('views/login/Login')
const Home = () => import('views/home/Home')
const Welcome = () => import('views/welcome/Welcome')
const Users = () => import('views/users/Users')
const Roles = () => import('views/roles/Roles')
const Rights = () => import('views/rights/Rights')
const Goods = () => import('views/goods/Goods')
const Params = () => import('views/params/Params')
const Categories = () => import('views/categories/Categories')
const Orders = () => import('views/orders/Orders')
const Reports = () => import('views/reports/Reports')
const AddGoods = () => import('views/goods/childrenCopm/AddGoods')

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children:[
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/rights',
        component: Rights
      },
      {
        path: '/goods',
        component: Goods
      },
      {
        path: '/params',
        component: Params
      },
      {
        path: '/categories',
        component: Categories
      },
      {
        path: '/orders',
        component: Orders
      },
      {
        path: '/reports',
        component: Reports
      },
      {
        path: '/goods/add',
        component: AddGoods
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  // 从localStorage 中获取 token 并且保存
  const tokenStr = window.localStorage.getItem('token')
  // 判断用户是否处在登陆页面
  if(to.path === '/login') return next()
  // 判断是否存在token，没有token则强行跳转到登录页面
  if(!tokenStr) return next('/login')
  next()
})


export default router