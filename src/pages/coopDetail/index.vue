<template>
  <div class="container">
    <div class="title">任务进度</div>
    <div class="step">
      <div class="line">
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
      </div>
    </div>
  </div>
</template>

<script>
import label from "@/components/label";
export default {
  components: {
    label
  },
  data() {
    return {
      active: 0,
      nav: 1,
      littleVav: 0,
      name: "",

      type: 0
    };
  },
  methods: {
    init() {
      this.name = this.$mp.query.rType;
      this.nav = this.$mp.query.nav;
      wx.setNavigationBarTitle({
        title: this.name
      });
    },
    chooseNav(n) {
      this.nav = n;
    }
  },

  mounted() {
    this.init();
  }
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
<style scoped>
>>> .van-tab {
  color: #101010;
}
>>> .van-tab--active {
  color: #fc5428;
}
>>> .van-hairline--top-bottom:after {
  border: none;
}
</style>