import Vue from 'vue'
import VueRouter from 'vue-router'

// 1. 安装插件
Vue.use(VueRouter)

const Login = () => import('views/login/Login')
const Home = () => import('views/home/Home')

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
    component: Home
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