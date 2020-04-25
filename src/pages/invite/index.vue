<template>
  <div class="container">
    <img src="http://cdn.pike8.top/FjMBFjjzl6kLtss9gOFyyf5OiUGJ" alt mode="widthFix" class="top" />
    <div class="title">规则说明</div>
    <div class="ruler">1：邀请好友领取双份奖金,快来领取吧！</div>
    <div class="ruler">2：邀请好友领取双份奖金,快来领取吧！</div>
    <div class="ruler">3：邀请好友领取双份奖金,快来领取吧！</div>
    <div class="line"></div>
    <div class="tips">邀请好友 瓜分红包</div>
    <div class="reds">
      <div>
        <button open-type="share">
          <img src="../../../static/images/red4.png" alt mode="widthFix" />
        </button>
        <div class="up">66元现金</div>
        <div class="btm">2人红包</div>
      </div>
      <div>
        <button open-type="share">
          <img src="../../../static/images/red4.png" alt mode="widthFix" />
        </button>
        <div class="up">166元现金</div>
        <div class="btm">3人红包</div>
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
      type: 0
    };
  },
  onShareAppMessage: function(res) {
    let users = wx.getStorageSync("user");
    if (res.from === "button") {
    }
    return {
      title: "转发",
      path: "pages/index/main",
      success: function(res) {}
    };
  },
  methods: {
    init() {},
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