<template>
  <div class="gift">
    <div class="tabs">
      <div :class="{item:true,active:giftType==1}" @click="chooseType(1)">打赏</div>
      <div :class="{item:true,active:giftType==2}" @click="chooseType(2)">聘礼</div>
      <div class="right" @click="toLink('https://pike8.top/content.html?type=14')">礼物规则</div>
    </div>
    <div class="content">
      <swiper duration="100" indicator-dots indicator-color="#B8B8B8" indicator-active-color="#fff">
        <swiper-item v-for="(gift,i) in giftList" :key="i">
          <div
            v-for="(item,j) in gift"
            :key="j"
            class="giftItem"
            @click="chooseGift(item)"
            :class="{active:giftId==item.giftId}"
          >
            <img :src="item.imgUrl" alt mode="widthFix" />
            <div class="name">{{item.name}}</div>
            <div class="money">{{item.kbValue/100}}k币</div>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <div class="options">
      <img src="../../static/images/corn.png" alt mode="widthFix" />
      <span>{{detail.kmCount/100}}</span>
      <span @click="toMoney">充值</span>
      <div class="send" @click="kbPay">发送</div>
      <div class="num">
        <van-stepper :value="orderCount" @change="chooseNum" />
      </div>
    </div>
  </div>
</template>
<script>
import common from "../api/common";
import user from "../api/user";
export default {
  props: ["receiveId", "videoMatchId", "videoId"],
  data() {
    return {
      giftType: 1,
      giftId: "",
      orderCount: 1,
      orderPrice: "",
      detail: {},
      giftList: [[]]
    };
  },
  methods: {
    chooseType(t) {
      this.getGiftList(t);
      // this.giftId=''
      this.giftType = t;
    },

    toMoney() {
      wx.navigateTo({
        url: "../money/main"
      });
    },
    toLink(link) {
      wx.navigateTo({
        url: "../web/main?link="+encodeURIComponent(link)
      });
    },
    chooseGift(item) {
      this.giftId = item.giftId;
      this.orderPrice = item.kbValue;
    },
    chooseNum(e) {
      console.log(e);
      this.orderCount = e.mp.detail;
    },
    getGiftList(type) {
      common.giftList().then(res => {
        this.giftList = [[]];
        let sum = 0;
        for (let i = 0; i < res.result.length; i++) {
          if (type == 1) {
            if (res.result[i].giftType.itemValue == 1) {
              sum++;
              this.giftList[this.giftList.length - 1].push(res.result[i]);
              if (sum % 8 == 0) {
                this.giftList.push([]);
              }
            }
          } else {
            if (res.result[i].giftType.itemValue == 2) {
              sum++;
              this.giftList[this.giftList.length - 1].push(res.result[i]);
              if (sum % 8 == 0) {
                this.giftList.push([]);
              }
            }
          }
        }
        if (this.giftList[this.giftList.length - 1].length == 0) {
          this.giftList.pop();
        }
      });
    },
    getMoney() {
      user.cacheUser({ userId: wx.getStorageSync("userInfo").id }).then(res => {
        this.detail = res.result;
      });
    },
    kbPay() {
      // console.log(this.orderCount)
      user
        .kbPay({
          userId: wx.getStorageSync("userInfo").id,
          receiveId: this.receiveId,
          videoMatchId: this.videoMatchId,
          videoId: this.videoId,
          giftId: this.giftId,
          orderCount: this.orderCount,
          orderPrice: this.orderPrice
        })
        .then(res => {
          wx.showToast({
            title: res.message,
            icon: "none"
          });
          this.getMoney();
          if (this.videoMatchId) {
            this.$parent.pkFind();
            this.$parent.giftShow = false;
            this.$parent.anmiFlag = true;
          }
        });
    }
  },

  mounted() {
    this.getGiftList(1);
    this.getMoney();
  }
};
</script>
<style lang="scss" scoped>
swiper {
  height: 280px;
}
.gift {
  width: 100%;
  height: 407px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 21;
  background-color: #0b0521;

  .tabs {
    justify-content: space-around;
    padding-top: 30px;
    font-size: 15px;
    color: #fff;
    overflow: hidden;
    .item {
      float: left;
      margin-left: 17px;
    }
    .right {
      float: right;
      margin-right: 17px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }
  .active {
    color: #fc5428;
  }
  .content {
    margin-top: 15px;
    padding-left: 3px;

    .giftItem {
      width: 76px;
      height: 110px;
      // border: 1px solid rgba(252, 84, 40, 1);
      border-radius: 4px;
      margin-top: 10px;
      margin-left: 7px;
      margin-right: 7px;
      float: left;
      color: rgba(255, 255, 255, 1);
      img {
        width: 42px;
        height: 42px;
        margin-left: 50%;
        transform: translateX(-50%);
        margin-top: 16px;
      }
      .name {
        text-align: center;
        margin-top: 10px;

        font-size: 13px;
      }
      .money {
        text-align: center;
        font-size: 13px;
      }
    }
    .active {
      border: 1px solid rgba(252, 84, 40, 1);
      color: #fc5428;
      box-sizing: border-box;
    }
  }
  .options {
    margin-top: 20px;
    img {
      width: 25px;
      height: 19px;
      margin-left: 15px;
      vertical-align: middle;
    }
    span {
      color: #fff;
      display: inline-block;
      vertical-align: middle;
      &:last-of-type {
        color: #fc5428;
      }
      &:first-of-type {
        margin: 0 10px;
        margin-left: 5px;
      }
    }
    .num {
      float: right;
      margin-top: -3px;
    }
    .send {
      float: right;
      width: 69px;
      line-height: 30px;
      background: rgba(252, 84, 40, 1);
      border-radius: 3px;
      text-align: center;
      color: rgba(255, 255, 255, 1);
      margin-right: 15px;
      margin-left: 10px;
      margin-top: -3px;
    }
  }
}
</style>