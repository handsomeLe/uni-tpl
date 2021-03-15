<template>
  <view class="loginPage">
    <view class="mainContent">
      <view class="validationText">
        <text>请输入验证码</text>
      </view>
      <view class="telText">
        <text>验证码发送至+86{{ " " + tel }}</text>
      </view>
      <view class="iptBox">
        <uni-easyinput
          v-model="value"
          focus
          placeholder="请输入短信验证码"
          @input="input"
          maxlength="6"
          :inputBorder="false"
          placeholderStyle="font-weight:100;text-align:left;letter-spacing: 0;font-size:32rpx"
        ></uni-easyinput>
        <view class="times">
          <text v-if="isRun">{{ refershTime }}s重试</text>
          <text v-else class="reSend" @click="sendInfo">重新发送</text>
        </view>
      </view>
    </view>
    <uni-popup ref="popup3" type="dialog" :maskClick="false">
      <organization-con></organization-con>
    </uni-popup>
  </view>
</template>

<script>
  import { mapState } from "vuex"
  import uniPopup from "@/components/uni-popup/uni-popup.vue"
  import organizationCon from "./components/organization"
  export default {
    data() {
      return {
        value: "",
        isRun: true,
        times: "",
      }
    },
    computed: {
      ...mapState({
        tel: (state) => state.user.tel,
        tenantList: (state) => state.user.tenantList,
        refershTime: (state) => state.user.refershTime,
        smsErr: (state) => state.user.smsErr,
        isLogin: (state) => state.user.isLogin,
      }),
    },
    watch: {
      isLogin(val) {
        if (val) {
          uni.reLaunch({
            url: "/pages/home/home",
          })
        }
      },
      refershTime(val) {
        if (val > 0) {
          this.isRun = true
        } else if (val <= 0) {
          this.isRun = false
        }
      },
      smsErr(val) {
        if (val) {
          this.value = ""
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
    mounted() {
      if (this.refershTime !== 0) {
        this.timeRun()
      }
    },
    beforeDestroy() {
      if (this.times) {
        clearInterval(this.times)
      }
    },
    methods: {
      sendInfo() {
        this.$store.commit("user/saveTime", 60)
        this.timeRun()
        this.$store.dispatch("user/getSMSMsg", {
          mobile: this.tel,
        })
      },
      timeRun() {
        this.value = ""
        this.times = setInterval(() => {
          let runtTime = this.refershTime
          this.$store.commit("user/saveTime", runtTime - 1)
          if (runtTime <= 1) {
            clearInterval(this.times)
            return
          }
        }, 1000)
      },
      input(e) {
        if (e && e.length === 6) {
          this.$store.dispatch("user/smslogin", {
            mobile: this.tel,
            smsCode: e,
          })
        }
      },
    },
    components: {
      uniPopup,
      organizationCon,
    },
  }
</script>

<style lang="scss" scoped>
  .loginPage {
    width: 100%;
    height: 100%;
    background-color: #fff;
    .mainContent {
      padding: 180rpx 48rpx 0;
      .telText {
        line-height: 28rpx;
        color: rgba(0, 0, 0, 0.45);
        font-size: 28rpx;
      }
      .validationText {
        color: #000;
        font-size: 50rpx;
        font-weight: 600;
      }
    }
    .iptBox {
      display: flex;
      justify-content: space-between;
      border-bottom: 2rpx solid #000;
      margin: 139rpx auto 0;
      width: 623rpx;
      ::v-deep .uni-easyinput {
        width: 70%;
        .uni-easyinput__content-input {
          padding-left: 0 !important;
        }
        input {
          font-size: 32rpx;
          letter-spacing: 8rpx;
          color: #000;
          font-weight: 600;
          font-size: 48rpx;
        }
      }
      .times {
        width: 30%;
        height: 72rpx;
        line-height: 72rpx;
        font-size: 30rpx;
        text-align: right;
        font-weight: 500;
        .reSend {
          color: #ffc500;
        }
      }
    }
  }
</style>
