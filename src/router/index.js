import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Right from '@/components/rights/right.vue'
import Roles from '@/components/rights/roles.vue'
import Goodslist from '@/components/goods/goodslist.vue'
import Goodsadd from '@/components/goods/goodsadd.vue'
import Cateparams from '@/components/goods/cateparams.vue'
import Goodscate from '@/components/goods/goodscate.vue'
import MessageManager from '@/components/admin/messageManager.vue'
import RegisterStudent from '@/components/admin/registerStudent.vue'
import Reports from '@/components/echarts/echarts.vue'
import Studentlogin from '@/components/login/studentlogin.vue'
import Teacherlogin from '@/components/login/teacherlogin.vue'
import Studentsignup from '@/components/login/studentsignup.vue'
import Teachersignup from '@/components/login/teachersignup.vue'
import Studentresetpsd from '@/components/login/studentresetpsd.vue'

import {
  Message
} from 'element-ui'
Vue.use(Router)

const router = new Router({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  },{
    name: 'studentlogin',
    path: '/studentlogin',
    component: Studentlogin
  },{
    name: 'teacherlogin',
    path: '/teacherlogin',
    component: Teacherlogin
  },{
    name: 'teachersignup',
    path: '/teachersignup',
    component: Teachersignup
  },{
    name: 'studentsignup',
    path: '/studentsignup',
    component: Studentsignup
  },{
    name: 'studentresetpsd',
    path: '/studentresetpsd',
    component: Studentresetpsd
  },
  {
    name: 'home',
    path: '/',
    component: Home,
    children: [{
      name: 'users',
      path: '/users',
      component: Users
    },
    {
      name: 'right',
      path: '/rights',
      component: Right
    },
    {
      name: 'roles',
      path: '/roles',
      component: Roles
    },
    {
      name: 'goods',
      path: '/goods',
      component: Goodslist
    },
    {
      name: 'goodsadd',
      path: '/goodsadd',
      component: Goodsadd
    },
    {
      name: 'params',
      path: '/params',
      component: Cateparams
    },
    {
      name: 'categories',
      path: '/categories',
      component: Goodscate
    },
    {
      name: 'messageManager',
      path: '/messageManager',
      component: MessageManager
    },
    {
      name: 'reports',
      path: '/reports',
      component: Reports
    },
    {
      name: 'registerStudent',
      path: '/registerStudent',
      component: RegisterStudent
    }
    ]
  }
  ]
})

// 路由导航/守卫

router.beforeEach((to, from, next) => {
  // 排除登录页
  if (to.path === '/login' || to.path === '/studentlogin' || to.path === '/teacherlogin' || to.path === '/teachersignup' || to.path === '/studentsignup' || to.path === '/studentresetpsd') {
    next() // 执行渲染页面
  } else {
    // 如果要去的不是登录页面
    const token = localStorage.getItem('token')

    if (!token) {
      // 没有token值就跳转会登陆页面
      // 提示请先登录
      Message.warning('请先登录！')
      router.push({
        name: 'login'
      })
      return
    }
    // 如果有token，直接渲染页面
    next()
  }
})

export default router
