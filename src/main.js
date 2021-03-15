import Vue from "vue"
import App from "./App"
import store from "./store"
import api from "./api/index.js"
import "./directive/permission"
import commonPattern from "./common/regExp.js"
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$commonPattern = commonPattern
Vue.prototype.$bus = new Vue()
App.mpType = "app"
const app = new Vue({
  ...App,
  store,
})
app.$mount()
// // 错误收集 先放这里不要删除
// const errors = []
// const getTimestamp = () => {
//   return new Date()
// }
// Vue.config.errorHandler = error => {
//   errors.push({ time: getTimestamp(), content: error.stack })
// }
