<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="3" class="middle">
          <h2>{{role}}</h2>
        </el-col>
        <el-col :span="18" class="middle">
          <h2>师生在线教育系统</h2>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple" style="text-align:center;">
            <a href="#" class="loginout" @click.prevent="handleSignout()">退出登录</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <!-- el-menu侧边栏导航 -->
        <!-- 开启路由 -->
        <el-menu :router="true" :unique-opened="true" background-color="#fff" active-text-color="#ffd04b" default-active="1">
          <!-- 遍历出侧边栏菜单 -->
          <el-submenu :index=" ''+item1.order" v-for="(item1,i) in menuList" :key="i">
            <template slot="title">
              <i :class="item1.icon" style="font-size:18px;height:18px;color:#000;"></i>
              <span>{{item1.authName}}</span>
            </template>
            <el-menu-item :index=" ''+item2.path" v-for="(item2,i2) in item1.children" :key="i2">
              <!-- <i class="el-icon-circle-check"></i> -->
              <span>{{item2.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // 组件渲染之前检测是否有token值
  // beforeCreate() {
  //     const token = localStorage.getItem('token')
  //     this.token = token
  //     console.log(token)
  //     // 没有token 值就跳转登录页面
  //     if(!token){
  //         this.$router.push( {name: 'login'})
  //     }
  // },
  data () {
    return {
      menuList: [],
      token: '',
      role: ''
    }
  },
  mounted () {
    this.getMenus()
  },
  methods: {
    // 设置动态创建侧边栏
    async getMenus () {
      // const res = await this.$http.get(`menus`)
      const token = localStorage.getItem('token')
      // const token = this.token
      if (token === 'ADMIN0000') {
        this.role = '管理员'
        this.menuList = [
          {
            authName: '公告管理',
            order: 1,
            icon: 'el-icon-edit',
            children: [
              {
                authName: '公告管理',
                path: '/messageManager'
              }
            ]
          },
          {
            authName: '注册审核',
            order: 2,
            icon: 'el-icon-bell',
            children: [
              {
                authName: '学生审核',
                path: '/registerStudent'
              },
              {
                authName: '教师审核',
                path: '/registerteacher'
              }
            ]
          },
          {
            authName: '系统提问',
            order: 3,
            icon: 'el-icon-setting',
            children: [
              {
                authName: '学生提问',
                path: '/studentquestion'
              },
              {
                authName: '教师提问',
                path: '/teacherquestion'
              }
            ]
          },
          {
            authName: '信息评论管理',
            order: 4,
            icon: 'el-icon-message',
            children: [
              {
                authName: '信息评论管理',
                path: '/admincourselist'
              }
            ]
          }
        ]
      }
       if (token === 'STU00000') {
        this.role = '学生'
        this.menuList = [
          {
            authName: '课程管理',
            order: 1,
            icon: 'el-icon-tickets',
            children: [
              {
                authName: '选择课程',
                path: '/courselist'
              },
              {
                authName: '我的课程',
                path: '/mycourse'
              }
            ]
          },
          // {
          //   authName: '课件文档下载',
          //   order: 2,
          //   icon: 'el-icon-download',
          //   children: [
          //     {
          //       authName: '课件文档列表',
          //       path: '/registerStudent'
          //     }
          //   ]
          // },
          {
            authName: '联系管理员',
            order: 3,
            icon: 'el-icon-message',
            children: [
              {
                authName: '联系管理员',
                path: '/contactadmin'
              }
            ]
          },
          {
            authName: '公告查看',
            order: 4,
            icon: 'el-icon-bell',
            children: [
              {
                authName: '公告列表',
                path: '/messagelist'
              }
            ]
          }
        ]
      }
      if( token === 'TEA00000'){
        this.role = '教师'
        this.menuList = [
          {
            authName: '课程管理',
            order: 1,
            icon: 'el-icon-tickets',
            children: [
              {
                authName: '我的课程',
                path: '/teachercourse'
              }
            ]
          },
          // {
          //   authName: '课件文档下载',
          //   order: 2,
          //   icon: 'el-icon-download',
          //   children: [
          //     {
          //       authName: '课件文档列表',
          //       path: '/registerStudent'
          //     }
          //   ]
          // },
          {
            authName: '联系管理员',
            order: 3,
            icon: 'el-icon-message',
            children: [
              {
                authName: '联系管理员',
                path: '/teacontactadmin'
              }
            ]
          },
          {
            authName: '公告查看',
            order: 4,
            icon: 'el-icon-bell',
            children: [
              {
                authName: '公告列表',
                path: '/messagelist'
              }
            ]
          }
        ]
      }
    },
    // 退出登录功能
    handleSignout () {
      // 清除token
      localStorage.clear()
      // 提示信息
      this.$message.success('退出成功')
      // 跳转到login组件
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style>
.logo img {
  height: 100%;
  width: auto;
}
.container {
  height: 100%;
}

.aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.main {
  background-color: #e9eef3;
  color: #333;
}

.header {
  background-color: #b3c0d1;
}

.middle {
  text-align: center;
  line-height: 100%;
}

.loginout {
  line-height: 60px;
  text-decoration: none;
  color: #000;
}

.loginout:hover {
  color: red;
}
</style>
