<template>
  <div class="container">
    <div class="littleNav">
      <van-tabs :active="nav" :color="'#FC5428'" @change="chooseTag">
        <van-tab title="关注" name="1"></van-tab>
        <van-tab title="粉丝" name="2"></van-tab>
      </van-tabs>
    </div>
    <div class="list">
      <div class="item" v-for="(item,i) in list" :key="i">
        <span class="kong"></span>
        <div class="user">
          <img :src="item.imgUrl" alt mode="aspectFill" @click="toUser(item.userId)" />
        </div>
        <div class="name">
          <span>{{item.displayName}}</span>
          <img src="../../../static/images/boy.png" alt mode="widthFix" class="sex" />
          <br />
          <span :style="item.titleType.bg" class="spanLabel">{{item.titleType.itemText}}</span>
        </div>
        <div
          class="focus"
          :class="{active:item.status===0||item.status===1}"
          @click="focus(item.userId,item.status)"
        >{{item.status===0?'已关注':item.status===1?'互相关注':'关注'}}</div>
      </div>
      <empty msg="暂无数据" v-if="list.length==0" />
      <p
        style="text-align:center;margin-top:20px;color:#aaa;margin-bottom:15px;"
        v-if="list.length>0"
      >没有更过数据</p>
    </div>
  </div>
</template>

<script>
import { getColor } from "../../utils/utils";
import empty from "@/components/empty";
import user from "../../api/user";
export default {
  components: {
    empty
  },
  data() {
    return {
      active: 0,
      nav: 1,
      name: "",
      list: [],
      watchList: [],
      type: 0,
      page: 1,
      pageSize: 10
    };
  },
  onReachBottom() {
    if (this.pageSize > 9) {
      this.page++;
      console.log(this.page);
      if (this.nav != 1) {
        this.getFans(this.$mp.query.userId || wx.getStorageSync("userInfo").id);
      } else {
        this.getWatch(
          this.$mp.query.userId || wx.getStorageSync("userInfo").id
        );
      }
    }
  },
  onUnload() {
    this.page = 1;
    this.pageSize = 10;
    this.list = [];
  },
  methods: {
    init() {
      this.name = this.$mp.query.rType;
      this.nav = this.$mp.query.nav;
      wx.setNavigationBarTitle({
        title: this.name
      });
      this.getWatchList(wx.getStorageSync("userInfo").id);
    },
    chooseNav(n) {
      this.nav = n;
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
    chooseTag(e) {
      this.nav = e.mp.detail.name;
      this.page = 1;
      this.pageSize = 10;
      this.list = [];
      this.getWatchList(wx.getStorageSync("userInfo").id);
    },
    getWatchList(userId, type) {
      user.getWatchList({ userId }).then(res => {
        this.watchList = res.result;
        if (type) {
          for (let i = 0; i < this.list.length; i++) {
            if (this.watchList.hasOwnProperty(this.list[i].userId)) {
              this.list[i].status = this.watchList[this.list[i].userId];
            } else {
              this.list[i].status = 2;
            }
          }
        } else {
          if (this.nav != 1) {
            this.getFans(
              this.$mp.query.userId || wx.getStorageSync("userInfo").id
            );
          } else {
            this.getWatch(
              this.$mp.query.userId || wx.getStorageSync("userInfo").id
            );
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
    getFans(userId) {
      user
        .fans({
          userId,
          pageNo: this.page,
          pageSize: this.pageSize
        })
        .then(res => {
          this.list = [...this.list, ...res.result];
          this.pageSize = res.result.length;
          for (let i = 0; i < this.list.length; i++) {
            try {
              this.list[i].titleType.bg = getColor(
                parseInt(this.list[i].titleType.itemValue)
              );
            } catch (error) {}
            if (this.watchList.hasOwnProperty(this.list[i].userId)) {
              this.list[i].status = this.watchList[this.list[i].userId];
            } else {
              this.list[i].status = 2;
            }
          }
        });
    },
    getWatch(userId) {
      user
        .watch({
          userId,
          pageNo: this.page,
          pageSize: this.pageSize
        })
        .then(res => {
          this.list = [...this.list, ...res.result];
          this.pageSize = res.result.length;
          for (let i = 0; i < this.list.length; i++) {
            try {
              this.list[i].titleType.bg = getColor(
                parseInt(this.list[i].titleType.itemValue)
              );
            } catch (error) {}
            if (this.watchList.hasOwnProperty(this.list[i].userId)) {
              this.list[i].status = this.watchList[this.list[i].userId];
            } else {
              this.list[i].status = 2;
            }
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