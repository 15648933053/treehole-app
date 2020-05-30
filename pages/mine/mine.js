// pages/mine/mine.js
import Dialog from '../../components/vant/dialog/dialog';
import {
  $post
} from '../../utils/requestbasic';
var isShowToast = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  delete(e) {
    let id = e.currentTarget.dataset.id
    Dialog.confirm({
      message: '确定要删除吗？'
    }).then(() => {
      // on confirm
      this.deleteMessage(id)
      isShowToast = true;
    }).catch(() => {
      // on cancel
    });
  },

  async deleteMessage(id) {
    let res = await $post(
      '/Message/delete_message', {
        user_id: getApp().globalData.userInfo.user_id,
        message_id: this.data.userInfo[id].id
      },
      {
        'content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      }
    )
      console.log(res , "---------")
    this.get_one_user_all_messages()
  },

  squire() {
    wx.redirectTo({
      url: '../squre/squre'
    })
  },

  mine() {
    this.get_one_user_all_messages()
  },

  async get_one_user_all_messages() {
    let res = await $post(
      '/Message/get_one_user_all_messages', {
        user_id: getApp().globalData.userInfo.user_id,
      }, {
        'content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      }
    )
    console.log(res.data)
    this.setData({
      name: res.data[0].username,
      userInfo: res.data
    })
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
    this.get_one_user_all_messages()
  },

  add(){

    //调用接口获取用户的信息
    wx.navigateTo({
      url: '../commit/commit?mas=' + encodeURIComponent(this.data.userInfo.msg),
    })
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