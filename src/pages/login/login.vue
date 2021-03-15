<template>
  <view class="loginPage">
    <login-logo></login-logo>
    <uni-forms
      class="formBox"
      ref="form"
      :rules="rules"
      :value="form"
      labelAlign="center"
      :label-width="50"
    >
      <uni-forms-item name="tel" label="+86" class="iptTel">
        <uni-easyinput type="text" v-model="form.tel" placeholder="请输入手机号" maxlength="11" />
      </uni-forms-item>
      <view class="btnBox">
        <view>
          <button @click="submitForm('form')" class="subBtn">登录</button>
        </view>
      </view>
      <view class="other-login" @click="go('/pages/login/login1')">
        <text>密码登录</text>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { mapState } from "vuex"
  import loginLogo from "./components/loginLogo.vue"
  import organizationCon from "./components/organization"
  export default {
    data() {
      return {
        form: {
          tel: "",
        },
        rules: {
          tel: {
            rules: [
              {
                required: true,
                errorMessage: "请输入手机号",
              },
              {
                pattern: this.$commonPattern.telReg,
                errorMessage: "手机号格式不正确",
              },
            ],
          },
        },
      }
    },
    computed: {
      ...mapState({
        tel: (state) => state.user.tel,
        refershTime: (state) => state.user.refershTime,
      }),
    },
    methods: {
      go(path) {
        uni.navigateTo({
          url: path,
        })
      },
      submitForm(form) {
        this.$refs[form]
          .submit()
          .then((res) => {
            this.$store.dispatch("user/getSMSMsg", {
              mobile: res.tel,
            })
            this.go("/pages/login/validation")
            if (res.tel !== this.tel) {
              this.$store.dispatch("user/getSMSMsg", {
                mobile: res.tel,
              })
              this.$store.commit("user/saveTime", 60)
            } else {
              if (this.refershTime <= 0) {
                this.$store.dispatch("user/getSMSMsg", {
                  mobile: res.tel,
                })
                this.$store.commit("user/saveTime", 60)
              }
            }
          })
          .catch((errors) => {})
      },
    },
    components: {
      loginLogo,
      organizationCon,
    },
  }
</script>

<style lang="scss" scoped>
  .loginPage {
    width: 100%;
    height: 100%;
    background-color: #fff;
    .formBox {
      ::v-deep .iptTel {
        border-bottom: 2rpx solid #000;
        .uni-forms-item__label {
          margin: 0;
          span {
            font-size: 32rpx;
            color: rgba(0, 0, 0, 0.65);
          }
        }
      }
      .uni-forms-item {
        width: 560rpx;
        margin: 60rpx auto 0;
      }

      .btnBox {
        margin-top: 80rpx;
        text-align: center;
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
        // .pwdLogin {
        //   padding: 56rpx;
        //   color: rgba(0, 0, 0, 0.65);
        //   font-size: 32rpx;
        // }
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
          border-bottom: transparent;
          background-color: transparent;
        }

        .uni-easyinput__content-input {
          font-size: 32rpx;
        }
      }
    }
  }
</style>
