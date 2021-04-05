import Vue from 'vue'
import Router from 'vue-router'
// import Login from '../components/login/login.vue'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Right from '@/components/rights/right.vue'
import Role from '@/components/rights/role.vue'

Vue.use(Router)

export default new Router({
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
        name: 'role',
        path: '/role',
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
