// pages/register/register.js
import Notify from '../../components/vant/notify/notify';
const app = getApp();
import {
  $post
} from '../../utils/requestbasic.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      username: "",
      tel: "",
      password: "",
      passwordAsc: "",
    }
  },

  async sign() {
    console.log(app.globalData.userInfo.avatarUrl)
    let res = await $post('/User/sign', {
      username: this.data.userInfo.username,
      phone: this.data.userInfo.tel,
      password: this.data.userInfo.password,
      password_again: this.data.userInfo.passwordAsc,
      faceUrl:app.globalData.userInfo.avatarUrl
    }, {
      'content-Type': 'application/json',
      'Cookie': wx.getStorageSync('cookieKey')
    })
    console.log(res)
    if (res.error_code === 0) {
      console.log("-----------", res)

      Notify({
        message: '注册成功',
        color: '#ad26a8',
        background: '#ffe1e1'
      });

      app.globalData.userInfo = res.data

      wx.redirectTo({
        url: '../squre/squre',
      })
    } else {
      if (res.error_code === 3) {
        Notify({
          message: '注册失败,手机号已被注册',
          color: '#ad26a8',
          background: '#ffe1e1'
        });
      }
    }
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
  setPasswordAsc(e) {
    this.data.userInfo.passwordAsc = e.detail
    this.setData({
      userInfo: this.data.userInfo
    })
  },

  register() {
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

    if (this.data.userInfo.password !== this.data.userInfo.passwordAsc) {
      return Notify({
        message: '两次密码不一致 ， 请重新输入',
        color: '#ad26a8',
        background: '#ffe1e1'
      });
    }

    this.sign();
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