<template>
  <div class="container">
    <div class="topNav" style="position:fixed;width:100%;top:0;left:0;z-index:2000;background:#fff">
      <div class="nav">
        <div :class="{active:nav==1}" @click="chooseNav(1)">PK视频</div>
        <div :class="{active:nav==2}" @click="chooseNav(2)">音乐合唱</div>
      </div>
    </div>
    <div class="line"></div>
    <div class="nav1" v-if="nav==1">
      <div class="littleNav">
        <van-tabs
          :active="littleVav"
          :color="'#FC5428'"
          @change="chooseTag"
          :swipe-threshold="6"
          :line-height="2.5"
        >
          <van-tab
            :title="item.itemText"
            v-for="(item,i) in tagList"
            :key="i"
            :name="item.itemValue"
          ></van-tab>
        </van-tabs>
      </div>
      <div class="title" v-if="pkList.length>0">
        PK预告
        <span>正在竞猜</span>
        <span @click="toList(2)">查看全部</span>
      </div>
      <div class="half" v-if="pkList.length>0">
        <swiper :next-margin="'35px'">
          <swiper-item v-for="(item,i) in pkList" :key="i">
            <div class="pkList">
              <div class="item">
                <div class="left" @click="toGuess(item.videoMatchId)">
                  <img :src="item.aVideoImg" alt mode="aspectFill" />
                  <div class="up">
                    <div class="labelTime">
                      <van-count-down :time="item.time" />
                    </div>
                    <div class="num">战力：{{item.aForce}}</div>
                  </div>
                </div>
                <div class="right" @click="toGuess(item.videoMatchId)">
                  <img :src="item.bVideoImg" alt mode="aspectFill" />
                  <div class="up">
                    <div class="label">{{item.videoTag.itemText}}</div>
                    <div class="num">战力：{{item.bForce}}</div>
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
          </swiper-item>
        </swiper>
      </div>
      <div class="title" v-if="pkList2.length>0">
        PK进行
        <span>c位争夺</span>
        <span @click="toList(3)">查看全部</span>
      </div>
      <div class="half" v-if="pkList2.length>0">
        <swiper :next-margin="'35px'">
          <swiper-item v-for="(item,i) in pkList2" :key="i">
            <div class="pkList">
              <div class="item">
                <div class="left" @click="toVideo(item.videoMatchId,0,item.aId)">
                  <img :src="item.aVideoImg" alt mode="aspectFill" />
                  <div class="up">
                    <div class="labelTime" v-if="item.time>86400000">
                      <van-count-down :time="item.time" format="PK时长:DD天" />
                    </div>
                    <div class="labelTime" v-else-if="item.time>0">
                      <van-count-down :time="item.time" />
                    </div>
                    <div class="labelTime" v-else>已结束</div>
                    <div class="num">战力：{{item.aForce}}</div>
                  </div>
                </div>
                <div class="right" @click="toVideo(item.videoMatchId,1,item.bId)">
                  <img :src="item.bVideoImg" alt mode="aspectFill" />
                  <div class="up">
                    <div class="label">{{item.videoTag.itemText}}</div>
                    <div class="num">战力：{{item.bForce}}</div>
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
          </swiper-item>
        </swiper>
      </div>
      <div class="title">
        擂台挑战
        <span>发起挑战</span>
        <span></span>
      </div>
      <div class="challenge">
        <div class="stars" v-for="(item,i) in pkList3" :key="i">
          <div class="img" @click="toVideo1(item.videoId)">
            <img :src="item.videoImg" alt mode="aspectFill" />
            <div class="up">
              <!-- <div class="label">
              {{item.day}}
              </div>-->
              <div class="label" v-if="item.time>86400000">
                <van-count-down :time="item.time" format="擂台时长:DD天" />
              </div>
              <div class="label" v-else-if="item.time>0">
                <van-count-down :time="item.time" format="HH 时 mm 分 ss 秒" />
              </div>
              <div class="label" v-else>已结束</div>
              <!-- <div class="num">人气：{{item.videoHot}}</div> -->
            </div>
          </div>
          <div class="name">
            <div class="img2">
              <img :src="item.imgUrl" alt mode="aspectFill" @click="toUser(item.userId)" />
            </div>
            <span>{{item.displayName}}</span>
            <span :style="item.titleType.bg" class="spanLabel">{{item.titleType.itemText}}</span>
          </div>
          <div class="number">{{item.title}}</div>
        </div>

        <empty msg="暂无视频,快去app发布吧！" v-if="pkList3.length==0" />
      </div>
      <p
        style="text-align:center;margin-top:20px;color:#aaa;margin-bottom:15px;"
        v-if="pkList3.length>0"
      >没有更过数据</p>
    </div>
    <div class="nav2" v-if="nav==2">
      <div class="littleNav">
        <van-tabs
          :active="tag2"
          :color="'#FC5428'"
          @change="chooseTag2"
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
      </div>
      <div class="title" v-if="waitList2.length>0">
        PK预告
        <span>正在竞猜</span>
        <span @click="toList2(2)">查看全部</span>
      </div>
      <div class="half" v-if="waitList2.length>0">
        <scroll-view scroll-x class="ver">
          <div class="sList">
            <div
              class="item"
              v-for="(item,i) in waitList2"
              :key="i"
              @click="toGuess(item.videoMatchId,2)"
            >
              <div class="img">
                <img :src="item.aVideoImg" alt mode="aspectFill" />
                <img :src="item.bVideoImg" alt mode="aspectFill" />
                <div class="up">
                  <div class="status">
                    <van-count-down :time="item.time" />
                  </div>
                  <!-- <div class="status2">擂台时长:9天</div> -->
                  <div class="num">{{item.aGuessCount}}人已支持</div>
                  <div class="num2">{{item.bGuessCount}}人已支持</div>
                </div>
              </div>
              <div class="label">{{item.songLibrary.songName}}</div>
            </div>
          </div>
        </scroll-view>
      </div>
      <div class="title" v-if="waitList3.length>0">
        PK进行
        <span>c位争夺</span>
        <span @click="toList2(3)">查看全部</span>
      </div>
      <div class="half" v-if="waitList3.length>0">
        <scroll-view scroll-x class="ver">
          <div class="sList">
            <div
              class="item"
              v-for="(item,i) in waitList3"
              :key="i"
              @click="toSing(item.videoMatchId)"
            >
              <div class="img">
                <img :src="item.aVideoImg" alt mode="aspectFill" />
                <img :src="item.bVideoImg" alt mode="aspectFill" />
                <div class="up">
                  <div class="status" v-if="item.time>86400000">
                    <van-count-down :time="item.time" format="PK时长:DD天" />
                  </div>
                  <div class="status" v-else-if="item.time>0">
                    <van-count-down :time="item.time" format="HH:mm:ss" />
                  </div>
                  <div class="num">人气{{item.aHotCount}}</div>
                  <div class="num2">人气{{item.bHotCount}}</div>
                </div>
              </div>
              <div class="label">{{item.songLibrary.songName}}</div>
            </div>
          </div>
        </scroll-view>
      </div>
      <div class="title">
        邀您合唱
        <span>歌王争夺</span>
        <span></span>
      </div>
      <div class="songList">
        <div class="item" v-for="(item,i) in waitList" :key="i" @click="toDetail(item.videoId)">
          <div class="img">
            <img :src="item.songLibrary.imgUrl" alt mode="aspectFill" />
            <div class="up">
              <img src="../../../static/images/play.png" alt mode="aspectFill" class="play" />
            </div>
          </div>
          <div class="name">{{item.songLibrary.songName}}</div>
          <div class="content">与{{item.displayName}}一起合唱“{{item.songLibrary.songName}}”</div>
          <div class="num">
            <img src="../../../static/images/speak.png" alt mode="widthFix" />
            {{item.matchTotalCount}}人合唱过
          </div>
          <div class="right" @click.stop="tipShow=true">合唱</div>
        </div>
      </div>
      <p
        style="text-align:center;margin-top:20px;color:#aaa;margin-bottom:15px;"
        v-if="pkList3.length>0"
      >没有更过数据</p>
    </div>

    <div class="line2"></div>
    <tab :active="active"></tab>
    <tips v-model="tipShow"></tips>
  </div>
