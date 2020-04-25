<template>
  <div class="container">
    <div class="line"></div>
    <div class="wrap">
      <div class="navwrap">
        <div class="nav">
          <div :class="{active:nav==1}" @click="chooseNav(1)">PK</div>
          <div :class="{active:nav==2}" @click="chooseNav(2)">才艺</div>
          <div :class="{active:nav==3}" @click="chooseNav(3)">生活</div>
          <div :class="{active:nav==4}" @click="chooseNav(4)">合唱</div>
        </div>
        <div class="navInput">
          <!-- <img src="" alt="" class="ssIcon" mode="aspectFill"> -->
          <span class="ssText">搜索</span>
        </div>
      </div>
    </div>
    <div class="ad">
      <swiper duration="100" indicator-dots>
        <!-- 1 -->
        <swiper-item v-for="(item,i) in adList" :key="i">
          <img :src="item.imgUrl" alt mode="aspectFill" />
        </swiper-item>
        <!-- <swiper-item>
        </swiper-item>-->
      </swiper>
    </div>
    <div class="rank" v-show="nav==1">
      <div class="left" @click="toRank('rank')">
        <img src="../../../static/images/cup.png" alt mode="widthFix" />
        <div class="title">PK人气总榜</div>
        <div class="tips">排名争夺中</div>
      </div>
      <div class="right" @click="toRank('rankAll')">
        <img src="../../../static/images/king.png" alt mode="widthFix" />
        <div class="title">PK胜场排位</div>
        <div class="tips">擂台争夺中</div>
      </div>
    </div>
    <div class="littleNav">
      <van-tabs
        :active="tagActive"
        :color="'#FC5428'"
        @change="chooseTag"
        v-if="nav==1"
        :swipe-threshold="6"
        :line-height="2.5"
      >
        <van-tab :title="item.itemText" v-for="(item,i) in tagList" :key="i" :name="item.itemValue"></van-tab>
      </van-tabs>
      <van-tabs
        :active="tagActive2"
        :color="'#FC5428'"
        @change="chooseTag2"
        v-if="nav==2"
        :swipe-threshold="6"
        :line-height="2.5"
      >
        <van-tab
          :title="item.itemText"
          v-for="(item,i) in tagList2"
          :key="i"
          :name="item.itemValue"
        ></van-tab>
      </van-tabs>
      <van-tabs
        :active="tagActive4"
        :color="'#FC5428'"
        @change="chooseTag4"
        v-if="nav==4"
        :swipe-threshold="6"
        :line-height="2.5"
      >
        <van-tab
          :title="item.itemText"
          v-for="(item,i) in tagList4"
          :key="i"
          :name="item.itemValue"
        ></van-tab>
      </van-tabs>
    </div>
    <div
      class="wrap"
      :class="{bga:(pkList.length==0&&nav==1)||(video.length==0&&(nav==2||nav==3))}"
    >
      <div class="pkList" v-if="nav==1">
        <div
          class="itemPk"
          v-for="(item,i) in pkList"
          :key="i"
          style="padding-bottom:20px;position:relative"
        >
          <div class="item">
            <img src="../../../static/images/vs@2x.png" alt="" class="vsIcon" mode="aspectFill">
            <div class="left" @click="toVideo(item.videoMatchId,0,item.aId)">
              <img :src="item.aVideoImg" alt mode="aspectFill" />
              <div class="up">
                <div class="win" v-if="item.aHotCount>=item.bHotCount">胜出</div>
                <div class="label" v-else>{{item.videoTag.itemText}}</div>
                <div class="num">人气：{{item.aHotCount}}</div>
              </div>
            </div>
            <div class="right" @click="toVideo(item.videoMatchId,1,item.bId)">
              <img :src="item.bVideoImg" alt mode="aspectFill" />
              <div class="up">
                <div class="win" v-if="item.aHotCount<item.bHotCount">胜出</div>
                <div class="label" v-else>{{item.videoTag.itemText}}</div>
                <div class="num">人气：{{item.bHotCount}}</div>
              </div>
            </div>
          </div>
          <div class="itemTxt">
            <div class="leftTxt">
              <div class="img2" @click="toUser(item.aUserId)">
                <img :src="item.aImgUrl" alt mode="aspectFill" />
              </div>
              <span class="name">{{item.aDisplayName}}</span>
              <span :style="item.aTitleType.bg" class="label">{{item.aTitleType.itemText}}</span>
              <div class="instro">{{item.aTitle}}</div>
            </div>
            <div class="rightTxt">
              <div class="img2" @click="toUser(item.bUserId)">
                <img :src="item.bImgUrl" alt mode="aspectFill" />
              </div>
              <span class="name">{{item.bDisplayName}}</span>
              <span :style="item.bTitleType.bg" class="label">{{item.bTitleType.itemText}}</span>
              <div class="instro">{{item.bTitle}}</div>
            </div>
          </div>
        </div>
        <div class="empty" v-if="pkList.length==0&&nav==1">
          <empty msg="暂无pk视频" />
        </div>
      </div>
      <div class="cyList" v-if="nav==2">
        <div class="stars" v-for="(item,i) in video" :key="i">
          <div class="img" @click="toVideo1(item.videoId,nav)">
            <img :src="item.videoImg" alt mode="widthFix" />
            <div class="up">
              <div class="label">{{item.videoTag.itemText}}</div>
            </div>
          </div>
          <div class="name" @click="toUser(item.userId)">
            <div class="img2">
              <img :src="item.imgUrl" alt mode="aspectFill" />
            </div>
            <span>{{item.displayName}}</span>
            <span :style="item.titleType.bg" class="label">{{item.titleType.itemText}}</span>
          </div>
          <div class="number">{{item.distance}}km {{item.videoHot}}人气</div>
        </div>
        <div class="empty" v-if="video.length==0">
          <empty msg="暂无视频,快去app发布吧！" />
        </div>
      </div>
      <div class="cyList" v-if="nav==3" style="margin-top:10px">
        <div class="stars" v-for="(item,i) in video2" :key="i">
          <div class="img" @click="toVideo1(item.videoId,nav)">
            <img :src="item.videoImg" alt mode="widthFix" />
            <div class="up">
              <div class="label">{{item.videoTag.itemText}}</div>
            </div>
          </div>
          <div class="name" @click="toUser(item.userId)">
            <div class="img2">
              <img :src="item.imgUrl" alt mode="aspectFill" />
            </div>
            <span>{{item.displayName}}</span>
            <span :style="item.titleType.bg" class="label">{{item.titleType.itemText}}</span>
          </div>
          <div class="number">{{item.distance}}km {{item.videoHot}}人气</div>
        </div>
        <div class="empty" v-if="video2.length==0">
          <empty msg="暂无视频,快去app发布吧！" />
        </div>
      </div>
      <div class="sList" v-show="nav==4">
        <div
          class="item"
          v-for="(item,i) in singPkList"
          :key="i"
          @click="toSing(item.videoMatchId,item.aId)"
        >
          <div class="img">
            <img :src="item.aVideoImg" alt mode="aspectFill" />
            <img :src="item.bVideoImg" alt mode="aspectFill" />
            <div class="up">
              <div class="status" v-show="item.aForce>item.bForce">胜利</div>
              <div class="status2" v-show="item.bForce>item.aForce">胜利</div>
              <div class="num">人气:{{item.aHotCount}}</div>
              <div class="num2">人气:{{item.bHotCount}}</div>
            </div>
          </div>
          <div class="label">{{item.songLibrary.songName}}</div>
        </div>
      </div>
    </div>
    <p
      style="text-align:center;margin-top:20px;color:#aaa;margin-bottom:15px;"
      v-if="(nav==1&&pkList.length>0)||(nav==2&&video.length>0)||(nav==3&&video2.length>0)||(nav==4&&singPkList.length>0)"
    >没有更过数据</p>
    <div class="lineB"></div>
    <tab :active="active"></tab>
  </div>
