<template>
  <el-card>
    <my-bread level1="商品管理" level2="商品列表"></my-bread>
    <!-- 提示信息 -->
    <el-alert class="alert" title="添加商品信息" type="success" center show-icon></el-alert>
    <!-- 步骤条 -->
    <el-steps :active="1*active" align-center>
      <el-step title="基本信息" ></el-step>
      <el-step title="商品参数" ></el-step>
      <el-step title="商品属性" ></el-step>
      <el-step title="商品图片" ></el-step>
      <el-step title="商品内容" ></el-step>
    </el-steps>
    
    <el-form label-position="top" label-width="80px" :model="form"
    style="height: 500px;overflow: auto">
      <el-tabs v-model="active" tab-position="left" @tab-click="tabchange()">
        <el-tab-pane label="基本信息" name="1">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              clearable
              expand-trigger="hover"
              v-model="selectedOptions"
              :options="options"
              :props="defaultProp"
              @change="handleChange"></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="2">
          <el-form-item 
          :label="item1.attr_name"
          v-for="(item1,i) in arrDyparams"
          :key="i">
             <el-checkbox-group v-model="item1.attr_vals">
              <el-checkbox border :label="item2" v-for="(item2,i) in item1.attr_vals" :key="i"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="3">
          <el-form-item 
          :label="item.attr_name"
          v-for="(item,i) in arrStaticparams"
          :key="i">
             <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="4">
          <el-form-item>
            <el-upload
              class="upload-demo"
              action="http://www.ysqorz.top:8888/api/private/v1/upload"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="5">
          <el-button type="primary" @click="addGoods">添加商品</el-button>
          <quill-editor v-model="form.goods_introduce"></quill-editor>
        </el-tab-pane>

      </el-tabs>
    </el-form>
    
  </el-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  data() {
    return {
      active: "1",
      form: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],//pics为数组，其中存放的是图片临时路径 [{pic:图片临时路径}]
        attrs: []//商品的参数，动态参数和静态参数
      },
      //级联选择器的数据
      options:[],
      selectedOptions: [1,3,6],//设置默认分类
      defaultProp: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      //动态参数数据的数组
      arrDyparams: [],
      arrStaticparams: [],
      headers: {
        Authorization: localStorage.getItem('token')
      }
    } 
  },
  created() {
    this.getGoodCate()
  },
  methods: {
    async addGoods() {
      //cat分类
      this.form.goods_cat = this.selectedOptions.join(',')

      const res  = await this.$http.post(`goods`,this.form)
      // console.log(res);
    },
    //file是当前操作的图片的信息
    handlePreview(file) {

    },
    handleRemove(file) {
      let Index = this.form.pics.findIndex((item) => {
        item.pic === file.response.data.tmp_path
      })
      this.form.pics.splice(Index,1)
    },
    handleSuccess(file) {
      //file.data.tmp_path
      this.form.pics.push({
        pic:file.data.tmp_path
      }) 
      // console.log('成功');
      // console.log(file);
    },
    async tabchange() {
      if(this.active === '2') {
        if(this.selectedOptions.length!==3) {
          this.$message.warning('请先选择商品的三级分类')
          return
        }
        const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=many`)
        // console.log(res);
        this.arrDyparams = res.data.data
        //把字符串attr_vals转化成数组
        this.arrDyparams.forEach(item => {
          item.attr_vals.length === 0 ?[]:
          item.attr_vals = item.attr_vals.trim().split(',')
        })
      } else if (this.active === '3') {
        if(this.selectedOptions.length!==3) {
          this.$message.warning('请先选择商品的三级分类')
          return
        }
        const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=only`)
        // console.log(res);
        this.arrStaticparams = res.data.data
      }
    },
    handleChange() {

    },
    //获取三级分类信息
    async getGoodCate() {
      const res = await this.$http.get(`categories?type=3`)
      // console.log(res);
      this.options = res.data.data
    }
  }
}
</script>

<style>
.alert{
  margin-top: 20px;
  margin-bottom: 20px;
}
.ql-editor {
  min-height: 300px;
}
</style>