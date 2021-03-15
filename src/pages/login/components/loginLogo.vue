<template>
  <view class="logoBox" style="">
    <image class="logoImg" src="@/static/wms-logo.png"></image>
    <view>
      <text class="platformName">
        智慧仓储综合服务云平台
      </text>
    </view>
  </view>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  .logoBox {
    text-align: center;
    padding-top: 44rpx;
    .logoImg {
      width: 157rpx;
      height: 141rpx;
      margin-top: 60rpx;
      margin-bottom: 27rpx;
    }
    .platformName {
      font-size: 36rpx;
      color: rgba(0, 0, 0, 0.65);
      font-weight: 600;
    }
  }
</style>
