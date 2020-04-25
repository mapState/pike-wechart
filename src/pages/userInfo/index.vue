<template>
  <div class="container">
    <img src="http://cdn.pike8.top/FugCYyhWAdyCHybW5l7Fbh1cPDUK" alt mode="aspectFill" class="ibg" />
    <van-popup :show="show" :close-on-click-overlay="true" :overlay="false">
      <div class="info">
        <img src="../../../static/images/logo.png" alt mode="widthFix" />
        <div class="title">媲客短视频</div>
        <div class="tip">为了给您提供完整功能需要获取以下权限</div>
        <p>
          <span></span>获得你的公开信息 (昵称、头像)
        </p>
        <button class="btn" open-type="getUserInfo" @getuserinfo="getUserInfo">去授权</button>
      </div>
    </van-popup>
  </div>
</template>
<script>
import user from "../../api/user";
export default {
  data() {
    return {
      show: true,
      show2: false,
      weixinId: "",
      rawData: ""
    };
  },
  methods: {
    login(encrypteData, iv) {
      wx.login({
        success: res => {
          user
            .loginApi({
              code: res.code,
              encryptedData: encrypteData,
              iv: iv
            })
            .then(res => {
              // if (res.code == 10603) {
              //   wx.navigateTo({
              //     url: "../userPhone/main?unionid=" + res.result.unionid
              //   });
              // }
              // wx.navigateTo({
              //   url: "../userPhone/main?unionid=" + res.result.unionid
              // });
              wx.setStorageSync("userInfo", res.result);
              if (!res.result.token) {
                wx.reLaunch({
                  url: "../infoStep1/main"
                });
              } else {
                console.log()
                if (this.$mp.query.path) {
                  wx.reLaunch({
                    url: decodeURIComponent(this.$mp.query.path)
                  });
                } else {
                  wx.reLaunch({
                    url: "../home/main"
                  });
                }
              }
            });
        }
      });
    },
    getUserInfo(e) {
      if (e.mp.detail.errMsg == "getUserInfo:ok") {
        this.rawData = e.mp.detail.rawData;
        this.login(e.mp.detail.encryptedData, e.mp.detail.iv);
      }
    },
    handleLog() {
      wx.getSetting({
        success: res => {
          if (res.authSetting["scope.userInfo"]) {
            this.show = false;
            wx.getUserInfo({
              success: res => {
                this.rawData = res.rawData;
                this.login(res.encryptedData, res.iv);
              }
            });
          } else {
            this.show = true;
          }
        }
      });
    }
  },
  beforeMount() {
    // this.handleLog();
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.container{
  position: absolute;
  width: 100%;
  height: 100%;
}
.ibg {
  width: 100%;
  height: 100%;
}
.info {
  width: 310px;
  height: 226px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  img {
    display: block;
    width: 39px;
    height: 39px;
    margin: 0 auto;
    padding-top: 17px;
  }
  .title {
    padding-bottom: 14px;
    border-bottom: 1px solid #ddd;
    font-size: 15px;
    font-weight: 500;
    margin-top: 8px;
    text-align: center;
  }
  .tip {
    padding-left: 24px;
    margin-top: 15px;
  }
  p {
    padding-left: 24px;
    margin-top: 8px;
    font-size: 11px;
    color: #c2c2c2;
    span {
      font-weight: 900;
      display: inline-block;
      vertical-align: middle;
      height: 5px;
      width: 5px;
      background-color: #c2c2c2;
      border-radius: 50%;
      margin-right: 5px;
      margin-top: -2px;
    }
  }
  .btn {
    width: 100px;
    line-height: 38px;
    background: rgba(252, 84, 40, 1);
    border-radius: 5px;
    text-align: center;
    margin: 0 auto;
    color: #fff;
    margin-top: 18px;
    font-size: 15px;
  }
}
</style>

<style scoped>
>>> .van-popup--center {
  top: 40%;
}
>>> .van-popup {
  background: transparent;
}
>>> .van-overlay {
  background: transparent;
}
</style>