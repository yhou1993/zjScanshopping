'use strict';

var _Tools = require('../../utils/Tools');

var _libs = require('../../libs');

Page({
  data: {
    passwordLogin: false,
    canClick: false,
    inputPhone: '',
    inputConfirm: '',
    timeCheck: 0
  },
  _pageTo: function _pageTo(event, url) {
    if (url) {
      wx.navigateTo({
        url: url
      });
    } else if (event && event.currentTarget.dataset.url) {
      wx.navigateTo({
        url: event.currentTarget.dataset.url
      });
    }
  },
  _passwordView: function _passwordView() {},
  _Login: function _Login() {},
  _getConfirm: function _getConfirm() {
    var _this = this;

    if (this.data.timeCheck > 0) return;

    if (!(0, _Tools.checkMobile)(this.data.inputPhone)) {
      wx.showModal({
        title: '温馨提示',
        content: '请输入正确的手机号',
        showCancel: false
      });
      return;
    }

    var openid = '';
    _Tools.WeAppStorage.getItem('reduxPersist:auth', function (error, dat) {
      if (!error) {
        console.log(dat);
        openid = dat.openid;
      }
    });
    (0, _Tools.fetchJson)({
      url: _libs.appConfig.apiBaseUrl + 'MiniProgram/Message/SendLoginCode',
      data: { openId: openid, encryptedData: this.data.inputPhone },
      method: 'GET'
    }).then(function (rd) {
      wx.showToast({
        title: rd.Msg,
        icon: 'success',
        duration: 2000
      });
      _this.setData({
        timeCheck: 300
      });
      _this.setupTimer();
    }).catch(function (error) {
      wx.showToast({
        title: error.message || '请求失败,请稍后重试！',
        icon: 'none',
        duration: 2000
      });
    });
  },
  setupTimer: function setupTimer() {
    var _this2 = this;

    clearTimeout(this.timer);
    this.timer = setTimeout(function () {
      _this2.checkTime();
    }, 1000);
  },
  checkTime: function checkTime() {
    if (this.data.timeCheck > 0) {
      this.setData({ timeCheck: this.data.timeCheck - 1 });
      this.setupTimer();
    }
  },

  bindKeyInput: function bindKeyInput(e) {
    if (e && e.currentTarget.dataset.Type && e.currentTarget.dataset.Type == 'phone') {
      this.data.inputPhone = e.detail.value;
    } else if (e && e.currentTarget.dataset.Type && e.currentTarget.dataset.Type == 'confirm') {
      this.data.inputConfirm = e.detail.value;
    }
    if (this.data.inputConfirm && this.data.inputPhone) {
      this.data.canClick = true;
    } else {
      this.data.canClick = false;
    }
    this.setData(this.data);
  }
});