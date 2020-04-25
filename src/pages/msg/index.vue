<template>
  <div class="container">
    <div class="line"></div>
    <div class="wrap">
      <div class="content">
        <div class="items">
          <div class="item" @click="toNext('words')">
            <div
              class="dot"
              v-show="detail.message_type_1>0"
            >{{detail.message_type_1<99?detail.message_type_1:'99+'}}</div>
            <img src="../../../static/images/news.png" alt mode="widthFix" />
            <p>评论通知</p>
          </div>
          <div class="item" @click="toNext('letter')">
            <div
              class="dot"
              v-show="detail.message_type_2>0"
            >{{detail.message_type_2<99?detail.message_type_2:'99+'}}</div>
            <img src="../../../static/images/news-one.png" alt mode="widthFix" />
            <p>私信通知</p>
          </div>
          <div class="item" @click="toNext('giftNotice')">
            <div
              class="dot"
              v-show="detail.message_type_3>0"
            >{{detail.message_type_3<99?detail.message_type_3:'99+'}}</div>
            <img src="../../../static/images/gift6.png" alt mode="widthFix" />
            <p>礼物通知</p>
          </div>
          <div class="item" @click="toNext('coopNotice')">
            <div
              class="dot"
              v-show="detail.message_type_4>0"
            >{{detail.message_type_4<99?detail.message_type_4:'99+'}}</div>
            <img src="../../../static/images/congratelation.png" alt mode="widthFix" />
            <p>合作通知</p>
          </div>
        </div>
        <div class="set" @click="toNext('redNotice')">
          <div
            class="dot"
            v-show="detail.message_type_5>0"
          >{{detail.message_type_5<99?detail.message_type_5:'99+'}}</div>
          <img src="../../../static/images/red6.png" alt mode="widthFix" />
          <p>红包通知</p>
        </div>
        <div class="set" @click="toNext('zanNotice')">
          <div
            class="dot"
            v-show="detail.message_type_6>0"
          >{{detail.message_type_6<99?detail.message_type_6:'99+'}}</div>
          <img src="../../../static/images/hand.png" alt mode="widthFix" />
          <p style="padding-top:2px">点赞通知</p>
        </div>
      </div>
    </div>
    <div class="line2"></div>
    <div class="list">
      <div class="item" v-for="(item,i) in list" :key="i" @click="messageRead(item.messageId)">
        <img src="../../../static/images/nwes-two.png" alt mode="widthFix" />
        <div class="title" style="padding-right:60px">{{item.messageContent}}</div>
        <div class="tip">
          <span>系统通知</span>
          <div class="right">
            <span v-show="item.messageStatus.itemValue==0"></span>
            {{item.time}}
          </div>
        </div>
      </div>
    </div>
    <p
      style="text-align:center;margin-top:20px;color:#aaa;margin-bottom:15px;"
      v-if="list.length>0"
    >没有更过数据</p>
    <div class="kong" style="height:80px"></div>
    <tab :active="active"></tab>
  </div>
</template>

<script>
import common from "../../api/common";
import tab from "@/components/tab";
import label from "@/components/label";
export default {
  components: {
    tab,
    label
  },
  data() {
    return {
      active: 2,
      nav: 1,
      littleVav: 0,
      type: 0,
      detail: {},
      list: [],
      page: 1,
      pageSize: 10
    };
  },
  onReachBottom() {
    if (this.pageSize > 9) {
      this.page++;
      this.messageRead();
    }
  },
  onUnload() {
    this.page = 1;
    this.pageSize = 10;
    this.list = [];
  },
  methods: {
    toNext(msg, t, a) {
      wx.navigateTo({
        url: `../${msg}/main?rType=${t}&nav=${a}`
      });
    },
    getList() {
      common.unRead({ userId: wx.getStorageSync("userInfo").id }).then(res => {
        this.detail = res.result;
      });
    },
    messageRead(messageId) {
      common
        .messageRead({
          messageId
        })
        .then(res => {
          this.messageList();
        });
    },
    messageList() {
      common
        .messageList({
          userId: wx.getStorageSync("userInfo").id,
          messageType: 0,
          pageNo: this.page,
          pageSize: this.pageSize
        })
        .then(res => {
          this.list = [...this.list, ...res.result];
          this.pageSize = res.result.length;
          for (let i = 0; i < res.result.length; i++) {
            if (
              res.result[i].createDate.split("-")[0] == new Date().getFullYear()
            ) {
              this.list[i].time =
                res.result[i].createDate.split("-")[1] +
                "月" +
                res.result[i].createDate.split("-")[2].split(" ")[0] +
                "日" +
                " " +
                res.result[i].createDate.split("-")[2].split(" ")[1];
            } else {
              this.list[i].time =
                res.result[i].createDate.split("-")[0] +
                "年" +
                res.result[i].createDate.split("-")[1] +
                "月" +
                res.result[i].createDate.split("-")[2].split(" ")[0] +
                "日" +
                " " +
                res.result[i].createDate.split("-")[2].split(" ")[1];
            }
          }
        });
    },
    chooseNav(n) {
      this.nav = n;
    }
  },
  onShow() {
    this.getList();
  },
  mounted() {
    this.getList();
    if (this.list.length == 0) {
      this.messageList();
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