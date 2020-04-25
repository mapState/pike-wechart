<template>
  <div class="container">
    <div class="line"></div>
    <div class="content">
      <div class="items">
        <div class="item">
          <img src="../../../static/images/news.png" alt mode="widthFix" />
          <p>评论通知</p>
        </div>
        <div class="item" @click="toNext('red')">
          <img src="../../../static/images/news-one.png" alt mode="widthFix" />
          <p>私信通知</p>
        </div>
        <div class="item" @click="toNext('invite')">
          <img src="../../../static/images/gift6.png" alt mode="widthFix" />
          <p>礼物通知</p>
        </div>
        <div class="item">
          <img src="../../../static/images/congratelation.png" alt mode="widthFix" />
          <p>合作通知</p>
        </div>
      </div>
      <div class="set">
        <img src="../../../static/images/red6.png" alt mode="widthFix" />
        <p>红包通知</p>
      </div>
      <div class="set">
        <img src="../../../static/images/hand.png" alt mode="widthFix" />
        <p>点赞通知</p>
      </div>
    </div>
    <div class="line2"></div>
    <div class="list">
      <div class="item">
        <img src="../../../static/images/hand.png" alt mode="widthFix" />
        <div class="title">您兑换的人民币已到账，请注意查看</div>
        <div class="tip">系统通知</div>
        <div class="right">18:40</div>
      </div>
      <div class="item">
        <img src="../../../static/images/hand.png" alt mode="widthFix" />
        <div class="title">您兑换的人民币已到账，请注意查看</div>
        <div class="tip">系统通知</div>
        <div class="right"><span></span>18:40</div>
        <span></span>
      </div>
    </div>
    <tab :active="active"></tab>
  </div>
</template>

<script>
import tab from "@/components/tab";
import label from "@/components/label";
export default {
  components: {
    tab,
    label
  },
  data() {
    return {
      active: 2,
      nav: 1,
      littleVav: 0,
      type: 0
    };
  },
  methods: {
    toNext(msg, t, a) {
      wx.navigateTo({
        url: `../${msg}/main?rType=${t}&nav=${a}`
      });
    },
    chooseNav(n) {
      this.nav = n;
    }
  },

  mounted() {
    console.log(1);
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