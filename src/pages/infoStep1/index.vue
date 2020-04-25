<template>
  <div class="container" @click="chooseFalse">
    <div class="avatar" @click.stop="onRead">
      <div class="title">头像</div>
      <div class="star">*请务必上传真人照片</div>
      <div class="photo">
        <img :src="userInfo.imgUrl" alt mode="widthFix" v-show="userInfo.imgUrl" />
        <img
          src="../../../static/images/you.png"
          alt
          mode="widthFix"
          class="right"
          style="border-radius:50%"
        />
      </div>
    </div>
    <div class="otherInfo" @click.stop="nameShow=true">
      *昵称
      <span>{{userInfo.displayName}}</span>
      <img src="../../../static/images/you.png" alt mode="widthFix" class="right" />
    </div>
    <div class="otherInfo" @click.stop="sexShow=true">
      *性别
      <span>{{userInfo.sex?'男':'女'}}</span>
      <img src="../../../static/images/you.png" alt mode="widthFix" class="right" />
    </div>
    <div class="otherInfo" @click.stop="ageShow=true">
      *年龄
      <span>{{userInfo.birthday}}</span>
      <img src="../../../static/images/you.png" alt mode="widthFix" class="right" />
    </div>
    <div class="otherInfo" @click.stop="heightShow=true">
      *身高
      <span>{{userInfo.height}}</span>
      <img src="../../../static/images/you.png" alt mode="widthFix" class="right" />
    </div>
    <div class="otherInfo otherPadding" @click.stop="educationShow=true">
      学历
      <span>{{userInfo.educationType==1?'高中及以下':userInfo.educationType==2?'专科':userInfo.educationType==3?'本科':userInfo.educationType==4?'研究生':userInfo.educationType==5?'博士':''}}</span>
      <img src="../../../static/images/you.png" alt mode="widthFix" class="right" />
    </div>
    <div class="otherInfo otherPadding">
      地区
      <span class="lospan">{{userInfo.region}}</span>
      <img src="../../../static/images/location.png" alt mode="widthFix" class="right location" />
    </div>
    <div class="otherInfo" @click.stop="skillTagShow=true">
      *才艺
      <img src="../../../static/images/you.png" alt mode="widthFix" class="right" />
      <div class="list">
        <div class="item" v-for="(item,i) in showText" :key="i">{{item}}</div>
      </div>
    </div>
    <div class="save" v-if="!where" @click="toNext" style="margin-bottom:30px">下一步</div>
    <div class="save" v-else style="margin-bottom:30px" @click="saveUser">保存</div>
    <!-- 弹出框 -->
    <van-popup :show="nameShow" :close-on-click-overlay="true">
      <div class="setName" @click.stop="nameShow=true">
        <div class="title">
          修改昵称
          <img
            src="../../../static/images/close.png"
            alt
            mode="widthFix"
            @click.stop="nameShow=false"
          />
        </div>
        <input type="text" placeholder="请输入昵称" :value="val" @blur="getVal" />
        <div class="submit" @click.stop="nameShow=false">确定</div>
      </div>
    </van-popup>
    <van-popup :show="sexShow" :close-on-click-overlay="true" position="bottom">
      <div class="setSex">
        <div @click="setSex(1)">男</div>
        <div @click="setSex(0)">女</div>
        <div @click="sexShow=false">取消</div>
      </div>
    </van-popup>
    <van-popup :show="ageShow" :close-on-click-overlay="true" position="bottom">
      <div class="setAge">
        <van-datetime-picker
          type="date"
          :value="date"
          :min-date="minDate"
          @confirm="getData"
          @cancel="ageShow=false"
          @formatter="formatter"
        />
      </div>
    </van-popup>
    <van-popup :show="heightShow" :close-on-click-overlay="true">
      <div class="setName" @click.stop="heightShow=true">
        <div class="title">
          身高
          <img
            src="../../../static/images/close.png"
            alt
            mode="widthFix"
            @click="heightShow=false"
          />
        </div>
        <input type="text" placeholder="请输入身高" v-model="userInfo.height" class="height" />
        <span>cm</span>
        <div class="submit" @click="heightShow=false">确定</div>
      </div>
    </van-popup>
    <van-popup :show="educationShow" :close-on-click-overlay="true" position="bottom">
      <div class="setSex setEducation">
        <div @click="setEducation(5)">博士</div>
        <div @click="setEducation(4)">研究生</div>
        <div @click="setEducation(3)">本科</div>
        <div @click="setEducation(2)">专科</div>
        <div @click="setEducation(1)">高中及以下</div>
        <div @click="educationShow=false">取消</div>
      </div>
    </van-popup>
    <van-popup :show="skillTagShow" :close-on-click-overlay="true">
      <div class="setTag" @click.stop="skillTagShow=true">
        <div class="title">选择标签</div>
        <div class="tags">
          <div
            :class="{item:true,active:tagList[i].flag}"
            v-for="(item,i) in tagList"
            :key="i"
            @click.stop="chooseTag(item,i)"
          >{{tagList[i].itemText}}</div>
        </div>
        <div class="btns">
          <div @click.stop="skillTagShow=false">取消</div>
          <div @click.stop="cancelSk">确定</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { UPLOAD_DOMAIN } from "../../utils/const";
