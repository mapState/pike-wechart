<template>
  <div class="container" @click="setFalse">
    <div class="line"></div>
    <div class="list">
      <div class="item" @click="tipShow=true">
        <div class="left">
          <img src="../../../static/images/user.png" alt mode="aspectFill" />
        </div>
        <div class="name">沈精灵啊</div>
        <div class="detail">小哥哥可以合唱吗？小哥哥可以合唱吗？小哥哥可以合唱吗？小哥哥可以合唱吗？</div>
        <div class="right">
          18:40
          <span></span>
        </div>
      </div>
    </div>
    <tips v-model="tipShow"></tips>
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
      tipShow:false
    };
  },
  methods: {
    init() {}
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
>>> .van-popup {
  background: transparent;
}

>>> .van-hairline--top-bottom:after {
  border-top: 2px solid #fc5428;
  border-bottom: 2px solid #fc5428;
}
</style>