<template>
  <div class="container">


    <div class="nav2">
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