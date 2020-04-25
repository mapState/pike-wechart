<template>
  <div class="container">
    <div class="list">
      <div class="item" v-for="(item,i) in list" :key="i" @click="messageRead(item.messageId)">
        <div class="img">
          <img :src="item.img" alt mode="aspectFill" />
        </div>
        <div class="title">
          <!-- <span :class="{active:item.bonusStatus.itemValue!='1'}">{{item.bonusStatus.itemText}}</span> -->
          {{item.messageContent}}
        </div>
        <div class="pre">
          {{item.content}}
          <span>
            {{item.createDate}}
            <span v-if="item.messageStatus.itemValue==0"></span>
          </span>
        </div>
      </div>
      <empty msg="暂无红包" v-if="list.length==0" />
      <p
        style="text-align:center;margin-top:20px;color:#aaa;margin-bottom:15px;"
        v-if="list.length>0"
      >没有更过数据</p>
    </div>
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
      page: 1,
      pageSize: 10,
      list2: []
    };
  },
  onUnload() {
    this.page = 1;
    this.pageSize = 10;
    this.list = [];
  },
  onReachBottom() {
    if (this.pageSize > 9) {
      this.page++;
      this.messageList();
    }
  },
  methods: {
    toHome() {
      wx.reLaunch({
        url: "../mine/main"
      });
    },

    messageRead(messageId, value) {
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
          messageType: 5,
          pageNo: this.page,
          pageSize: this.pageSize
        })
        .then(res => {
          this.list = [...this.list, ...res.result];
          this.pageSize = res.result.length;

          try {
            for (let i = 0; i < this.list.length; i++) {
              this.list[i].img = this.list[i].giftImgUrl.split(",")[0];
            }
          } catch (error) {}
          for (let i = 0; i < res.result.length; i++) {
            console.log(res.result[i].createDate.split("-")[0]);
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
          console.log(new Date().getFullYear());
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