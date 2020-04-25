<template>
  <div class="container" @click="setFalse">
    <div class="top">
      <img :src="adDetail.imgUrl" alt mode="widthFix" @click="toAd" />
      <div class="share">
        <img src="../../../static/images/share.png" alt mode="widthFix" />
      </div>
    </div>
    <div class="mid">
      <div class="left" @click="toVideo(detail.videoMatchId,0)">
        <image :src="detail.aVideoImg" alt mode="aspectFill" />
      </div>
      <div class="left" @click="toVideo(detail.videoMatchId,1)">
        <image :src="detail.bVideoImg" alt mode="aspectFill" />
      </div>
      <van-transition :show="true" custom-class="block" name="fade-up">
        <img src="../../../static/images/pkAd.png" alt mode="widthFix" class="vs" />
      </van-transition>
    </div>
    <div class="users">
      <div class="left" @click="toUser(detail.aUserId)">
        <div class="img">
          <img :src="detail.aImgUrl" alt mode="widthFix" />
        </div>
        <span>{{detail.aDisplayName}}</span>
        <br />
        <span :style="detail.aTitleType.bg" class="spanLabel">{{detail.aTitleType.itemText}}</span>
      </div>
      <div class="right" @click="toUser(detail.bUserId)">
        <div class="img">
          <img :src="detail.bImgUrl" alt mode="widthFix" />
        </div>
        <span>{{detail.bDisplayName}}</span>
        <br />
        <span :style="detail.bTitleType.bg" class="spanLabel">{{detail.bTitleType.itemText}}</span>
      </div>
    </div>
    <div class="nums">
      <div class="left">
        <div class="txt">{{detail.aGuessCount}}人已支持</div>
        <van-progress :percentage="percentage1" :show-pivot="false" />
      </div>
      <div class="right">
        <div class="txt">{{detail.bGuessCount}}人已支持</div>
        <van-progress :percentage="percentage2" :show-pivot="false" />
      </div>
    </div>
    <div class="time">
      <van-count-down :time="detail.time" />
    </div>
    <van-popup :show="guessShow" :close-on-click-overlay="true" position="bottom">
      <div class="guess" @click.stop="guessShow=true">
        <div class="title">选择用户</div>
        <div class="persons">
          <div class="left" @click.stop="choose(detail.aUserId,detail.aId)">
            <div class="choose" v-if="betUserId==detail.aUserId">
              <img src="../../../static/images/success.png" alt mode="widthFix" class="choose" />
            </div>
            <div class="cir" v-else></div>
            <div class="img">
              <img :src="detail.aImgUrl" alt mode="widthFix" />
            </div>
            <span>{{detail.aDisplayName}}</span>
            <br />
            <span :style="detail.aTitleType.bg" class="spanLabel">{{detail.aTitleType.itemText}}</span>
          </div>
          <div class="right" @click.stop="choose(detail.bUserId,detail.bId)">
            <div class="choose" v-if="betUserId==detail.bUserId">
              <img src="../../../static/images/success.png" alt mode="widthFix" class="choose" />
            </div>
            <div class="cir" v-else></div>
            <div class="img">
              <img :src="detail.bImgUrl" alt mode="widthFix" />
            </div>
            <span>{{detail.bDisplayName}}</span>
            <br />
            <span :style="detail.bTitleType.bg" class="spanLabel">{{detail.bTitleType.itemText}}</span>
          </div>
        </div>
        <div class="title">押注</div>
        <div class="prices">
          <div :class="{item:true,active:price==100}" @click="choosePrice(100)">
            100金币
            <img src="../../../static/images/xia.png" alt mode="widthFix" v-show="price==100" />
          </div>
          <div :class="{item:true,active:price==200}" @click="choosePrice(200)">
            200金币
            <img src="../../../static/images/xia.png" alt mode="widthFix" v-show="price==200" />
          </div>
          <div :class="{item:true,active:price==300}" @click="choosePrice(300)">
            300金币
            <img src="../../../static/images/xia.png" alt mode="widthFix" v-show="price==300" />
          </div>
          <div :class="{item:true,active:price==5}" @click="choosePrice(5)">
            500金币
            <img src="../../../static/images/xia.png" alt mode="widthFix" v-show="price==5" />
          </div>
        </div>
        <div class="prices">
          <div :class="{item:true,active:price==1000}" @click="choosePrice(1000)">
            1000金币
            <img
              src="../../../static/images/xia.png"
              alt
              mode="widthFix"
              v-show="price==1000"
            />
          </div>
          <div :class="{item:true,active:price==1500}" @click="choosePrice(1500)">
            1500金币
            <img
              src="../../../static/images/xia.png"
              alt
              mode="widthFix"
              v-show="price==1500"
            />
          </div>
          <div :class="{item:true,active:price==2000}" @click="choosePrice(2000)">
            2000金币
            <img
              src="../../../static/images/xia.png"
              alt
              mode="widthFix"
              v-show="price==2000"
            />
          </div>
          <div :class="{item:true,active:price==''}" @click="choosePrice('')">
            <!-- <van-field
              :value="betAmount"
              placeholder="自定义"
              :border="false"
              @change="onChange"
              type="number"
            />-->
            <input type="number" @change="onChange" placeholder="自定义" :value="inputVal" />
            <img src="../../../static/images/xia.png" alt mode="widthFix" v-show="price==''" />
          </div>
        </div>
        <div class="options">
          <span>多币余额：{{money.kmCount/100}}</span>
          <span @click="toMoney">充值</span>
          <div class="send" @click="joinByKB">确定</div>
        </div>
      </div>
    </van-popup>
    <van-popup :show="succ" :close-on-click-overlay="true">
      <div class="inner">
        <img src="../../../static/images/success.png" alt mode="widthFix" />
        <div class="title">竞猜成功</div>
      </div>
    </van-popup>
    <div class="btn" style="background:#ccc;color:#000" v-if="detail.guessVideoId">已竞猜</div>
    <div class="btn" @click.stop="guessShow=true" v-else>竞猜</div>
  </div>
