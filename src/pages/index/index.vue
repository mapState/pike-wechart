<template>
  <div class="wraps">
    <div class="logined" v-if="login">
      <!-- 顶部 -->
      <div class="top">
        <img
          src="https://smapi.koudaitiku.net/images/words/60.png"
          alt
          style="width:104rpx;height:44rpx;margin-top:66rpx;margin-left:90rpx"
        />
        <br />
        <img
          src="https://smapi.koudaitiku.net/images/words/ttl.png"
          alt
          style="width:392rpx;height:44rpx;margin-top:24rpx;margin-left:90rpx"
        />
        <img
          src="https://smapi.koudaitiku.net/images/words/config.png"
          alt
          style="width:44rpx;height:44rpx;position:absolute;right:30rpx;top:140rpx;"
          @click="toNum"
        />
        <div class="inner" @click="toHistory">
          <p>0 / 5500</p>
          <p>已学单词数</p>
          <img
            src="https://smapi.koudaitiku.net/images/words/book2.png"
            alt
            style="width:136rpx;height:196rpx;position:absolute;right:70rpx;top:22rpx;border-radius:4px;"
          />
        </div>
      </div>
      <van-button type="primary">测试</van-button>
      <div class="btn" @click="toDays">我的第1天死磕</div>
      <div class="wrap">
        <div class="chinese" @click="toDetail(1)">
          <img src="https://smapi.koudaitiku.net/images/words/chinese.png" />
          <span>中文测试</span>
        </div>
        <div class="english" @click="toDetail(2)">
          <img src="https://smapi.koudaitiku.net/images/words/english.png" />
          <span>英文测试</span>
        </div>
      </div>
      <div class="btn ins" @click="ins">
        <img src="https://smapi.koudaitiku.net/images/words/face.png" alt />
        什么是“七剑客记忆法”
      </div>
      <img
        src="https://smapi.koudaitiku.net/images/words/bg.png"
        alt
        style="width:100%;height:164rpx;margin-top:108rpx;"
      />
    </div>
    <log v-else @func="getMsgFormSon" />
  </div>
</template>
<script>
import log from "@/components/login";
export default {
  components: {
    log
  },
  data() {
    return {
      login: false,
      num: 0
    };
  },
  methods: {
    handleLog() {
      if (wx.getStorageSync("token")) {
        this.login = true;
      } else {
        this.login = false;
      }
    },
    getMsgFormSon(data) {
      this.login = data;
    },
    toNum() {
      wx.navigateTo({
        url: "../number/main"
      });
    },
    ins(){
      console.log(wx.getStorageSync("num"))
    },
    toDetail(){
      wx.reLaunch({
        url: "../detail/main?a=1"
      });
    },
    toHistory(){
      wx.navigateTo({
        url: "../history/main"
      });
    },
    toDays(){
      wx.navigateTo({
        url: "../days/main"
      });
    }
  },
  onShareAppMessage: function(res) {
    let users = wx.getStorageSync("user");
    if (res.from === "button") {
    }
    return {
      title: "转发",
      path: "pages/index/main",
      success: function(res) {
      }
    };
  },
  created() {
    this.handleLog();
  },
  beforeMount() {
    this.handleLog();
  },
  mounted() {

  }
};
</script>

<style scoped lang="scss">
.wrap {
  margin-top: 60rpx;
  height: 120rpx;
  margin-left: 32rpx;
  & > div {
    float: left;
    width: 320rpx;
    height: 120rpx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 8rpx 16rpx 0px rgba(0, 0, 0, 0.05);
    border-radius: 12rpx;
    position: relative;
  }
  .chinese {
    margin-right: 46rpx;
  }
  img {
    width: 44rpx;
    height: 44rpx;
    margin-top: 42rpx;
    margin-left: 48rpx;
    vertical-align: middle;
  }
  span {
    font-size: 34rpx;
    position: absolute;
    top: 40rpx;
    right: 48rpx;
  }
}
.top {
  box-sizing: border-box;
  background-image: url("https://smapi.koudaitiku.net/images/words/bg.png");
  width: 100%;
  height: 570rpx;
  background-size: 100%;
  position: relative;
  .inner {
    box-sizing: border-box;
    width: 686rpx;
    height: 240rpx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0rpx 8rpx 16rpx 0px rgba(0, 0, 0, 0.05);
    border-radius: 12rpx;
    position: absolute;
    top: 234rpx;
    left: 32rpx;
    padding-left: 70rpx;
    & > p:first-of-type {
      margin-top: 60rpx;
      font-size: 44rpx;
    }
    & > p:last-of-type {
      margin-top: 24rpx;
      font-size: 30rpx;
    }
  }
}
.btn {
  width: 686rpx;
  height: 80rpx;
  background: rgba(49, 153, 255, 1);
  border-radius: 40rpx;
  line-height: 80rpx;
  text-align: center;
  font-size: 32rpx;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  margin: 0 auto;
}
.ins {
  background: rgba(155, 206, 255, 1);
  margin-top: 60rpx;
  position: relative;
  img {
    position: absolute;
    width: 60rpx;
    height: 60rpx;
    left: 68rpx;
    top: 10rpx;
  }
}
</style>

