<template>
  <el-card>
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-row class="addRoleBtn">
      <el-col>
        <el-button type="info">添加角色</el-button>
      </el-col>
    </el-row>
    <el-table :data="rolelist" style="width: 100%">
      <el-table-column type="expand" width="50">
        <template slot-scope="scope">
          <el-row v-for="(item1,i) in scope.row.children" :key="i">
            <el-col :span="4">
              <el-tag @close="deleteRight(scope.row,item1.id)" type="success" closable>{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2,i) in item1.children" :key="i">
                <el-col :span="4">
                  <el-tag @close="deleteRight(scope.row,item2.id)" type="danger" closable>{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag @close="deleteRight(scope.row,item3.id)" type="warning" closable v-for="(item3,i) in item2.children" :key="i">{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <span v-if="scope.row.children.length === 0">未分配权限</span>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="100"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="200"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="200"></el-table-column>
      <el-table-column prop="operation" label="操作">
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
            @click="showDeletegitUserMessage(scope.row.id)"
            ></el-button>
            <el-button
            @click="showSetRightDia(scope.row)" 
            plain 
            type="success" 
            icon="el-icon-check" 
            circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改权限的对话框 -->
    <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
    <!-- 树形结构  default-expand-all默认全部展开 -->
    <el-tree
      ref="tree"
      :data="treelist"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="arrcheck"
      :props="defaultProps">
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
      <el-button type="primary" @click="setRoleRight()">确 定</el-button>
    </div>
  </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      rolelist: [],
      dialogFormVisibleRight: false,
      treelist: [],
      defaultProps: {
        label: 'authName',//节点名称
        children: 'children'//节点
      },
      //节点的id值
      arrexpand: [],
      arrcheck: [],
      currentRoleId: -1
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const res = await this.$http.get(`roles`)
      // console.log(res);
      this.rolelist =res.data.data;
      console.log(this.rolelist);
    },
    //取消权限
    async deleteRight(role,rightId) {
      //roles/:roleId/rights/:rightId
      //roleId:角色 ID,rightId:要删除的权限Id
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
      console.log(res);
      role.children = res.data.data;
      // this. getRoleList()
    },
    async showSetRightDia(role) {
      console.log(role);
      this.currentRoleId = role.id; 
      const res = await this.$http.get(`rights/tree`);
      this.treelist = res.data.data;
      // var arrtemp1 = [];
      // this.treelist.forEach(item1 => {
      //   arrtemp1.push(item1.id)
      //   item1.children.forEach(item2 => {
      //     arrtemp1.push(item2.id)
      //     item2.children.forEach(item3 => {
      //       arrtemp1.push(item3.id)
      //     })
      //   })
      // })
      // console.log(arrtemp1);
      // this.arrexpand = arrtemp1;

      //获取当前角色role的权限id\
      let arrtemp2 = []
      role.children.forEach(item1 => {
        // arrtemp2.push(item1.id)
        item1.children.forEach(item2 => {
          // arrtemp2.push(item2.id)
          item2.children.forEach(item3 => {
            arrtemp2.push(item3.id)
          })
        })
      })
      console.log(arrtemp2);
      this.arrcheck = arrtemp2;
      this.dialogFormVisibleRight = true;
    },
    async setRoleRight() {
      let arr1 = this.$refs.tree.getCheckedKeys()
      let arr2 = this.$refs.tree.getHalfCheckedKeys()
      let arr = [...arr1,...arr2]
      // console.log(arr)
      const res = await this.$http.post(`roles/${this.currentRoleId}/rights`,{rids:arr.join(',')})
      this.getRoleList()
      this.dialogFormVisibleRight = false
    }
  }
}
</script>

<style>
  .addRoleBtn {
    margin-top: 20px;
  }
</style>