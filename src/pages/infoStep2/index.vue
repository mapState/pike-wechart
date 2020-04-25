<template>
  <div class="container">
    <div class="line"></div>
    <div class="title">个人介绍</div>
    <textarea
      class="instro"
      placeholder="请输入个人介绍..."
      @change="getVal"
      :value="userInfo.introduction"
    ></textarea>
    <div class="title">职业合作</div>
    <div class="tags">
      <div
        :class="{item:true,active:tagList[i].flag}"
        v-for="(item,i) in tagList"
        :key="i"
        @click="chooseTag(item.itemValue,i)"
      >{{tagList[i].itemText}}{{tagList[i].flag?'√':'+'}}</div>
    </div>
    <div class="line"></div>
    <div class="title">
      价格区间
      <span>/小时</span>
    </div>
    <div class="prices">
      <div :class="{item:true,active:cooperatePrice==1}" @click="choosePrice(1)">
        100-300
        <img
          src="../../../static/images/xia.png"
          alt
          mode="widthFix"
          v-show="cooperatePrice==1"
        />
      </div>
      <div :class="{item:true,active:cooperatePrice==2}" @click="choosePrice(2)">
        300-500
        <img
          src="../../../static/images/xia.png"
          alt
          mode="widthFix"
          v-show="cooperatePrice==2"
        />
      </div>
      <div :class="{item:true,active:cooperatePrice==3}" @click="choosePrice(3)">
        500-700
        <img
          src="../../../static/images/xia.png"
          alt
          mode="widthFix"
          v-show="cooperatePrice==3"
        />
      </div>
      <div :class="{item:true,active:cooperatePrice==4}" @click="choosePrice(4)">
        700-900
        <img
          src="../../../static/images/xia.png"
          alt
          mode="widthFix"
          v-show="cooperatePrice==4"
        />
      </div>
    </div>
    <div class="self">
      自定义
      <div class="inputs">
        <input type="number" @change="getVal2" :value="a" />
        <span>至</span>
        <input type="number" @change="getVal3" :value="b" />
      </div>
    </div>
    <div class="go" v-if="!where" style="margin-bottom:30px">
      <div @click="toHome">跳过</div>
      <div @click="toNext">下一步</div>
    </div>
    <div class="save" v-else style="margin-bottom:30px" @click="saveUser">保存</div>
  </div>
</template>
<script>
import common from "../../api/common";
import user from "../../api/user";

export default {
  data() {
    return {
      where: 0,
      cooperatePrice: "",
      arr: [],
      a: "",
      b: "",
      userInfo: {
        introduction: "",
        cooperateType: "",
        customPrice: ""
      },
      tagList: [],
      where:''
    };
  },

  methods: {
    chooseTag(i, j) {
      if (this.arr.includes(i)) {
        this.arr = this.arr.filter(function(ele) {
          return ele != i;
        });
      } else {
        this.arr.push(i);
      }
      this.tagList[j].flag = !this.tagList[j].flag;
      this.userInfo.cooperateType = this.arr.toString();
    },
    getVal(e) {
      this.userInfo.displayName = e.mp.detail.value;
    },
    getVal2(e) {
      this.a = e.mp.detail.value;
      this.cooperatePrice = "";
      this.userInfo.customPrice = "";
    },
    getVal3(e) {
      this.b = e.mp.detail.value;
      this.userInfo.customPrice = this.a + "-" + this.b;
      this.cooperatePrice = "";
    },
    toHome() {
      wx.reLaunch({
        url: "../home/main"
      });
    },
    toNext() {
      if (this.userInfo.customPrice) {
        let obj = { ...this.userInfo, id: wx.getStorageSync("userInfo").id };
        user.userUpdate(obj).then(res => {
          wx.navigateTo({
            url: "../infoStep3/main"
          });
        });
      } else {
        wx.showToast({
          title: "请完善价格区间",
          icon: "none"
        });
      }
    },
    saveUser(){
      if (this.userInfo.customPrice) {
        let obj = { ...this.userInfo, id: wx.getStorageSync("userInfo").id };
        user.userUpdate(obj).then(res => {
          wx.reLaunch({
            url: "../mine/main"
          });
        });
      } else {
        wx.showToast({
          title: "请完善价格区间",
          icon: "none"
        });
      }
    },
    getDict() {
      common.dict({ code: "COOPERATE_TYPE" }).then(res => {
        this.tagList = res.result;
        user
          .cacheUser({ userId: wx.getStorageSync("userInfo").id })
          .then(res => {
            this.userInfo.introduction = res.result.introduction;
            this.userInfo.customPrice = res.result.customPrice;
            this.arr = [];
            for (let i = 0; i < res.result.cooperateType.length; i++) {
              this.arr.push(res.result.cooperateType[i].itemValue);
              for (let j = 0; j < this.tagList.length; j++) {
                if (
                  this.tagList[j].itemValue ==
                  res.result.cooperateType[i].itemValue
                ) {
                  this.tagList[j].flag = true;
                } else {
                  this.tagList[j].flag = false;
                }
              }
            }
            if (this.userInfo.customPrice == "100-300") {
              this.cooperatePrice = 1;
            } else if (this.userInfo.customPrice == "300-500") {
              this.cooperatePrice = 2;
            } else if (this.userInfo.customPrice == "500-700") {
              this.cooperatePrice = 3;
            } else if (this.userInfo.customPrice == "700-900") {
              this.cooperatePrice = 4;
            } else {
              this.a = this.userInfo.customPrice.split("-")[0];
              this.b = this.userInfo.customPrice.split("-")[1];
            }
            this.userInfo.cooperateType = this.arr.toString();
          });
      });
    },
    choosePrice(i) {
      this.cooperatePrice = i;
      this.a = "";
      this.b = "";
      this.userInfo.customPrice =
        i == 1
          ? "100-300"
          : i == 2
            ? "300-500"
            : i == 3
              ? "500-700"
              : "700-900";
    }
  },
  mounted() {
    this.where = this.$mp.query.where;
    this.getDict();
    this.where = this.$mp.query.where;
  }
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
