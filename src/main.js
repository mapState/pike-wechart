import Vue from 'vue'
import App from './App'
import qs from 'qs';
Vue.prototype.$qs = qs;
var Fly=require("flyio/dist/npm/wx") 
var fly=new Fly
fly.config.baseURL="https://smapi.koudaitiku.net/"
fly.config.headers= {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    'Cookie': wx.getStorageSync('token')[0]
  };

Vue.prototype.fly=fly 
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
