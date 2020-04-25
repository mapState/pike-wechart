<template>
  <div>
    <div class="info">
      <img src="../../static/images/empty.png" alt mode="widthFix" />
      <div class="tip">{{msg}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["msg", "path"],
  data() {
    return {};
  },
  methods: {
    toNext() {
      this.$router.push({
        path: this.path || "/home"
      });
    },
    init() {
    }
  },

  mounted() {
    this.init();
  }
};
</script>
<style scoped lang="scss">
.info {
  overflow: hidden;
  img {
    display: block;
    width: 99px;
    margin: 0 auto;
    margin-top: 25px;
  }
  .tip {
    text-align: center;
    font-size: 15px;
    font-weight: 500;
    color: rgba(119, 119, 119, 1);
    margin-top: 15px;
  }
  .btn {
    width: 80px;
    line-height: 24px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(248, 157, 0, 1);
    border-radius: 5px;
    text-align: center;
    font-size: 15px;
    font-weight: 500;
    color: rgba(248, 157, 0, 1);
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 30px;
  }
}
</style>