<template>
  <div class="container" @click="giftShow=false">
    <div class="info">
      <img :src="info.imgUrl" alt mode="widthFix" />
      <div class="black">
        <div class="img">
          <img :src="info.imgUrl" alt mode="aspectFill" />
        </div>
        <div class="name">
          {{info.displayName}}
          <span
            :style="info.titleType.bg"
            class="spanLabel"
          >{{info.titleType.itemText}}</span>
        </div>
        <div class="num">
          <div>身高:{{info.height}}cm</div>
          <div>年龄:{{info.age}}</div>
          <div>距离:{{info.distance}}km</div>
        </div>
        <div class="dir">合作方向：{{info.coop}}</div>
      </div>
    </div>
    <div class="nav">
      <div class="item">人气：{{info.hotCount}}</div>
      <div class="item" @click="toNext('fans',$mp.query.userId,1)">关注：{{info.watchCount}}</div>
      <div class="item" @click="toNext('fans',$mp.query.userId,2)">粉丝：{{info.fansCount}}</div>
    </div>
    <div class="instro">
      个人介绍：{{info.introduction}}
      <!-- <span>详情</span> -->
    </div>
    <div class="line"></div>
    <div class="rank">
      <div class="rankLeft" @click="show=true">
        <img src="../../../static/images/gift.png" alt mode="widthFix" /> 聘礼排行榜
      </div>
      <div class="rankRight" @click="show=true">
        <img src="../../../static/images/money.png" alt mode="widthFix" />打赏排行榜
      </div>
    </div>
    <div class="line"></div>
    <div class="littleNav">
      <van-tabs :active="littleVav" :color="'#FC5428'" @change="chooseTag">
        <van-tab title="pk视频" name="1"></van-tab>
        <van-tab title="才艺视频" name="2"></van-tab>
        <van-tab title="生活视频" name="3"></van-tab>
        <van-tab title="合唱视频" name="4"></van-tab>
      </van-tabs>
    </div>

    <div class="list">
      <div class="item" v-for="(item,i) in video" :key="i">
        <div class="img">
          <img :src="item.videoImg" alt />
          <div
            class="up"
            @click="littleVav==1?toVideo(item.videoId,littleVav,item.videoId,item.userId,item):littleVav==4?toDetail(item.videoId):toVideo1(item.videoId,littleVav,item.userId)"
          >
            <div class="status" v-if="littleVav==1||littleVav==4">{{item.days>0?'擂台时长:'+item.days+'天':"已结束"}}</div>
            <div class="num">{{item.matchTotalCount}}人已挑战</div>
          </div>
        </div>
        <div class="label">
          <span>{{item.videoTag.itemText}}</span>
          {{item.title}}
        </div>
      </div>
    </div>
    <empty msg="暂无视频" v-if="video.length==0" />
    <p
      style="text-align:center;margin-top:20px;color:#aaa;margin-bottom:15px;"
      v-if="video.length>0"
    >没有更过数据</p>
    <div class="kong"></div>
    <div class="tabBar">
      <div class="tabs">
        <div class="item" @click="choose('')">
          <img src="../../../static/images/msg2.png" alt />

          <span>私信</span>
        </div>
        <div class="item" @click="choose(1)" :class="{active:status!==2}">
          <img src="../../../static/images/heart.png" alt v-if="status!==2" />
          <img src="../../../static/images/heartA.png" alt v-else />
          <span class="cle">{{status==2?'关注':'取消关注'}}</span>
        </div>

        <div class="item" @click.stop="choose(2)">
          <img src="../../../static/images/gift2.png" alt />
          <span>送礼</span>
        </div>
        <div class="item" @click="choose('')">
          <img src="../../../static/images/coo.png" alt />
          <span>合作</span>
        </div>
      </div>
    </div>
    <tips v-model="show"></tips>
    <div v-show="giftShow" @click.stop="giftShow=true">
      <gift :receiveId="$mp.query.userId" />
    </div>
  </div>
</template>

