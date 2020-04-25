<template>
  <div class="container">
    <div class="topNav" style="position:fixed;width:100%;top:0;left:0;z-index:1;background:#fff">
      <div class="back" @click="toHome">
        <img src="https://smapi.koudaitiku.net/images/words/return.png" alt mode="widthFix" />
      </div>
      <div class="nav">
        <div :class="{active:nav==1}" @click="chooseNav(1)">才艺榜</div>
        <div :class="{active:nav==2}" @click="chooseNav(2)">新秀榜</div>
        <div :class="{active:nav==3}" @click="chooseNav(3)">附近的人</div>
      </div>
    </div>
    <div class="nav1" v-show="nav==1">
      <div class="winner">
        <img src="http://cdn.pike8.top/Fi7i5nIH3JKmz-_nxif7SeV58Zx_" alt mode="widthFix" class="bg" />
        <div class="w1" v-if="rankList[0]">
          <img src="../../../static/images/w1.png" alt mode="widthFix" class="w1img" />
          <div class="user">
            <img
              :src="rankList[0].imgUrl"
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
          <img src="../../../static/images/w2.png" alt mode="aspectFill" class="w1img" />
          <div class="user">
            <img
              :src="rankList[1].imgUrl"
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
              :src="rankList[2].imgUrl"
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
            <img :src="item.imgUrl" alt mode="aspectFill" />
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
    <div class="nav2" v-show="nav==2">
      <div class="stars" v-for="(item,i) in newList" :key="i" @click="toUser(item.userId)">
        <div class="img">
          <img :src="item.imgUrl" alt mode="widthFix" />
        </div>
        <div class="name">
          <span>{{item.displayName}}</span>
          <span :style="item.titleType.bg" class="label">{{item.titleType.itemText}}</span>
        </div>
        <div class="number">{{item.distance}}km {{item.hotCount}}人气</div>
      </div>
      <empty msg="暂无新秀" v-if="newList.length==0" />
    </div>
    <div class="nav3" v-show="nav==3">
      <div class="list">
        <div class="item" v-for="(item,i) in nearList" :key="i">
          <span class="kong"></span>
          <div class="user" @click="toUser(item.userId)">
            <img :src="item.imgUrl" alt mode="widthFix" />
          </div>
          <div class="name" @click="toUser(item.userId)">
            <span>{{item.displayName}}</span>
            <img src="../../../static/images/boy.png" alt mode="widthFix" class="sex" />
            <br />
            <span :style="item.titleType.bg" class="label">{{item.titleType.itemText}}</span>
          </div>
          <div class="win">{{item.distance}}km</div>
          <div
            class="focus"
            :class="{active:item.status===0||item.status===1}"
            @click="focus(item.userId,item.status)"
          >{{item.status===0?'已关注':item.status===1?'互相关注':'关注'}}</div>
        </div>
        <empty msg="暂无附近的人" v-if="nearList.length==0" />
      </div>
    </div>
  </div>
</template>

