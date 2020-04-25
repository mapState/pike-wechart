<template>
  <div class="contain">
    <van-popup :show="show" :close-on-click-overlay="true">
      <div class="inner">
        <div class="title">该功能暂未开放 请打开APP操作</div>
        <div class="btns">
          <div @click="show=false">取消</div>
          <div>打开</div>
        </div>
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
    init:{}
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
  methods: {
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.inner {
  width: 306px;
  height: 149px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  .title {
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 500;
    text-align: center;
    padding-top: 38px;
  }
  .btns {
    overflow: hidden;
    margin-top: 38px;
    margin-left: 34px;
    div {
      float: left;
      line-height: 35px;
      text-align: center;
      &:first-of-type {
        width: 114px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(221, 221, 221, 1);
        border-radius: 2px;
        margin-right: 11px;
      }
      &:last-of-type {
        width: 114px;
        background: rgba(252, 84, 40, 1);
        border-radius: 2px;
        color: #fff;
      }
    }
  }
}
</style>

<style scoped>
>>> .van-popup--center {
  top: 40%;
}
>>> .van-popup {
  background: transparent;
}
</style>