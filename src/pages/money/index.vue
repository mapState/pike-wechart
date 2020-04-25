<template>
  <div class="container">
    <div class="top">
      <div class="report" @click="toNext('report')">账单</div>
      <div class="num">{{detail.kmCount/100}}</div>
      <div class="leave">多币余额</div>
      <div class="get" @click="show=true">我要提现</div>
    </div>
    <div class="title">
      充值套餐
    </div>
    <div class="prices">
      <div :class="{item:true,active:cooperatePrice==1}" @click="choosePrice(1)">
        <div>300多币</div>
        <div>￥50</div>
        <img
          src="../../../static/images/xia.png"
          alt
          mode="widthFix"
          v-show="cooperatePrice==1"
        />
      </div>
      <div :class="{item:true,active:cooperatePrice==2}" @click="choosePrice(2)">
        <div>600多币</div>
        <div>￥100</div>
        <img
          src="../../../static/images/xia.png"
          alt
          mode="widthFix"
          v-show="cooperatePrice==2"
        />
      </div>
      <div :class="{item:true,active:cooperatePrice==3}" @click="choosePrice(3)">
        <div>900多币</div>
        <div>￥150</div>
        <img
          src="../../../static/images/xia.png"
          alt
          mode="widthFix"
          v-show="cooperatePrice==3"
        />
      </div>
      <div :class="{item:true,active:cooperatePrice==4}" @click="choosePrice(4)">
        <div>1200多币</div>
        <div>￥200</div>
        <img
          src="../../../static/images/xia.png"
          alt
          mode="widthFix"
          v-show="cooperatePrice==4"
        />
      </div>
      <div :class="{item:true,active:cooperatePrice==5}" @click="choosePrice(5)">
        <div>1500多币</div>
        <div>￥250</div>
        <img
          src="../../../static/images/xia.png"
          alt
          mode="widthFix"
          v-show="cooperatePrice==5"
        />
      </div>
      <div :class="{item:true,active:cooperatePrice==6}" @click="choosePrice(6)">
        <div>1800多币</div>
        <div>￥300</div>
        <img
          src="../../../static/images/xia.png"
          alt
          mode="widthFix"
          v-show="cooperatePrice==6"
        />
      </div>
      <div :class="{item:true,active:cooperatePrice==7}" @click="choosePrice(7)">
        <div>2100多币</div>
        <div>￥350</div>
        <img
          src="../../../static/images/xia.png"
          alt
          mode="widthFix"
          v-show="cooperatePrice==7"
        />
      </div>
      <div :class="{item:true,active:cooperatePrice==8}" @click="choosePrice(8)">
        <div>2400多币</div>
        <div>￥400</div>
        <img
          src="../../../static/images/xia.png"
          alt
          mode="widthFix"
          v-show="cooperatePrice==8"
        />
      </div>
      <div :class="{item:true,active:cooperatePrice==9}" @click="choosePrice(9)">
        <div>2700多币</div>
        <div>￥450</div>
        <img
          src="../../../static/images/xia.png"
          alt
          mode="widthFix"
          v-show="cooperatePrice==9"
        />
      </div>
      
    </div>
    <div class="sub">充值</div>
    <tips v-model="show"></tips>
    <success v-model="succesSshow" msg="充值成功"></success>
  </div>
</template>
<script>
import tips from "@/components/tips";
import success from "@/components/success";
import user from "../../api/user";
export default {
  components: {
    tips,
    success
  },
  data() {
    return {
      show: false,
      succesSshow: false,
      detail:{},
      cooperatePrice: ""
    };
  },

  methods: {
    toNext(msg) {
      wx.navigateTo({
        url: `../${msg}/main`
      });
    },
    choosePrice(i) {
      this.cooperatePrice = i;
    }
  },
  mounted() {
    user
        .cacheUser({ userId: wx.getStorageSync("userInfo").id })
        .then(res => {
          this.detail=res.result
          try {
              this.detail.titleType.bg = getColor(
                parseInt(this.detail.titleType.itemValue)
              );
            } catch (error) {}
            console.log(this.detail)
        });
  }
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
