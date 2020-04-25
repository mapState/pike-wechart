<template>
  <div class="container">
    <div class="imgs">
      <swiper duration="100" indicator-dots>
        <!-- 1 -->
        <swiper-item v-for="(item,i) in detail.imgs" :key="i">
          <img :src="item" alt mode="aspectFill" />
        </swiper-item>
      </swiper>
    </div>
    <div class="info">
      <div class="send">
        <div class="img">
          <img :src="detail.userimgUrl" alt mode="aspectFill" />
        </div>
        <div class="top">发起人</div>
        <div class="name">
          <span>{{detail.displayName}}</span>
          <span :style="detail.titleType.bg" class="label">{{detail.titleType.itemText}}</span>
        </div>
        <div class="right">#{{detail.title}}#</div>
      </div>
      <div class="title">{{detail.description}}</div>
      <div class="redInfo">
        <div class="name">
          <span>{{detail.bonusType.itemValue=='0'?'拼手气':'普通红包'}}</span>
          {{detail.bonusTotal/100}}多币，{{detail.bonusCount}}人瓜分
        </div>
        <div class="time">漂流结束时间：{{detail.endDate}}</div>
        <div class="right">{{detail.bonusStatus.itemText}}</div>
      </div>

      <scroll-view scroll-x class="ver">
        <div class="person">
          <div class="item" v-for="(item,i) in list" :key="i">
            <div class="img">
              <img :src="item.imgUrl" alt mode="aspectFill" />
            </div>
            <div class="name">{{item.displayName}}</div>
            <div class="money">{{item.winCount/100}}币</div>
          </div>
        </div>
      </scroll-view>
    </div>
    <div class="wall">
      <div class="top">
        心愿墙
        <span @click="write">
          <img src="../../../static/images/pen.png" alt mode="widthFix" />写心愿
        </span>
      </div>
      <div class="words">
        <div class="item" v-for="(item,i) in words" :key="i">
          <div class="user">
            <div class="img">
              <img :src="item.imgUrl" alt mode="aspectFill" />
            </div>

            <div class="name">
              <span>{{item.displayName}}</span>
              <span :style="item.titleType.bg" class="label">{{item.titleType.itemText}}</span>
            </div>
            <div class="time">{{item.createDate}}</div>
            <div class="right">
              <span :class="{active:item.likeCount}">{{item.likeCount}}</span>
              <img
                src="../../../static/images/zan2.png"
                alt
                mode="widthFix"
                v-if="item.likeId"
                @click="cancelLike(item.likeId,i)"
              />
              <img src="../../../static/images/zan3.png" alt mode="widthFix" v-else @click="likeCount(item.boardId,i)"/>
            </div>
          </div>
          <div class="content">{{item.messageContent}}</div>
        </div>
      </div>
    </div>
    <p
      style="text-align:center;margin-top:20px;color:#aaa;margin-bottom:15px;"
      v-if="words.length>0"
    >没有更过数据</p>
    <empty msg="暂无评论" v-if="words.length==0" />
    <div class="speak" v-show="show" @click="show=false">
      <div class="input">
        <input
          type="text"
          @click.stop="show=true"
          @change="onChange"
          v-model="messageContent"
          @confirm="addwish"
        />
        <div class="btn" @click="send">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
import common from "../../api/common";
import user from "../../api/user";
import { getColor } from "../../utils/utils";
import empty from "@/components/empty";
export default {
  components: {
    empty
  },
  data() {
    return {
      show: false,
      list: [],
      words: [],
      messageContent: "",
      detail: { titleType: {}, imgs: [], bonusType: {}, bonusStatus: {} },
      page: 1,
      pageSize: 10
    };
  },
  onUnload() {
    this.page = 1;
    this.pageSize = 10;
    this.words = [];
  },
  onReachBottom() {
    if (this.pageSize > 9) {
      this.page++;
      this.messageList();
    }
  },
  methods: {
    likeCount(boardId,i) {
      common
        .likeCount({
          boardId,
          userId: wx.getStorageSync("userInfo").id
        })
        .then(res => {
          // this.messageboard();
          this.words[i].likeId=res.result
          this.words[i].likeCount++
          console.log(this.words)
        });
    },
    cancelLike(id,i) {
      common
        .cancelLike({
          id
        })
        .then(res => {
          this.words[i].likeId=''
          this.words[i].likeCount--
          // this.messageboard();
        });
    },
    write() {
      this.show = true;
      this.messageContent = "";
    },
    bonusDetail() {
      common.bonusDetail({ bonusId: this.$mp.query.bonusId }).then(res => {
        try {
          this.detail = res.result;
          this.detail.titleType.bg = getColor(
            parseInt(this.detail.titleType.itemValue)
          );
          this.detail.imgs = this.detail.imgUrl.split(",");
        } catch (error) {}
      });
    },
    onChange(e) {
      this.messageContent = e.mp.detail.value;
    },
    send() {
      this.addwish();
    },
    addwish() {
      common
        .addwish({
          bonusId: this.$mp.query.bonusId,
          messageUserId: wx.getStorageSync("userInfo").id,
          messageContent: this.messageContent,
          userId: this.detail.userId
        })
        .then(res => {
          this.messageboard();
          this.show = false;
        });
    },
    messageboard() {
      common
        .messageboard({
          bonusId: this.$mp.query.bonusId,
          userId: wx.getStorageSync("userInfo").id,
          pageNo: this.page,
          pageSize: this.pageSize
        })
        .then(res => {
          this.words = [...this.words, ...res.result];
          this.pageSize = res.result.length;
          for (let i = 0; i < this.words.length; i++) {
            this.words[i].titleType.bg = getColor(
              parseInt(this.words[i].titleType.itemValue)
            );
          }
        });
    },
    detailPrize() {
      common.detailPrize({ bonusId: this.$mp.query.bonusId }).then(res => {
        try {
          this.list = res.result;
        } catch (error) {}
      });
    }
  },

  mounted() {
    this.bonusDetail();
    this.detailPrize();
    this.messageboard();
  }
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
<style scoped>
swiper {
  width: 100%;
  height: 100%;
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