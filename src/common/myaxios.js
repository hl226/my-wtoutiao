// 引入 axios
import axios from "axios"
// 配置公共的 url
// process.env.VUE_APP_URL  如果是运行 npm run serve
// 是从 .env.development    文件中读取
axios.defaults.baseURL = process.env.VUE_APP_URL
// 此处配置一个请求的 拦截器
axios.interceptors.request.use(function(config){
    let data = config.data || {}    // get 请求时是没有 data
    data["oauth_token"] = "KwiVWLCxXax3rRcVsmgX7shQGhtBtXnS"  // 在登录的情况下是存在 如果没有登录是不存在的
    config.data = data
    return config
},function(error){
    return Promise.reject(error)
})


// 响应的拦截器
axios.interceptors.response.use(function(response){
    // 返回数据中的 data
    return response.data
},function(error){
    return Promise.reject(error)
})
// 导出自定义的 axios
export default axios