import { formatDate, jsGetAge } from "../../utils/utils";
import common from "../../api/common";
import user from "../../api/user";
export default {
  data() {
    return {
      UPLOAD_DOMAIN,
      userInfo: {
        imgUrl: "",
        displayName: "",
        educationType: "",
        height: "",
        sex: "",
        skillTag: "",
        birthday: "",
        region: ""
      },
      date: new Date().getTime(),
      where: 0,
      arr: [],
      val: "",
      arrText: [],
      showText: [],
      tagList: [],
      minDate: new Date(1971, 1, 1).getTime(),
      nameShow: false,
      sexShow: false,
      heightShow: false,
      educationShow: false,
      skillTagShow: false,
      ageShow: false
      // nameShow: false,
    };
  },

  methods: {
    getVal(e) {
      this.userInfo.displayName = e.mp.detail.value;
    },
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
                that.userInfo.imgUrl = UPLOAD_DOMAIN + JSON.parse(res.data).key;
              }
            });
          });
        }
      });
    },
    chooseFalse() {
      this.nameShow = false;
      this.sexShow = false;
      this.heightShow = false;
      this.skillTagShow = false;
      this.educationShow = false;
    },
    setSex(s) {
      this.sexShow = false;
      this.userInfo.sex = s;
    },
    toHome() {
      wx.reLaunch({
        url: "../home/main"
      });
    },
    saveUser(){
      if (
        this.userInfo.imgUrl &&
        this.userInfo.displayName &&
        this.userInfo.sex &&
        this.userInfo.birthday &&
        this.userInfo.height &&
        this.userInfo.skillTag
      ) {
        let obj = { ...this.userInfo, id: wx.getStorageSync("userInfo").id };
        obj.imgUrl = obj.imgUrl.replace(UPLOAD_DOMAIN, "");
        user.userUpdate(obj).then(res => {
          wx.reLaunch({
            url: "../mine/main"
          });
        });
      } else {
        wx.showToast({
          title: "请完善必填信息",
          icon: "none"
        });
      }
    },
    toNext() {
      if (
        this.userInfo.imgUrl &&
        this.userInfo.displayName &&
        this.userInfo.sex &&
        this.userInfo.birthday &&
        this.userInfo.height &&
        this.userInfo.skillTag
      ) {
        let obj = { ...this.userInfo, id: wx.getStorageSync("userInfo").id };
        obj.imgUrl = obj.imgUrl.replace(UPLOAD_DOMAIN, "");
        user.userUpdate(obj).then(res => {
          wx.navigateTo({
            url: "../infoStep2/main"
          });
        });
      } else {
        wx.showToast({
          title: "请完善必填信息",
          icon: "none"
        });
      }
    },
    cancelSk() {
      this.skillTagShow = false;
      this.showText = [...this.arrText];
      this.userInfo.skillTag = this.arr.toString();
    },
    chooseTag(i, j) {
      if (this.arr.includes(i.itemValue)) {
        this.arr = this.arr.filter(function(ele) {
          return ele != i.itemValue;
        });
      } else {
        this.arr.push(i.itemValue);
      }
      if (this.arrText.includes(i.itemText)) {
        this.arrText = this.arrText.filter(function(ele) {
          return ele != i.itemText;
        });
      } else {
        this.arrText.push(i.itemText);
      }
      this.tagList[j].flag = !this.tagList[j].flag;
      console.log(this.arr);
    },
    setEducation(e) {
      this.educationShow = false;
      this.userInfo.educationType = e;
    },
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else {
        return `${value}日`;
      }
    },
    getData(data) {
      this.userInfo.birthday = formatDate(data.mp.detail);
      this.ageShow = false;
    },
    getDict() {
      common.dict({ code: "SKILL_TAG" }).then(res => {
        this.tagList = res.result;
        for (let i = 0; i < this.tagList.length; i++) {
          this.tagList[i].flag = false;
        }
      });
    },
    init() {
      this.getDict();
      user.cacheUser({ userId: wx.getStorageSync("userInfo").id }).then(res => {
        let arr = [];
        for (let i = 0; i < res.result.skillTag.length; i++) {
          this.showText.push(res.result.skillTag[i].itemText);
          arr.push(res.result.skillTag[i].itemValue);
        }
        this.userInfo.skillTag = arr.toString();
        this.userInfo.imgUrl = res.result.imgUrl;
        this.userInfo.displayName = res.result.displayName;
        this.userInfo.height = res.result.height;
        this.userInfo.sex = res.result.sex.itemValue;
        this.userInfo.birthday = res.result.birthday;
        this.userInfo.educationType = wx.getStorageSync(
          "userInfo"
        ).educationType.itemValue;
        this.userInfo.region = wx.getStorageSync("position");
      });

      this.where = this.$mp.query.where;
      // this.where=
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
>>> .van-popup--center {
  top: 40%;
}
>>> .van-popup {
  background: transparent;
}
</style>