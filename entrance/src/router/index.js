import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

import System1 from '../views/System1.vue'
import System2 from '../views/System2.vue'
import System3 from '../views/System3.vue'
import System4 from '../views/System4.vue'
import DashBoard from '../views/DashBoard.vue'

import UserInfo from '../views/UserInfo.vue'

Vue.use(VueRouter)

const routes = [
  // 目前只有login和rigister页面可以不登陆而访问
  { path: '/login', name: "login", component: Login, meta: { isPublic: true } },
  { path: '/register', name: "register", component: Register, meta: { isPublic: true } },

  {
    path: '/',
    redirect: '/dashboard',
    name: 'main',
    component: Main,
    children: [
      // 进入主页
      { path: '/dashboard', component: DashBoard },
      // 进入各子系统的路由
      { path: '/subsystems/1', component: System1 },
      { path: '/subsystems/2', component: System2 },
      { path: '/subsystems/3', component: System3 },
      { path: '/subsystems/4', component: System4 },

      // 访问用户个人中心
      { path: '/userinfo', name: "login", component: UserInfo },
    ]
  },
]

const router = new VueRouter({
  routes
})

// 全局前置守卫
// 每个守卫方法接收三个参数：
// to: Route: 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
// next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
router.beforeEach((to, from, next) => {
  // 目前的验证并不完善，如果随便伪造一个token，也能进入主页
  if (!to.meta.isPublic && !localStorage.token) {
    Vue.prototype.$message({
      type: 'error',
      message: "试图访问一个非公开的页面，请先登录"
    });
    return next('/login');
  }
  next()
})


export default router
