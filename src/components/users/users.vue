<template>
  <!-- 面包屑，搜索框，表格，分页四部分 -->
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="searchRow">
      <el-col>
        <el-input 
        placeholder="请输入内容" 
        v-model="query" 
        class="inputSearch">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        width="60">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="80">
      </el-table-column>
      <el-table-column
        prop="address"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="name"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="创建日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户状态"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作"
        width="180">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      pagenum: 2,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, 
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, 
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, 
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    //获取用户列表的请求,发送请求
    //接口文档中，除了登录之外的所有请求都需要进行授权，设置请求头
    async getUserList() {

      const AUTH_TOKEN = localStorage.getItem('token');
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
      const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`,)
      console.log(res);
    }
  }
}
</script>

<style>
  .box-card {
    height: 100%;
  }
  .inputSearch {
    width: 300px;
  }
  .searchRow {
    margin-top: 20px;
  }
</style>