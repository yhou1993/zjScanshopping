'use strict';
import {checkMobile, fetchJson, WeAppStorage} from '../../utils/Tools'
import {appConfig} from "../../libs";

Page({
  data: {
    passwordLogin: false,
    canClick: false,
    inputPhone: '',
    inputConfirm: '',
    timeCheck: 0,
  },
  _pageTo(event, url) {
    if (url) {
      wx.navigateTo({
        url: url
      })
    } else if (event && event.currentTarget.dataset.url) {
      wx.navigateTo({
        url: event.currentTarget.dataset.url
      })
    }
  },
  _passwordView() {

  },
  _Login() {

  },
  _getConfirm() {
    if (this.data.timeCheck > 0)
      return;

    if (!checkMobile(this.data.inputPhone)) {
      wx.showModal({
        title: '温馨提示',
        content: '请输入正确的手机号',
        showCancel: false
      });
      return;
    }

    let openid = '';
    WeAppStorage.getItem('reduxPersist:auth', (error, dat) => {
      if (!error) {
        console.log(dat);
        openid = dat.openid;
      }
    });
    fetchJson({
      url: appConfig.apiBaseUrl + 'MiniProgram/Message/SendLoginCode',
      data: {openId: openid, encryptedData: this.data.inputPhone},
      method: 'GET',
    }).then((rd) => {
      wx.showToast({
        title: rd.Msg,
        icon: 'success',
        duration: 2000
      });
      this.setData({
        timeCheck: 300,
      });
      this.setupTimer();
    }).catch((error) => {
      wx.showToast({
        title: error.message || '请求失败,请稍后重试！',
        icon: 'none',
        duration: 2000
      });
    });
  },
  setupTimer() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.checkTime()
    }, 1000);
  },
  checkTime() {
    if (this.data.timeCheck > 0) {
      this.setData({timeCheck: this.data.timeCheck - 1});
      this.setupTimer();
    }
  },
  bindKeyInput: function (e) {
    if (e && e.currentTarget.dataset.Type && e.currentTarget.dataset.Type == 'phone') {
      this.data.inputPhone = e.detail.value;
    } else if (e && e.currentTarget.dataset.Type && e.currentTarget.dataset.Type == 'confirm') {
      this.data.inputConfirm = e.detail.value;
    }
    if (this.data.inputConfirm && this.data.inputPhone) {
      this.data.canClick = true
    } else {
      this.data.canClick = false
    }
    this.setData(this.data)
  },
});