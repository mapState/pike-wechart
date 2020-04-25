<template>
  <div class="container">
    <div class="nav">
      <div :class="{active:nav==2}" @click="chooseNav(1)">打赏礼</div>
      <div :class="{active:nav==1}" @click="chooseNav(2)">聘礼</div>
    </div>
    <div class="nav1" v-show="nav==1">
      <div class="item" v-for="(item,i) in list" :key="i">
        <img :src="item.imgUrl" alt mode="widthFix" />
        {{item.name}} X{{item.orderCount}}
        <span v-if="rType==1" @click="show=true">兑换</span>
        <div v-else>累计送出数量：{{item.count/100}}</div>
      </div>
    </div>
    <div class="nav2" v-show="nav==2">
      <div class="item" v-for="(item,i) in list" :key="i">
        <img :src="item.imgUrl" alt mode="widthFix" />
        <div>
          <span>{{item.displayName}}</span>
          送出{{item.name}}X{{item.orderCount}}
        </div>
        <div>
          {{item.time}}
          <span v-if="rType==1">兑换剩余{{item.count/100}}多币</span>
          <span v-else>提现剩余：{{item.count/100}}</span>
        </div>
        <span @click="show=true">{{rType==1?'兑换':'聘礼撤回'}}</span>
      </div>
    </div>
    <empty msg="暂无礼物信息" v-if="list.length==0" />
    <p
      style="text-align:center;margin-top:20px;color:#aaa;margin-bottom:15px;"
      v-if="list.length>0"
    >没有更过数据</p>
    <tips v-model="show"></tips>
  </div>
</template>

<script>
import tips from "@/components/tips";
import empty from "@/components/empty";
import common from "../../api/common";
export default {
  components: {
    tips,
    empty
  },
  data() {
    return {
      active: 0,
      rType: 1,
      show: false,
      nav: 1,
      type: 0,
      list: [],
      page: 1,
      pageSize: 10
    };
  },
  onReachBottom() {
    if (this.pageSize > 9) {
      this.page++;
      if (this.rType == 1) {
        this.nav == 1 ? this.giftReceive() : this.giftDowry();
      } else {
        this.nav == 1 ? this.sendGift() : this.sendDowry();
      }
    }
  },
  onUnload() {
    this.page = 1;
    this.pageSize = 10;
    this.list = [];
  },
  methods: {
    toHome() {
      wx.reLaunch({
        url: "../home/main"
      });
    },
    chooseNav(n) {
      this.nav = n;
      this.page = 1;
      this.pageSize = 10;
      this.list = [];
      if (this.rType == 1) {
        n == 1 ? this.giftReceive() : this.giftDowry();
      } else {
        n == 1 ? this.sendGift() : this.sendDowry();
      }
    },
    giftReceive() {
      common
        .giftReceive({
          userId: wx.getStorageSync("userInfo").id,
          pageNo: this.page,
          pageSize: 10
        })
        .then(res => {
          this.list = [...this.list, ...res.result];
          this.pageSize = res.result.length;
        });
    },
    sendGift() {
      common
        .sendGift({
          userId: wx.getStorageSync("userInfo").id,
          pageNo: this.page,
          pageSize: 10
        })
        .then(res => {
          this.list = [...this.list, ...res.result];
          this.pageSize = res.result.length;
        });
    },
    giftDowry() {
      common
        .giftDowry({
          userId: wx.getStorageSync("userInfo").id,
          pageNo: this.page,
          pageSize: 10
        })
        .then(res => {
          this.list = [...this.list, ...res.result];
          this.pageSize = res.result.length;
          for (let i = 0; i < this.list.length; i++) {
            if (
              res.result[i].sendDate.split("-")[0] == new Date().getFullYear()
            ) {
              this.list[i].time =
                res.result[i].sendDate.split("-")[1] +
                "月" +
                res.result[i].sendDate.split("-")[2].split(" ")[0] +
                "日" +
                " " +
                res.result[i].sendDate.split("-")[2].split(" ")[1];
            } else {
              this.list[i].time =
                res.result[i].sendDate.split("-")[0] +
                "年" +
                res.result[i].sendDate.split("-")[1] +
                "月" +
                res.result[i].sendDate.split("-")[2].split(" ")[0] +
                "日" +
                " " +
                res.result[i].sendDate.split("-")[2].split(" ")[1];
            }
          }
          console.log(this.list);
        });
    },
    sendDowry() {
      common
        .sendDowry({
          userId: wx.getStorageSync("userInfo").id,
          pageNo: this.page,
          pageSize: 10
        })
        .then(res => {
          this.list = [...this.list, ...res.result];
          this.pageSize = res.result.length;
          for (let i = 0; i < this.list.length; i++) {
            if (
              res.result[i].sendDate.split("-")[0] == new Date().getFullYear()
            ) {
              this.list[i].time =
                res.result[i].sendDate.split("-")[1] +
                "月" +
                res.result[i].sendDate.split("-")[2].split(" ")[0] +
                "日" +
                " " +
                res.result[i].sendDate.split("-")[2].split(" ")[1];
            } else {
              this.list[i].time =
                res.result[i].sendDate.split("-")[0] +
                "年" +
                res.result[i].sendDate.split("-")[1] +
                "月" +
                res.result[i].sendDate.split("-")[2].split(" ")[0] +
                "日" +
                " " +
                res.result[i].sendDate.split("-")[2].split(" ")[1];
            }
          }
        });
    },
    init() {
      this.rType = this.$mp.query.rType;
      this.nav = this.$mp.query.nav;

      if (this.rType == 1) {
        wx.setNavigationBarTitle({
          title: "收到礼物 "
        });
        this.giftReceive();
      } else {
        wx.setNavigationBarTitle({
          title: "送出礼物 "
        });
        if (this.nav == 1) {
          this.sendGift();
        } else {
          this.sendDowry();
        }
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