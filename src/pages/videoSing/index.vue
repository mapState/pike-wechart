<template>
  <div class="container" @click="giftShow=false">
    <video :src="detail.videoUrl"></video>
    <div class="info">
      <div class="img" @click.stop="toUser(detail.userId)">
        <img :src="detail.imgUrl" alt mode="aspectFill" />
      </div>
      <div class="name">{{detail.displayName}}</div>
      <span class="spanLabel" :style="detail.titleType.bg">{{detail.titleType.itemText}}</span>
      <img src="../../../static/images/music.png" alt mode="widthFix" class="music" />
      <div class="songName">
        <div class="name">{{detail.songLibrary.songName}}</div>
        <div class="ren">原唱 {{detail.songLibrary.singer}}</div>
      </div>
      <div class="instro">{{detail.title}}</div>
      <div class="right" @click="tipShow=true">我要合唱</div>
    </div>
    <div class="list" @click="back">
      <!-- <div class="img">
        <img src="../../../static/images/user.png" alt mode="aspectFill" />
      </div>
      <div class="img">
        <img src="../../../static/images/user.png" alt mode="aspectFill" />
      </div>
      <div class="img">
        <img src="../../../static/images/user.png" alt mode="aspectFill" />
      </div>-->
      {{detail.matchTotalCount}}人合唱过
      <span>
        合唱列表
        <img src="../../../static/images/you2.png" alt mode="widthFix" />
      </span>
    </div>
    <div class="talk">
      <div class="words">
        <div class="num">评论({{total}})</div>
        <div
          class="item"
          v-for="(item,i) in records"
          :key="i"
          @click.stop="speak(item.id,item.aUserId,item.aDisplayName)"
        >
          <div class="img" @click.stop="toUser(item.aUserId)">
            <img :src="item.aImgUrl" alt mode="aspectFill" />
          </div>
          <div class="name">
            {{item.aDisplayName}}
            <div class="zan">
              <img
                src="../../../static/images/zan5.png"
                alt
                mode="widthFix"
                v-if="item.isLike"
                @click.stop="likeCancelItComment(item.id,i)"
              />
              <img
                src="../../../static/images/zan3.png"
                alt
                mode="widthFix"
                v-else
                @click.stop="likeDoItComment(item.id,i)"
              />
              <div :class="{active:item.isLike}">{{item.likeCount}}</div>
            </div>
          </div>
          <div class="content">{{item.comment}}</div>
          <div class="time">{{item.createDate}}</div>
          <div
            class="child"
            v-for="(c,j) in item.commentList"
            :key="j"
            @click.stop="speak(c.id,c.aUserId,c.aDisplayName)"
          >
            <div class="img2" @click.stop="toUser(c.aUserId)">
              <img :src="c.aImgUrl" alt mode="aspectFill" />
            </div>
            <div class="name">
              {{c.aDisplayName}} <span class="zuozhe" v-if="detail.userId==c.aUserId">作者</span>
              <div class="zan">
                <img
                  src="../../../static/images/zan2.png"
                  alt
                  mode="widthFix"
                  v-if="c.isLike"
                  @click.stop="likeCancelItComment(c.id,i,j)"
                />
                <img
                  src="../../../static/images/zan3.png"
                  alt
                  mode="widthFix"
                  v-else
                  @click.stop="likeDoItComment(c.id,i,j)"
                />
                <div :class="{active:c.isLike}">{{c.likeCount}}</div>
              </div>
            </div>
            <div class="name">
              <span style="color:#000;margin-right:3px">回复</span>
              {{c.bDisplayName}}
            </div>
            <div class="content">{{c.comment}}</div>
            <div class="time">{{c.createDate}}</div>
          </div>
        </div>
        <p
          style="text-align:center;margin-top:20px;color:#aaa;margin-bottom:15px;"
          v-if="records.length>0"
        >没有更过数据</p>
        <empty v-if="records.length==0" msg="暂无评论，来抢沙发" />
        <!-- <scroll-view scroll-y class="ver" @scrolltolower="nextPage"></scroll-view> -->
      </div>
      <div class="input">
        <div class="left" @click.stop="speak('','','')">
          <img src="../../../static/images/msg2.png" mode="widthFix" />
          我有话说~
        </div>
        <button open-type="share">
          <img src="../../../static/images/share2.png" mode="widthFix" class="img1" />
        </button>
        
        <img
          src="../../../static/images/zan2.png"
          mode="widthFix"
          class="img1"
          @click.stop="cancleLike"
          v-if="detail.isLike"
        />
        <img
          src="../../../static/images/zan4.png"
          mode="widthFix"
          class="img1"
          @click.stop="like"
          v-else
        />
        <img
          src="../../../static/images/gift7.png"
          mode="widthFix"
          class="img1"
          @click.stop="giftShow=true"
        />
      </div>
    </div>
    <div v-show="giftShow" @click.stop="giftShow=true">
      <gift :receiveId="receiveId" :videoId="$mp.query.videoId"/>
    </div>

    <div class="speak" v-show="show" @click="show=false">
      <div class="input">
        <input
          type="text"
          @click.stop="show=true"
          @change="onChange"
          v-model="comment"
          @confirm="lifeAdd"
          :placeholder="placeholder"
        />
        <div class="btn" @click="lifeAdd">发送</div>
      </div>
    </div>
    <van-popup :show="shareShow" :close-on-click-overlay="true">
      <div class="share">
        <div class="title">分享视频 瓜分奖金</div>
        <div class="tips">分享PK视频邀请好友挑战可共同瓜分20%的奖学金作为奖励，快去试试吧~~</div>
        <div class="btns">
          <div @click="shareShow=false">取消</div>
          <button @click="share" class="shareBtn" open-type="share">去分享</button>
        </div>
      </div>
    </van-popup>
    <tips v-model="tipShow"></tips>
  </div>
