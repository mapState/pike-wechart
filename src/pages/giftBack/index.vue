<template>
  <div class="container">
    <div class="nav2">
      <div class="item" v-for="(item,i) in list" :key="i">
        <img :src="item.imgUrl" alt mode="widthFix" />
        <div>
          <span>{{item.displayName}}</span>
          送出{{item.name}}X{{item.orderCount}}
          <span
            style="color:#000;float:right;padding-right:15px"
          >提现剩余：{{item.count/100}}</span>
        </div>
        <div>
          {{item.time}}
          <span>已入账</span>
        </div>
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
      this.backDowry();
    }
  },
  onUnload() {
    this.page = 1;
    this.pageSize = 10;
    this.list = [];
  },
  methods: {
    backDowry() {
      common
        .backDowry({
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
      this.backDowry();
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