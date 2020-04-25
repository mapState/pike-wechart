<template>
  <div class="container" @click="giftShow=false">
    <swiper vertical @change="getCurrent" :current="current">
      <swiper-item v-for="(item,i) in video" :key="i">
        <video
          :id="'myVideo'+i"
          :src="item.videoUrl"
          :show-play-btn="false"
          :controls="false"
          :loop="true"
          autoplay
          :show-progress="false"
          :vslide-gesture-in-fullscreen="false"
          :show-fullscreen-btn="false"
          :x5-video-player-fullscreen="false"
          :show-center-play-btn="false"
          :enable-progress-gesture="false"
          v-if="current==i"
        ></video>
        <img :src="item.videoImg" alt mode="aspectFill" v-else style="width:100%;height:100%" />
        <div class="info" id="inner">
          <div class="show" v-show="!hide">
            <div class="name">
              <div class="img" @click="toUser(item.userId)">
                <img :src="item.imgUrl" alt mode="widthFix" />
              </div>
              <span>{{item.displayName}}</span>
              <br />
              <span :style="item.titleType.bg" class="spanLabel">{{item.titleType.itemText}}</span>
              <div
                class="focus"
                :class="{active:item.status===0||item.status===1}"
                @click="focus(item.userId,item.status)"
              >{{item.status===0?'已关注':item.status===1?'互相关注':'关注'}}</div>
            </div>
            <div class="fire">
              <img src="../../../static/images/fire.png" alt mode="widthFix" />
              <span>{{item.hotCount}}</span>
            </div>
            <div class="instro">{{item.title}}</div>
            <div class="corn">
              <img src="../../../static/images/cor.png" alt mode="widthFix" />
              <span>挑战金:{{item.matchValue/100}}金币</span>
            </div>
            <div class="doc">
              <img src="../../../static/images/doc.png" alt mode="widthFix" />
              <span>挑战记录:{{item.matchTotalCount}}人</span>
            </div>
            <div class="startPk" @click="tipShow=true">
              <img src="../../../static/images/startPk.png" alt mode="widthFix" />
            </div>
            <div class="hide" @click="hide=true">
              <img src="../../../static/images/hide.png" alt mode="widthFix" />
            </div>
            <div class="zan" @click="zanFun(item.isLike,item.videoId)">
              <img src="../../../static/images/zan2.png" alt mode="widthFix" v-if="item.isLike" />
              <img src="../../../static/images/zan.png" alt mode="widthFix" v-else />
              <br />
              <span class="zanNum">{{item.likeCount}}</span>
            </div>
            <div class="share" @click="shareShow=true">
              <img src="../../../static/images/share.png" alt mode="widthFix" />
            </div>
            <div class="gift share" @click.stop="giftGive(item.userId)">
              <img src="../../../static/images/gift3.png" alt mode="widthFix" />
            </div>
            <div class="chat2" @click="talkShow=true">
              <img src="../../../static/images/msg3.png" alt mode="widthFix" />
              <span class="chatNum">{{total}}</span>
            </div>
          </div>
          <div class="show" v-show="hide">
            <div class="hide" @click="hide=false">
              <img src="../../../static/images/eye.png" alt mode="widthFix" />
            </div>
          </div>
          <div class="guide" v-show="guideShow" @click="guideShow=false">
            <img src="../../../static/images/up.png" alt mode="widthFix" class="up" />
            <img src="../../../static/images/down.png" alt mode="widthFix" class="down" />
            <img src="../../../static/images/left.png" alt mode="widthFix" class="left" />
            <img src="../../../static/images/right.png" alt mode="widthFix" class="right" />
          </div>
        </div>
      </swiper-item>
    </swiper>
    <div v-show="giftShow" @click.stop="giftShow=true">
      <gift :receiveId="receiveId" :videoId="videoId"/>
    </div>
    <div class="talk" v-show="talkShow" @click="talkShow=false">
      <div class="words" @click.stop="talkShow=true">
        <div class="num">{{total>0?total+'条评论':'暂无评论'}}</div>
        <scroll-view scroll-y class="ver" @scrolltolower="nextPage">
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
                  src="../../../static/images/zan2.png"
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
                {{c.aDisplayName}} <span class="zuozhe" v-if="userId==c.aUserId">作者</span>
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
        </scroll-view>
      </div>
      <div class="input" @click.stop="speak('','','')">在这里输入您想说的话...</div>
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
      path: `pages/videoOne/main?videoId=${this.$mp.query.videoId}&type=${
        this.$mp.query.type
      }&userId=${this.$mp.query.userId || ""}`,
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
      index: 0,
      flag: true,
      watchList: [],
      hide: false,
      dir: [0],
      page: 1,
      pageSize: 3,
      comment: "",
      replyId: "",
      parentId: "",
      userId: "",
      placeholder: "",
      pageSize2: 10,
      page2: 1,
      records: [],
      videoId: "",
      total: 0
    };
  },
  onUnload() {
    this.video = [];
    this.current = 0;
    this.records = [];
    this.page2 = 1;
    this.pageSize2 = 10;
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

    lifeFind() {
      common
        .lifeFind({
          pageNo: this.page2,
          pageSize: 10,
          visitId: wx.getStorageSync("userInfo").id,
          videoId: this.videoId
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
          videoId: this.videoId
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
          videoId: this.videoId,
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
    likeCancelItComment(commentId, i, j) {
      user
        .likeCancelIt({
          userId: wx.getStorageSync("userInfo").id,
          videoId: this.videoId,
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
    },
    getWatchList(userId, type) {
      user.getWatchList({ userId }).then(res => {
        this.watchList = res.result;
        if (type) {
          if (type == 100) {
            for (let i = 0; i < this.video.length; i++) {
              if (this.watchList.hasOwnProperty(this.video[i].userId)) {
                this.video[i].status = this.watchList[this.video[i].userId];
              } else {
                this.video[i].status = 2;
              }
            }
          } else if (type == 200) {
            this.video[this.current].isLike = 1;
            this.video[this.current].likeCount++;
          } else {
            this.video[this.current].isLike = 0;
            this.video[this.current].likeCount--;
          }
        } else {
          if (this.$mp.query.type == 2) {
            this.getSkillVideo();
          } else if (this.$mp.query.type == 3) {
            this.getLifeVideo();
          } else {
            this.wxGetPKOne();
          }
        }
      });
    },
    giftGive(e) {
      this.receiveId = e;
      this.giftShow = true;
    },
    toUser(userId) {
      wx.navigateTo({
        url: "../user/main?userId=" + userId
      });
    },
    cancelIt(userId, watchUserId) {
      user.cancelIt({ userId, watchUserId }).then(res => {
        this.getWatchList(wx.getStorageSync("userInfo").id, 100);
      });
    },
    doIt(userId, watchUserId) {
      user.doIt({ userId, watchUserId }).then(res => {
        this.getWatchList(wx.getStorageSync("userInfo").id, 100);
      });
    },
    focus(id, s) {
      if (s == 2) {
        this.doIt(wx.getStorageSync("userInfo").id, id);
      } else {
        this.cancelIt(wx.getStorageSync("userInfo").id, id);
      }
    },
    likeDoIt(userId, videoId) {
      user.likeDoIt({ userId, videoId }).then(res => {
        this.getWatchList(wx.getStorageSync("userInfo").id, 200);
      });
    },
    likeCancelIt(userId, videoId) {
      user.likeCancelIt({ userId, videoId }).then(res => {
        this.getWatchList(wx.getStorageSync("userInfo").id, 300);
      });
    },
    zanFun(s, videoId) {
      if (s) {
        this.likeCancelIt(wx.getStorageSync("userInfo").id, videoId);
      } else {
        this.likeDoIt(wx.getStorageSync("userInfo").id, videoId);
      }
    },
    getSkillVideo(videoTag) {
      common
        .skillVideo({
          pageNo: this.page,
          pageSize: 3,
          videoId: this.$mp.query.videoId,
          visitId: wx.getStorageSync("userInfo").id,
          userId: this.$mp.query.userId || ""
        })
        .then(res => {
          this.video = [...this.video, ...res.result];
          this.pageSize = res.result.length;
          for (let i = 0; i < this.video.length; i++) {
            this.video[i].titleType.bg = getColor(
              parseInt(this.video[i].titleType.itemValue / 4)
            );
            this.video[i].hotCount =
              Math.abs(this.video[i].hotCount) > 10000
                ? parseInt(this.video[i].hotCount / 10000) + "w"
                : this.video[i].hotCount;
            this.video[i].distance = (this.video[i].distance / 1000).toFixed(1);
            if (this.watchList.hasOwnProperty(this.video[i].userId)) {
              this.video[i].status = this.watchList[this.video[i].userId];
            } else {
              this.video[i].status = 2;
            }
          }
        });
    },
    getLifeVideo(videoTag) {
      common
        .lifeVideo({
          pageNo: this.page,
          pageSize: 3,
          visitId: wx.getStorageSync("userInfo").id,
          videoId: this.$mp.query.videoId,
          userId: this.$mp.query.userId || ""
        })
        .then(res => {
          this.video = [...this.video, ...res.result];
          this.pageSize = res.result.length;
          for (let i = 0; i < this.video.length; i++) {
            this.video[i].titleType.bg = getColor(
              parseInt(this.video[i].titleType.itemValue / 4)
            );
            this.video[i].hotCount =
              Math.abs(this.video[i].hotCount) > 10000
                ? parseInt(this.video[i].hotCount / 10000) + "w"
                : this.video[i].hotCount;
            this.video[i].distance = (this.video[i].distance / 1000).toFixed(1);
            if (this.watchList.hasOwnProperty(this.video[i].userId)) {
              this.video[i].status = this.watchList[this.video[i].userId];
            } else {
              this.video[i].status = 2;
            }
          }
        });
    },
    wxGetPKOne(videoTag) {
      common
        .wxGetPKOne({
          pageNo: this.page,
          pageSize: 3,
          visitId: wx.getStorageSync("userInfo").id,
          videoId: this.$mp.query.videoId,
          userId: this.$mp.query.userId || ""
        })
        .then(res => {
          this.video = [...this.video, ...res.result];
          this.pageSize = res.result.length;
          for (let i = 0; i < this.video.length; i++) {
            this.video[i].titleType.bg = getColor(
              parseInt(this.video[i].titleType.itemValue / 4)
            );
            this.video[i].hotCount =
              Math.abs(this.video[i].hotCount) > 10000
                ? parseInt(this.video[i].hotCount / 10000) + "w"
                : this.video[i].hotCount;
            this.video[i].distance = (this.video[i].distance / 1000).toFixed(1);
            if (this.watchList.hasOwnProperty(this.video[i].userId)) {
              this.video[i].status = this.watchList[this.video[i].userId];
            } else {
              this.video[i].status = 2;
            }
          }
        });
    },
    getCurrent(e) {
      this.current = e.mp.detail.current;
      if (this.current + 1 == this.video.length) {
        if (this.pageSize >= 3) {
          this.page++;
          if (this.$mp.query.type == 2) {
            this.getSkillVideo();
          } else if (this.$mp.query.type == 3) {
            this.getLifeVideo();
          } else {
            this.wxGetPKOne();
          }
        }
      }
      this.videoId = this.video[this.current].videoId;
      this.userId = this.video[this.current].userId;
      this.page2 = 1;
      this.pageSize2 = 10;
      this.records = [];
      this.lifeFind();
    },

    share() {}
  },

  mounted() {
    this.getWatchList(wx.getStorageSync("userInfo").id);
    this.index = this.$mp.query.type;
    this.current = 0;
    this.dir[0] = this.index;
    this.videoId = this.$mp.query.videoId;

    this.lifeFind();
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