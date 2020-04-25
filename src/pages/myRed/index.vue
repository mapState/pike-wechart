<template>
  <div class="container">
    <div class="top">
      <div class="back" @click="toNxt">
        <img src="https://smapi.koudaitiku.net/images/words/return.png" alt mode="widthFix" />
      </div>
      <div class="nav">
        <div :class="{active:nav==1}" @click="chooseNav(1)">我发出的</div>
        <div :class="{active:nav==2}" @click="chooseNav(2)">我收到的</div>
      </div>
    </div>
    <div class="list" v-show="nav==1">
      <div class="item" v-for="(item,i) in list" :key="i" @click="toDetail(item.bonusId)">
        <div class="img">
          <img :src="item.img" alt mode="aspectFill" />
        </div>
        <div class="title">
          <span :class="{active:item.bonusStatus.itemValue!='1'}">{{item.bonusStatus.itemText}}</span>
          {{item.title}}
        </div>
        <div class="pre">
          红包金额：{{item.bonusTotal/100}}多币
          <span>{{item.createDate}}</span>
        </div>
      </div>
      <empty msg="暂无红包" v-if="list.length==0" />
    </div>
    <div class="tip" v-show="nav==2">
      <div>!</div>红包24小时失效，请尽快打开领取...
    </div>
    <div class="list2" v-show="nav==2">
      <div class="item" v-for="(item,i) in list2" :key="i" @click="show=true">
        <div class="left">
          {{item.money}}
          <span>币</span>
        </div>
        <div class="right">
          <div class="title">#{{item.description}}#漂流中获得</div>
          <div class="time">{{item.createDate}}</div>
        </div>
        <div
          class="btn"
          :class="{active:item.receiveStatus.itemValue!=1}"
        >{{item.receiveStatus.itemValue==1?'打开':item.receiveStatus.itemText}}</div>
      </div>
      <empty msg="暂无红包" v-if="list2.length==0" />
    </div>
    <p
      style="text-align:center;margin-top:20px;color:#aaa;margin-bottom:15px;"
      v-if="list.length>0"
    >没有更过数据</p>
    <tips v-model="show"></tips>
  </div>
</template>

<script>
import common from "../../api/common";
import empty from "@/components/empty";
import tips from "@/components/tips";
import user from "../../api/user";
export default {
  components: {
    empty,
    tips
  },
  data() {
    return {
      nav: 1,
      show: false,
      list: [],
      list2: [],
      page: 1,
      page2: 1,
      pageSize: 10,
      pageSize2: 10
    };
  },
  onReachBottom() {
    if (this.pageSize > 9) {
      if (this.nav == 1) {
        this.page++;
        this.sendList();
      } else {
        this.page2++;
        this.receiveList();
      }
    }
  },
  onUnload() {
    this.page = 1;
    this.page2 = 1;
    this.pageSize = 10;
    this.pageSize2 = 10;
    this.list = [];
    this.list2 = [];
  },
  methods: {
    toDetail(bonusId) {
      wx.navigateTo({
        url: "../redDetail/main?bonusId="+bonusId
      });
    },
    toNxt() {
      wx.navigateTo({
        url: "../mine/main"
      });
    },
    chooseNav(n) {
      this.nav = n;
    },

    receiveList() {
      common
        .receiveList({
          userId: wx.getStorageSync("userInfo").id,
          pageNo: this.page2,
          pageSize: 10
        })
        .then(res => {
          this.list2 = [...this.list2, ...res.result];
          this.pageSize = res.result.length;
          for (let i = 0; i < this.list2.length; i++) {
            this.list2[i].money = parseInt(this.list2[i].detailMoney / 100);
          }
        });
    },
    sendList() {
      common
        .sendList({
          userId: wx.getStorageSync("userInfo").id,
          pageNo: this.page,
          pageSize: 10
        })
        .then(res => {
          this.list = [...this.list, ...res.result];
          this.pageSize = res.result.length;
          try {
            for (let i = 0; i < this.list.length; i++) {
              this.list[i].img = this.list[i].imgUrl.split(",")[0];
            }
          } catch (error) {}
        });
    }
  },

  mounted() {
    this.sendList();
    this.receiveList();
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