</template>

<script>
import common from "../../api/common";
import { getColor } from "../../utils/utils";
import empty from "@/components/empty";
import tab from "@/components/tab";
import tips from "@/components/tips";
export default {
  components: {
    tab,
    tips,
    empty
  },
  data() {
    return {
      active: 1,
      tipShow: false,
      nav: 1,
      time: 30 * 60 * 60 * 1000,
      type: 0,
      tagList: [],
      tagList2: [],
      pkList: [],
      pkList2: [],
      pkList3: [],
      waitList: [],
      waitList2: [],
      waitList3: [],
      tag: "",
      page: 1,
      page2: 1,
      pageSize: 10,
      pageSize2: 10
    };
  },
  methods: {
    chooseNav(n) {
      this.nav = n;
    },
    toHome() {
      wx.reLaunch({
        url: "../home/main"
      });
    },
    toSing(videoMatchId) {
      wx.navigateTo({
        url: `../videoSingPk/main?videoMatchId=${videoMatchId}&matchStatus=3`
      });
    },
    toList(matchStatus) {
      wx.navigateTo({
        url: "../pkList/main?matchStatus=" + matchStatus
      });
    },
    toDetail(videoId) {
      wx.navigateTo({
        url: `../challenge2/main?videoId=${videoId}`
      });
    },
    toList2(matchStatus) {
      wx.navigateTo({
        url: "../pkList2/main?matchStatus=" + matchStatus
      });
    },
    toGuess(videoMatchId, type) {
      wx.navigateTo({
        url: `../guess/main?videoMatchId=${videoMatchId}&type=${type}`
      });
    },
    toVideo(msg, type, videoId) {
      wx.navigateTo({
        url: `../video/main?videoMatchId=${msg}&type=${type}&matchStatus=3&videoId=${videoId}`
      });
    },
    toVideo1(msg, type) {
      wx.navigateTo({
        url: `../videoOne/main?videoId=${msg}`
      });
    },
    toUser(userId) {
      wx.navigateTo({
        url: "../user/main?userId=" + userId
      });
    },
    getPkList(videoTag, type) {
      common
        .pkList({ videoTag, pageNo: 1, pageSize: 10, matchStatus: type })
        .then(res => {
          if (type == 2) {
            this.pkList = res.result;
            for (let i = 0; i < this.pkList.length; i++) {
              this.pkList[i].aTitleType.bg = getColor(
                parseInt(this.pkList[i].aTitleType.itemValue)
              );
              this.pkList[i].bTitleType.bg = getColor(
                parseInt(this.pkList[i].bTitleType.itemValue)
              );
              this.pkList[i].time =
                Date.parse(
                  new Date(res.result[i].startDate.replace(/-/g, "/"))
                ) -
                new Date().getTime() +
                20 * 60 * 1000;
            }
          } else {
            this.pkList2 = res.result;
            for (let i = 0; i < this.pkList2.length; i++) {
              this.pkList2[i].aTitleType.bg = getColor(
                parseInt(this.pkList2[i].aTitleType.itemValue)
              );
              this.pkList2[i].time =
                new Date(res.result[i].endDate.replace(/\-/g, "/")).getTime() -
                new Date().getTime();
              this.pkList2[i].bTitleType.bg = getColor(
                parseInt(this.pkList2[i].bTitleType.itemValue)
              );
            }
          }
        });
    },
    getPkOne(videoTag) {
      common
        .pkVideo({ videoTag, pageNo: this.page, pageSize: 10, matchStatus: 1 })
        .then(res => {
          this.pkList3 = [...this.pkList3, ...res.result];
          this.pageSize = res.result.length;
          for (let i = 0; i < this.pkList3.length; i++) {
            this.pkList3[i].titleType.bg = getColor(
              parseInt(this.pkList3[i].titleType.itemValue)
            );
            this.pkList3[i].titleType.bg = getColor(
              parseInt(this.pkList3[i].titleType.itemValue)
            );
            this.pkList3[i].time =
              new Date(this.pkList3[i].endDate.replace(/\-/g, "/")).getTime() -
              new Date().getTime();
          }
        });
    },
    getWaitList(videoTag, type) {
      common
        .getWaitList({
          videoTag,
          pageNo: this.page2,
          matchStatus: 1,
          pageSize: 10,
          visitId: wx.getStorageSync("userInfo").id
        })
        .then(res => {
          this.waitList = [...this.waitList, ...res.result];
          this.pageSize2 = res.result.length;
        });
    },
    pkSingPkList(videoTag, matchStatus) {
      common
        .pkSingPkList({
          videoTag,
          matchStatus
        })
        .then(res => {
          if (matchStatus == 2) {
            this.waitList2 = res.result;
            for (let i = 0; i < this.waitList2.length; i++) {
              this.waitList2[i].time =
                Date.parse(
                  new Date(res.result[i].startDate.replace(/-/g, "/"))
                ) -
                new Date().getTime() +
                20 * 60 * 1000;
            }
          } else {
            this.waitList3 = res.result;
            for (let i = 0; i < this.waitList3.length; i++) {
              this.waitList3[i].time =
                new Date(res.result[i].endDate.replace(/\-/g, "/")).getTime() -
                new Date().getTime();
            }
          }
        });
    },
    getDict(code, i) {
      common.dict({ code }).then(res => {
        switch (code) {
          case "VIDEO_TAG_PK":
            this.tagList = res.result;
            this.tagList.unshift({
              itemText: "热门",
              itemValue: ""
            });
            this.pkList3 = [];
            this.page = 1;
            this.pageSize = 10;
            this.getPkList(this.tagList[0].itemValue, 2);
            this.getPkList(this.tagList[0].itemValue, 3);
            this.getPkOne(this.tagList[0].itemValue);
            break;
          case "VIDEO_TAG_CHORUS":
            this.tagList2 = res.result;
            this.tagList2.unshift({
              itemText: "热门",
              itemValue: ""
            });
            this.waitList = [];
            this.getWaitList(this.tagList2[0].itemValue);
            this.pkSingPkList(this.tagList2[0].itemValue, 2);
            this.pkSingPkList(this.tagList2[0].itemValue, 3);
            break;
          default:
            break;
        }
      });
    },
    chooseTag2(e) {
      e.mp.detail.name == 0 ? (e.mp.detail.name = "") : "";
      this.tag2 = e.mp.detail.name;
      this.page2 = 1;
      this.waitList = [];
      this.getWaitList(this.tag2);
    },
    chooseTag(e) {
      e.mp.detail.name == 0 ? (e.mp.detail.name = "") : "";
      this.tag = e.mp.detail.name;
      this.page = 1;
      this.pkList3 = [];
      this.getPkList(this.tag, 2);
      this.getPkList(this.tag, 3);
      this.getPkOne(this.tag);
    }
  },
  onReachBottom() {
    if (this.pageSize > 9) {
      this.page++;
      this.getPkOne(this.tag);
    }
  },

  mounted() {
    if (this.pkList3.length == 0) {
      this.getDict("VIDEO_TAG_PK");
      this.getDict("VIDEO_TAG_CHORUS");
    }
  }
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
<style scoped>
.half swiper {
  height: 160px;
}
>>> .van-tab {
  color: #777;
  line-height: 28px;
}
>>> .van-tabs--line .van-tabs__wrap {
  height: auto;
}
>>> .van-tab--active {
  color: #fc5428;
}
>>> .van-hairline--top-bottom:after {
  border: none;
}
>>> .van-count-down {
  color: #fff;
  font-size: 11px;
}
</style>