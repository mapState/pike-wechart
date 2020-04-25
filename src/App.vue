<template>
  <div></div>
</template>

<script>
import amapFile from "../static/lib/amap-wx";
export default {
  mounted() {
    var myAmapFun = new amapFile.AMapWX({
      key: "1980518dfee77c264e2dae61954e32b0"
    });
    myAmapFun.getRegeo({
      success: res => {
        wx.setStorageSync("lat", res[0].latitude);
        wx.setStorageSync("lng", res[0].longitude);
        wx.setStorageSync(
          "position",
          res[0].regeocodeData.addressComponent.province +
            " " +
            res[0].regeocodeData.addressComponent.city
        );
      }
    });
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  color: #101010;
  font-size: 14px;
  font-family: PingFang SC;
}
</style>
