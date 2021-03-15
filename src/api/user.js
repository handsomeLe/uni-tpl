import api from './index';
import portDict from '@/dict/port.js'

const BASE_URL = {
  pwdLogin: portDict.BASICDATACENTER + '/userInfo/login',
  userUrl: portDict.PARRORSERVER + '/user/user',
  menuUrl: portDict.PARRORSERVER + '/menu/getMenu',
  smsUrl: portDict.BASICDATACENTER + '/userInfo/sms',
  telLogin: portDict.BASICDATACENTER + '/userInfo/sms/login',
  loginoutUrl: portDict.BASICDATACENTER + '/loginout'
}

//登录
export const login = (data) => api.post(BASE_URL.pwdLogin, data, {});
//退出
export const loginOut = (data) => api.get(BASE_URL.loginoutUrl, data);
//用户信息
export const user = (data) => api.post(BASE_URL.userUrl, data);
//获取验证码
export const getSMS = (data) => api.post(BASE_URL.smsUrl, data);
//验证码登录
export const smsLogin = (data) => api.post(BASE_URL.telLogin, data);
//获取权限
export const menu = (data, header) => api.get(BASE_URL.menuUrl, data, header);