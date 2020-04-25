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
        @click="focus($mp.query.userId,status)"
      >{{status===0?'已关注':status===1?'互相关注':'关注'}}</div>
    </div>
    <div class="info">
      <div class="title">
        <div class="left" @click.stop="chooseSrc(detail.videoUrl)">
          <img :src="detail.videoImg" alt mode="aspectFill" />
          <img src="../../../static/images/play.png" alt mode="aspectFill" class="play" />
        </div>
        <div class="right">
          <div class="name">
            <span>{{detail.videoTag.itemText}}</span>
            {{detail.title}}
          </div>
          <div class="instro">
            <span>PK时长:{{detail.day2}}</span>
            <span>擂台时长:{{detail.day}}</span>
            <span>PK奖金:{{detail.matchValue/100}}币</span>
          </div>
        </div>
      </div>
      <!-- <div class="detail" v-show="all===0">
        传播健康视频XXXXXXXXXXXXXXXXXXX....
        <span @click="all=1">全部</span>
      </div>-->
      <div class="detail2">
        挑战详情：{{detail.videoRule}}
        <!-- <span>shosho</span> -->
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

    <div class="list">
      <div class="item" v-for="(item,i) in pkList" :key="i">
        <div class="left" @click="toVideo(item.videoMatchId,0,item.aId,item.matchStatus.itemValue)">
          <img :src="item.aVideoImg" alt mode="aspectFill" />
          <div class="up">
            <div
              class="win"
            >{{item.matchStatus.itemValue==2?'竞猜':item.matchStatus.itemValue==3?'PK进行中':item.matchStatus.itemValue==4?'PK结束':''}}</div>
            <div class="num">人气：{{item.aHotCount}}</div>
          </div>
        </div>
        <div class="right" @click="toVideo(item.videoMatchId,1,item.bId,item.matchStatus)">
          <img :src="item.bVideoImg" alt mode="aspectFill" />
          <div class="up">
            <div class="num">人气：{{item.bHotCount}}</div>
          </div>
        </div>
      </div>
      <div class="empty" v-show="pkList.length==0">
        <img src="../../../static/images/empty.png" alt mode="widthFix" />
        <div class="tips">暂无挑战视频，快去挑战吧~</div>
      </div>
      <p
        style="text-align:center;margin-top:20px;color:#aaa;margin-bottom:15px;"
        v-if="pkList.length>0"
      >没有更过数据</p>
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
      detail: { videoTag: {} },
      page: 1,
      pageSize: 10
    };
  },
  onReachBottom() {
    if (this.pageSize > 9) {
      this.page++;
      this.getPkList(this.matchStatus);
    }
  },
  onUnload() {
    this.pkList = [];
    this.page1 = 1;
    this.pageSize = 10;
  },
  methods: {
    chooseSrc(src) {
      this.src = src;
      this.videoShow = true;
    },
    toRank() {
      wx.reLaunch({
        url: "../rank/main"
      });
    },

    toVideo(msg, type, videoId, matchStatus) {
      if (matchStatus == 2) {
        wx.navigateTo({
          url: `../guess/main?videoMatchId=${videoMatchId}`
        });
      } else {
        wx.navigateTo({
          url: `../video/main?videoMatchId=${msg}&type=${type}&matchStatus=${matchStatus}&videoId=${videoId}`
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
    chooseNav(n) {
      this.nav = n;
      this.show = true;
      this.page = 1;
      this.pkList = [];
      this.pageSize = 10;
    },
    chooseNum(n) {
      console.log(n);
    },
    navType(e) {
      this.matchStatus = e.mp.detail.name == 0 ? "" : e.mp.detail.name + 1;
      this.page = 1;
      this.pageSize = 10;

      this.pkList = [];
      this.getPkList(this.matchStatus);
    },
    chooseType(n) {
      this.giftType = n;
    },
    getWatchList(userId) {
      user.getWatchList({ userId }).then(res => {
        if (res.result.hasOwnProperty(this.$mp.query.userId)) {
          this.status = res.result[this.$mp.query.userId];
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
    choose(i) {
      this.active = i;
      if (i == 0 || i == 3) {
        this.show = true;
      }
      if (i == 2) {
        this.giftShow = true;
      }
    }
  },

  mounted() {
    this.getWatchList(wx.getStorageSync("userInfo").id);
    this.getInfo(this.$mp.query.userId);

    this.getPkList("");
    this.detail = JSON.parse(this.$mp.query.item);
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