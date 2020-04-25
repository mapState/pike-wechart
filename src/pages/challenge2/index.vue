<template>
  <div class="container">
    <div class="line"></div>
    <div class="person">
      <div class="user">
        <img :src="info.imgUrl" alt mode="widthFix" />
      </div>
      <div class="name">
        <span>{{info.displayName}}</span>
        <br />
        <span :style="info.titleType.bg" class="spanLabel">{{info.titleType.itemText}}</span>
      </div>
      <div
        class="focus"
        :class="{active:status===0||status===1}"
        @click="focus(detail.userId,status)"
      >{{status===0?'已关注':status===1?'互相关注':'关注'}}</div>
    </div>
    <div class="info">
      <div class="title">
        <div class="left" @click.stop="toSing(detail.videoId)">
          <img :src="detail.videoImg" alt mode="aspectFill" />
          <img src="../../../static/images/play.png" alt mode="aspectFill" class="play" />
        </div>
        <div class="right">
          <div class="name">
            <b>{{detail.songLibrary.songName}}</b>
          </div>
          <div class="num">合唱过3215次</div>
          <div class="btn" @click="tipShow=true">合唱</div>
        </div>
      </div>
      <div class="instro">
        <span>PK时长:{{detail.day2}}</span>
        <span>擂台时长:{{detail.day}}</span>
        <span>PK奖金:{{detail.matchValue/100}}币</span>
      </div>
    </div>
    <div class="littleNav">
      <van-tabs :active="littleVav" :color="'#FC5428'" @change="navType">
        <van-tab title="全部"></van-tab>
        <van-tab title="PK预告"></van-tab>
        <van-tab title="PK进行"></van-tab>
        <van-tab title="已结束"></van-tab>
      </van-tabs>
    </div>

    <div class="sList">
      <div
        class="item"
        v-for="(item,i) in pkList"
        :key="i"
        @click="toSing2(item.videoMatchId,item.matchStatus)"
      >
        <div class="img">
          <img :src="item.aVideoImg" alt mode="aspectFill" />
          <img :src="item.bVideoImg" alt mode="aspectFill" />
          <div class="up">
            <div
              class="status"
            >{{item.matchStatus.itemValue==2?'竞猜':item.matchStatus.itemValue==3?'PK进行中':item.matchStatus.itemValue==4?'PK结束':''}}</div>
            <!-- <div class="status2">擂台时长:9天</div>
            <div class="num">人气262</div>
            <div class="num2">262人已挑战</div>-->
          </div>
        </div>
        <div class="label">{{item.songLibrary.songName}}</div>
      </div>
    </div>
    <div class="videoShow" v-if="videoShow">
      <img
        src="../../../static/images/close.png"
        alt
        mode="aspectFill"
        class="close"
        @click="videoShow=false"
      />
      <video :src="src" autoplay></video>
    </div>
    <tips v-model="tipShow"></tips>
  </div>
</template>

