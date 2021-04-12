import Vue from 'vue'
import Router from 'vue-router'
// import Login from '../components/login/login.vue'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Right from '@/components/rights/right.vue'
import Role from '@/components/rights/role.vue'
import {Message} from 'element-ui'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      children: [{
        name: 'users',
        path: '/users',
        component: Users,
      },
      {
        name: 'right',
        path: '/rights',
        component: Right
      },
      {
        name: 'roles',
        path: '/roles',
        component: Role
      }]
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})

router.beforeEach((to,from,next) => {
  if(to.path == '/login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    //没有token，需要进行登录
    if (!token) {
      Message.warning('请先登录')
      router.push({name: 'login'})
      return 
    }
    next()
  }

})
export default router
