const url = 'https://pike8.top'
// const url = 'http://192.168.1.128:8888'
var Fly = require('flyio/dist/npm/wx');
var fly = new Fly();
fly.config.timeout = 10000;
import Qs from "qs";
//配置请求基地址
fly.config.baseURL = url;

//添加请求拦截器
fly.interceptors.request.use(request => {
  //给所有请求添加自定义header
  // request.headers['Content-Type'] = 'application/json';

  // const token = uni.getStorageSync('token');     //关于token的用法
  // console.log(JSON.stringify(token));
  // if (token) {
  request.headers['token'] = wx.getStorageSync("userInfo").token;;
  // }
  //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  // if ((request.method === 'post'||request.method === 'POST') && request.body) {
  //   request.body = Qs.stringify(request.body)

  // }
  return request;
});

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  response => {
    //只将请求结果的data字段返回
    // const {errno,errmsg} = response.data
    // 这个是正确的状态码，根据实际情况修改
    // if(errno==1000){
      
      if(response.data.code==10600){
        // console.log(wx.navigateTo)
        wx.navigateTo({
          url: "../pages/userInfo/main"
        });
      }
    return response.data; // 这里直接返回的data，再使用似可以少写次data
    // } else {
    // 这里是错误处理，进行错误提示和跳转到未登录页面等
    //console.error(errmsg) 
    //return Promise.reject(errmsg) 
    // }
  },
  err => {
    //发生网络错误后会走到这里
    // return Promise.resolve("网络错误")
  }
);

export default fly;