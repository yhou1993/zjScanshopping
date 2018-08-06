'use strict';

//protocol.js
//获取应用实例
var app = getApp();

Page({
  data: {},
  onLoad: function onLoad(options) {
    // 生命周期函数--监听页面加载
    //String2
  },
  onReady: function onReady() {
    // 生命周期函数--监听页面初次渲染完成
    //String3
  },
  onShow: function onShow() {
    // 生命周期函数--监听页面显示
    //String4
  },
  onHide: function onHide() {
    // 生命周期函数--监听页面隐藏
    //String5
  },
  onUnload: function onUnload() {
    // 生命周期函数--监听页面卸载
    //String6
  },
  onPullDownRefresh: function onPullDownRefresh() {
    // 页面相关事件处理函数--监听用户下拉动作
    //String7
  },
  onReachBottom: function onReachBottom() {
    // 页面上拉触底事件的处理函数
    //String8
  },
  onShareAppMessage: function onShareAppMessage() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    };
  }
});