import {
  $post_data,
  $post
} from "../../utils/requestbasic.js"

import Notify from '../../components/vant/notify/notify';
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      tel: "",
      password: "",
    },
    minHour: 10,
    maxHour: 20,
    minDate: new Date(1966, 10, 1).getTime(),
    maxDate: new Date(2099, 10, 1).getTime(),
    currentDate: new Date().getTime(),
  },

  setUserName(e) {
    this.data.userInfo.username = e.detail
    this.setData({
      userInfo: this.data.userInfo
    })
  },
  setTel(e) {
    this.data.userInfo.tel = e.detail
    this.setData({
      userInfo: this.data.userInfo
    })
  },

  setPassword(e) {
    this.data.userInfo.password = e.detail
    this.setData({
      userInfo: this.data.userInfo
    })
  },

  login() {
    //登录判断 ， 获取后端接口
    //判断是否有值
    for (let key in this.data.userInfo) {
      if (!this.data.userInfo[key]) {
        return Notify({
          message: '请完整输入用户信息',
          color: '#ad26a8',
          background: '#ffe1e1'
        });
      }
    }

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/

    if (!myreg.test(this.data.userInfo.tel)) {
      return Notify({
        message: '手机号输入有误 ， 请重新输入',
        color: '#ad26a8',
        background: '#ffe1e1'
      });
    }
    this.loginPan()
  },

  //测试方法
  // async bindd() {
  //   // let createTime = new Date()
  //   // let res = await $post(
  //   //   'http://user.mall.starcpdk.com/insUserInUserMember', {
  //   //     name: "yyf",
  //   //     password: "411",
  //   //     phone: "15648933338",
  //   //     createTime: this.data.currentDate,
  //   //     birthday: this.data.currentDate
  //   //   }
  //   // )
  //   // console.log(res)

  //   let res = await $post(
  //     'http://user.mall.starcpdk.com/getAllUser', {
  //     }
  //   )
  //   console.log(res)
  // },


  async loginPan() {
    let res = await $post(
      '/User/login', {
        phone: this.data.userInfo.tel,
        password: this.data.userInfo.password
      }, {
        'content-Type': 'application/json',
        'Cookie': wx.getStorageSync('cookieKey')
      })


    console.log(res.error_code, res.msg)

    if (res.error_code === 0) {

      getApp().globalData.userInfo = res.dataValue
      console.log(getApp().globalData.userInfo)

      Notify({
        message: '登录成功',
        color: '#ad26a8',
        background: '#ffe1e1'
      });

      //跳转页面
      wx.redirectTo({
        url: '../squre/squre'
      })

    } else {
      if (res.error_code === 2) {
        Notify({
          message: '账号不存在，请注册',
          color: '#ad26a8',
          background: '#ffe1e1'
        });
      }
      if (res.error_code === 3) {
        Notify({
          message: '密码错误',
          color: '#ad26a8',
          background: '#ffe1e1'
        });
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})