<script>
import user from "../../api/user";
import common from "../../api/common";
import { getColor, jsGetAge } from "../../utils/utils";
import tips from "@/components/tips";
import gift from "@/components/gift";
import empty from "@/components/empty";
export default {
  components: {
    tips,
    gift,
    empty
  },
  data() {
    return {
      nav: 1,
      littleVav: 1,
      type: 0,
      status: 2,
      show: false,
      giftShow: false,
      giftType: 1,
      video: [],
      page: 1,
      pageSize: 10,
      info: { titleType: {} }
    };
  },
  onReachBottom() {
    if (this.pageSize > 9) {
      this.page++;
      if (this.littleVav == 1) {
        this.getPkList(this.$mp.query.userId);
      } else if (this.littleVav == 2) {
        this.getSkillVideo(this.$mp.query.userId);
      } else if (this.littleVav == 3) {
        this.getLifeVideo(this.$mp.query.userId);
      }
    }
  },
  onUnload() {
    this.page = 1;
    this.pageSize = 10;
    this.video = [];
  },
  methods: {
    toRank() {
      wx.navigateTo({
        url: "../rank/main"
      });
    },
    toDetail(videoId) {
      wx.navigateTo({
        url: `../challenge2/main?videoId=${videoId}`
      });
    },
    toNext(msg, t, a) {
      wx.navigateTo({
        url: `../${msg}/main?userId=${t}&nav=${a}`
      });
    },
    toVideo1(msg, type, userId) {
      wx.navigateTo({
        url: `../videoOne/main?videoId=${msg}&type=${type}&userId=${userId}`
      });
    },
    toVideo(msg, type, videoId, userId, item) {
      wx.navigateTo({
        url: `../challenge/main?userId=${userId}&type=${type}&videoId=${videoId}&item=${JSON.stringify(
          item
        )}`
      });
    },
    chooseNav(n) {
      this.nav = n;
      this.show = true;
    },
    chooseTag(e) {
      this.littleVav = e.mp.detail.name;
      this.video = [];
      this.page = 1;
      this.pageSize=10;
      if (e.mp.detail.name == 1) {
        this.getPkList(this.$mp.query.userId);
      } else if (e.mp.detail.name == 2) {
        this.getSkillVideo(this.$mp.query.userId);
      } else if (e.mp.detail.name == 3) {
        this.getLifeVideo(this.$mp.query.userId);
      }else{
        this.getWaitList(this.$mp.query.userId);
      }
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
    getPkList(userId) {
      common
        .pkVideo({
          userId,
          pageNo: this.page,
          pageSize: this.pageSize
        })
        .then(res => {
          this.video = [...this.video, ...res.result];
          this.pageSize = res.result.length;
          let endTime =
            new Date(res.result.endDate).getTime() / 1000 -
            parseInt(new Date().getTime() / 1000);
          let timeDay = parseInt(endTime / 60 / 60 / 24);
          for (let i = 0; i < this.video.length; i++) {
            let endTime =
              new Date(this.video[i].endDate).getTime() / 1000 -
              parseInt(new Date().getTime() / 1000);
            let timeDay = parseInt(endTime / 60 / 60 / 24);
            this.video[i].days = timeDay;
          }
        });
    },
    getSkillVideo(userId) {
      common
        .skillVideo({
          userId,
          pageNo: this.page,
          pageSize: this.pageSize,
          lat: wx.getStorageSync("lat"),
          lng: wx.getStorageSync("lng")
        })
        .then(res => {
          this.video = [...this.video, ...res.result];
          this.pageSize = res.result.length;
          for (let i = 0; i < this.video.length; i++) {
            this.video[i].titleType.bg = getColor(
              parseInt(this.video[i].titleType.itemValue)
            );
            this.video[i].hotCount =
              Math.abs(this.video[i].hotCount) > 10000
                ? parseInt(this.video[i].hotCount / 10000) + "w"
                : this.video[i].hotCount;
            this.video[i].distance = (this.video[i].distance / 1000).toFixed(1);
          }
        });
    },
    getLifeVideo(userId) {
      common
        .lifeVideo({
          userId,
          pageNo: this.page,
          pageSize: this.pageSize,
          lat: wx.getStorageSync("lat"),
          lng: wx.getStorageSync("lng")
        })
        .then(res => {
          this.video = [...this.video, ...res.result];
          this.pageSize = res.result.length;
          for (let i = 0; i < this.video.length; i++) {
            this.video[i].titleType.bg = getColor(
              parseInt(this.video[i].titleType.itemValue)
            );
            this.video[i].hotCount =
              Math.abs(this.video[i].hotCount) > 10000
                ? parseInt(this.video[i].hotCount / 10000) + "w"
                : this.video[i].hotCount;
            this.video[i].distance = (this.video[i].distance / 1000).toFixed(1);
          }
        });
    },
    getWaitList(userId) {
      common
        .getWaitList({
          userId,
          pageNo: this.page,
          pageSize: 10,
        })
        .then(res => {
          this.video = [...this.video, ...res.result];
          this.pageSize = res.result.length;
        });
    },
    chooseNum(n) {},
    chooseType(n) {
      this.giftType = n;
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
    choose(i) {
      if (i === "") {
        this.show = true;
      }
      if (i == 1) {
        if (this.status == 2) {
          this.doIt(wx.getStorageSync("userInfo").id, this.$mp.query.userId);
        } else {
          this.cancelIt(
            wx.getStorageSync("userInfo").id,
            this.$mp.query.userId
          );
        }
      }
      if (i == 2) {
        this.giftShow = true;
      }
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
          if (this.info.birthday) {
            this.info.age = jsGetAge(this.info.birthday);
          } else {
            this.info.age = "";
          }

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
    init() {
      this.getWatchList(wx.getStorageSync("userInfo").id);
      this.getInfo(this.$mp.query.userId);

      this.getPkList(this.$mp.query.userId);
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
>>> .van-tab {
  color: #101010;
}
>>> .van-tab--active {
  color: #fc5428;
}
>>> .van-hairline--top-bottom:after {
  border: none;
}
>>> .van-stepper__minus--disabled,
.van-stepper__minus--disabled.van-stepper__minus--hover,
.van-stepper__minus--disabled.van-stepper__plus--hover,
.van-stepper__minus--disabled:after,
.van-stepper__minus--disabled:before,
.van-stepper__plus--disabled,
.van-stepper__plus--disabled.van-stepper__minus--hover,
.van-stepper__plus--disabled.van-stepper__plus--hover,
.van-stepper__plus--disabled:after,
.van-stepper__plus--disabled:before {
  background: #ccc;
}
>>> .van-stepper__minus--disabled,
.van-stepper__minus--disabled.van-stepper__minus--hover,
.van-stepper__minus--disabled.van-stepper__plus--hover,
.van-stepper__minus--disabled:after,
.van-stepper__minus--disabled:before,
.van-stepper__plus--disabled,
.van-stepper__plus--disabled.van-stepper__minus--hover,
.van-stepper__plus--disabled.van-stepper__plus--hover,
.van-stepper__plus--disabled:after,
.van-stepper__plus--disabled:before {
  background: #ccc;
}
</style>