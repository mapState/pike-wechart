<template>
  <div class="container">
    <div class="line"></div>
    <div class="input">
      <span>
        真实姓名:
        <input
          type="text"
          placeholder="请输入您的真实姓名"
          v-model="userInfo.alipayName"
          @change="getVal"
        />
      </span>
    </div>
    <div class="input">
      <span>
        身份证号:
        <input
          type="text"
          placeholder="请输入您的身份证号"
          v-model="userInfo.alipayAccount"
          @change="getVal2"
        />
      </span>
    </div>
    <div class="tips">请添加身份证正面(人像页)信息</div>
    <div class="photo" @click="onRead('idImgA')">
      <img :src="userInfo.idImgA" alt mode="widthFix" class="real" v-if="userInfo.idImgA" />
      <img src="../../../static/images/camera.png" alt mode="widthFix" class="inner" v-else />
    </div>
    <div class="tips">请添加身份证反面(国徽页)信息</div>
    <div class="photo" @click="onRead('idImgB')">
      <img :src="userInfo.idImgB" alt mode="widthFix" class="real" v-if="userInfo.idImgB" />
      <img src="../../../static/images/camera.png" alt mode="widthFix" class="inner" v-else />
    </div>
    <div class="go" v-if="!where">
      <div @click="toHome">跳过</div>
      <div @click="toNext">提交</div>
    </div>
    <div class="save" v-else style="margin-bottom:30px" @click="saveUser">保存</div>
    <div class="over" v-if="!where" style="margin-bottom:30px">
      <checkbox :checked="checked" @click="getVal3"/>
      <div class="text">
        我已阅读并同意
        <span>《用户服务协议》</span>和
        <span>《用户服务协议》</span>
      </div>
    </div>
  </div>
</template>
<script>
import { UPLOAD_DOMAIN } from "../../utils/const";
import common from "../../api/common";
import user from "../../api/user";
export default {
  data() {
    return {
      checked: true,
      idImgA: "",
      idImgB: "",
      where: 0,
      userInfo: {
        alipayName: "",
        alipayAccount: "",
        idImgA: "",
        idImgB: ""
      }
    };
  },

  methods: {
    toHome() {
      wx.reLaunch({
        url: "../home/main"
      });
    },
    saveUser(){
      if (
        this.userInfo.alipayName &&
        this.userInfo.alipayAccount &&
        this.userInfo.idImgA &&
        this.userInfo.idImgB &&
        this.checked
      ) {
        let obj = { ...this.userInfo, id: wx.getStorageSync("userInfo").id };
        obj.idImgA = obj.idImgA.replace(UPLOAD_DOMAIN, "");
        obj.idImgB = obj.idImgB.replace(UPLOAD_DOMAIN, "");
        user.userUpdate(obj).then(res => {
          wx.reLaunch({
            url: "../mine/main"
          });
        });
      } else {
        wx.showToast({
          title: "请完善必填信息",
          icon: "none"
        });
      }
    },
    toNext() {
      if (
        this.userInfo.alipayName &&
        this.userInfo.alipayAccount &&
        this.userInfo.idImgA &&
        this.userInfo.idImgB &&
        this.checked
      ) {
        let obj = { ...this.userInfo, id: wx.getStorageSync("userInfo").id };
        obj.idImgA = obj.idImgA.replace(UPLOAD_DOMAIN, "");
        obj.idImgB = obj.idImgB.replace(UPLOAD_DOMAIN, "");
        user.userUpdate(obj).then(res => {
          wx.navigateTo({
            url: "../home/main"
          });
        });
      } else {
        wx.showToast({
          title: "请完善必填信息",
          icon: "none"
        });
      }
    },
    getVal(e) {
      this.userInfo.alipayName = e.mp.detail.value;
    },
    getVal2(e) {
      this.userInfo.alipayAccount = e.mp.detail.value;
    },
    getVal3(e) {
      this.checked =!this.checked;
    },
    onRead(file) {
      var that = this;
      wx.chooseImage({
        success: function(res) {
          var tempFilePaths = res.tempFilePaths;
          common.getToken().then(res => {
            wx.uploadFile({
              url: "http://upload.qiniup.com/", //仅为示例，非真实的接口地址
              filePath: tempFilePaths[0],
              name: "file",
              header: {
                "Content-Type": "multipart/form-data"
              },
              formData: {
                token: res.result.token
              },
              success: function(res) {
                // var data = res.data;
                that.userInfo[file] = UPLOAD_DOMAIN + JSON.parse(res.data).key;
                console.log(that.userInfo);
              }
            });
          });
        }
      });
    },
    init() {
      console.log(this.$mp.query.where);
      this.where = this.$mp.query.where;
      common.dict({ code: "COOPERATE_TYPE" }).then(res => {
        this.tagList = res.result;
        user
          .cacheUser({ userId: wx.getStorageSync("userInfo").id })
          .then(res => {
            this.userInfo.alipayName = res.result.alipayName;
            this.userInfo.alipayAccount = res.result.alipayAccount;
            this.userInfo.idImgA = res.result.idImgA;
            this.userInfo.idImgB = res.result.idImgB;
          });
      });
      // this.where=
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
>>> .van-popup--center {
  top: 40%;
}
>>> .van-popup {
  background: transparent;
}
>>> checkbox .wx-checkbox-input {
  width: 15px;
  height: 15px;
}
</style>