/*  axios不是一种新的技术。axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端，本质上也是对原生XHR的封装，只不过它是Promise的实现版本，符合最新的ES规范，有以下特点：
    从浏览器中创建 XMLHttpRequests
    从 node.js 创建 http 请求
    支持 Promise API
    拦截请求和响应
    转换请求数据和响应数据
    取消请求
    自动转换 JSON 数据
    客户端支持防御 XSRF
    http://www.axios-js.com/zh-cn/docs/
    https://www.cnblogs.com/ginkgo-leaves/p/11477373.html 
*/

import axios from "axios";
import { Message } from "element-ui";

//提示框
const tip = msg => {
  Message({
    message: msg,
    type: "error",
    duration: 3 * 1000
  });
};

//创建axios实例
const instance = axios.create({
  // 环境的切换
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://47.94.205.149:8335"
      : "http://47.94.205.149:8335",
  responseType: "json", // default
  //请求超时时间
  timeout: 5000
});

//设置Content-Type 默认情况下，axios将JavaScript对象序列化为JSON。
instance.defaults.headers.post["Content-Type"] =
  "application/json;charset=UTF-8";

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    // const token = store.state.token;
    // token && (config.headers.Authorization = token);
    return config;
  },
  error => {
    console.log("request_error"); // for debug
    return Promise.reject(error); 
  }
);

//响应拦截器
instance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      // 对响应数据做点什么
      return response.data;
    } else {
      console.log("response_error_not_200"); // for debug
      return Promise.reject(response); 
    }
  },
  error => {
    const { response, message } = error;
    if (response) {
      // 有response 状态码判断
      switch (response.status) {
        case 401:
          tip("未登录，请先登录");
          break;
        case 404:
          tip("请求的资源不存在");
          break;
        default:
          tip(message);
      }
    } else {
      //没有response 超时等情况
      tip(message);
    }
    return Promise.reject(error);
  }
);

export default instance;
