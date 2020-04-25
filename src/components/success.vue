<template>
  <div class="contain">
    <van-popup :show="show" :close-on-click-overlay="true">
      <div class="inner">
        <img src="../../static/images/success.png" alt mode="widthFix" />
        <div class="title">{{msg}}</div>
        <div class="btn" @click="show=false">确定</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    msg: {}
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      this.$emit("input", val);
    }
  },
  data() {
    return {
      show: false
    };
  },
  methods: {},
  mounted() {
    console.log(this)
    // this.show=this.init
  }
};
</script>

<style lang="scss" scoped>
.inner {
  width: 306px;
  height: 183px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  img {
    width: 44px;
    height: 44px;
    margin: 0 auto;
    display: block;
    padding-top: 20px;
  }
  .title {
    font-size: 15px;
    font-family: PingFang SC;
    font-weight:bold;
    text-align: center;
    padding-top: 10px;
  }
  .btn {
    overflow: hidden;
    width: 100px;
    margin: 0 auto;
    margin-top: 30px;
    text-align: center;
    line-height: 38px;
    background: rgba(252, 84, 40, 1);
    border-radius: 2px;
    color: #fff;
  }
}
</style>

<style scoped>
>>> .van-popup--center {
  top: 10%;
}
>>> .van-popup {
  background-color: transparent!important;
}
</style>