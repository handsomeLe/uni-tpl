<template>
  <view class="no-data-view">
    <image class="no-data_img" src="@/static/indexIcon/noData.png"></image>
    <text class="tips_text">暂无数据</text>
  </view>
</template>

<script>
  export default {
    name: "NoData",
    props: {},
  }
</script>

<style lang="scss" scoped>
  .no-data-view {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .tips_text {
      position: absolute;
      right: 0;
      left: 0;
      bottom: 30rpx;
      text-align: center;
      color: #999;
      letter-spacing: 3rpx;
      font-size: 30rpx;
    }
  }
</style>
