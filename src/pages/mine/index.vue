<template>
  <div class="container">
    <div class="top">
      <div class="info">
        <div class="img">
          <img :src="detail.imgUrl" alt mode="widthFix" />
          <div class="up" v-if="detail.imgStatus.itemValue!=1">审核中</div>
        </div>
        <div class="name">
          <span>{{detail.displayName}}</span>
          <span
            :style="detail.titleType.bg"
            class="spanLabel"
          >{{detail.titleType.itemText}}</span>
          <br />
          <span>{{detail.idStatus.itemText}}</span>
        </div>
      </div>
      <div class="set" @click="toNext('set')"><img src="../../../static/images/one.png" alt mode="widthFix" /></div>
      <div class="data">
        <div @click="toNext('money')">
          {{detail.kmCount/100}}
          <p>多币</p>
        </div>
        <div @click="toNext('fans',' ',2)">
          {{detail.fansCount}}
          <p>粉丝</p>
        </div>
        <div @click="toNext('fans',' ',1)">
          {{detail.watchCount}}
          <p>关注</p>
        </div>
        <div>
          {{detail.hotCount}}
          <p>人气</p>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="card" @click="toNext('infoStep3')">
        <img src="../../../static/images/card.png" alt mode="widthFix" />
      </div>
      <div class="content">
        <div class="title">我的礼物</div>
        <div class="items">
          <div class="item" @click="toNext('gift',1,1)">
            <img src="../../../static/images/gift4.png" alt mode="widthFix" />
            <p>收到礼物</p>
          </div>
          <div class="item" @click="toNext('gift',2,1)">
            <img src="../../../static/images/send.png" alt mode="widthFix" />
            <p>送出礼物</p>
          </div>
          <div class="item" @click="toNext('giftBack',2,2)">
            <img src="../../../static/images/delent.png" alt mode="widthFix" />
            <p>撤回聘礼</p>
          </div>
          <div class="item" @click="toNext('rankAll',1,'')">
            <img src="../../../static/images/gift-one.png" alt mode="widthFix" />
            <p>礼物榜单</p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="title">我的视频</div>
        <div class="items">
          <div class="item" @click="toNext('myVideo','','1')">
            <img src="../../../static/images/award.png" alt mode="widthFix" />
            <p>PK视频</p>
          </div>
          <div class="item" @click="toNext('myVideo','','2')">
            <img src="../../../static/images/sign.png" alt mode="widthFix" />
            <p>才艺视频</p>
          </div>
          <div class="item" @click="toNext('myVideo','','3')">
            <img src="../../../static/images/coffee.png" alt mode="widthFix" />
            <p>生活视频</p>
          </div>
          <div class="item" @click="toNext('myVideo','','4')">
            <img src="../../../static/images/video.png" alt mode="widthFix" />
            <p>合唱视频</p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="title">常用功能</div>
        <div class="items">
          <div class="item" @click="toNext('myRed')">
            <img
              src="../../../static/images/red.png"
              alt
              mode="widthFix"
              style="margin-bottom:10rpx"
            />
            <p>我的红包</p>
          </div>
          <div class="item" @click="toNext('red')">
            <img src="../../../static/images/sed.png" alt mode="widthFix" />
            <p>红包漂流</p>
          </div>
          <div class="item" @click="toNext('invite')">
            <img src="../../../static/images/friend.png" alt mode="widthFix" />
            <p>邀请好友</p>
          </div>
          <div class="item">
            <img src="../../../static/images/congratulation.png" alt mode="widthFix" />
            <p>我的合作</p>
          </div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <tab :active="active"></tab>
  </div>
</template>

<script>
import tab from "@/components/tab";
import label from "@/components/label";
import user from "../../api/user";
import { getColor } from "../../utils/utils";
export default {
  components: {
    tab,
    label
  },
  data() {
    return {
      active: 3,
      nav: 1,
      littleVav: 0,
      type: 0,
      detail:{
        titleType:{},
        idStatus:{},
        imgStatus:{}
      }
    };
  },
  methods: {
    toNext(msg, t, a) {
      wx.navigateTo({
        url: `../${msg}/main?rType=${t}&nav=${a}&where=1`
      });
    },
    chooseNav(n) {
      this.nav = n;
    },
    init() {
      user
        .cacheUser({ userId: wx.getStorageSync("userInfo").id })
        .then(res => {
          this.detail=res.result
          try {
              this.detail.titleType.bg = getColor(
                parseInt(this.detail.titleType.itemValue)
              );
            } catch (error) {}
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