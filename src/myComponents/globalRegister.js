import Vue from "vue" // 引入vue

function changeStr(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/*
    require.context(arg1,arg2,arg3)
        arg1 - 读取文件的路径
        arg2 - 是否遍历文件的子目录
        arg3 - 匹配文件的正则
*/
const requireComponent = require.context(".", true, /index.vue/)
requireComponent.keys().forEach((fileName) => {
  const config = requireComponent(fileName)
  const componentName = changeStr(
    fileName
      .replace(/^\.\//, "")
      .replace(/\.\w+$/, "")
      .replace("/index", "")
  )
  console.log(componentName,config.default)
  Vue.component(componentName, config.default || config) // 动态注册该目录下的所有.vue文件
})
