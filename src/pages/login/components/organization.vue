<template>
  <view class="popup-content-org">
    <view class="titleText">
      <view class="iconCon"></view>
      <text>请选择对应组织架构</text>
    </view>
    <view class="tenantList">
      <view
        class="tenantItem"
        :key="item.id"
        v-for="item in tenantList"
        @click="chooseTenant(item.id)"
      >
        <text>{{ item.tenant }}</text>
      </view>
    </view>
  </view>
</template>

<script>
  import { mapState } from "vuex"
  export default {
    components: {},
    data() {
      return {}
    },
    computed: {
      ...mapState({
        tenantList: (state) => state.user.tenantList,
        tenantId: (state) => state.user.tenantId,
      }),
    },
    mounted() {},
    methods: {
      chooseTenant(tenantId) {
        this.$store.commit("user/saveTenantId", tenantId)
        this.$store.dispatch("user/getMenu");
        this.go("/pages/index/index");
        // console.log("已选中，请在/login/components/organization修改后续操作")
      },
      go(path) {
        uni.navigateTo({
          url: path,
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .popup-content-org {
    background-color: #fff;
    text-align: center;
    border-radius: 6rpx;
    font-size: 28rpx;
    color: rgba(0, 0, 0, 0.45);
    width: 418rpx;
    color: #000;
    .titleText {
      height: 85rpx;
      line-height: 85rpx;
      position: relative;
      font-weight: 600;
      .iconCon {
        position: absolute;
        left: 0;
        top: 50%;
        width: 10rpx;
        height: 40rpx;
        background-color: rgba(63, 208, 159, 1);
        transform: translate(0, -50%);
        border-top-right-radius: 10rpx;
        border-bottom-right-radius: 10rpx;
      }
    }
    .tenantList {
      border-top: 2rpx solid rgba(0, 0, 0, 0.1);
      .tenantItem {
        height: 80rpx;
        line-height: 80rpx;
        border-bottom: 2rpx dashed rgba(0, 0, 0, 0.24);
      }
      .tenantItem:last-child {
        border-bottom-color: transparent;
      }
    }
  }
</style>