</template>

<script>
import common from "../../api/common";
import { getColor } from "../../utils/utils";
import tab from "@/components/tab";
import empty from "@/components/empty";
export default {
  components: {
    tab,
    empty
  },

  data() {
    return {
      active: 0,
      nav: 1,
      color: "",
      adList: [],
      pkList: [],
      video: [],
      video2: [],
      tagList: [],
      tagList2: [],
      tagList4: [],
      singPkList: [],
      tagActive: "",
      tagActive2: "",
      type: 0,
      page: 1,
      page2: 1,
      page3: 1,
      page4: 1,
      pageSize: 4,
      pageSize2: 4,
      pageSize3: 10,
      pageSize4: 10
    };
  },
  computed: {},
  methods: {
    toRank(msg) {
      wx.navigateTo({
        url: `../${msg}/main?rType=0`
      });
    },
    toVideo(msg, type, videoId) {
      wx.navigateTo({
        url: `../video/main?videoMatchId=${msg}&type=${type}&matchStatus=4&videoId=${videoId}`
      });
    },
    toSing(videoMatchId, videoId) {
      wx.navigateTo({
        url: `../videoSingPk/main?videoMatchId=${videoMatchId}&matchStatus=4&videoId=${videoId}`
      });
    },
    toVideo1(msg, type) {
      wx.navigateTo({
        url: `../videoOne/main?videoId=${msg}&type=${type}`
      });
    },
    toUser(userId) {
      wx.navigateTo({
        url: "../user/main?userId=" + userId
      });
    },

    chooseTag(e) {
      e.mp.detail.name == 0 ? (e.mp.detail.name = "") : "";
      this.tagActive = e.mp.detail.name;
      this.pkList = [];
      this.page = 1;
      this.pageSize = 4;
      this.getPkList(this.tagActive);
    },
    chooseTag2(e) {
      e.mp.detail.name == 0 ? (e.mp.detail.name = "") : "";
      this.tagActive2 = e.mp.detail.name;
      this.video = [];
      this.page2 = 1;
      this.pageSize2 = 4;
      this.getSkillVideo(this.tagActive2);
    },
    chooseTag4(e) {
      e.mp.detail.name == 0 ? (e.mp.detail.name = "") : "";
      this.tagActive2 = e.mp.detail.name;
      this.video4 = [];
      this.page4 = 1;
      this.pageSize4 = 4;
      this.getSkillVideo(this.tagActive2);
    },
    chooseNav(n) {
      this.nav = n;
    },
    getAdList(type) {
      common.adList({ positionNum: type }).then(res => {
        this.adList = res.result;
      });
    },
    getPkList(videoTag) {
      common
        .pkList({ videoTag, pageNo: this.page, pageSize: 4, matchStatus: 4 })
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
    getSkillVideo(videoTag) {
      common
        .skillVideo({
          videoTag,
          pageNo: this.page2,
          pageSize: 10,
          lat: wx.getStorageSync("lat"),
          lng: wx.getStorageSync("lng")
        })
        .then(res => {
          this.video = [...this.video, ...res.result];
          this.pageSize2 = res.result.length;
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
    getLifeVideo(videoTag) {
      common
        .lifeVideo({
          videoTag,
          pageNo: this.page3,
          pageSize: 10,
          lat: wx.getStorageSync("lat"),
          lng: wx.getStorageSync("lng")
        })
        .then(res => {
          this.video2 = [...this.video2, ...res.result];
          this.pageSize3 = res.result.length;
          for (let i = 0; i < this.video2.length; i++) {
            this.video2[i].titleType.bg = getColor(
              parseInt(this.video2[i].titleType.itemValue)
            );
            this.video2[i].hotCount =
              Math.abs(this.video2[i].hotCount) > 10000
                ? parseInt(this.video2[i].hotCount / 10000) + "w"
                : this.video2[i].hotCount;
            this.video2[i].distance = (this.video2[i].distance / 1000).toFixed(
              1
            );
          }
        });
    },
    pkSingPkList(videoTag) {
      common
        .pkSingPkList({
          videoTag,
          pageNo: this.page4,
          pageSize: 4,
          lat: wx.getStorageSync("lat"),
          lng: wx.getStorageSync("lng")
        })
        .then(res => {
          this.singPkList = [...this.singPkList, ...res.result];
          this.pageSize4 = res.result.length;
        });
    },
    getDict(code, i) {
      common.dict({ code }).then(res => {
        switch (code) {
          case "VIDEO_TAG_TALENT":
            this.tagList2 = res.result;
            this.tagList2.unshift({
              itemText: "热门",
              itemValue: ""
            });
            break;
          case "VIDEO_TAG_PK":
            this.tagList = res.result;
            this.tagList.unshift({
              itemText: "热门",
              itemValue: ""
            });
            break;
          case "VIDEO_TAG_CHORUS":
            this.tagList4 = res.result;
            this.tagList4.unshift({
              itemText: "热门",
              itemValue: ""
            });
            break;
          default:
            break;
        }
      });
    },

    init() {
      this.getAdList(1);
      this.getDict("VIDEO_TAG_TALENT");
      this.getDict("VIDEO_TAG_PK");
      this.getDict("VIDEO_TAG_CHORUS");
      this.getPkList(this.tagActive);
      this.getSkillVideo(this.tagActive2);
      this.getLifeVideo("");
      this.pkSingPkList("");
    }
  },
  onReachBottom() {
    if (this.nav == 1) {
      if (this.pageSize > 3) {
        this.page++;
        this.getPkList(this.tagActive);
      }
    } else if (this.nav == 2) {
      if (this.pageSize2 > 9) {
        this.page2++;
        this.getSkillVideo(this.tagActive2);
      }
    } else if (this.nav == 3) {
      if (this.pageSize3 > 9) {
        this.page3++;
        this.getLifeVideo("");
      }
    } else {
      if (this.pageSize4 > 9) {
        this.page4++;
        this.pkSingPkList("");
      }
    }
  },

  mounted() {
    if (!wx.getStorageSync("userInfo").id) {
      wx.reLaunch({
        url: "../userInfo/main"
      });
    }
    if (this.pkList.length == 0) {
      this.init();
    }
  }
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
<style scoped>
>>> .van-tab {
  color: #101010;
  line-height: 28px;
}
>>> .van-tab--active {
  color: #fc5428;
}
>>> .van-hairline--top-bottom:after {
  border: none;
}
</style>