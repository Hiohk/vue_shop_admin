import axios from 'axios'
// import { config } from 'vue/types/umd'

const MyHttpServer = {}
MyHttpServer.install = (Vue) => {
  // axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
  axios.defaults.baseURL = 'http://www.ysqorz.top:8888/api/private/v1/'
  //添加请求拦截器
  axios.interceptors.request.use(function (config) {
    console.log('拦截器被触发');
    if (config.url !== 'login') {
      const AUTH_TOKEN = localStorage.getItem('token');
      config.headers['Authorization'] = AUTH_TOKEN;
    }
    // console.log(config);
    return config;
  },function (error) {
    return Promise.reject(error);
  });
  //添加响应拦截器
  axios.interceptors.response.use(function (response) {
    return response;
  },function (error) {
    return Promise.reject(error);
  });
  // const AUTH_TOKEN = localStorage.getItem('token');
  // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  // 添加实例方法
  Vue.prototype.$http = axios
}

export default MyHttpServer