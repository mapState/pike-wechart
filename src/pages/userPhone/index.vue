<template>
  <div class="container">
    <img
      src="http://cdn.pike8.top/FtxShIVottOgZaVpw5xPBtWZ-1AC"
      alt
      mode="widthFix"
      class="ibg"
    />
    <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信一键登录</button>
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
              iv: iv,
              name: "1111"
            })
            .then(res => {
              if (res.result == 0) {
                this.show = false;
                this.weixinId = res.data.weixinId;
                if (res.data.result == 0 && res.data.userInfo != null) {
                  wx.setStorageSync("token", res.headers["set-cookie"]);
                  this.$emit("func", true);
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
    getPhoneNumber(e) {
      if (e.mp.detail.errMsg == "getPhoneNumber:ok") {
        wx.login({
          success: res => {
            this.fly
              .post(
                "wechat/miniprogram/auth.htm",
                this.$qs.stringify({
                  code: res.code,
                  encryptedData: e.mp.detail.encryptedData,
                  iv: e.mp.detail.iv,
                  rawData: this.rawData,
                  weixinId: this.weixinId
                })
              )
              .then(res => {
                this.show2 = false;
                wx.setStorageSync("token", res.headers["set-cookie"]);
                this.$emit("func", true);
                wx.navigateTo({
                  url: "../psd/main"
                });
              });
          }
        });
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
  mounted() {
    console.log(1);
  }
};
</script>

<style scoped lang="scss">
.ibg {
  width: 100%;
  height: 100%;
}
.container {
  position: relative;
  button {
    width: 307px;
    height: 44px;
    background: rgba(252, 84, 40, 1);
    border-radius: 21px;
    border: none;
    position: absolute;
    top: 400px;
    left: 33px;
    color: #fff;
  }
  button:after {
    content: none;
  }

  button::after {
    border: none;
  }
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