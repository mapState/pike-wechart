<template>
  <div class="container" @click="setFalse">
    <div class="input">
      <div class="label">红包漂流主题</div>
      <input
        type="text"
        placeholder="请填写红包主题....."
        @change="(e)=>onChange(e,'title')"
        v-model="formData.title"
      />
    </div>
    <div class="input">
      <div class="label">
        <span v-if="formData.bonusType==0">拼</span>
        红包总金额
      </div>
      <input
        type="number"
        placeholder="请填写多币数量....."
        @change="(e)=>onChange(e,'bonusTotal')"
        v-model="formData.bonusTotal"
      />
      <div class="change" v-if="formData.bonusType==0" @click="formData.bonusType=1">改为普通红包</div>
      <div class="change" v-else @click="formData.bonusType=0">改为拼手气红包</div>
    </div>
    <div class="input">
      <div class="label">红包个数</div>
      <input
        type="number"
        placeholder="请填写红包个数....."
        @change="(e)=>onChange(e,'bonusCount')"
        v-model="formData.bonusCount"
      />
    </div>
    <div class="input" style="border-bottom: 1px solid #ddd;">
      <div class="label">主题详情描述</div>
      <textarea
        placeholder="请填写红包漂流详情描述...... "
        @change="(e)=>onChange(e,'description')"
        v-model="formData.description"
      ></textarea>
    </div>
    <div class="upload">
      <div class="label">上传图片：</div>
      <div class="img" v-for="(item,i) in imgArr" :key="i">
        <img :src="item" alt mode="aspectFill" class="upImg" />
        <span @click="cut(i)">×</span>
        <!-- <img src="../../../static/images/close.png" alt mode="widthFix" class="close"/> -->
      </div>
      <div class="img" @click="onRead" v-if="imgArr.length<5">
        <div>+</div>
      </div>
    </div>
    <div class="select" @click.stop="timeShow2=true">
      <div class="label">漂流结束时间</div>
      <div
        class="mid"
        :class="{active:formData.endDate}"
      >{{formData.endDate?formData.endDate:'请设置漂流结束时间'}}</div>
      <img src="../../../static/images/you.png" alt mode="widthFix" />
    </div>
    <div class="select" @click.stop="timeShow=true">
      <div class="label">漂流停留时间</div>
      <div
        class="mid"
        :class="{active:formData.stayTime}"
      >{{formData.stayTime?formData.stayTime:'请选择漂流停留时间'}}</div>
      <img src="../../../static/images/you.png" alt mode="widthFix" />
    </div>
    <div class="select" @click="toNext('who')">
      <div class="label" :class="{active:formData.endDate}">参与漂流人员</div>
      <div
        class="mid"
        :class="{active:formData.checkType}"
      >{{formData.checkType==1?'平台所有人':formData.checkType==2?'我的粉丝':formData.checkType==3?'我的关注':'选择人员类型'}}</div>
      <img src="../../../static/images/you.png" alt mode="widthFix" />
    </div>
    <div class="start" @click="submit">开始漂流</div>
    <van-popup :show="timeShow2" :close-on-click-overlay="true" position="bottom">
      <div class="setTime">
        <van-datetime-picker
          type="datetime"
          :value="currentDate"
          :min-date="currentDate"
          @confirm="onInput"
          @cancel="timeShow2=false"
        />
      </div>
    </van-popup>
    <van-popup :show="timeShow" :close-on-click-overlay="true" position="bottom" class="spec">
      <div class="setTime" @click.stop="timeShow=true">
        <div class="tips">
          <div>漂流停留时间</div>
          <div>即参与人员收到红包停留时间</div>
          <span @click.stop="setTime">确定</span>
        </div>
        <div class="picker">
          <van-picker :columns="columns" @change="getTime" />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import common from "../../api/common";
