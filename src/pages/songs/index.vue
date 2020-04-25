<template>
  <div class="container">
    <div class="line"></div>
    <div class="person">
      <div class="user">
        <img src="../../../static/images/user.png" alt mode="widthFix" />
      </div>
      <div class="name">
        <span>周周</span>
        <br />
        <label :type="type"></label>
      </div>
      <div class="focus">关注</div>
    </div>
    <div class="info">
      <div class="title">
        <div class="left">
          <img src="http://cdn.pike8.top/Fh9UYTtwoAaLPx1FN8l-CMaReUeG" alt />
        </div>
        <div class="right">
          <div class="name">
            <span>钢琴</span>钢琴《卡农》独奏XXXXXXXXXXX....
          </div>
          <div class="instro">
            <span>PK时长:1天</span>
            <span>擂台时长:1天</span>
            <span>PK奖金:5000币</span>
          </div>
        </div>
      </div>
      <div class="detail" v-show="all===0">
        挑战详情：传播健康视频XXXXXXXXXXXXXXXXXXX....
        <span @click="all=1">全部</span>
      </div>
      <div class="detail2" v-show="all===1">
        挑战详情：传播健康视频传播健康视频传播健康视频传播健康视频传播健康视频传播健康视频传播健康视频传播健康视频传播健康视频传播健康视频传播健康视频传播健康视频传播健康视频传播健康视频
        <!-- <span>shosho</span> -->
      </div>
    </div>
    <div class="littleNav">
      <van-tabs :active="littleVav" :color="'#FC5428'" @click="navType">
        <van-tab title="全部"></van-tab>
        <van-tab title="PK预告"></van-tab>
        <van-tab title="PK进行"></van-tab>
        <van-tab title="已结束"></van-tab>
      </van-tabs>
    </div>

    <div class="list">
      <!-- <div class="item">
        <div class="img">
          <img src="http://cdn.pike8.top/Fi7i5nIH3JKmz-_nxif7SeV58Zx_" alt mode="aspectFill" />
          <img src="http://cdn.pike8.top/Fi7i5nIH3JKmz-_nxif7SeV58Zx_" alt mode="aspectFill" />
          <div class="up">
            <div class="status">擂台时长:9天</div>
            <div class="num">262人已挑战</div>
          </div>
        </div>
        <div class="label">
          <span>跳舞</span>舞技超群，快来观看..快来观看...快来观看
        </div>
      </div>
      <div class="item">
        <div class="img">
          <img src="http://cdn.pike8.top/Fi7i5nIH3JKmz-_nxif7SeV58Zx_" alt mode="aspectFill" />
          <img src="http://cdn.pike8.top/Fi7i5nIH3JKmz-_nxif7SeV58Zx_" alt mode="aspectFill" />
          <div class="up">
            <div class="status">擂台时长:9天</div>
            <div class="num">262人已挑战</div>
          </div>
        </div>
        <div class="label">
          <span>跳舞</span>舞技超群，快来观看..快来观看...快来观看
        </div>
      </div>
      <div class="item">
        <div class="img">
          <img src="http://cdn.pike8.top/Fi7i5nIH3JKmz-_nxif7SeV58Zx_" alt mode="aspectFill" />
          <img src="http://cdn.pike8.top/Fi7i5nIH3JKmz-_nxif7SeV58Zx_" alt mode="aspectFill" />
          <div class="up">
            <div class="status">擂台时长:9天</div>
            <div class="num">262人已挑战</div>
          </div>
        </div>
        <div class="label">
          <span>跳舞</span>舞技超群，快来观看..快来观看...快来观看
        </div>
      </div>
      <div class="item">
        <div class="img">
          <img src="http://cdn.pike8.top/Fi7i5nIH3JKmz-_nxif7SeV58Zx_" alt mode="aspectFill" />
          <img src="http://cdn.pike8.top/Fi7i5nIH3JKmz-_nxif7SeV58Zx_" alt mode="aspectFill" />
          <div class="up">
            <div class="status">擂台时长:9天</div>
            <div class="num">262人已挑战</div>
          </div>
        </div>
        <div class="label">
          <span>跳舞</span>舞技超群，快来观看..快来观看...快来观看
        </div>
      </div>-->
      <div class="empty">
        <img src="../../../static/images/empty.png" alt mode="widthFix" />
        <div class="tips">暂无挑战视频，快去挑战吧~</div>
        <div class="start">发起合唱</div>
      </div>
    </div>
  </div>
</template>

<script>
import label from "@/components/label";
import tips from "@/components/tips";
export default {
  components: {
    tips,
    label
  },
  data() {
    return {
      nav: 1,
      littleVav: 0,
      type: 0,
      active: 1,
      show: false,
      giftShow: false,
      giftType: 1,
      all: 0
    };
  },
  methods: {
    toRank() {
      wx.reLaunch({
        url: "../rank/main"
      });
    },
    chooseNav(n) {
      this.nav = n;
      this.show = true;
    },
    chooseNum(n) {
      console.log(n);
    },
    chooseType(n) {
      this.giftType = n;
    },
    navType(e,c){
      console.log(c)
    },
    choose(i) {
      this.active = i;
      if (i == 0 || i == 3) {
        this.show = true;
      }
      if (i == 2) {
        this.giftShow = true;
      }
    }
  },

  mounted() {}
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
<style scoped>
swiper {
  height: 280px;
}
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