<template>
  <div class="container" @click="setFalse">
    <div class="line"></div>
    <div class="title">用户类型</div>
    <div class="nav">
      <div :class="{active:nav==1}" @click="chooseNav(1)">平台所有人</div>
      <div :class="{active:nav==2}" @click="chooseNav(2)">我的粉丝</div>
      <div :class="{active:nav==3}" @click="chooseNav(3)">我的关注</div>
    </div>
    <div class="title">人员细分 <span>(选填)</span></div>
    <div class="select" @click.stop="sexShow=true">
      <div class="label">性别</div>
      <div class="mid">{{sex===0?'女':sex===1?'男':'请选择性别'}}</div>
      <img src="../../../static/images/you.png" alt mode="widthFix" />
    </div>
    <div class="select">
      <div class="label">距离我</div>
      <div class="mid">请选择距离</div>
      <img src="../../../static/images/you.png" alt mode="widthFix" />
    </div>
    <div class="select" @click.stop="ageShow=true">
      <div class="label">年龄区间</div>
      <div class="mid">请选择年龄</div>
      <img src="../../../static/images/you.png" alt mode="widthFix" />
    </div>
    <div class="sure">确定</div>
    <van-popup :show="ageShow" :close-on-click-overlay="true" position="bottom">
      <div class="setAge" @click.stop="ageShow=true">
        <div class="tips">
          <div>年龄区间</div>
          <span @click.stop="ageShow=false">确定</span>
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
      nav: 1,
      sex:'',
      up: [],
      down: [],
    };
  },
  methods: {
    onRead(file) {
      var that = this;
      wx.chooseImage({
        success: function(res) {
          var tempFilePaths = res.tempFilePaths;
          that.fly.get("http://192.168.1.112:8081//file/getToken").then(res => {
            wx.uploadFile({
              url: "http://upload.qiniup.com/", //仅为示例，非真实的接口地址
              filePath: tempFilePaths[0],
              name: "file",
              header: {
                "Content-Type": "multipart/form-data",
                token: res.data.data.token
              },
              formData: {
                token: res.data.data.token
              },
              success: function(res) {
                var data = res.data;
                // console.log(JSON.parse(res.data.key))
                that.userInfo.imgUrl = UPLOAD_DOMAIN + JSON.parse(res.data).key;
                console.log(that.userInfo.imgUrl);
                //do something
              }
            });
          });
        }
      });
    },
    init() {
      for(let i=1;i<80;i++){
        this.up.push(i)
        this.down.push(i)
      }
    },
    chooseNav(n) {
      this.nav = n;
    },
    setSex(s){
      this.sex=s;
      this.sexShow=false;
    },
    setFalse(){
      this.ageShow=false;
      this.sexShow=false;
    },
    getUp(e) {
      console.log(e.mp.detail.value)
      this.down=[]
      for(let i=e.mp.detail.value;i<80;i++){
        this.down.push(i)
      }
    },
    getDown() {},
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