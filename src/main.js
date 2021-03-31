// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import axios from 'axios'
import MyServerHttp from '@/plugins/http.js'
import moment from 'moment'

// Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(MyServerHttp)//安装插件

//全局过滤器
Vue.filter('fmtDate',(v)=>{
  return moment(v).form('YYYY-MM-DD')
}) 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
