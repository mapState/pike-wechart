<template>
  <div class="contain">
    <div class="tabs">
      <div :class="{item:true,active:active==0}" @click="choose(0)">
        <image src="../../static/images/homeA.png" alt mode="aspectFit" class="home" v-if="active==0"></image>
        <image src="../../static/images/home.png" alt mode="aspectFit" class="home" v-else ></image>

        <span>首页</span>
      </div>
      <div :class="{item:true,active:active==1}" @click="choose(1)">
        <image src="../../static/images/pkA.png" alt mode="aspectFit" class="pk" v-if="active==1" />
        <image src="../../static/images/pk.png" alt mode="aspectFit" class="pk" v-else />
        <span>PK</span>
      </div>
      <div class="item active" @click="show=true">
        <image src="../../static/images/add.png" alt class="add" style="width:45px;height:45px"></image>
        <span class="">发布</span>
      </div>
      <div :class="{item:true,active:active==2}" @click="choose(2)">
        <image src="../../static/images/msgA.png" alt mode="aspectFit" class="msg" v-if="active==2" />
        <image src="../../static/images/msg.png" alt mode="aspectFit" class="msg" v-else />
        <span>消息</span>
      </div>
      <div :class="{item:true,active:active==3}" @click="choose(3)">
        <image src="../../static/images/mineA.png" alt mode="aspectFit" class="mine" v-if="active==3" />
        <image src="../../static/images/mine.png" alt mode="aspectFit" class="mine" v-else />
        <span>我的</span>
      </div>
    </div>
    <tips v-model="show"></tips>
  </div>
</template>

<script>
import tips from "./tips";
export default {
  components: {
    tips
  },
  props: ["active"],
  data() {
    return {
      show: false
    };
  },
  methods: {
    choose(i) {
      this.active = i;
      if (i == 0) {
        wx.reLaunch({
          url: "../home/main"
        });
      } else if (i == 1) {
        wx.reLaunch({
          url: "../pk/main"
        });
      } else if (i == 2) {
        wx.reLaunch({
          url: "../msg/main"
        });
      } else if (i == 3) {
        wx.reLaunch({
          url: "../mine/main"
        });
      }
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
image{height:auto}
.contain {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 6
}
.tabs {
  display: flex;
  justify-content: space-around;
  padding-top: 5px;
  margin-top: 30px;
  background-color: #fff;
  .item {
    font-size: 12px;
    text-align: center;
    height: 50px;
    image {
      display: block;
      width: 24px;
      height: 24px;
    }
    .add {
      width: 45px;
      height: 45px;
      position: relative;
      top: -25px;
      margin-bottom: -25px;
    }
  }
  .active {
    color: #fc5428;
  }
}
</style>

