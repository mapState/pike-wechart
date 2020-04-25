<template>
  <div class="container">
    <div class="line"></div>
    <div class="nav">
      <div :class="{active:nav==1}" @click="chooseNav(1)">pk视频</div>
      <div :class="{active:nav==2}" @click="chooseNav(2)">才艺视频</div>
      <div :class="{active:nav==3}" @click="chooseNav(3)">生活视频</div>
      <div :class="{active:nav==4}" @click="chooseNav(4)">合唱回放</div>
    </div>

    <div class="cyList">
      <div class="item" v-for="(item,i) in video" :key="i">
        <div class="img">
          <img :src="item.videoImg" alt mode="aspectFill" />
          <div class="up">
            <div class="status">{{item.day}}</div>
            <!-- <div class="num">262人已挑战</div> -->
          </div>
        </div>
        <div class="label">
          <span>{{item.videoTag.itemText}}</span>
          {{item.title}}
        </div>
      </div>
    </div>
    <empty msg="暂无视频，快去app发布吧！" v-if="video.length==0" />
    <p
      style="text-align:center;margin-top:20px;color:#aaa;margin-bottom:15px;"
      v-if="video.length>0"
    >没有更过数据</p>
  </div>
</template>

<script>
import tab from "@/components/tab";
import common from "../../api/common";
import empty from "@/components/empty";
import label from "@/components/label";
export default {
  components: {
    tab,
    empty
  },
  data() {
    return {
      active: 0,
      nav: 1,
      littleVav: 0,
      type: 0,
      video: [],
      page: 1,
      pageSize: 10
    };
  },
  onReachBottom() {
    if (this.pageSize > 9) {
      this.page++;
      if (this.nav == 1) {
        this.getPkOne();
      } else if (this.nav == 2) {
        this.getSkillVideo();
      } else if (this.nav == 3) {
        this.getLifeVideo();
      } else if (this.nav == 4) {
        // this.getPkOne();
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
      wx.reLaunch({
        url: "../rank/main"
      });
    },
    init() {
      this.nav = this.$mp.query.nav;
      if (this.nav == 1) {
        this.getPkOne();
      } else if (this.nav == 2) {
        this.getSkillVideo();
      } else if (this.nav == 3) {
        this.getLifeVideo();
      } else if (this.nav == 4) {
        // this.getPkOne();
      }
    },
    getPkOne() {
      common
        .pkVideo({
          userId: wx.getStorageSync("userInfo").id,
          pageNo: this.page,
          pageSize: 10
        })
        .then(res => {
          this.video = [...this.video, ...res.result];
          this.pageSize = res.result.length;
          for (let i = 0; i < this.video.length; i++) {
            if (
              (Date.parse(new Date(this.video[i].endDate.replace(/-/g, "/"))) -
                new Date().getTime()) /
                1000 /
                86400 >
              1
            ) {
              this.video[i].day =
                "擂台时长：" +
                Math.round(
                  (Date.parse(
                    new Date(this.video[i].endDate.replace(/-/g, "/"))
                  ) -
                    new Date().getTime()) /
                    1000 /
                    86400
                ) +
                "天";
            } else if (
              (Date.parse(new Date(this.video[i].endDate.replace(/-/g, "/"))) -
                new Date().getTime()) /
                1000 /
                86400 >
              0
            ) {
              this.video[i].day =
                "擂台时长：" +
                Math.round(
                  (Date.parse(
                    new Date(this.video[i].endDate.replace(/-/g, "/"))
                  ) -
                    new Date().getTime()) /
                    1000 /
                    3600
                ) +
                "小时";
            } else {
              this.video[i].day = "已结束";
            }
          }
        });
    },
    getSkillVideo(videoTag) {
      common
        .skillVideo({
          userId: wx.getStorageSync("userInfo").id,
          pageNo: this.page,
          pageSize: 10
        })
        .then(res => {
          this.video = [...this.video, ...res.result];
          this.pageSize = res.result.length;
        });
    },
    getLifeVideo(videoTag) {
      common
        .lifeVideo({
          userId: wx.getStorageSync("userInfo").id,
          pageNo: this.page,
          pageSize: 10
        })
        .then(res => {
          this.video = [...this.video, ...res.result];
          this.pageSize = res.result.length;
        });
    },
    chooseNav(n) {
      this.nav = n;
      this.page = 1;
      this.pageSize = 10;
      this.video = [];
      if (this.nav == 1) {
        this.getPkOne();
      } else if (this.nav == 2) {
        this.getSkillVideo();
      } else if (this.nav == 3) {
        this.getLifeVideo();
      } else if (this.nav == 4) {
        // this.getPkOne();
      }
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
</style>