<script>
import user from "../../api/user";
import common from "../../api/common";
import { getColor } from "../../utils/utils";
import label from "@/components/label";
import tips from "@/components/tips";
export default {
  components: {
    tips,
    label
  },
  data() {
    return {
      nav: 1,
      videoShow: false,
      tipShow: false,
      src: "",
      littleVav: 0,
      type: 0,
      active: 1,
      status: 2,
      show: false,
      giftShow: false,
      giftType: 1,
      info: { titleType: {} },
      all: 0,
      pkList: [],
      matchStatus: "",
      detail: { songLibrary: {} },
      page: 1,
      pageSize: 10
    };
  },
  onUnload() {
    this.pkList = [];
    this.page1 = 1;
    this.pageSize = 10;
  },
  onReachBottom() {
    if (this.pageSize > 9) {
      this.page++;
      this.getPkList(this.matchStatus);
    }
  },
  methods: {
    toSing(videoId) {
      wx.navigateTo({
        url: "../videoSing/main?videoId=" + videoId
      });
    },
    toSing2(videoMatchId, matchStatus) {
      if (matchStatus == 2) {
        wx.navigateTo({
          url: `../guess/main?videoMatchId=${videoMatchId}&type=1`
        });
      } else {
        wx.navigateTo({
          url: `../videoSingPk/main?videoMatchId=${videoMatchId}&matchStatus=${matchStatus}`
        });
      }
    },
    focus(id, s) {
      if (s == 2) {
        this.doIt(wx.getStorageSync("userInfo").id, id);
      } else {
        this.cancelIt(wx.getStorageSync("userInfo").id, id);
      }
    },
    navType(e) {
      this.matchStatus = e.mp.detail.name == 0 ? "" : e.mp.detail.name + 1;
      this.page = 1;
      this.pkList = [];
      this.pageSize = 10;
      this.pkSingPkList(this.matchStatus);
    },
    getWatchList(userId) {
      user.getWatchList({ userId }).then(res => {
        if (res.result.hasOwnProperty(this.detail.userId)) {
          this.status = res.result[this.detail.userId];
        } else {
          this.status = 2;
        }
      });
    },
    cancelIt(userId, watchUserId) {
      user.cancelIt({ userId, watchUserId }).then(res => {
        this.getWatchList(wx.getStorageSync("userInfo").id);
      });
    },
    doIt(userId, watchUserId) {
      user.doIt({ userId, watchUserId }).then(res => {
        this.getWatchList(wx.getStorageSync("userInfo").id);
      });
    },
    getInfo(userId) {
      user
        .person({
          userId,
          lat: wx.getStorageSync("lat"),
          lng: wx.getStorageSync("lng")
        })
        .then(res => {
          this.info = res.result;
          this.info.titleType.bg = getColor(
            parseInt(this.info.titleType.itemValue)
          );

          this.info.coop = "";

          try {
            for (let i = 0; i < this.info.cooperateType.length; i++) {
              this.info.coop += this.info.cooperateType[i].itemText + " ";
            }
          } catch (error) {}
          this.info.hotCount =
            Math.abs(this.info.hotCount) > 10000
              ? parseInt(this.info.hotCount / 10000) + "w"
              : this.info.hotCount;
          this.info.fansCount =
            Math.abs(this.info.fansCount) > 10000
              ? parseInt(this.info.fansCount / 10000) + "w"
              : this.info.fansCount;
          this.info.watchCount =
            Math.abs(this.info.watchCount) > 10000
              ? parseInt(this.info.watchCount / 10000) + "w"
              : this.info.watchCount;
          this.info.distance = (this.info.distance / 1000).toFixed(1);
        });
    },
    getPkList(matchStatus) {
      common
        .pkList({
          pageNo: this.page,
          pageSize: this.pageSize,
          matchStatus,
          videoId: this.$mp.query.videoId
        })
        .then(res => {
          this.pkList = [...this.pkList, ...res.result];
          this.pageSize = res.result.length;
          for (let i = 0; i < this.pkList.length; i++) {
            this.pkList[i].aTitleType.bg = getColor(
              parseInt(this.pkList[i].aTitleType.itemValue)
            );
            this.pkList[i].bTitleType.bg = getColor(
              parseInt(this.pkList[i].bTitleType.itemValue)
            );
          }
        });
    },
    pkSingPkList(matchStatus) {
      common
        .pkSingPkList({
          matchStatus,
          pageNo: this.page,
          videoId: this.detail.videoId,
          pageSize: this.pageSize
        })
        .then(res => {
          this.pkList = [...this.pkList, ...res.result];
          this.pageSize = res.result.length;
        });
    },
    choose(i) {
      this.active = i;
      if (i == 0 || i == 3) {
        this.show = true;
      }
      if (i == 2) {
        this.giftShow = true;
      }
    },
    getDetail() {
      common
        .getDetail({
          visitId: wx.getStorageSync("userInfo").id,
          videoId: this.$mp.query.videoId
        })
        .then(res => {
          this.detail = res.result;
          this.pkSingPkList("");
          this.getInfo(this.detail.userId);
          if (Math.floor(this.detail.matchTime / 86400) >= 1) {
            this.detail.day2 = Math.floor(this.detail.matchTime / 86400) + "天";
          } else {
            this.detail.day2 = Math.floor(this.detail.matchTime / 3600) + "时";
          }

          if (
            (Date.parse(new Date(this.detail.endDate.replace(/-/g, "/"))) -
              new Date().getTime()) /
              1000 /
              86400 >
            1
          ) {
            this.detail.day =
              Math.floor(
                (Date.parse(new Date(this.detail.endDate.replace(/-/g, "/"))) -
                  new Date().getTime()) /
                  1000 /
                  86400
              ) + "天";
          } else if (
            (Date.parse(new Date(this.detail.endDate.replace(/-/g, "/"))) -
              new Date().getTime()) /
              1000 /
              86400 >
            0
          ) {
            this.detail.day =
              Math.floor(
                (Date.parse(new Date(this.detail.endDate.replace(/-/g, "/"))) -
                  new Date().getTime()) /
                  1000 /
                  3600
              ) + "小时";
          } else {
            this.detail.day = "已结束";
          }
        });
    }
  },

  mounted() {
    this.getWatchList(wx.getStorageSync("userInfo").id);
    //

    this.getDetail();
  }
};
</script>

<style scoped lang="scss">
@import "./index.scss";
.videoShow {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10000;
  background-color: #fff;
  .close {
    position: absolute;
    width: 20px;
    height: 20px;
    right: 10px;
    top: 10px;
    z-index: 10000;
  }
  video {
    width: 100%;
    height: 100%;
  }
}
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