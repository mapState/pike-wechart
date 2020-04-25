<template>
  <div class="container" @click="setFalse">
    <div class="list">
      <div class="item" @click="toNext('infoStep1')">
        个人资料
        <img src="../../../static/images/you.png" alt mode="widthFix" />
      </div>
      <div class="item" @click="show=true">
        邀请合作
        <img src="../../../static/images/you.png" alt mode="widthFix" />
      </div>
      <div class="item" @click="toNext('infoStep3')">
        实名认证
        <img src="../../../static/images/you.png" alt mode="widthFix" />
        <span>已认证</span>
      </div>
      <div class="item">
        关于我们
        <img src="../../../static/images/you.png" alt mode="widthFix" />
      </div>
    </div>
    <div class="out">退出登录</div>
    <tips v-model="show"></tips>
  </div>
</template>

<script>
import tips from "@/components/tips";
export default {
  components: {
    tips
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    toNext(msg,t,a) {
      wx.navigateTo({
        url: `../${msg}/main?where=1`
      });
    },
  },

  mounted() {}
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
<style scoped>
</style>