import urlConfig from "./config.js"
import { USER_STATUS_CODE } from "../dict/errMessage.js"
import store from "../store"

const request = {}
let headers = {}

request.globalRequest = (url, method, data, header) => {
  if (header) {
    headers = header
  } else {
    headers["Authorization"] = uni.getStorageSync("token") || ""
    headers["tenantId"] = uni.getStorageSync("tenantId") || ""
  }
  return uni
    .request({
      url: urlConfig + "/" + url,
      method,
      data: data,
      dataType: "json",
      header: headers,
    })
    .then((res) => {
      if (res[1].data.code && res[1].data.code == 200) {
        return res[1].data
      } else {
        if (res[1].statusCode === 200) {
          throw res[1].data
        } else {
          switch (res[1].statusCode) {
            case 401:
              uni.showToast({
                title: "登录异常,请重新登录",
                icon: "none",
              })
              uni.clearStorageSync()
              uni.reLaunch({
                url: "/pages/login/login",
              })
              break
            case 409:
              throw res[1].data
            default:
              uni.showToast({
                title: "服务器异常",
                icon: "none",
              })
              return Promise.resolve(params)
          }
        }
      }
    })
    .catch((params) => {
      console.log(params)
      //用户冻结或角色被修改时
      if (params.status === "355") {
        uni.showToast({
          title: USER_STATUS_CODE[355],
          icon: "none",
          duration: 2000,
        })
        let times = setTimeout(() => {
          clearTimeout(times)
          uni.reLaunch({
            url: "/pages/login/updateUserInfo",
          })
        }, 3000)
        return
      } else if (params.status === "350") {
        store.commit("user/saveInitState")
        uni.showToast({
          title: USER_STATUS_CODE[350],
          icon: "none",
          duration: 2000,
        })
        let times = setTimeout(() => {
          clearTimeout(times)
          uni.clearStorageSync()
          uni.reLaunch({
            url: "/pages/login/login",
          })
        }, 3000)
        return
      } else if (params.status === "401") {
        uni.clearStorageSync()
        uni.reLaunch({
          url: "/pages/login/login",
        })
      }
      if (params && params.code) {
        switch (params.code) {
          case 401:
            uni.clearStorageSync()
            break
          default:
            uni.showToast({
              title: params.message || "服务器异常",
              icon: "none",
              duration: 2000,
            })
            return Promise.resolve(params)
        }
      }
      return Promise.resolve(params)
    })
}

export default request
