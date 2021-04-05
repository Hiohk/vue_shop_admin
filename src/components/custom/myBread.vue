<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      // level1: '',
      // level2: ''
    }
  },
  //props中的值的用法和data数据用法一样，其中的值来自于组件中传的值
  //props中是一个字符串数组
  //props也是该组件中的属性
  props: ['level1','level2']
}
</script>

<style>

</style>