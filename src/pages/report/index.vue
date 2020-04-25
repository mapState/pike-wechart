<template>
  <div class="container">
    <div class="time" @click.stop="dateShow=true">
      <div>
        {{dataMsg}}
        <img src="../../../static/images/xiala.png" alt mode="widthFix" />
      </div>
      <div>支出{{detail.out/100}}多币</div>
      <div>收入{{detail.in/100}}多币</div>
    </div>
    <div class="list">
      <div class="item" v-for="(item,i) in list" :key="i">
        <img src="../../../static/images/money.png" alt mode="widthFix" />
        <div>{{item.orderType.itemText}}{{item.keyword?'-'+item.keyword:''}}</div>
        <div>{{item.createDate}}</div>
        <span>{{item.orderTotal/100}}多币</span>
      </div>
    </div>
    <empty msg="暂无账单信息" v-if="list.length==0" />
    <p
      style="text-align:center;margin-top:20px;color:#aaa;margin-bottom:15px;"
      v-if="list.length>0"
    >没有更过数据</p>
    <van-popup :show="dateShow" :close-on-click-overlay="true" position="bottom">
      <div class="setAge">
        <van-datetime-picker
          type="year-month"
          :value="date"
          :min-date="minDate"
          @confirm="getData"
          @cancel="dateShow=false"
          @formatter="formatter"
        />
      </div>
    </van-popup>
  </div>
</template>
<script>
import success from "@/components/success";
import { formatDate, jsGetAge } from "../../utils/utils";
import empty from "@/components/empty";
import common from "../../api/common";
export default {
  components: {
    empty,
    success,
    common
  },
  data() {
    return {
      show: false,
      succesSshow: false,
      dateShow: false,
      date: new Date().getTime(),
      minDate: new Date(1971, 1, 1).getTime(),
      dataChange: formatDate(new Date().getTime()),
      dataMsg: "",
      cooperatePrice: "",
      list: [],
      detail: {},
      page: 1,
      pageSize: 10
    };
  },
  onReachBottom() {
    if (this.pageSize > 9) {
      this.page++;
      this.kbList(this.dataChange);
    }
  },
  methods: {
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      }
    },
    kbList(date) {
      common
        .kbList({
          date,
          userId: wx.getStorageSync("userInfo").id,
          pageNo: this.page,
          pageSize: this.pageSize
        })
        .then(res => {
          // this.messageList();
          this.list = [...this.list, ...res.result.list];
          this.pageSize = res.result.list.length;
          this.detail = res.result;
        });
    },
    getData(data) {
      this.dataMsg =
        formatDate(data.mp.detail).split("-")[0] +
        "年" +
        formatDate(data.mp.detail).split("-")[1] +
        "月";
      this.dataChange = formatDate(data.mp.detail);
      this.page = 1;
      this.pageSize = 10;
      this.list = [];
      this.kbList(this.dataChange);
      this.dateShow = false;
    }
  },
  mounted() {
    this.dataMsg =
      formatDate(this.date).split("-")[0] +
      "年" +
      formatDate(this.date).split("-")[1] +
      "月";
    if (this.list.length == 0) {
      this.kbList(formatDate(this.date));
    }
  }
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
