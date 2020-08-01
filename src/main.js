import Vue from 'vue'
// 引入 App 组件
import App from './App.vue'
// 引入 router 组件
import router from './router'
// 引入 vuex 的配置
import store from './store'
// import HighchartsVue from 'highcharts-vue'
// Vue.use(highcharts-vue)

// 引入 axios 组件库
import axios from "./common/myaxios"
// 在 Vue 的原型上添加 $axios
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
