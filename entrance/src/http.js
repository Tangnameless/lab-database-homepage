import axios from 'axios'
import Vue from 'vue'
import router from './router/index'


const http = axios.create({
    // 连接ZAS服务器获取token
    // baseURL: 'http://oneapp.2linkq.com/zas'
    // ZAS IP:47.93.49.119:8925
    baseURL: 'http://47.93.49.119:8925'
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前,为每个请求的headers加上token
    // header加上token请求相应用户名会报错
    // if (localStorage.token) {
    //     config.headers['Authorization'] = localStorage.token;
    // }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 全局捕获错误
// 使用axios 拦截器
// Element 注册了一个$message方法用于调用，Message 可以接收一个字符串或一个 VNode 作为参数，它会被显示为正文内容。
http.interceptors.response.use(res => {
    return res
}, err => {
    console.log(err);
    if (err.response.data) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data
        })

        // 如果捕获错误状态码401，说明未授权，跳转至登录页面
        if (err.response.status === 401) {
            router.push('/login')
        }
    }
    return Promise.reject(err)
})

export default http