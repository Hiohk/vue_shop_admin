<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img class="imga" src="../../assets/img/购物2.svg" alt="无法显示图片">
          </div>
        </el-col>
        <el-col :span="18" class="middle">
          <div class="grid-content bg-purple-light">
            <h3>电商后台管理系统</h3>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a class="loginout" href="#" @click.prevent="handleSignout()">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <!-- 开启路由模式  -->
        <el-menu 
        :unique-opened="true"
        active-text-color= '#409EFF'
        :router="true"
        >
          <el-submenu :index="''+item1.order" v-for="(item1,index1) in menus" :key="index1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
            <el-menu-item 
            :index="item2.path"
            v-for="(item2,index2) in item1.children"
            :key="index2">
              <span v-if="item2.authName==='用户列表'"><i class="el-icon-user-solid"></i></span>
              <span v-else-if="item2.authName==='角色列表'"><i class="el-icon-menu"></i></span>
              <span v-else-if="item2.authName==='权限列表'"><i class="el-icon-menu"></i></span>
              <span v-else-if="item2.authName==='商品列表'"><i class="el-icon-menu"></i></span>
              <span v-else-if="item2.authName==='分类参数'"><i class="el-icon-menu"></i></span>
              <span v-else-if="item2.authName==='商品分类'"><i class="el-icon-menu"></i></span>
              <span v-else-if="item2.authName==='订单列表'"><i class="el-icon-s-order"></i></span>
              <span v-else-if="item2.authName==='数据报表'"><i class="el-icon-s-management"></i></span>
              <span>{{item2.authName}}</span>
            </el-menu-item>
          </el-submenu>

          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="role"><i class="el-icon-menu"></i><span>角色列表</span></el-menu-item>
            <el-menu-item index="rights"><i class="el-icon-menu"></i><span>权限列表</span></el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1"><i class="el-icon-menu"></i><span>商品列表</span></el-menu-item>
            <el-menu-item index="3-2"><i class="el-icon-menu"></i><span>分类参数</span></el-menu-item>
            <el-menu-item index="3-3"><i class="el-icon-menu"></i><span>商品分类</span></el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1"><i class="el-icon-s-order"></i><span>订单列表</span></el-menu-item>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1"><i class="el-icon-s-management"></i><span>数据报表</span></el-menu-item>
          </el-submenu> -->
        </el-menu>
      </el-aside>
      <el-main class="main">
        <!-- 设置容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menus: []
    }
  },
  // 创建新实例之前自动触发该方法
  //
  beforeCreate() {
    const token = localStorage.getItem('token')
    //没有token，需要进行登录
    if (!token) {
      this.$router.push({name: 'login'})
    }
  },
  created() {
      this.getMenus()
  },
  methods: {
    handleSignout() {
      localStorage.clear()//清除token
      this.$message.success('退出成功')
      this.$router.push({name: 'login'})
    },
    //获取导航数据
    async getMenus() {
      const res = await this.$http.get(`menus`)
      console.log(res);
      this.menus = res.data.data
    }
  }
}
</script>

<style>
  .container {
    height: 100%;
    margin: 0px;
    padding: 0px;
  }
  .header {
    background-color: #b3c0d1;
    margin: 0px;
    padding: 0px;
  }
  .aside {
    background-color: #d3dce6;
    margin: 0px;
    padding: 0px;
  }
  .main {
    background-color: #e9eef3;
    height: 100%;
    margin: 0px;
    padding: 0px;
  }
  .middle {
    text-align: center;
  }
  .loginout {
    line-height: 60px;
    text-decoration: none;
  }
  .imga {
    width: 200px;
    height: 70px;
  }
</style>