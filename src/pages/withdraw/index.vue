<template>
  <div class="container" @click="setFalse">
    <div class="line"></div>
    <div class="select">
      <div class="label">提现人</div>
      <div class="mid">
        <div class="img">
          <img :src="detail.userImgUrl" alt mode="aspectFill" />
        </div>{{detail.displayName}}
      </div>
    </div>
    <div class="select">
      <div class="label">提现比例</div>
      <div class="mid">{{detail.outPercent}}%</div>
    </div>
    <div class="select">
      <div class="label">提现金额</div>
      <div class="mid">{{detail.outPrice/100}}多币</div>
    </div>
    <div class="select">
      <div class="label">结婚证信息:</div>
      <div class="mid" v-if="!detail.imgUrl">无</div>
      <div class="down" v-else>
        <img :src="detail.imgUrl" alt mode="aspectFill" />
      </div>
    </div>
    <div class="btns">
      <div class="left" @click="tipShow=true">拒绝</div>
      <div class="right" @click="tipShow=true">同意</div>
    </div>
    <tips v-model="tipShow"></tips>
  </div>
</template>

<script>
import tips from "@/components/tips";
import common from "../../api/common";
export default {
  components: {
    tips
  },
  data() {
    return {
      tipShow: false,
      nav: 1,
      sex: "",
      up: [],
      down: [],
      detail:{}
    };
  },
  methods: {
    onRead(file) {
      var that = this;
      wx.chooseImage({
        success: function(res) {
          var tempFilePaths = res.tempFilePaths;
          that.fly.get("http://192.168.1.112:8081//file/getToken").then(res => {
            wx.uploadFile({
              url: "http://upload.qiniup.com/", //仅为示例，非真实的接口地址
              filePath: tempFilePaths[0],
              name: "file",
              header: {
                "Content-Type": "multipart/form-data",
                token: res.data.data.token
              },
              formData: {
                token: res.data.data.token
              },
              success: function(res) {
                var data = res.data;
                // console.log(JSON.parse(res.data.key))
                that.userInfo.imgUrl = UPLOAD_DOMAIN + JSON.parse(res.data).key;
                console.log(that.userInfo.imgUrl);
                //do something
              }
            });
          });
        }
      });
    },
    init() {
      for (let i = 1; i < 80; i++) {
        this.up.push(i);
        this.down.push(i);
      }
      this.getGiftInfo()
    },
    getGiftInfo(){
      common
        .getGiftInfo({
          tableId:this.$mp.query.tableId
        })
        .then(res => {
          this.detail = res.result;
        });
    },
    chooseNav(n) {
      this.nav = n;
    },
    setSex(s) {
      this.sex = s;
      this.sexShow = false;
    },
    setFalse() {
      this.ageShow = false;
      this.sexShow = false;
    },
    getUp(e) {
      console.log(e.mp.detail.value);
      this.down = [];
      for (let i = e.mp.detail.value; i < 80; i++) {
        this.down.push(i);
      }
    },
    getDown() {}
  },

  mounted() {
    console.log(1);
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