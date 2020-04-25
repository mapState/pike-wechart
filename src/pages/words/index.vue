<template>
  <div class="container" @click="setFalse">
    <div class="line"></div>
    <div class="list">
      <div class="item" @click="tipShow=true" v-for="(item,i) in list" :key="i">
        <div class="left">
          <img :src="item.imgUrl" alt mode="aspectFill" />
        </div>
        <div class="name">{{item.displayName}}</div>
        <div class="tip">
          评论了你的作品
          <span class="time">
            {{item.time}}
            <span v-show="item.messageStatus.itemValue==0"></span>
          </span>
        </div>
        <div class="detail">{{item.messageContent}}</div>
        <div class="right" @click.stop="chooseSrc(item.videoUrl)">
          <img :src="item.videoImgUrl" alt mode="aspectFill" />
          <img src="../../../static/images/play.png" alt mode="aspectFill" class="play" />
        </div>
      </div>
    </div>
    <div class="videoShow" v-if="videoShow">
      <img
        src="../../../static/images/close.png"
        alt
        mode="aspectFill"
        class="close"
        @click="videoShow=false"
      />
      <video
        
        :src="src"
        autoplay
      ></video>
    </div>
    <empty msg="暂无评论内容" v-if="list.length==0" />
    <p
      style="text-align:center;margin-top:20px;color:#aaa;margin-bottom:15px;"
      v-if="list.length>0"
    >没有更过数据</p>
    <tips v-model="tipShow"></tips>
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
      tipShow: false,
      videoShow: false,
      list: [],
      src: "",
      page: 1,
      pageSize: 10
    };
  },
  onReachBottom() {
    if (this.pageSize > 9) {
      this.page++;
      this.messageList();
    }
  },
  onUnload() {
    this.page = 1;
    this.pageSize = 10;
    this.list = [];
  },
  methods: {
    chooseSrc(src) {
      this.src = src;
      this.videoShow = true;
    },
    messageRead(messageId) {
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
          messageType: 1,
          pageNo: this.page,
          pageSize: this.pageSize
        })
        .then(res => {
          this.list = [...this.list, ...res.result];
          this.pageSize = res.result.length;
          for (let i = 0; i < res.result.length; i++) {
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
        });
    },
    init() {
      if (this.list.length == 0) {
        this.messageList();
      }
    }
  },

  mounted() {
    this.init();
  }
};
</script>

<style scoped lang="scss">
@import "./index.scss";
.videoShow {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  .close {
    position: absolute;
    width: 20px;
    height: 20px;
    right: 10px;
    top: 10px;
    z-index: 10;
  }
  video {
    width: 100%;
    height: 100%;
  }
}
</style>
<style scoped>
>>> .van-popup {
  background: transparent;
}

>>> .van-hairline--top-bottom:after {
  border-top: 2px solid #fc5428;
  border-bottom: 2px solid #fc5428;
}
</style>