</template>

<script>
import common from "../../api/common";
import user from "../../api/user";
import { getColor } from "../../utils/utils";
import success from "@/components/success";
export default {
  components: {
    success
  },
  data() {
    return {
      guessShow: false,
      succ: false,
      detail: { bTitleType: {}, aTitleType: {} },
      betUserId: "",
      videoId: "",
      percentage1: 0,
      percentage2: 0,
      betAmount: "",
      price: "",
      time: 30 * 60 * 60 * 1000,
      adDetail: {},
      money: {},
      inputVal: ""
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
    toMoney() {
      wx.navigateTo({
        url: "../money/main"
      });
    },
    toUser(userId) {
      console.log(1);
      wx.navigateTo({
        url: "../user/main?userId=" + userId
      });
    },
    toVideo(msg, type) {
      wx.navigateTo({
        url: `../video/main?videoMatchId=${msg}&type=${type}&matchStatus=2`
      });
    },
    choose(e, videoId) {
      console.log(e);
      this.betUserId = e;
      this.videoId = videoId;
    },
    getAdList(type) {
      common.adList({ positionNum: 5 }).then(res => {
        this.adDetail = res.result[0];
      });
    },
    onChange(e) {
      this.price = "";
      this.betAmount = e.mp.detail.value;
      console.log(this.betAmount);
    },
    setFalse() {
      this.guessShow = false;
      this.succ = false;
    },
    toAd() {
      // location.href=
    },
    choosePrice(i, n) {
      this.price = i;
      this.betAmount = i;
    },
    joinByKB() {
      let flag = true;
      if (!this.betUserId) {
        wx.showToast({
          title: "请选择竞猜用户",
          icon: "none"
        });
        flag = false;
      }
      if (!this.betAmount || isNaN(Number(this.betAmount))) {
        wx.showToast({
          title: "竞猜价格输入有误",
          icon: "none"
        });
        flag = false;
      }
      if (flag) {
        user
          .joinByKB({
            betAmount: this.betAmount,
            userId: wx.getStorageSync("userInfo").id,
            betUserId: this.betUserId,
            videoId: this.videoId,
            videoMatchId: this.$mp.query.videoMatchId
          })
          .then(res => {
            this.guessShow = false;
            this.succ = true;
            setTimeout(() => {
              this.succ = false;
            }, 1000);
            this.getList();
            this.getMoney();
          });
      }
    },
    getMoney() {
      user.cacheUser({ userId: wx.getStorageSync("userInfo").id }).then(res => {
        this.money = res.result;
      });
    },
    getList(videoTag, type) {
      if (this.$mp.query.type) {
        common
          .pkDetails2({
            videoMatchId: this.$mp.query.videoMatchId,
            visitId: wx.getStorageSync("userInfo").id
          })
          .then(res => {
            this.detail = res.result;
            this.detail.time =
              Date.parse(new Date(this.detail.startDate.replace(/-/g, "/"))) -
              new Date().getTime() +
              20 * 60 * 1000;
            if (this.detail.aGuessCount + this.detail.bGuessCount == 0) {
              this.percentage1 = this.percentage2 = 0;
            } else {
              this.percentage1 =
                this.detail.aGuessCount /
                (this.detail.aGuessCount + this.detail.bGuessCount) *
                100;
              this.percentage2 =
                this.detail.bGuessCount /
                (this.detail.aGuessCount + this.detail.bGuessCount) *
                100;
            }
            this.detail.aTitleType.bg = getColor(
              parseInt(this.detail.aTitleType.itemValue)
            );
            this.detail.bTitleType.bg = getColor(
              parseInt(this.detail.bTitleType.itemValue)
            );
            this.detail.time =
              Date.parse(new Date(this.detail.startDate.replace(/-/g, "/"))) -
              new Date().getTime() +
              20 * 60 * 1000;
          });
      } else {
        common
          .pkDetails({
            videoMatchId: this.$mp.query.videoMatchId,
            visitId: wx.getStorageSync("userInfo").id
          })
          .then(res => {
            this.detail = res.result;
            this.detail.time =
              Date.parse(new Date(this.detail.startDate.replace(/-/g, "/"))) -
              new Date().getTime() +
              20 * 60 * 1000;
            if (this.detail.aGuessCount + this.detail.bGuessCount == 0) {
              this.percentage1 = this.percentage2 = 0;
            } else {
              this.percentage1 =
                this.detail.aGuessCount /
                (this.detail.aGuessCount + this.detail.bGuessCount) *
                100;
              this.percentage2 =
                this.detail.bGuessCount /
                (this.detail.aGuessCount + this.detail.bGuessCount) *
                100;
            }
            this.detail.aTitleType.bg = getColor(
              parseInt(this.detail.aTitleType.itemValue)
            );
            this.detail.bTitleType.bg = getColor(
              parseInt(this.detail.bTitleType.itemValue)
            );
            this.detail.time =
              Date.parse(new Date(this.detail.startDate.replace(/-/g, "/"))) -
              new Date().getTime() +
              20 * 60 * 1000;
          });
      }
    },
    init() {
      this.getList();
      this.getMoney();
      this.getAdList();
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
>>> .van-hairline--top-bottom:after {
  border: none;
}
>>> .van-count-down {
  color: #fff;
  font-size: 15px;
  font-weight: bold;
}
>>> .van-cell {
  padding: 0;
  background: transparent;
  line-height: 34px;
  padding-top: 5px;
}
>>> .van-field__input {
  text-align: center;
  line-height: 34px;
  color: #fc5428;
}
>>> .van-popup {
  background-color: transparent !important;
}
</style>