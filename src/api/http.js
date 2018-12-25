 import axios from 'axios';
 import QS from 'qs';
 import { Message } from 'element-ui'
 
 // 环境的切换
 if (process.env.NODE_ENV == 'development') {
     axios.defaults.baseURL = 'http://odapi.qa.youpinhaoche.com/';
 } else if (process.env.NODE_ENV == 'qa') {
     axios.defaults.baseURL = 'https://pdms.qncentury.com/';
 } else if (process.env.NODE_ENV == 'production') {
     axios.defaults.baseURL = 'https://pdms.qncentury.com/';
 }
 
 // 请求超时时间
 axios.defaults.timeout = 10000;
 
 // post请求头
 axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
 
 // 请求拦截器
 axios.interceptors.request.use(
     config => {
         //headers请求头添加token
         const token = localStorage.getItem('token');
         token && (config.headers.Authorization = token);
         return config;
     },
     error => {
         return Promise.error(error);
     })
 
 // 响应拦截器
 axios.interceptors.response.use(
     response => {
         if (response.status === 200) {
             if(response.data.errcode === 0){
                return Promise.resolve(response.data);
             }else{
                this.$message.error(response.data.errmsg)
             }
         } else {
             return Promise.reject(response);
         }
     },
     // 服务器状态码不是200的情况
     error => {
         if (error.response.status) {
             switch (error.response.status) {
                 // 401: 未登录
                 case 401:
                     router.replace({
                         path: '/login',
                         query: { redirect: router.currentRoute.fullPath }
                     });
                     break;
                 // 403 token过期
                 case 403:
                    this.$message.error('登录过期，请重新登录');
                     // 清除token
                     localStorage.removeItem('token');
                     // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                     setTimeout(() => {
                         router.replace({
                             path: '/login',
                             query: {
                                 redirect: router.currentRoute.fullPath
                             }
                         });
                     }, 1000);
                     break;
                 // 404请求不存在
                 case 404:
                    this.$message.error('网络请求不存在');
                    break;
                 // 其他错误，直接抛出错误提示
                 default:
                    this.$message.error(error.response.data.message);
             }
             return Promise.reject(error.response);
         }
     }
 );

 //get
 export function get(url, params){
     return new Promise((resolve, reject) =>{
         axios.get(url, {
             params: params
         })
         .then(res => {
             resolve(res.data);
         })
         .catch(err => {
             reject(err.data)
         })
     });
 }

 //post
 export function post(url, params) {
     return new Promise((resolve, reject) => {
         axios.post(url, QS.stringify(params))
         .then(res => {
             resolve(res.data);
         })
         .catch(err => {
             reject(err.data)
         })
     });
 }