import { UPLOAD_DOMAIN } from "../../utils/const";
import { formatDate } from "../../utils/utils";
export default {
  components: {},
  data() {
    return {
      timeShow: false,
      timeShow2: false,
      columns: ["3分钟", "5分钟", "10分钟", "30分钟", "60分钟"],
      currentDate: new Date().getTime(),
      imgArr: [],
      col: "3分钟",
      formData: {
        title: "",
        bonusCount: "",
        bonusType: 0,
        bonusTotal: "",
        description: "",
        endDate: "",
        stayTime: "",
        checkType: "",
        checkSex: "",
        checkSpace: "",
        checkAgeHigh: "",
        imgUrl: "",
        checkAgeLow: ""
      }
    };
  },
  methods: {
    onRead(file) {
      var that = this;
      wx.chooseImage({
        success: function(res) {
          var tempFilePaths = res.tempFilePaths;
          common.getToken().then(res => {
            wx.uploadFile({
              url: "http://upload.qiniup.com/", //仅为示例，非真实的接口地址
              filePath: tempFilePaths[0],
              name: "file",
              header: {
                "Content-Type": "multipart/form-data"
              },
              formData: {
                token: res.result.token
              },
              success: function(res) {
                // var data = res.data;
                that.imgArr.push(UPLOAD_DOMAIN + JSON.parse(res.data).key);
              }
            });
          });
        }
      });
    },
    setFalse() {
      this.timeShow = false;
      // this.timeShow2=false
    },
    onChange(e, name) {
      this.formData[name] = e.mp.detail.value;
    },
    onInput(e) {
      this.formData.endDate = formatDate(e.mp.detail);
      this.timeShow2 = false;
    },
    cut(i) {
      this.imgArr.splice(i, 1);
    },
    submit() {
      let flag = true;
      var re = new RegExp(UPLOAD_DOMAIN, "g");
      this.formData.imgUrl = this.imgArr.toString().replace(re, "");

      for (let i in this.formData) {
        if (this.formData[i] === "") {
          console.log(i);
          switch (i) {
            case "title":
              wx.showToast({
                title: "请填写红包主题",
                icon: "none"
              });
              flag = false;
              break;
            case "bonusTotal":
              wx.showToast({
                title: "请填写红包金额",
                icon: "none"
              });
              flag = false;
              break;
            case "bonusCount":
              wx.showToast({
                title: "请填写红包个数",
                icon: "none"
              });
              flag = false;
              break;
            case "description":
              wx.showToast({
                title: "请填写红包描述",
                icon: "none"
              });
              flag = false;
              break;
            case "imgUrl":
              wx.showToast({
                title: "请上传图片",
                icon: "none"
              });
              flag = false;
              break;
            case "endDate":
              wx.showToast({
                title: "请填写红包结束时间",
                icon: "none"
              });
              flag = false;
              break;
            case "stayTime":
              wx.showToast({
                title: "请填写红包停留时间",
                icon: "none"
              });
              flag = false;
              break;
            case "checkType":
              wx.showToast({
                title: "选择人员类型",
                icon: "none"
              });
              flag = false;
              break;
            default:
              break;
          }
          break;
        }
      }
      let obj = {
        ...this.formData,
        lat: wx.getStorageSync("lat"),
        lng: wx.getStorageSync("lng"),
        userId: wx.getStorageSync("userInfo").id
      };
      obj.stayTime = obj.stayTime.replace("分钟", "") * 60;
      if (obj.checkSpace) {
        obj.checkSpace = obj.checkSpace.replace("公里", "") * 1000;
      }
      if (flag) {
        common.bonusAdd(obj).then(res => {
          wx.navigateTo({
            url: `../mine/main`
          });
          wx.showToast({
            title: res.message,
            icon: "none"
          });
        });
      }
    },
    chooseNav(n) {
      this.nav = n;
    },
    toNext(msg) {
      wx.navigateTo({
        url: `../${msg}/main?formData=` + JSON.stringify(this.formData)
      });
    },
    getTime(e) {
      this.col = e.mp.detail.value;
    },
    setTime() {
      this.timeShow = false;
      this.formData.stayTime = this.col;
    },
    init() {
      if (this.$mp.query.formData) {
        this.formData = {
          ...this.formData,
          ...JSON.parse(this.$mp.query.formData)
        };
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
</style>
<style scoped>
>>> .van-popup {
  background: transparent;
}

.spec >>> .van-hairline--top-bottom:after {
  border-top: 2px solid #fc5428;
  border-bottom: 2px solid #fc5428;
}
</style>