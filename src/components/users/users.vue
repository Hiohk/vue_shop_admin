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
        @clear="loadUserList()"
        clearable
        placeholder="请输入内容" 
        v-model="query" 
        class="inputSearch">
          <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" @click="showAddUserDiag()">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="userList"
      style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        width="60">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="80">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建日期"
        width="180">
        <!-- <template slot-scope="userList">
          {{userList.row.create_time | fmtDate}}    
        </template> -->
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="用户状态">
        <template slot-scope="scope">
          <el-switch
            @change="changeMsgState(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="operation"
        label="操作">
        <template slot-scope="scope">
            <el-button 
            plain 
            type="primary" 
            icon="el-icon-edit" 
            circle
            @click="showEditUserMessage(scope.row)"
            ></el-button>
            <el-button 
            plain 
            type="danger" 
            icon="el-icon-delete" 
            circle
            @click="showDeleteUserMessage(scope.row.id)"
            ></el-button>
            <el-button
            @click="showSetUserRole(scope.row)" 
            plain 
            type="success" 
            icon="el-icon-check" 
            circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="100">
    </el-pagination>
    <!--添加用户的 对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
    <el-form :model="form">
      <el-form-item label="用户名" label-width="80px">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="80px">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="80px">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="80px">
        <el-input v-model="form.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
      <el-button type="primary" @click="addUser()">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 编辑用户的对话框 -->
  <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
    <el-form :model="form">
      <el-form-item label="用户名" label-width="80px">
        <el-input disabled v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="80px">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="80px">
        <el-input v-model="form.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
      <el-button type="primary" @click="editUser()">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 分配角色的对话框 -->
  <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
  <el-form :model="form">
    <el-form-item label="用户名:" label-width="100px">
      {{currentUsername}}
    </el-form-item>
    <el-form-item label="角色" label-width="100px">
      <el-select v-model="currentRoleId">
        <el-option label="请选择" :value="-1"></el-option>
        <el-option :label="item.roleName" :value="item.id"
        v-for="(item,i) in roles" :key="i">
        <!-- 当改变label时，然后value的值也跟着改变，最后v-model绑定的数据也跟着改变 -->
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
    <el-button type="primary" @click="setRole()">确 定</el-button>
  </div>
</el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      pagenum: 1,
      pagesize: 2,
      total: -1,
      dialogFormVisibleAdd: false,//添加对话框属性
      dialogFormVisibleEdit: false,
      dialogFormVisibleRole: false,
      userList: [
        {
          username: '王小虎',
          email: '6541312@qq.com',
          mobile: '13888686688',
          create_time: '2021-02-01',
        }, 
         {
          username: '沛姐王',
          email: '45465768@qq.com',
          mobile: '15233457890',
          create_time: '2021-02-05',
        }, 
        {
          username: '王小小',
          email: 'hk_5678989@163.com',
          mobile: '13689536842',
          create_time: '2021-03-07',
        }, 
        {
          username: '王吉利',
          email: 'jili_teng@126.com',
          mobile: '12346678903',
          create_time: '2021-03-31',
        }
      ],
      form: {
          username: '',
          password: '',
          email: '',
          mobile: ''
      },
      currentRoleId: -1,
      currentUserId: -1,
      currentUsername: '',
      //角色数据
      roles: [
        
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
      const {meta:{status,msg},data:{users,total}} = res.data;
      if (status === 200) {
      //给表格数据赋值，给total赋值，提示
        this.userList = users;
        this.total = total;
        // this.$message.success(msg);
        this.pagenum = 1;
      } else {
        this.$message.warning(msg);
      }
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize = val;
        // this.pagenum = 1;
        this.getUserList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      
      this.getUserList()
    },
    searchUser() {
      this.getUserList()
    },
    //清空搜索框，重新获取数据
    loadUserList() {
      this.getUserList()
    },
    showAddUserDiag() {
      this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    async addUser() {
      const res = await this.$http.post(`users`,this.form)
      console.log(res);
      const {meta:{status,msg},data} = res.data;
      if (status === 201) {
        this.$message.success(msg);
        //更新视图
        this.getUserList()
        //清空文本框
        this.form = {}
        //关闭对话框？？
        this.dialogFormVisibleAdd = false;
      } else {
        this.$message.warning(msg);
      }
    },
    //删除用户信息
    showDeleteUserMessage(userId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(async() => {
        const res = await this.$http.delete(`users/${userId}`);
        if (res.data.meta.status === 200) {
          this.getUserList()
          this.$message({
          type: 'success',
          message: '删除成功!'
        });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    showEditUserMessage(user) {
      this.form = user;//获取用户信息
      this.dialogFormVisibleEdit = true;
    },
    async editUser() {
      const res = await this.$http.delete(`users/${this.form.id}`,this.form);
      this.dialogFormVisibleEdit = false;//关闭对话框
      this.getUserList();//更新视图
      this.$message.success('修改成功');
    },
    //修改用户状态
    async changeMsgState(user) {
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`);
      console.log(res);
    },
    //分配角色
    async showSetUserRole(user) {
      this.currentUsername = user.username;
      this.currentUserId = user.id;
      //获取所有的角色
      const res1 = await this.$http.get(`roles`);
      this.roles = res1.data.data;
      // console.log(res1);
      const res = await this.$http.get(`users/${user.id}`);
      console.log(res) 
      this.currentRoleId = res.data.data.rid; 
      this.dialogFormVisibleRole = true;
    },
    //设置角色
    async setRole() {
      const res = await this.$http.put(`users/${this.currentUserId}/role`,{
        rid: this.currentRoleId
      });
      console.log(res);
      this.dialogFormVisibleRole = false;
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