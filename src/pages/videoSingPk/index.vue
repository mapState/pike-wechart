<template>
  <div class="container" @click="giftShow=false">
    <div class="videos" @click="play">
      <img src="../../../static/images/play.png" alt mode="widthFix" class="play" v-if="hide" />
      <video
        :src="detail.aVideoUrl"
        id="v1"
        :style="{width:'50%'}"
        @ended="over"
        :show-play-btn="false"
        :controls="false"
        :show-progress="false"
        :vslide-gesture-in-fullscreen="false"
        :show-fullscreen-btn="false"
        :x5-video-player-fullscreen="false"
        :show-center-play-btn="false"
        :enable-progress-gesture="false"
      >
        <!-- <track :src="subtitles.vtt" kind="subtitles" srclang="en" label="English" />  -->
      </video>
      <video
        :src="detail.bVideoUrl"
        id="v2"
        :style="{width:'50%'}"
        :show-play-btn="false"
        :controls="false"
        :show-progress="false"
        :vslide-gesture-in-fullscreen="false"
        :show-fullscreen-btn="false"
        :x5-video-player-fullscreen="false"
        :show-center-play-btn="false"
        :enable-progress-gesture="false"
      ></video>
      <div class="sing" :class="{red:sing[1]=='red',blue:sing[1]=='blue'}">{{sing[2]}}</div>
      <div class="dots">
        <span v-if="timeFlag<=dotTime-100"></span>
        <span v-if="timeFlag<=dotTime-200"></span>
        <span v-if="timeFlag<=dotTime-300"></span>
      </div>
    </div>
    <div class="progress">
      <div class="left" :style="{width:leftWid}"><span>PK战力：{{detail.aForce}}</span></div>
      <div class="right" :style="{width:rightWid}"><span>PK战力：{{detail.bForce}}</span></div>
    </div>
    <div class="info">
      <div class="img" @click="toUser(detail.aUserId)">
        <img :src="detail.aImgUrl" alt mode="aspectFill" />
      </div>
      <div class="name">{{detail.aDisplayName}}</div>
      <span class="spanLabel" :style="detail.aTitleType.bg">{{detail.aTitleType.itemText}}</span>
      <img src="../../../static/images/music.png" alt mode="widthFix" class="music" />
      <div class="songName">
        <div class="name">{{detail.songLibrary.songName}}</div>
        <div class="ren">原唱 {{detail.songLibrary.singer}}</div>
      </div>
      <div class="img2" @click="toUser(detail.bUserId)">
        <img :src="detail.bImgUrl" alt mode="aspectFill" />
      </div>
      <div class="p2">
        <div class="name">{{detail.bDisplayName}}</div>
        <span class="spanLabel" :style="detail.bTitleType.bg">{{detail.bTitleType.itemText}}</span>
      </div>
      <div class="gift">
        <div class="zan1">
          <img
            src="../../../static/images/zan5.png"
            alt
            mode="widthFix"
            v-if="detail.aIsLike"
            @click="cancleLike(detail.aId)"
          />
          <img
            src="../../../static/images/zan4.png"
            alt
            mode="widthFix"
            @click="like(detail.aId)"
            v-else
          />
          <div class="num">{{detail.aLikeCount}}</div>
        </div>
        <div class="gift1" @click.stop="giveGift(detail.aUserId,detail.aId)">
          <img src="../../../static/images/gift7.png" alt mode="widthFix" />
        </div>
        <van-count-down :time="detail.time" format="正在PK HH:mm:ss" v-if="detail.time>0" />
        <div class="over" v-else>PK结束</div>
        <div class="gift1 gift2" @click.stop="giveGift(detail.bUserId,detail.bId)">
          <img src="../../../static/images/gift7.png" alt mode="widthFix" />
        </div>
        <div class="zan1 zan2">
          <img
            src="../../../static/images/zan5.png"
            alt
            mode="widthFix"
            v-if="detail.bIsLike"
            @click="cancleLike(detail.bId)"
          />
          <img
            src="../../../static/images/zan4.png"
            alt
            mode="widthFix"
            @click="like(detail.bId)"
            v-else
          />
          <div class="num">{{detail.bLikeCount}}</div>
        </div>
      </div>
    </div>
    <div class="list" @click="toVideo(detail.aId)">
      <div class="img" v-if="detail.userList[0]">
        <img :src="detail.userList[0].imgUrl" alt mode="aspectFill" />
      </div>
      <div class="img" v-if="detail.userList[1]">
        <img :src="detail.userList[1].imgUrl" alt mode="aspectFill" />
      </div>
      <div class="img" v-if="detail.userList[2]">
        <img :src="detail.userList[2].imgUrl" alt mode="aspectFill" />
      </div>
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
              {{c.aDisplayName}}
              <span class="zuozhe" v-if="detail.userId==c.aUserId">作者</span>
              <div class="zan">
                <img
                  src="../../../static/images/zan5.png"
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
        <div class="btn" @click.stop="tipShow=true">我要合唱</div>
      </div>
    </div>
    <div v-show="giftShow" @click.stop="giftShow=true">
      <gift :videoMatchId="$mp.query.videoMatchId" :videoId="videoId" :receiveId="userId" />
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
import { getColor, createLrcObj } from "../../utils/utils";
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
      path: `pages/videoSingPk/main?videoMatchId=${
        this.$mp.query.videoMatchId
      }`,
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
      hide: true,
      type: 1,
      current: 0,
      video: [],
      receiveId: "",
      dir: [0],
      page: 1,
      pageSize: 3,
      comment: "",
      timeFlag: 0,
      dotTime: 0,
      replyId: "",
      parentId: "",
      placeholder: "",
      userId: "",
      records: [],
      videoId: "",
      total: 0,
      timer: null,
      width: "80%",
      detail: { aTitleType: {}, bTitleType: {}, songLibrary: {}, userList: [] },
      sing: [],
      leftWid:'',
      rightWid:'',
      songsArr: []
    };
  },
  onUnload() {
    this.current = 0;
    this.page = 1;
    this.pageSize = 10;
    this.records = [];
    this.hide=true;
    this.detail = {
      aTitleType: {},
      bTitleType: {},
      songLibrary: {},
      userList: []
    };
    clearInterval(this.timer);
    this.timeFlag = 0;
    this.sing=[]
    this.songsArr=[]
  },
  methods: {
    onChange(e) {
      this.comment = e.mp.detail.value;
    },
    toUser(userId) {
      wx.navigateTo({
        url: "../user/main?userId=" + userId
      });
    },
    toVideo(videoId) {
      wx.navigateTo({
        url: `../challenge2/main?videoId=${videoId}`
      });
    },

    giveGift(userId, videoId) {
      this.giftShow = true;
      this.videoId = videoId;
      this.userId = userId;
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

    pkDetails() {
      common
        .pkDetails2({
          visitId: wx.getStorageSync("userInfo").id,
          videoMatchId: this.$mp.query.videoMatchId
        })
        .then(res => {
          this.detail = res.result;
          this.detail.time =
            Date.parse(new Date(this.detail.endDate.replace(/-/g, "/"))) -
            new Date().getTime();
          this.detail.aTitleType.bg = getColor(
            parseInt(this.detail.aTitleType.itemValue)
          );
          this.detail.bTitleType.bg = getColor(
            parseInt(this.detail.bTitleType.itemValue)
          );
          this.songLrc(this.detail.songLibrary.songId);
          let sum=this.detail.bForce+this.detail.aForce
          if(sum==0){
            this.leftWid='50%'
            this.rightWid='50%'
          }else{
            this.leftWid=this.leftWid/sum*100+'5'
            this.rightWid=this.rightWid/sum*100+'5'
          }
          
        });
    },
    lifeFind() {
      common
        .lifeFind({
          pageNo: this.page,
          pageSize: 10,
          visitId: wx.getStorageSync("userInfo").id,
          videoMatchId: this.$mp.query.videoMatchId
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
          videoMatchId: this.$mp.query.videoMatchId
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
          videoMatchId: this.$mp.query.videoMatchId,
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
    like(videoId) {
      user
        .likeDoIt({
          userId: wx.getStorageSync("userInfo").id,
          videoId: videoId,
          videoMatchId: this.$mp.query.videoMatchId
        })
        .then(res => {
          this.pkDetails();
        });
    },
    cancleLike(videoId) {
      user
        .likeCancelIt({
          userId: wx.getStorageSync("userInfo").id,
          videoId: videoId,
          videoMatchId: this.$mp.query.videoMatchId
        })
        .then(res => {
          this.pkDetails();
        });
    },
    likeCancelItComment(commentId, i, j) {
      user
        .likeCancelIt({
          userId: wx.getStorageSync("userInfo").id,
          videoMatchId: this.$mp.query.videoMatchId,
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
    songLrc(id) {
      common.songLrc({ id }).then(res => {
        let str = res.message.replace(/\[/g, "");
        let arr = str.split("\n");
        let arr2 = [];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].split("]").length == 3) {
            arr2.push(arr[i].split("]"));
          }
        }
        for (let i = 0; i < arr2.length; i++) {
          arr2[i][0] =
            Number(arr2[i][0].split(":")[0]) * 60 * 100 +
            Number(arr2[i][0].split(":")[1]) * 100-50;
        }
        this.dotTime = arr2[0][0];
        this.songsArr = arr2;
      });
    },
    play() {
      let v1 = wx.createVideoContext("v1");
      let v2 = wx.createVideoContext("v2");
      if (this.hide) {
        v1.play();
        v2.play();
        this.getSong();
      } else {
        v1.pause();
        v2.pause();
        clearInterval(this.timer);
      }
      this.hide = !this.hide;
    },
    getSong() {
      this.timer = setInterval(() => {
        this.timeFlag++;
        for (let i = this.songsArr.length - 1; i >= 0; i--) {
          if (this.timeFlag >= this.songsArr[i][0]) {
            this.sing = this.songsArr[i];
            break;
          }
        }
      }, 10);
    },
    over(e) {
      clearInterval(this.timer);
      this.timeFlag = 0;
      this.sing=[]
      this.hide=true
    }
  },

  mounted() {
    this.lifeFind();
    // this.getDetail();
    this.pkDetails();
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
  width: 101px;
  line-height: 22px;
  border: 1px solid rgba(252, 84, 40, 1);
  border-radius: 11px;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: rgba(252, 84, 40, 1);
  position: absolute;
  left: 127px;
  top: 10px;
}
</style>