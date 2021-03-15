<template>
  <view class="loginPage">
    <login-logo></login-logo>
    <uni-forms class="formBox" ref="form" :rules="rules" :value="form" labelAlign="center">
      <uni-forms-item name="userName" required>
        <uni-easyinput
          type="text"
          v-model="form.userName"
          placeholder="请输入账号"
          maxlength="14"
        />
      </uni-forms-item>
      <uni-forms-item name="password" required>
        <uni-easyinput
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
          maxlength="32"
        />
      </uni-forms-item>
      <view class="other">
        <text class="forget" @click="toggle">忘记密码</text>
        <text class="noUser" @click="toggle2">无账号?</text>
      </view>
      <view>
        <view>
          <button @click="submitForm('form')" class="subBtn">登录</button>
        </view>
        <view class="other-login" @click="go('/pages/login/login')">
          <text>手机号登录</text>
        </view>
      </view>
    </uni-forms>
    <uni-popup ref="popup" :type="type" :maskClick="false">
      <view class="popup-content">
        <view class="pop-main">
          <view
            class="t-icon iconWarning"
            style="width: 67rpx;height:67rpx;margin-bottom:29rpx"
          ></view>
          <view class="">
            <text>不支持重置密码功能!</text>
          </view>
          <view class="">
            <text>请在热果平台上进行相关操作。</text>
          </view>
          <view class="linkName">
            <text>热果平台链接:</text>
          </view>
          <view class="linkUrl">
            <text>https://login.gcongo.com</text>
          </view>
        </view>
        <view class="comfirmBox">
          <text @click="dialogClose">确认</text>
        </view>
      </view>
    </uni-popup>
    <uni-popup ref="popup2" :type="type" :maskClick="false">
      <view class="popup-content">
        <view class="pop-main">
          <view
            class="t-icon iconWarning"
            style="width: 67rpx;height:67rpx;margin-bottom:29rpx"
          ></view>
          <view class="">
            <text>请在热果平台上注册账号!</text>
          </view>
          <view class="linkName">
            <text>热果平台链接:</text>
          </view>
          <view class="linkUrl">
            <text>https://login.gcongo.com</text>
          </view>
        </view>
        <view class="comfirmBox">
          <text @click="dialogClose2">确认</text>
        </view>
      </view>
    </uni-popup>
    <uni-popup ref="popup3" :type="type" :maskClick="false">
      <organization-con></organization-con>
    </uni-popup>
  </view>
</template>

<script>
  import { mapState } from "vuex"
  import uniPopup from "@/components/uni-popup/uni-popup.vue"
  import loginLogo from "./components/loginLogo.vue"
  import organizationCon from "./components/organization"
  let Base64 = require("js-base64").Base64
  export default {
    data() {
      return {
        form: {
          userName: "",
          password: "",
        },
        rules: {
          userName: {
            rules: [
              {
                required: true,
                errorMessage: "账号不能为空",
              },
            ],
          },
          password: {
            rules: [
              {
                required: true,
                errorMessage: "密码不能为空",
              },
            ],
          },
        },
        type: "dialog",
      }
    },
    computed: {
      ...mapState({
        tenantList: (state) => state.user.tenantList,
        loginLoadingInfo: (state) => state.user.loginLoadingInfo,
        isLogin: (state) => state.user.isLogin,
        tenantId: (state) => state.user.tenantId,
      }),
    },
    watch: {
      isLogin(val) {
        if (val) {
          uni.getStorage({
            key: "menu",
            success: function(res) {
              uni.reLaunch({
                url: "/pages/home/home",
              })
            },
          })
        }
      },
      tenantList(val) {
        if (val && val.length === 1) {
          this.$store.commit("user/saveTenantId", val[0].id)
          this.$store.dispatch("user/getMenu")
          uni.setStorageSync("tenantId", JSON.stringify(val[0].id))
          this.$store.dispatch("user/getMenu")
        } else if (val.length > 1) {
          this.$refs.popup3.open()
        } else {
          this.$refs.popup3.close()
        }
      },
    },
    methods: {
      trim(s) {
        return s.replace(/(^\s*)|(\s*$)/g, "")
      },
      toggle() {
        this.$refs.popup.open()
      },
      dialogClose(done) {
        this.$refs.popup.close()
      },
      toggle2() {
        this.$refs.popup2.open()
      },
      dialogClose2(done) {
        this.$refs.popup2.close()
      },
      go(path) {
        uni.navigateTo({
          url: path,
        })
      },
      submitForm(form) {
        this.$refs[form]
          .submit()
          .then((res) => {
            if (this.$commonPattern.loginPwdReg.test(res.password)) {
              this.$store.dispatch("user/loginAction", {
                userName: res.userName,
                password: Base64.encode(res.password),
              })
            } else {
              uni.showToast({
                title: "账号或密码输入错误，请重新输入",
                icon: "none",
              })
            }
          })
          .catch((errors) => {})
      },
    },
    components: {
      loginLogo,
      uniPopup,
      organizationCon,
    },
  }
</script>

<style lang="scss" scoped>
  .loginPage {
    width: 100%;
    min-height: 100%;
    background-color: #fff;
    .logoImg {
      width: 157rpx;
      height: 141rpx;
      margin-top: 42rpx;
      margin-bottom: 27rpx;
    }

    .formBox {
      .uni-forms-item {
        width: 600rpx;
        margin: 60rpx auto 0;
      }
      .subBtn {
        background-color: #ffc500;
        color: #fff;
        width: 546rpx;
        height: 82rpx;
        line-height: 82rpx;
        text-align: center;
        margin: 0 auto;
        font-size: 36rpx;
        letter-spacing: 8rpx;
      }

      .subBtn:after {
        border-color: transparent;
      }
      .other-login {
        margin-top: 20rpx;
        padding: 30rpx 0;
        font-size: 28rpx;
        text-align: center;
        color: #999;
      }

      ::v-deep .uni-easyinput {
        height: 72rpx;
        line-height: 72rpx;
        background-color: transparent;

        .is-input-border {
          border: none;
          border-bottom: 2rpx solid #000 !important;
          border-radius: 0;
          background-color: transparent;
        }
        .uni-easyinput__content-input {
          font-size: 32rpx;

          .uni-input-input {
            height: 72rpx;
            line-height: 72rpx;
          }
        }
      }

      .other {
        width: 600rpx;
        display: flex;
        margin: 32rpx auto 72rpx;
        justify-content: flex-end;
        font-size: 32rpx;

        .forget {
          color: #ffc500;
          margin-right: 20rpx;
        }

        .noUser {
          color: rgba(0, 0, 0, 0.65);
        }
      }
    }

    ::v-deep .popup-content {
      background-color: #fff;
      text-align: center;
      border-radius: 6rpx;
      font-size: 28rpx;
      color: rgba(0, 0, 0, 0.45);
      .pop-main {
        padding: 45rpx 45rpx 0;
      }
      .linkName {
        color: #000;
        margin-top: 40rpx;
        font-weight: 600;
      }
      .linkUrl {
        color: #fe7616;
      }
      .comfirmBox {
        height: 100rpx;
        line-height: 100rpx;
        font-size: 36rpx;
        color: #ffc500;
        margin-top: 47rpx;
        border-top: 2rpx solid #ddd;
      }
    }
  }
</style>
