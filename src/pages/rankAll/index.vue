<template>
  <div class="container">
    <div class="nav" v-if="rType==='1'">
      <div :class="{active:nav==2}" @click="chooseNav(1)">打赏排行</div>
      <div :class="{active:nav==1}" @click="chooseNav(2)">聘礼排行</div>
    </div>
    <div class="nav" v-else>
      <div :class="{active:nav==2}" @click="chooseNav(1)">周排行</div>
      <div :class="{active:nav==1}" @click="chooseNav(2)">月排行</div>
    </div>
    <div class="winner">
      <img src="http://cdn.pike8.top/Fi7i5nIH3JKmz-_nxif7SeV58Zx_" alt mode="widthFix" class="bg" />
      <div class="w1" v-if="rankList[0]">
        <img src="../../../static/images/w1.png" alt mode="widthFix" class="w1img" />
        <div class="user">
          <img
            :src="rankList[0].userImgUrl||rankList[0].imgUrl"
            alt
            mode="aspectFill"
            @click="toUser(rankList[0].userId)"
          />
        </div>
        <div class="number">{{rankList[0].hotCount}}人气</div>
        <div class="name">
          <span>{{rankList[0].displayName}}</span>
          <span :style="rankList[0].titleType.bg" class="label">{{rankList[0].titleType.itemText}}</span>
        </div>
        <div
          class="focus"
          :class="{active:rankList[0].status===0||rankList[0].status===1}"
          @click="focus(rankList[0].userId,rankList[0].status)"
        >{{rankList[0].status===0?'已关注':rankList[0].status===1?'互相关注':'关注'}}</div>
      </div>
      <div class="w1 w2" v-if="rankList[1]">
        <img src="../../../static/images/w2.png" alt mode="widthFix" class="w1img" />
        <div class="user">
          <img
            :src="rankList[1].userImgUrl||rankList[1].imgUrl"
            alt
            mode="aspectFill"
            @click="toUser(rankList[1].userId)"
          />
        </div>
        <div class="number">{{rankList[1].hotCount}}人气</div>
        <div class="name">
          <span>{{rankList[1].displayName}}</span>
          <span :style="rankList[1].titleType.bg" class="label">{{rankList[1].titleType.itemText}}</span>
        </div>
        <div
          class="focus"
          :class="{active:rankList[1].status===0||rankList[1].status===1}"
          @click="focus(rankList[1].userId,rankList[1].status)"
        >{{rankList[1].status===0?'已关注':rankList[1].status===1?'互相关注':'关注'}}</div>
      </div>
      <div class="w1 w3" v-if="rankList[2]">
        <img src="../../../static/images/w3.png" alt mode="widthFix" class="w1img" />
        <div class="user">
          <img
            :src="rankList[2].userImgUrl||rankList[2].imgUrl"
            alt
            mode="aspectFill"
            @click="toUser(rankList[2].userId)"
          />
        </div>
        <div class="number">{{rankList[2].hotCount}}人气</div>
        <div class="name">
          <span>{{rankList[2].displayName}}</span>
          <span :style="rankList[2].titleType.bg" class="label">{{rankList[2].titleType.itemText}}</span>
        </div>
        <div
          class="focus"
          :class="{active:rankList[2].status===0||rankList[2].status===1}"
          @click="focus(rankList[2].userId,rankList[2].status)"
        >{{rankList[2].status===0?'已关注':rankList[2].status===1?'互相关注':'关注'}}</div>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="(item,i) in rankList" :key="i" v-show="i>2">
        <span class="number">{{i>8?i+1:'0'+(i+1)}}</span>
        <div class="user" @click="toUser(item.userId)">
          <img :src="item.userImgUrl||item.imgUrl" alt mode="aspectFill" />
        </div>
        <div class="name" @click="toUser(item.userId)">
          <span>{{item.displayName}}</span>
          <br />
          <span :style="item.titleType.bg" class="label">{{item.titleType.itemText}}</span>
        </div>
        <div class="win">{{item.hotCount}}人气</div>
        <div
          class="focus"
          :class="{active:item.status===0||item.status===1}"
          @click="focus(item.userId,item.status)"
        >{{item.status===0?'已关注':item.status===1?'互相关注':'关注'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import user from "../../api/user";
import { getColor } from "../../utils/utils";
export default {
  data() {
    return {
      active: 0,
      nav: 1,
      type: 0,
      rankList: [],
      watchList: [],
      rType: "",
      page: 1,
      page2: 1,
      pageSize: 10,
      pageSize2: 10
    };
  },
  onReachBottom() {
    if (this.rType == 1) {
      if (this.nav == 1) {
        if (this.pageSize >= 10) {
          this.page++;
          this.getGiftListByUser();
        }
      } else if (this.nav == 2) {
        if (this.pageSize >= 10) {
          this.page++;
          this.getDowryListByUser();
        }
      }
    } else {
      if (this.nav == 1) {
        if (this.pageSize >= 10) {
          this.page++;
          this.getWeekList();
        }
      } else if (this.nav == 2) {
        if (this.pageSize >= 10) {
          this.page++;
          this.getMonthList();
        }
      }
    }
  },
  onUnload() {
    this.page = 1;
    this.pageSize = 10;
    this.rankList = [];
  },
  methods: {
    init() {
      this.rType = this.$mp.query.rType;
      if (this.rType == 1) {
        wx.setNavigationBarTitle({
          title: "礼物榜单 "
        });
        this.getWatchList(wx.getStorageSync("userInfo").id);
      } else {
        wx.setNavigationBarTitle({
          title: " "
        });
        this.getWatchList(wx.getStorageSync("userInfo").id);
      }
    },
    toUser(userId) {
      wx.navigateTo({
        url: "../user/main?userId=" + userId
      });
    },
    focus(id, s) {
      if (s == 2) {
        this.doIt(wx.getStorageSync("userInfo").id, id);
      } else {
        this.cancelIt(wx.getStorageSync("userInfo").id, id);
      }
    },
    getWatchList(userId, type) {
      user.getWatchList({ userId }).then(res => {
        this.watchList = res.result;
        // this.getMonthList();
        if (type) {
          for (let i = 0; i < this.rankList.length; i++) {
            if (this.watchList.hasOwnProperty(this.rankList[i].userId)) {
              this.rankList[i].status = this.watchList[this.rankList[i].userId];
            } else {
              this.rankList[i].status = 2;
            }
          }
        } else {
          if (this.rType == 1) {
            if (this.nav == 1) {
              this.getGiftListByUser();
            } else {
              this.getDowryListByUser();
            }
          } else {
            if (this.nav == 1) {
              this.getWeekList();
            } else {
              this.getMonthList();
            }
          }
        }
      });
    },
    cancelIt(userId, watchUserId) {
      user.cancelIt({ userId, watchUserId }).then(res => {
        this.getWatchList(wx.getStorageSync("userInfo").id, 100);
      });
    },
    doIt(userId, watchUserId) {
      user.doIt({ userId, watchUserId }).then(res => {
        this.getWatchList(wx.getStorageSync("userInfo").id, 100);
      });
    },
    chooseNav(n) {
      this.nav = n;
      this.page = 1;
      this.rankList = [];
      this.getWatchList(wx.getStorageSync("userInfo").id);
    },
    getGiftListByUser() {
      user
        .getGiftListByUser({
          userId: wx.getStorageSync("userInfo").id,
          pageNo: 1,
          pageSize: 10
        })
        .then(res => {
          this.rankList = res.result;
          for (let i = 0; i < this.rankList.length; i++) {
            try {
              this.rankList[i].titleType.bg = getColor(
                parseInt(this.rankList[i].titleType.itemValue)
              );
            } catch (error) {}
            if (this.watchList.hasOwnProperty(this.rankList[i].userId)) {
              this.rankList[i].status = this.watchList[this.rankList[i].userId];
            } else {
              this.rankList[i].status = 2;
            }
            this.rankList[i].hotCount =
              Math.abs(this.rankList[i].hotCount) > 10000
                ? parseInt(this.rankList[i].hotCount / 10000) + "w"
                : this.rankList[i].hotCount;
          }
        });
    },
    getDowryListByUser() {
      user
        .getDowryListByUser({
          userId: wx.getStorageSync("userInfo").id,
          pageNo: 1,
          pageSize: 10
        })
        .then(res => {
          this.rankList = res.result;
          for (let i = 0; i < this.rankList.length; i++) {
            try {
              this.rankList[i].titleType.bg = getColor(
                parseInt(this.rankList[i].titleType.itemValue)
              );
            } catch (error) {}
            if (this.watchList.hasOwnProperty(this.rankList[i].userId)) {
              this.rankList[i].status = this.watchList[this.rankList[i].userId];
            } else {
              this.rankList[i].status = 2;
            }
            this.rankList[i].hotCount =
              Math.abs(this.rankList[i].hotCount) > 10000
                ? parseInt(this.rankList[i].hotCount / 10000) + "w"
                : this.rankList[i].hotCount;
          }
        });
    },
    getMonthList() {
      user
        .monthList({
          pageNo: this.page,
          pageSize: 10
        })
        .then(res => {
          this.rankList = [...this.rankList, ...res.result];
          this.pageSize = res.result.length;
          for (let i = 0; i < this.rankList.length; i++) {
            try {
              this.rankList[i].titleType.bg = getColor(
                parseInt(this.rankList[i].titleType.itemValue)
              );
            } catch (error) {}
            if (this.watchList.hasOwnProperty(this.rankList[i].userId)) {
              this.rankList[i].status = this.watchList[this.rankList[i].userId];
            } else {
              this.rankList[i].status = 2;
            }
            this.rankList[i].hotCount =
              Math.abs(this.rankList[i].hotCount) > 10000
                ? parseInt(this.rankList[i].hotCount / 10000) + "w"
                : this.rankList[i].hotCount;
          }
        });
    },

    getWeekList() {
      user
        .weekList({
          pageNo: this.page,
          pageSize: 10
        })
        .then(res => {
          this.rankList = [...this.rankList, ...res.result];
          this.pageSize = res.result.length;
          for (let i = 0; i < this.rankList.length; i++) {
            try {
              this.rankList[i].titleType.bg = getColor(
                parseInt(this.rankList[i].titleType.itemValue)
              );
            } catch (error) {}
            if (this.watchList.hasOwnProperty(this.rankList[i].userId)) {
              this.rankList[i].status = this.watchList[this.rankList[i].userId];
            } else {
              this.rankList[i].status = 2;
            }
            this.rankList[i].hotCount =
              Math.abs(this.rankList[i].hotCount) > 10000
                ? parseInt(this.rankList[i].hotCount / 10000) + "w"
                : this.rankList[i].hotCount;
          }
        });
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