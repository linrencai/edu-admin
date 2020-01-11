import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Studentlogin from '@/components/login/studentlogin.vue'
import Teacherlogin from '@/components/login/teacherlogin.vue'
import Studentsignup from '@/components/login/studentsignup.vue'
import Teachersignup from '@/components/login/teachersignup.vue'
import Studentresetpsd from '@/components/login/studentresetpsd.vue'
import Studentquestion from '@/components/admin/studentquestion.vue'
import Teacherquestion from '@/components/admin/teacherquestion.vue'
import Registerteacher from '@/components/admin/registerteacher.vue'
import Courselist from '@/components/student/courselist.vue'
import Mycourse from '@/components/student/mycourse.vue'
import Teachercourse from '@/components/teacher/teachercourse.vue'
import Contactadmin from '@/components/student/contactadmin.vue'
import Chartarea from '@/components/student/chartarea.vue'
import Messagelist from '@/components/student/messagelist.vue'
import Teacherresetpsd from '@/components/login/teacherresetpsd.vue'
import Admincourselist from '@/components/admin/admincourselist.vue'
import Adminchartarea from '@/components/admin/adminchartarea.vue'
import Teacherchartarea from '@/components/teacher/teacherchartarea.vue'
import Studentlist from '@/components/teacher/studentlist.vue'
import Teacourselist from '@/components/teacher/teacourselist.vue'
import Attendancelist from '@/components/teacher/attendancelist.vue'
import Teacontactadmin from '@/components/teacher/teacontactadmin.vue'
import Uploadfile from '@/components/teacher/uploadfile.vue'
import Filelist from '@/components/teacher/filelist.vue'
import Homeworklist from '@/components/teacher/homeworklist.vue'
import Stucourselist from '@/components/student/stucourselist.vue'
import Stuuploadhomework from '@/components/student/stuuploadhomework.vue'

import {
  Message
} from 'element-ui'
Vue.use(Router)

const router = new Router({
  routes: [{
      name: 'login',
      path: '/login',
      component: Login
    }, {
      name: 'studentlogin',
      path: '/studentlogin',
      component: Studentlogin
    }, {
      name: 'teacherlogin',
      path: '/teacherlogin',
      component: Teacherlogin
    }, {
      name: 'teachersignup',
      path: '/teachersignup',
      component: Teachersignup
    }, {
      name: 'studentsignup',
      path: '/studentsignup',
      component: Studentsignup
    }, {
      name: 'studentresetpsd',
      path: '/studentresetpsd',
      component: Studentresetpsd
    },
    {
      name: 'teacherresetpsd',
      path: '/teacherresetpsd',
      component: Teacherresetpsd
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'studentquestion',
          path: '/studentquestion',
          component: Studentquestion
        },
        {
          name: 'teacherquestion',
          path: '/teacherquestion',
          component: Teacherquestion
        },
        {
          name: 'registerteacher',
          path: '/registerteacher',
          component: Registerteacher
        },
        {
          name: 'courselist',
          path: '/courselist',
          component: Courselist
        },
        {
          name: 'mycourse',
          path: '/mycourse',
          component: Mycourse
        },
        {
          name: 'contactadmin',
          path: '/contactadmin',
          component: Contactadmin
        },
        {
          name: 'chartarea',
          path: '/chartarea',
          component: Chartarea
        },
        {
          name: 'messagelist',
          path: '/messagelist',
          component: Messagelist
        },
        {
          name:'teachercourse',
          path:'/teachercourse',
          component:Teachercourse
        },
        {
          name:'admincourselist',
          path:'/admincourselist',
          component:Admincourselist
        },
        {
          name:'adminchartarea',
          path:'/adminchartarea',
          component:Adminchartarea
        },
        {
          name:'teacherchartarea',
          path:'/teacherchartarea',
          component:Teacherchartarea
        },
        {
          name:'studentlist',
          path:'/studentlist',
          component:Studentlist
        },
        {
          name:'teacourselist',
          path:'/teacourselist',
          component:Teacourselist
        },
        {
          name:'attendancelist',
          path:'/attendancelist',
          component:Attendancelist
        },
        {
          name:'teacontactadmin',
          path:'/teacontactadmin',
          component:Teacontactadmin
        },
        {
          name:'uploadfile',
          path:'/uploadfile',
          component:Uploadfile
        },
        {
          name:'filelist',
          path:'/filelist',
          component:Filelist
        },
        {
          name:'homeworklist',
          path:'/homeworklist',
          component:Homeworklist
        },
        {
          name:'stucourselist',
          path:'/stucourselist',
          component:Stucourselist
        },
        {
          name:'stuuploadhomework',
          path:'/stuuploadhomework',
          component:Stuuploadhomework
        }
      ]
    }
  ]
})

// 路由导航/守卫

router.beforeEach((to, from, next) => {
  // 排除登录页
  if (to.path === '/login' || to.path === '/studentlogin' || to.path === '/teacherlogin' || to.path === '/teachersignup' || to.path === '/studentsignup' || to.path === '/studentresetpsd' || to.path === '/teacherresetpsd') {
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
