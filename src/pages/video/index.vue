<template>
  <div class="container" @click="giftShow=false">
    <div class="back" @click="back">返回</div>
    <swiper vertical @change="getCurrent">
      <swiper-item v-for="(item,i) in video" :key="i" :current="current">
        <swiper @change="getCurrent2" :current="index">
          <swiper-item>
            <video
              :id="'myVideoa'+i"
              :src="item.aVideoUrl"
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
              v-if="current==i&&dir[current]==0"
            ></video>
            <img :src="item.aVideoImg" alt mode="aspectFill" v-else style="width:100%;height:100%" />
            <div class="info" id="inner">
              <div class="show" v-show="!hide">
                <div class="board" v-if="matchStatus==3">
                  <div class="p1">
                    <div class="img" @click.stop="toUser(item.aUserId)">
                      <img :src="item.aImgUrl" alt mode="aspectFill" />
                    </div>
                    <div class="user">
                      <spanName class="spanName" style="margin-left:3px">{{item.aDisplayName}}</spanName>
                      <span v-if="item.guessVideoId" :class="{active:item.guessVideoId==item.aId}">{{item.guessVideoId==item.aId?'我方':'对方'}}</span>
                    </div>
                    <div class="force">PK战力:{{item.aHotCount}}</div>
                  </div>
                  <img src="../../../static/images/K.png" alt mode="widthFix" class="pk" />
                  <div style="text-align:center;margin:0 5px">
                    <div class="labelTime" v-if="item.time>86400000">
                      <van-count-down :time="item.time" format="DD天" />
                    </div>
                    <div class="labelTime" v-else-if="item.time>0">
                      <van-count-down :time="item.time" format="HH 时 mm 分 ss 秒" />
                    </div>
                  </div>
                  <div class="p2">
                    <div class="img" @click.stop="toUser(item.bUserId)">
                      <img :src="item.bImgUrl" alt mode="aspectFill" />
                    </div>
                    <div class="user">
                      <span v-if="item.guessVideoId" :class="{active:item.guessVideoId==item.bId}">{{item.guessVideoId==item.bId?'我方':'对方'}}</span>
                      <spanName class="spanName" style="margin-right:3px">{{item.bDisplayName}}</spanName>
                    </div>
                    <div class="force">PK战力:{{item.bHotCount}}</div>
                  </div>
                </div>
                <div class="board2" v-if="matchStatus==4">
                  <div class="p1">
                    <div class="img" @click.stop="toUser(item.aUserId)">
                      <img :src="item.aImgUrl" alt mode="aspectFill" />
                    </div>
                    <div class="user">
                      <spanName class="spanName" style="margin-left:3px">{{item.aDisplayName}}</spanName>
                      <span :class="{active:item.aHotCount>item.bHotCount}">{{item.aHotCount>item.bHotCount?'胜出':'失败'}}</span>
                    </div>
                    <div class="force">PK战力:{{item.aHotCount}}</div>
                  </div>
                  <img src="../../../static/images/over.png" alt mode="widthFix" class="pk" />
                  <div class="p2">
                    <div class="img" @click.stop="toUser(item.bUserId)">
                      <img :src="item.bImgUrl" alt mode="aspectFill" />
                    </div>
                    <div class="user">
                      <span :class="{active:item.bHotCount>item.aHotCount}">{{item.bHotCount>item.aHotCount?'胜出':'失败'}}</span>
                      <spanName class="spanName" style="margin-right:3px">{{item.bDisplayName}}</spanName>
                    </div>
                    <div class="force">PK战力:{{item.bHotCount}}</div>
                  </div>
                </div>
                <div class="name">
                  <div class="img" @click.stop="toUser(item.aUserId)">
                    <img :src="item.aImgUrl" alt mode="aspectFill" />
                  </div>
                  <span>{{item.aDisplayName}}</span>
                  <br />
                  <span :style="item.aTitleType.bg" class="spanLabel">{{item.aTitleType.itemText}}</span>
                  <div
                    class="focus"
                    :class="{active:item.aStatus===0||item.aStatus===1}"
                    @click="focus(item.aUserId,item.aStatus)"
                  >{{item.aStatus===0?'已关注':item.aStatus===1?'互相关注':'关注'}}</div>
                </div>
                <div class="fire">
                  <img src="../../../static/images/fire.png" alt mode="widthFix" />
                  <span>{{item.aHotCount}}</span>
                </div>
                <div class="instro">{{item.aTitle}}</div>
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
                <div class="zan" @click="zanFun(item.aIsLike,item.aId,item.videoMatchId)">
                  <img
                    src="../../../static/images/zan2.png"
                    alt
                    mode="widthFix"
                    v-if="item.aIsLike"
                  />
                  <img src="../../../static/images/zan.png" alt mode="widthFix" v-else />
                  <br />
                  <span class="zanNum">{{item.aLikeCount}}</span>
                </div>
                <div class="share" @click="shareShow=true">
                  <img src="../../../static/images/share.png" alt mode="widthFix" />
                </div>
                <div class="gift share" @click.stop="giveGift(item.aUserId)">
                  <img src="../../../static/images/gift3.png" alt mode="widthFix" />
                </div>
                <div class="chat" @click="send" v-if="matchStatus!=4">
                  <img src="../../../static/images/msg2.png" alt mode="widthFix" />
                  <span>来聊聊天</span>
                </div>
                <div class="chat2" @click="talkShow=true" v-else>
                  <img src="../../../static/images/msg3.png" alt mode="widthFix" />
                  <span class="chatNum">{{total}}</span>
                </div>
                <scroll-view
                  scroll-y
                  class="dan"
                  :scroll-top="toTop"
                  :scroll-with-animation="anmiFlag"
                  v-if="matchStatus==3"
                >
                  <div class="item" v-for="(pk,p) in pkWords" :key="p">
                    <span :style="pk.titleType.bg" class="spanLabel">{{pk.titleType.itemText}}</span>
                    <span class="userName" style="margin:0 5px">{{pk.displayName}}:</span>
                    <span class="content">
                      {{pk.comment}}
                      <img
                        :src="pk.giftImgUrl"
                        alt
                        mode="widthFix"
                        v-if="pk.giftImgUrl"
                      />
                    </span>
                  </div>
                </scroll-view>
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
          <swiper-item>
            <video
              :id="'myVideob'+i"
              :src="item.bVideoUrl"
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
              v-if="current==i&&dir[current]==1"
            ></video>
            <img :src="item.bVideoImg" alt mode="aspectFill" v-else style="width:100%;height:100%" />
            <div class="info" id="inner">
              <div class="show" v-show="!hide">
                <div class="name">
                  <div class="img" @click.stop="toUser(item.bUserId)">
                    <img :src="item.bImgUrl" alt mode="aspectFill" />
                  </div>
                  <span>{{item.bDisplayName}}</span>
                  <br />
                  <span :style="item.bTitleType.bg" class="spanLabel">{{item.bTitleType.itemText}}</span>
                  <div
                    class="focus"
                    :class="{active:item.aStatus===0||item.aStatus===1}"
                    @click="focus(item.bUserId,item.bStatus)"
                  >{{item.bStatus===0?'已关注':item.bStatus===1?'互相关注':'关注'}}</div>
                </div>
                <div class="fire">
                  <img src="../../../static/images/fire.png" alt mode="widthFix" />
                  <span>{{item.bHotCount}}</span>
                </div>
                <div class="instro">{{item.bTitle}}</div>
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
                <div class="zan" @click="zanFun(item.bIsLike,item.bId,item.videoMatchId)">
                  <img
                    src="../../../static/images/zan2.png"
                    alt
                    mode="widthFix"
                    v-if="item.bIsLike"
                  />
                  <img src="../../../static/images/zan.png" alt mode="widthFix" v-else />
                  <br />
                  <span class="zanNum">{{item.bLikeCount}}</span>
                </div>
                <div class="share" @click="shareShow=true">
                  <img src="../../../static/images/share.png" alt mode="widthFix" />
                </div>
                <div class="gift share" @click.stop="giveGift(item.bUserId)">
                  <img src="../../../static/images/gift3.png" alt mode="widthFix" />
                </div>
                <div class="chat" @click="send" v-if="matchStatus!=4">
                  <img src="../../../static/images/msg2.png" alt mode="widthFix" />
                  <span>来聊聊天</span>
                </div>
                <div class="chat2" @click="talkShow=true" v-else>
                  <img src="../../../static/images/msg2.png" alt mode="widthFix" />
                  <span class="chatNum">{{total}}</span>
                </div>
                <scroll-view
                  scroll-y
                  class="dan"
                  :scroll-top="toTop"
                  :scroll-with-animation="anmiFlag"
                  v-if="matchStatus==3"
                >
                  <div class="item" v-for="(pk,p) in pkWords" :key="p">
                    <span :style="pk.titleType.bg" class="spanLabel">{{pk.titleType.itemText}}</span>
                    <span class="userName" style="margin:0 5px">{{pk.displayName}}:</span>
                    <span class="content">
                      {{pk.comment}}
                      <img
                        :src="pk.giftImgUrl"
                        alt
                        mode="widthFix"
                        v-if="pk.giftImgUrl"
                      />
                    </span>
                  </div>
                </scroll-view>
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
      </swiper-item>
    </swiper>
    <div v-show="giftShow" @click.stop="giftShow=true">
      <gift :videoMatchId="videoMatchId" :videoId="videoId" :receiveId="userId" />
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
          @confirm="pkAdd"
          placeholder="在这里输入弹幕内容"
          v-if="matchStatus==3||matchStatus==2"
        />
        <input
          type="text"
          @click.stop="show=true"
          @change="onChange"
          v-model="comment"
          @confirm="lifeAdd"
          v-else
          :placeholder="placeholder"
        />
        <div class="btn" @click="pkAdd" v-if="matchStatus==3||matchStatus==2">发送</div>
        <div class="btn" @click="lifeAdd" v-else>发送</div>
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
import tips from "@/components/tips";
import gift from "@/components/gift";
import empty from "@/components/empty";
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
      path: `pages/video/main?videoMatchId=${
        this.$mp.query.videoMatchId
      }&type=${this.$mp.query.type}&matchStatus=${
        this.$mp.query.matchStatus
      }&videoId=${this.$mp.query.videoId}`,
      success: function(res) {}
    };
  },
  data() {
    return {
      nav: 1,
      giftShow: false,
      anmiFlag: false,
      shareShow: false,
      tipShow: false,
      guideShow: false,
      show: false,
      talkShow: false,
      type: 1,
      current: 0,
      video: [],
      videoIndex: 1,
      src: "",
      comment: "",
      replyId: "",
      parentId: "",
      userId: "",
      videoMatchId: "",
      placeholder: "",
      matchStatus: "",
      index: 0,
      flag: true,
      watchList: [],
      hide: false,
      dir: [0],
      page: 1,
      page2: 1,
      pageSize: 3,
      pageSize2: 3,
      records: [],
      pkWords: [],
      videoId: "",
      total: 0,
      toTop: 110000000
    };
  },
  onUnload() {
    this.video = [];
    this.dir = [];
    this.records = [];
    this.current = 0;
    this.page2 = 1;
    this.pageSize2 = 10;
  },
  methods: {
    getWatchList(userId, type) {
      user.getWatchList({ userId }).then(res => {
        this.watchList = res.result;
        if (type) {
          if (type == 100) {
            for (let i = 0; i < this.video.length; i++) {
              if (this.watchList.hasOwnProperty(this.video[i].aUserId)) {
                this.video[i].aStatus = this.watchList[this.video[i].aUserId];
              } else {
                this.video[i].aStatus = 2;
              }
              if (this.watchList.hasOwnProperty(this.video[i].bUserId)) {
                this.video[i].bStatus = this.watchList[this.video[i].bUserId];
              } else {
                this.video[i].bStatus = 2;
              }
            }
          } else if (type == 200) {
            if (this.dir[this.current] == 1) {
              this.video[this.current].bIsLike = 1;
              this.video[this.current].bLikeCount++;
            } else {
              this.video[this.current].aIsLike = 1;
              this.video[this.current].aLikeCount++;
            }
          } else {
            if (this.dir[this.current] == 1) {
              this.video[this.current].bIsLike = 0;
              this.video[this.current].bLikeCount--;
            } else {
              this.video[this.current].aIsLike = 0;
              this.video[this.current].aLikeCount--;
            }
          }
        } else {
          this.getPkList();
        }
      });
    },
    onChange(e) {
      this.comment = e.mp.detail.value;
    },
    back() {
      wx.navigateBack({ delta: 1 });
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
    nextPage() {
      if (this.pageSize2 > 9) {
        this.page2++;
        this.getPkList(this.tagActive);
      }
    },
    send() {
      this.show = true;
      this.comment = "";
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
    giveGift(id) {
      this.giftShow = true;
      this.userId = id;
    },
    pkFind() {
      common
        .pkFind({
          pageNo: 1,
          pageSize: 100,
          videoId: this.videoId,
          videoMatchId: this.videoMatchId
        })
        .then(res => {
          this.pkWords = res.result;
          setTimeout(() => {
            this.toTop++;
            this.anmiFlag = false;
          }, 500);

          for (let i = 0; i < this.pkWords.length; i++) {
            this.pkWords[i].titleType.bg = getColor(
              parseInt(this.pkWords[i].titleType.itemValue)
            );
          }
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
    pkAdd() {
      common
        .pkAdd({
          comment: this.comment,
          userId: wx.getStorageSync("userInfo").id,
          videoMatchId: this.videoMatchId,
          videoId: this.videoId
        })
        .then(res => {
          this.show = false;
          this.anmiFlag = true;
          this.pkFind();
        });
    },
    doIt(userId, watchUserId) {
      user.doIt({ userId, watchUserId }).then(res => {
        this.getWatchList(wx.getStorageSync("userInfo").id, 100);
      });
    },
    likeDoIt(userId, videoId, videoMatchId) {
      user.likeDoIt({ userId, videoId, videoMatchId }).then(res => {
        this.getWatchList(wx.getStorageSync("userInfo").id, 200);
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
    zanFun(s, videoId, videoMatchId) {
      if (s) {
        this.likeCancelIt(
          wx.getStorageSync("userInfo").id,
          videoId,
          videoMatchId
        );
      } else {
        this.likeDoIt(wx.getStorageSync("userInfo").id, videoId, videoMatchId);
      }
    },
    focus(id, s) {
      if (s == 2) {
        this.doIt(wx.getStorageSync("userInfo").id, id);
      } else {
        this.cancelIt(wx.getStorageSync("userInfo").id, id);
      }
    },
    getPkList() {
      common
        .wxGetPKList({
          pageNo: this.page,
          pageSize: 3,
          visitId: wx.getStorageSync("userInfo").id,
          videoMatchId: this.$mp.query.videoMatchId,
          matchStatus: this.$mp.query.matchStatus
        })
        .then(res => {
          if (res.code == 10600) {
            // console.log(wx.navigateTo)
            wx.reLaunch({
              url: "../userInfo/main"
            });
          } else {
            this.video = [...this.video, ...res.result];
            this.pageSize = res.result.length;
            for (let i = 0; i < this.video.length; i++) {
              this.video[i].time =
                new Date(this.video[i].endDate.replace(/\-/g, "/")).getTime() -
                new Date().getTime();
              this.video[i].aTitleType.bg = getColor(
                parseInt(this.video[i].aTitleType.itemValue)
              );
              if (this.watchList.hasOwnProperty(this.video[i].aUserId)) {
                this.video[i].aStatus = this.watchList[this.video[i].aUserId];
              } else {
                this.video[i].aStatus = 2;
              }
              if (this.watchList.hasOwnProperty(this.video[i].bUserId)) {
                this.video[i].bStatus = this.watchList[this.video[i].bUserId];
              } else {
                this.video[i].bStatus = 2;
              }
              this.video[i].aLikeCount =
                Math.abs(this.video[i].aLikeCount) > 10000
                  ? parseInt(this.video[i].aLikeCount / 10000) + "w"
                  : Math.abs(this.video[i].aLikeCount) > 1000
                    ? parseInt(this.video[i].aLikeCount / 1000) + "k"
                    : this.video[i].aLikeCount;
              this.video[i].bLikeCount =
                Math.abs(this.video[i].bLikeCount) > 10000
                  ? parseInt(this.video[i].bLikeCount / 10000) + "w"
                  : Math.abs(this.video[i].bLikeCount) > 1000
                    ? parseInt(this.video[i].bLikeCount / 1000) + "k"
                    : this.video[i].bLikeCount;
              this.video[i].bTitleType.bg = getColor(
                parseInt(this.video[i].bTitleType.itemValue)
              );
            }
          }
        });
    },
    getCurrent(e) {
      this.current = e.mp.detail.current;
      if (!this.dir[this.current] && this.dir[this.current] !== 0) {
        this.dir[this.current] = this.index;
        this.$set(this.dir, this.current, this.index);
      }

      if (this.current + 1 == this.video.length) {
        if (this.pageSize >= 3) {
          this.page++;
          this.getPkList();
        }
      }
      this.page2 = 1;
      this.pageSize2 = 10;
      this.records = [];
      if (this.dir[this.current] == 1) {
        this.videoId = this.video[this.current].bId;
      } else {
        this.videoId = this.video[this.current].aId;
      }
      this.videoMatchId = this.video[this.current].videoMatchId;
      console.log(this.videoMatchId);
      this.lifeFind();
      this.pkFind();
    },
    getCurrent2(e) {
      // this.index=e.mp.detail.current
      this.dir[this.current] = e.mp.detail.current;
      this.$set(this.dir, this.current, e.mp.detail.current);
      this.page2 = 1;
      this.pageSize2 = 10;
      this.records = [];
      if (this.dir[this.current] == 1) {
        this.videoId = this.video[this.current].bId;
        this.userId = this.video[this.current].bUserId;
      } else {
        this.videoId = this.video[this.current].aId;
        this.userId = this.video[this.current].aUserId;
      }
      this.lifeFind();
      this.pkFind();
    },
    share() {}
  },
  mounted() {
    if (!wx.getStorageSync("userInfo").id) {
      wx.reLaunch({
        url:
          "../userInfo/main?path=" +
          encodeURIComponent(
            `../video/main?videoMatchId=${this.$mp.query.videoMatchId}&type=${
              this.$mp.query.type
            }&matchStatus=${this.$mp.query.matchStatus}&videoId=${
              this.$mp.query.videoId
            }`
          )
      });
    } else {
      this.videoId = this.$mp.query.videoId;
      this.videoMatchId = this.$mp.query.videoMatchId;
      this.matchStatus = this.$mp.query.matchStatus;
      this.index = this.$mp.query.type;
      this.getWatchList(wx.getStorageSync("userInfo").id);
      this.dir = [];
      this.current = 0;
      this.dir[0] = this.index;
      this.pkFind();
      this.lifeFind();
    }
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
>>> .van-count-down {
  color: #fff;
  font-size: 10px;
}
</style>