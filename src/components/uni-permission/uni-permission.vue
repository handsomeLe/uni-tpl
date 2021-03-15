<template>
  <div
    class="permission"
    v-if="hasPermission || mode!=='hide'"
    @click.stop="showTip"
    v-bind:class="[hasPermission ? '' : className]"
  >
    <slot></slot>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import allPermissionCodes from "../../dict/permissionCode"
export default {
  data() {
    return {}
  },
  props: {
    code: {
      default: "",
      type: String | Array,
    },
    mode: {
      // 控制按钮显隐 非hide:显 hide:隐
      default: "hide",
      type: String,
    },
    className: {
      default: "",
      type: String,
    },
    callback: {
      default: () => {},
      type: Function,
    },
	imageUrl: {
		default: "",
		type: String,
	}
  },
  computed: {
    ...mapGetters({
      meuns: "meuns",
    }),
    /**
     * 控制权限 true:有权限 false:无权限
     */
    hasPermission() {
      let hasPermission = false;
      if(Array.isArray(this.code)) {
      hasPermission = this.$store.getters.menus.some(p => {
            return this.code.some(itm => allPermissionCodes[itm] === p);
       });
      } else {
      hasPermission = this.$store.getters.menus.some(p => {
          return p === allPermissionCodes[this.code]
      });
      }
      return hasPermission
    },
  },
  created() {},
  methods: {
    showTip() {
      if (!this.hasPermission) {
        uni.showToast({
          title: "暂无权限",
          image: this.imageUrl || "../../static/warning.png",
        })
      } else {
        this.callback()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
