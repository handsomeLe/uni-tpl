import Vue from "vue"
import store from "../store"
import allPermissionCodes from "../dict/permissionCode"
//按钮权限判断  v-permission="permission"
Vue.directive("permission", {
  bind: function () { },
  inserted: function (el, binding, vnode) {
    const permission = binding.value;
    const hasPermission = permissionFun(permission)
    // if (!hasPermission) {
    //     console.log(vnode.elm)
    //     el.parentNode && el.parentNode.removeChild(el);
    // }
  },
  updated: function () { },
})
//样式权限判断 v-permissionClass="['permission','className']"
Vue.directive("permissionClass", {
  bind: function () { },
  inserted: function (el, binding, vnode) {
    const permission = binding.value[0];
    const className = binding.value[1];
    const hasPermission = permissionFun(permission)
    if (!hasPermission) {
      el.className = className;
      el.onclick = () => {
        uni.showToast({
          title: '暂无权限',
          image: '../../static/warning.png'
        })
      }
    }

  },
  updated: function () { },
})
const permissionFun = (permission) => {
  const menus = store.getters.menus;
  let hasPermission = false;
  // 判读用户按钮权限
  if (permission && typeof permission === 'string' && menus && menus instanceof Array && menus.length > 0) {
    hasPermission = menus.some(p => {
      return p === allPermissionCodes[permission]
    });
  }
  return hasPermission
}