<template>
  <div class="container">
    <div class="nav">
      <div :class="{active:nav==2}" @click="chooseNav(1)">我发出的</div>
      <div :class="{active:nav==1}" @click="chooseNav(2)">我收到的</div>
    </div>
    <div class="nav1" v-show="nav==1">
      <div class="item">
        <div>
          向
          <span>会上天的猪</span>
          发送了合作邀请
        </div>
        <div>10月26日 18:42</div>
        <span class="right">
          待接受
          <img src="../../../static/images/you.png" alt mode="widthFix" />
        </span>
      </div>
    </div>
    <div class="nav2" v-show="nav==2">
      <div class="item">
        <span class="kong"></span>
        <div class="user">
          <img src="../../../static/images/user.png" alt mode="widthFix" />
        </div>
        <div class="name">
          <span>周周</span>
          <img src="../../../static/images/boy.png" alt mode="widthFix" class="sex" />
          <br />
          <label :type="type"></label>
        </div>
        <div class="mid">
          <div>向你发送了合作邀请</div>
          <div>10-02 15:30</div>
        </div>
        <span class="right">
          待接受
          <img src="../../../static/images/you.png" alt mode="widthFix" />
        </span>
      </div>
      <div class="item">
        <span class="kong"></span>
        <div class="user">
          <img src="../../../static/images/user.png" alt mode="widthFix" />
        </div>
        <div class="name">
          <span>周海生啊</span>
          <img src="../../../static/images/girl.png" alt mode="widthFix" class="sex" />
          <br />
          <label :type="type"></label>
        </div>
        <div class="mid">
          <div>向你发送了合作邀请</div>
          <div>10-02 15:30</div>
        </div>
        <span class="right">
          待接受
          <img src="../../../static/images/you.png" alt mode="widthFix" />
        </span>
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