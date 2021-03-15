<template>
  <view class="loading-container">
  </view>
</template>

<script>
  import { mapState } from "vuex"
  export default {
    components: {
    },
    data() {
      return {
        loginLoadingInfo: "用户角色发生改变，正在重新拉取用户信息",
        loading: false,
      }
    },
    computed: {
      ...mapState({
        isLogin: (state) => state.user.isLogin,
      }),
    },
    watch: {
      isLogin(val) {
        if (val) {
          this.loading = false
          uni.getStorage({
            key: "menu",
            success: function(res) {
              uni.reLaunch({
                url: "/pages/index/index",
              })
            },
          })
        }
      },
    },
    mounted() {
      this.loading = true
      this.$store.dispatch("user/loadUser")
    },
  }
</script>

<style lang="scss" scoped>
  .loading-container {
    width: 100%;
    height: 100%;
    .globalLoading {
      width: 100%;
      height: 100%;
    }
  }
</style>