<script>
import common from "../../api/common";
import user from "../../api/user";
import { getColor } from "../../utils/utils";
import empty from "@/components/empty";
export default {
  components: {
    empty
  },
  data() {
    return {
      active: 0,
      nav: 1,
      type: 0,
      rankList: [],
      watchList: [],
      nearList: [],
      newList: [],
      page: 1,
      page2: 1,
      page3: 1,
      pageSize: 4,
      pageSize2: 4,
      pageSize3: 10
    };
  },
  methods: {
    toHome() {
      wx.reLaunch({
        url: "../home/main"
      });
    },
    toUser(userId) {
      wx.navigateTo({
        url: "../user/main?userId=" + userId
      });
    },
    chooseNav(n) {
      this.nav = n;
    },
    focus(id, s) {
      if (s == 2) {
        this.doIt(wx.getStorageSync("userInfo").id, id);
      } else {
        this.cancelIt(wx.getStorageSync("userInfo").id, id);
      }
    },
    getNewList() {
      user
        .newList({
          pageNo: this.page3,
          pageSize: 20,
          lat: wx.getStorageSync("lat"),
          lng: wx.getStorageSync("lng")
        })
        .then(res => {
          this.newList = [...this.newList, ...res.result];
          this.pageSize3 = res.result.length;
          for (let i = 0; i < this.newList.length; i++) {
            this.newList[i].titleType.bg = getColor(
              parseInt(this.newList[i].titleType.itemValue)
            );
            this.newList[i].hotCount =
              Math.abs(this.newList[i].hotCount) > 10000
                ? parseInt(this.newList[i].hotCount / 10000) + "w"
                : this.newList[i].hotCount;
            this.newList[i].distance = (
              this.newList[i].distance / 1000
            ).toFixed(1);
          }
        });
    },
    getNearList() {
      user
        .nearList({
          pageNo: this.page2,
          pageSize: 10,
          lat: wx.getStorageSync("lat"),
          lng: wx.getStorageSync("lng")
        })
        .then(res => {
          this.nearList = [...this.nearList, ...res.result];
          this.pageSize2 = res.result.length;
          for (let i = 0; i < this.nearList.length; i++) {
            this.nearList[i].titleType.bg = getColor(
              parseInt(this.nearList[i].titleType.itemValue)
            );
            if (this.watchList.hasOwnProperty(this.nearList[i].userId)) {
              this.nearList[i].status = this.watchList[this.nearList[i].userId];
            } else {
              this.nearList[i].status = 2;
            }

            this.nearList[i].hotCount =
              Math.abs(this.nearList[i].hotCount) > 10000
                ? parseInt(this.nearList[i].hotCount / 10000) + "w"
                : this.nearList[i].hotCount;
            this.nearList[i].distance = (
              this.nearList[i].distance / 1000
            ).toFixed(1);
          }
        });
    },
    getWatchList(userId, type) {
      user.getWatchList({ userId }).then(res => {
        this.watchList = res.result;
        if (type) {
          if (this.nav == 1) {
            for (let i = 0; i < this.rankList.length; i++) {
              if (this.watchList.hasOwnProperty(this.rankList[i].userId)) {
                this.rankList[i].status = this.watchList[
                  this.rankList[i].userId
                ];
              } else {
                this.rankList[i].status = 2;
              }
            }
          }else{
            for (let i = 0; i < this.nearList.length; i++) {
              if (this.watchList.hasOwnProperty(this.nearList[i].userId)) {
                this.nearList[i].status = this.watchList[
                  this.nearList[i].userId
                ];
              } else {
                this.nearList[i].status = 2;
              }
            }
          }
        } else {
          this.getFireRankAll();
          this.getNearList();
        }
      });
    },
    cancelIt(userId, watchUserId) {
      user.cancelIt({ userId, watchUserId }).then(res => {
        this.getWatchList(wx.getStorageSync("userInfo").id,this.nav);
      });
    },
    doIt(userId, watchUserId) {
      user.doIt({ userId, watchUserId}).then(res => {
        this.getWatchList(wx.getStorageSync("userInfo").id, this.nav);
      });
    },
    getFireRankAll() {
      common
        .fireRankAll({
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
  onReachBottom() {
    if (this.nav == 1) {
      if (this.pageSize >= 10) {
        this.page++;
        this.getFireRankAll();
      }
    } else if (this.nav == 3) {
      if (this.pageSize2 >= 10) {
        this.page2++;
        this.getNearList();
      }
    } else if (this.nav == 2) {
      if (this.pageSize3 >= 20) {
        this.page3++;
        this.getNewList();
      }
    }
  },

  mounted() {
    if (this.rankList.length == 0) {
      this.getWatchList(wx.getStorageSync("userInfo").id);
      this.getNewList();
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
}
>>> .van-tab--active {
  color: #fc5428;
}
>>> .van-hairline--top-bottom:after {
  border: none;
}
</style>