</template>
 
<script>
import common from "../../api/common";
import user from "../../api/user";
import { getColor } from "../../utils/utils";
import empty from "@/components/empty";
import tips from "@/components/tips";
import gift from "@/components/gift";
export default {
  components: {
    tips,
    empty,
    gift
  },
  onShareAppMessage: function(res) {
    let users = wx.getStorageSync("user");
    if (res.from === "button") {
    }
    this.shareShow = false;
    return {
      title: "转发",
      path: `pages/videoSing/main?videoId=${this.$mp.query.videoId}`,
      success: function(res) {}
    };
  },
  data() {
    return {
      nav: 1,
      giftShow: false,
      shareShow: false,
      tipShow: false,
      guideShow: false,
      show: false,
      talkShow: false,
      type: 1,
      current: 0,
      video: [],
      receiveId: "",
      hide: false,
      dir: [0],
      page: 1,
      pageSize: 3,
      comment: "",
      replyId: "",
      parentId: "",
      placeholder: "",
      records: [],
      videoId: "",
      total: 0,
      detail: {titleType:{},songLibrary:{}}
    };
  },
  onUnload() {
    this.current = 0;
    this.page = 1;
    this.pageSize = 10;
    this.records=[]
    this.detail= {titleType:{},songLibrary:{}}
  },
  methods: {
    onChange(e) {
      this.comment = e.mp.detail.value;
    },
    nextPage() {
      if (this.pageSize2 > 9) {
        this.page2++;
        this.getPkList(this.tagActive);
      }
    },
    toUser(userId) {
      wx.navigateTo({
        url: "../user/main?userId=" + userId
      });
    },
    back() {
      wx.navigateBack({ delta: 1 });
    },
    speak(parentId, replyId, placeholder) {
      this.show = true;
      this.replyId = replyId;
      this.parentId = parentId;

      if (placeholder) {
        this.placeholder = "回复@" + placeholder;
      } else {
        this.placeholder = "在这里输入您想说的话";
      }
      this.comment = "";
    },
    getDetail() {
      common
        .getDetail({
          visitId: wx.getStorageSync("userInfo").id,
          videoId: this.$mp.query.videoId
        })
        .then(res => {
          this.detail = res.result;
          this.detail.titleType.bg = getColor(
            parseInt(this.detail.titleType.itemValue)
          );
        });
    },
    lifeFind() {
      common
        .lifeFind({
          pageNo: this.page,
          pageSize: 10,
          visitId: wx.getStorageSync("userInfo").id,
          videoId: this.$mp.query.videoId
        })
        .then(res => {
          this.records = [...this.records, ...res.result.records];
          this.pageSize2 = res.result.records.length;
          this.total = res.result.total;
        });
    },
    lifeAdd() {
      common
        .lifeAdd({
          comment: this.comment,
          replyId: this.replyId,
          userId: wx.getStorageSync("userInfo").id,
          parentId: this.parentId,
          videoId: this.$mp.query.videoId
        })
        .then(res => {
          this.page2 = 1;
          this.pageSize2 = 10;
          this.show = false;
          this.records = [];
          this.lifeFind();
        });
    },
    likeDoItComment(commentId, i, j) {
      user
        .likeDoIt({
          userId: wx.getStorageSync("userInfo").id,
          videoId: this.$mp.query.videoId,
          commentId
        })
        .then(res => {
          if (j || j === 0) {
            this.records[i].commentList[j].isLike = 1;
            this.records[i].commentList[j].likeCount++;
          } else {
            this.records[i].isLike = 1;
            this.records[i].likeCount++;
          }
        });
    },
    like() {
      user
        .likeDoIt({
          userId: wx.getStorageSync("userInfo").id,
          videoId: this.$mp.query.videoId
        })
        .then(res => {
          this.getDetail();
        });
    },
    cancleLike() {
      user
        .likeCancelIt({
          userId: wx.getStorageSync("userInfo").id,
          videoId: this.$mp.query.videoId
        })
        .then(res => {
          this.getDetail();
        });
    },
    likeCancelItComment(commentId, i, j) {
      user
        .likeCancelIt({
          userId: wx.getStorageSync("userInfo").id,
          videoId: this.$mp.query.videoId,
          commentId
        })
        .then(res => {
          if (j || j === 0) {
            this.records[i].commentList[j].isLike = 0;
            this.records[i].commentList[j].likeCount--;
          } else {
            this.records[i].isLike = 0;
            this.records[i].likeCount--;
          }
        });
    }
  },

  mounted() {
    this.lifeFind();
    this.getDetail();
  }
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
<style scoped>
swiper {
  /* position: fixed; */
  width: 100%;
  height: 100%;
}
/* .chatContent swiper{
  height: 200px;
} */
swiper-item {
  position: relative;
}
>>> .van-popup--center {
  top: 40%;
}
>>> .van-popup {
  background: transparent;
}
</style>