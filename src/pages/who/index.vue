<template>
  <div class="container" @click="setFalse">
    <div class="line"></div>
    <div class="title">用户类型</div>
    <div class="nav">
      <div :class="{active:nav==1}" @click="chooseNav(1)">平台所有人</div>
      <div :class="{active:nav==2}" @click="chooseNav(2)">我的粉丝</div>
      <div :class="{active:nav==3}" @click="chooseNav(3)">我的关注</div>
    </div>
    <div class="title">
      人员细分
      <span>(选填)</span>
    </div>
    <div class="select" @click.stop="sexShow=true">
      <div class="label">性别</div>
      <div class="mid" :class="{active:sex||sex===0}">{{sex===0?'女':sex===1?'男':'请选择性别'}}</div>
      <img src="../../../static/images/you.png" alt mode="widthFix" />
    </div>
    <div class="select" @click.stop="disShow=true">
      <div class="label">距离我</div>
      <div
        class="mid"
        :class="{active:formData.checkSpace}"
      >{{formData.checkSpace?formData.checkSpace:'请选择距离'}}</div>
      <img src="../../../static/images/you.png" alt mode="widthFix" />
    </div>
    <div class="select" @click.stop="ageShow=true">
      <div class="label">年龄区间</div>
      <div
        class="mid"
        :class="{active:formData.checkAgeHigh}"
      >{{formData.checkAgeHigh?formData.checkAgeLow+'-'+formData.checkAgeHigh:'请选择年龄'}}</div>
      <img src="../../../static/images/you.png" alt mode="widthFix" />
    </div>
    <div class="sure" @click="submit">确定</div>
    <van-popup :show="ageShow" :close-on-click-overlay="true" position="bottom">
      <div class="setAge" @click.stop="ageShow=true">
        <div class="tips">
          <div>年龄区间</div>
          <span @click.stop="setAge">确定</span>
        </div>
        <div class="picker left">
          <van-picker :columns="up" @change="getUp" />
        </div>
        <div class="heng">-</div>
        <div class="picker">
          <van-picker :columns="down" @change="getDown" />
        </div>
      </div>
    </van-popup>
    <van-popup :show="disShow" :close-on-click-overlay="true" position="bottom">
      <div class="setAge" @click.stop="disShow=true">
        <div class="tips">
          <div>选择距离</div>
          <span @click.stop="setDis">确定</span>
        </div>
        <div class="picker" style="margin:0 auto;float:none">
          <van-picker :columns="columns" @change="getDis" />
        </div>
      </div>
    </van-popup>
    <van-popup :show="sexShow" :close-on-click-overlay="true" position="bottom">
      <div class="setSex" @click.stop="sexShow=true">
        <div @click.stop="setSex(1)">男</div>
        <div @click.stop="setSex(0)">女</div>
        <div @click.stop="sexShow=false">取消</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      ageShow: false,
      sexShow: false,
      disShow: false,
      nav: 1,
      sex: "",
      up: [],
      upS: 1,
      downS: 1,
      down: [],
      columns: ["5公里", "10公里", "50公里", "100公里"],
      dis: "5公里",
      formData: {
        checkType: 1,
        checkSex: "",
        checkSpace: "",
        checkAgeHigh: "",
        checkAgeLow: ""
      }
    };
  },
  methods: {
    init() {
      this.formData = {
        ...this.formData,
        ...JSON.parse(this.$mp.query.formData)
      };
      this.formData.checkType=1
      console.log(JSON.parse(this.$mp.query.formData))
      for (let i = 1; i < 80; i++) {
        this.up.push(i);
        this.down.push(i);
      }
    },
    chooseNav(n) {
      this.nav = n;
      this.formData.checkType = n;
    },
    setSex(s) {
      this.sex = s;
      this.formData.checkSex = s;
      this.sexShow = false;
    },
    setFalse() {
      this.ageShow = false;
      this.sexShow = false;
      this.disShow = false;
    },
    getUp(e) {
      console.log(e.mp.detail.value);
      this.upS = e.mp.detail.value;
      this.down = [];
      for (let i = e.mp.detail.value; i < 80; i++) {
        this.down.push(i);
      }
    },
    submit() {
      wx.redirectTo({
        url: `../red/main?formData=` + JSON.stringify(this.formData)
      });
    },
    getDown(e) {
      this.downS = e.mp.detail.value;
    },
    setAge() {
      this.ageShow = false;
      this.formData.checkAgeLow = this.upS;
      this.formData.checkAgeHigh = this.downS;
    },
    getDis() {
      this.dis = e.mp.detail.value;
    },
    setDis() {
      this.disShow = false;
      this.formData.checkSpace = this.dis;
    }
  },

  mounted() {
    console.log(1);
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

>>> .van-hairline--top-bottom:after {
  border-top: 2px solid #fc5428;
  border-bottom: 2px solid #fc5428;
}
</style>