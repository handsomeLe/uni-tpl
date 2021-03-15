<script>
  export default {
    onLaunch: function() {
      let menuStr = uni.getStorageSync("menu")
      if (menuStr && menuStr !== "[]") {
        uni.reLaunch({
          url: "/pages/index/index",
        })
      }
    },
    onShow: function() {},
    onHide: function() {},
  }
</script>
<style lang="scss">
  /*每个页面公共css */
  /* #ifndef APP-PLUS-NVUE	 */
  uni-page-body {
    height: 100%;
  }
  html {
    height: 100%;
  }
  body {
    height: 100%;
  }
  /* #endif */
</style>
