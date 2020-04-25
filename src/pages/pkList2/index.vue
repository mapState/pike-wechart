<template>
  <div class="container" @click="setFalse">
    <div class="input">
      <div @click.stop="searchShow=true">
        <img src="../../../static/images/big.png" alt mode="widthFix" />
        搜索
      </div>
      <div @click.stop="filterShow=true">
        <img src="../../../static/images/filter.png" alt mode="widthFix" />
        筛选
      </div>
    </div>
    <div class="line"></div>

    <div class="half" style="padding-bottom:30px;">
      <div class="sList">
        <div class="item" v-for="(item,i) in pkList" :key="i" @click="toSing(item.videoMatchId)">
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
      <empty msg="暂无视频,快去app发布吧！" v-if="pkList.length==0" />
    </div>
    <p
      style="text-align:center;margin-top:20px;color:#aaa;margin-bottom:15px;"
      v-if="pkList.length>0"
    >没有更过数据</p>
    <van-popup :show="searchShow" :close-on-click-overlay="true" position="top">
      <div class="search" @click.stop="searchShow=true">
        <div class="input">
          <img src="../../../static/images/big.png" alt mode="widthFix" />
          <input type="text" placeholder="请输入关键词" @change.stop="onSearch" v-model="msg" />
        </div>
        <span class="cancle" @click.stop="cancle">取消</span>
        <div class="tip">
          搜索记录
          <span @click.stop="clear">
            <img src="../../../static/images/del.png" alt mode="widthFix" />清空
          </span>
        </div>
        <div class="history">
          <div
            class="h"
            v-for="(item,i) in historyList"
            :key="i"
            @click.stop="textIn(item)"
            v-show="item"
          >{{item}}</div>
        </div>
      </div>
    </van-popup>
    <van-popup
      :show="filterShow"
      :close-on-click-overlay="true"
      position="right"
      custom-style="height: 101%;width:54%"
    >
      <div class="filter" @click.stop="filterShow=true">
        <div class="title">类型</div>
        <div class="types">
          <div
            class="type"
            v-for="(item,i) in tagList"
            :key="i"
            @click="chooseTag(item.itemValue)"
            :class="{active:tag==item.itemValue}"
          >{{item.itemText}}</div>
        </div>
        <div class="reset" @click.stop="sure('')">重置</div>
        <div class="sure" @click.stop="sure(tag)">确定</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import common from "../../api/common";
import { getColor } from "../../utils/utils";
import label from "@/components/label";
import empty from "@/components/empty";
export default {
  components: {
    empty,
    label
  },
  data() {
    return {
      active: 1,
      nav: 1,
      time: 30 * 60 * 60 * 1000,
      searchShow: false,
      filterShow: false,
      tagList: [],
      pkList: [],
      historyList: [],
      type: 0,
      tag: "",
      msg: "",
      page: 1,
      pageSize: 10
    };
  },
  methods: {
    toHome() {
      wx.reLaunch({
        url: "../home/main"
      });
    },
    chooseTag(e) {
      this.tag = e;
    },
    toVideo(msg, type, videoId) {
      wx.navigateTo({
        url: `../video/main?videoMatchId=${msg}&type=${type}&matchStatus=${
          this.$mp.query.matchStatus
        }&videoId=${videoId}`
      });
    },
    toSing(videoMatchId) {
      wx.navigateTo({
        url: `../videoSingPk/main?videoMatchId=${videoMatchId}&matchStatus=3`
      });
    },
    toUser(userId) {
      wx.navigateTo({
        url: "../user/main?userId=" + userId
      });
    },
    textIn(t) {
      this.msg = t;
      this.page = 1;
      this.pageSize = 10;
      this.pkList = [];
      this.pkSingPkList(this.tag, this.$mp.query.matchStatus, this.msg);
      this.searchShow = false;
    },
    cancle() {
      this.msg = "";
      this.page = 1;
      this.pageSize = 10;
      this.pkList = [];
      this.pkSingPkList(this.tag, this.$mp.query.matchStatus, this.msg);
      this.searchShow = false;
    },
    clear() {
      this.historyList = [];
      wx.setStorageSync("history", this.historyList.toString());
    },
    onSearch(e) {
      this.msg = e.mp.detail.value;
      this.searchShow = false;
      this.historyList.push(e.mp.detail.value);
      wx.setStorageSync("history", this.historyList.toString());
      this.page = 1;
      this.pageSize = 10;
      this.pkList = [];
      this.pkSingPkList(this.tag, this.$mp.query.matchStatus, this.msg);
    },
    pkSingPkList(videoTag, matchStatus, keyword) {
      common
        .pkSingPkList({
          videoTag,
          matchStatus,
          keyword,
          pageNo: this.page,
          pageSize: 10
        })
        .then(res => {
          if (matchStatus == 2) {
            this.pkList = [...this.pkList, ...res.result];
            this.pageSize = res.result.length;
            for (let i = 0; i < this.pkList.length; i++) {
              this.pkList[i].time =
                Date.parse(
                  new Date(this.pkList[i].startDate.replace(/-/g, "/"))
                ) -
                new Date().getTime() +
                20 * 60 * 1000;
            }
          } else {
            this.pkList = [...this.pkList, ...res.result];
            this.pageSize = res.result.length;
            for (let i = 0; i < this.pkList.length; i++) {
              this.pkList[i].time =
                new Date(this.pkList[i].endDate.replace(/\-/g, "/")).getTime() -
                new Date().getTime();
            }
          }
        });
    },
    getDict(code, i) {
      common.dict({ code }).then(res => {
        this.tagList = res.result;
        this.tagList.unshift({
          itemText: "热门",
          itemValue: ""
        });
        this.pkSingPkList(
          this.tagList[0].itemValue,
          this.$mp.query.matchStatus,
          this.msg
        );
      });
    },
    sure(e) {
      this.tag = e;
      this.page = 1;
      this.pageSize = 10;
      this.pkList = [];
      this.pkSingPkList(this.tag, this.$mp.query.matchStatus, this.msg);
      this.filterShow = false;
    },
    setFalse() {
      this.searchShow = false;
      this.filterShow = false;
    },
    chooseNav(n) {
      this.nav = n;
    }
  },
  onReachBottom() {
    if (this.pageSize > 9) {
      this.page++;
      this.pkSingPkList(this.tag, this.$mp.query.matchStatus, this.msg);
    }
  },
  onUnload() {
    this.page = 1;
    this.pageSize = 10;
    this.pkList = [];
  },
  mounted() {
    try {
      this.historyList = wx.getStorageSync("history").split(",");
    } catch (error) {}
    this.getDict("VIDEO_TAG_CHORUS");
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
>>> .van-popup {
  background: transparent;
}
>>> .van-popup {
  overflow: initial;
}
</style>