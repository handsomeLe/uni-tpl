import { login, logout, getInfo, user, getSMS, smsLogin, menu, loginOut } from "@/api/user"
import visitTree from '@/common/visitTree';

const initState = {
  userInfo: uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')) : '',
  tenantList: [],
  tenantId: uni.getStorageSync('tenantId'),
  token: uni.getStorageSync('token'),
  endpointCode: uni.getStorageSync('endpointCode'),
  menu: uni.getStorageSync('menu') ? JSON.parse(uni.getStorageSync('menu')) : '',
  isAdmin: false,
  loginLoadingInfo: '',
  isLogin: false,
  tel: "",
  SMS: "",
  refershTime: 0,
  smsErr: false,
}

let cloneDeep = (data) => {//深度copy一份数据
  return JSON.parse(JSON.stringify(data))
}

const mutations = {
  saveInitState(state) {
    Object.assign(state, initState);//用原数据进行还原
  },
  saveTime(state, payload) {
    state.refershTime = payload;
  },
  saveTenantList(state, payload) {
    state.tenantList = payload;
  },
  saveTenantId(state, payload) {
    state.tenantId = payload;
    uni.setStorageSync('tenantId', payload);
  },
  changeLoadingStatus(state, payload) {
    state.loginLoadingInfo = payload;
  },
  changeLoginStatus(state, payload) {
    state.isLogin = payload;
  },
  saveSMS(state, payload) {
    state.SMS = payload;
  },
  saveToken(state, payload) {
    state.token = payload;
    uni.setStorageSync('token', payload);
  },
  saveEndpointCode(state, payload) {
    state.endpointCode = payload;
    uni.setStorageSync('endpointCode', payload);
  },
  saveUserInfo(state, payload) {
    state.userInfo = payload;
    uni.setStorageSync('userInfo', JSON.stringify(payload));
  },
  saveTel(state, payload) {
    state.tel = payload;
  },
  saveMenu(state, payload) {
    state.menu = payload.menu;
    state.isAdmin = payload.isAdmin;
    uni.setStorageSync('menu', JSON.stringify(payload.menu));
  },
  saveSmsErr(state, payload) {
    state.smsErr = payload;
  }
}

const actions = {
  // 密码登录
  loginAction({ commit, dispatch }, payload) {
    commit("changeLoadingStatus", '登录中')
    login(payload)
      .then((res) => {
        if (res && res.code === 200 && res.data) {
          commit("saveEndpointCode", res.data.endpointCode);
          commit("saveToken", res.data.token);
          commit("changeLoadingStatus", '正在同步用户信息')
          dispatch("getUserInfo");
        } else {
          uni.clearStorage();
          commit("changeLoadingStatus", '')
        }
        return;
      })
      .catch((error) => {
        uni.clearStorage();
        commit("changeLoadingStatus", '')
      })
  },
  //验证码登录
  smslogin({ commit, dispatch }, payload) {
    commit("changeLoadingStatus", '登录中')
    smsLogin(payload)
      .then((res) => {
        if (res && res.code === 200 && res.data) {
          commit("saveToken", res.data.token);
          commit("saveEndpointCode", res.data.endpointCode);
          commit("changeLoadingStatus", '正在同步用户信息')
          dispatch("getUserInfo");
        } else {
          commit('saveSmsErr', true);
          uni.clearStorage();
          commit("changeLoadingStatus", '')
        }
        return;
      })
      .catch((error) => {
        commit('saveSmsErr', true);
        commit("changeLoadingStatus", '')
        uni.clearStorage();
      })
  },
  // 用户信息
  getUserInfo({ commit, dispatch }) {
    user()
      .then((res) => {
        if (res && res.code === 200 && res.data) {
          commit("saveUserInfo", res.data);
          commit("saveTenantList", res.data.tenantList);
          if (res.data.tenantList.length > 1) {
            commit("changeLoadingStatus", '')
          }
        }
      })
  },
  //获取验证码
  getSMSMsg({ commit, state }, payload) {
    getSMS(payload)
      .then((res) => {
        if (res && res.code === 200) {
          if (state.tel !== payload.mobile) {
            commit('saveTel', payload.mobile);
          }
        }
        return;
      })
      .catch((error) => {
        reject(error)
      })
  },
  //获取权限
  getMenu({ commit, state }) {
    commit("changeLoadingStatus", '正在获取用户权限')
    menu("", {
      Authorization: state.token,
      tenantId: state.tenantId,
      endpointCode: state.endpointCode
    })
      .then((data) => {
        if (data && data.data) {
          let allMenu = [];
          if (data.data.isAdmin) {
            visitTree(data.data.list, (acl) => {
              allMenu.push(acl.code)
            }, "children")
          } else {
            data.data.list.forEach((acl) => {
              allMenu.push(acl.code);
            })
          }
          commit("saveMenu", {
            menu: allMenu,
            isAdmin: data.data.isAdmin
          });
          if (allMenu && allMenu.length > 0) {
            commit("changeLoadingStatus", '')
            commit("changeLoginStatus", true);
          } else {
            commit("changeLoadingStatus", '')
            uni.showToast({
              title: "该账号暂时没有权限,请联系管理员授权",
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
  },
  // 刷新用户
  loadUser({ commit, dispatch }, payload) {
    commit("changeLoginStatus", false);
    user()
      .then((res) => {
        if (res && res.code === 200 && res.data) {
          commit("saveUserInfo", res.data);
          commit("saveTenantList", res.data.tenantList);
          dispatch('getMenu', payload)
        }
      })

  },
  //获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((data) => {
          return;
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  //登出
  logout({ commit, state }) {
    loginOut()
      .then((data) => {
        if (data.code === 200) {
          commit("changeLoginStatus", false);
          uni.clearStorage()
        }
      })
      .catch((error) => {
        reject(error)
      })
  }
}

export default {
  namespaced: true,
  state: cloneDeep(initState),
  mutations,
  actions,
}
