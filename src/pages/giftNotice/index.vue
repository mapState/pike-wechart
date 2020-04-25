<template>
  <div class="container" @click="setFalse">
    <div class="line"></div>
    <div class="list">
      <div
        class="item"
        @click="toNext(item.tableId,item.giftMessageType.itemValue,item.messageId)"
        v-for="(item,i) in list"
        :key="i"
      >
        <div>{{item.messageContent}}</div>
        <div>
          <span>{{item.giftMessageType.itemText}}</span>
          {{item.time}}
          <div class="dot" v-if="item.messageStatus.itemValue==0"></div>
        </div>
        <img :src="item.giftImgUrl" alt mode="widthFix" />
      </div>
    </div>
    <empty msg="暂无礼物内容" v-if="list.length==0" />
    <p
      style="text-align:center;margin-top:20px;color:#aaa;margin-bottom:15px;"
      v-if="list.length>0"
    >没有更过数据</p>
  </div>
</template>

<script>
import empty from "@/components/empty";
import common from "../../api/common";
export default {
  components: {
    empty
  },
  data() {
    return {
      list: [],
      page: 1,
      pageSize: 10
    };
  },
  onReachBottom() {
    if (this.pageSize > 9) {
      this.page++;
      this.messageList();
    }
  },
  onUnload() {
    this.page = 1;
    this.pageSize = 10;
    this.list = [];
  },
  methods: {
    toNext(tableId, value, messageId) {
      if (value == 11) {
        wx.navigateTo({
          url: `../withdraw/main?tableId=` + tableId
        });
      }
      this.messageRead(messageId);
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
          messageType: 3,
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
    }
  },

  mounted() {
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
>>> .van-popup {
  background: transparent;
}

>>> .van-hairline--top-bottom:after {
  border-top: 2px solid #fc5428;
  border-bottom: 2px solid #fc5428;
}
</style>