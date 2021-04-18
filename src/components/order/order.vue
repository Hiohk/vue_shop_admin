<template>
  <el-card>
    <my-bread level1="订单管理" level2="订单列表"></my-bread>
    <el-table :data="list" style="width: 100%">
      <el-table-column type="index" label="#" width="40"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="200"></el-table-column>
      <el-table-column prop="order_price" label="订单价格"></el-table-column>
      <el-table-column prop="order_pay" label="是否付款" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.order_pay==='0'">已付款</el-tag>
          <el-tag type="danger" v-else-if="scope.row.order_pay==='1'">未付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货" width="100"></el-table-column>
      <el-table-column label="下单时间" width="90">
        <!-- <template slot-scope="scope">
          {{scope.row.create_time||fmtDate}}
        </template> -->
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button 
            plain 
            type="primary" 
            icon="el-icon-edit" 
            circle
            @click="showEditdia(scope.row)"
            ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框 -->
    <el-dialog title="修改订单地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="省市区" label-width="120px">
          <el-cascader
            expand-trigger="hover"
            v-model="selectedOptions"
            :options="catlist"
            clearable
            filterable
            style="width: 100%"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>

<script>
import catlist from '@/components/order/citydata.js'

export default {
  data() {
    return {
      list: [],
      dialogFormVisible: false,
      form: {
        address: ""
      },
      catlist: [],
      selectedOptions: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await this.$http.get(`orders?pagenum=1&pagesize=10`);
      this.list = res.data.data.goods;
    },
    showEditdia() {
      this.catlist = catlist
      this.dialogFormVisible = true
    }
  }
}
</script>

<style>

</style>