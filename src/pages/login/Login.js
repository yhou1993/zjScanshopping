import {
  loginActions
} from '../../actions/loginActions';
import {checkMobile, fetchJson, WeAppStorage} from '../../utils/Tools'
import {appConfig, MD5} from "../../libs/index";

let openid = '';

var app = getApp();

Page({
  data: {
    passwordLogin: false,
    canClick: false,
    canClick2: false,
    inputPhone: '',
    inputConfirm: '',
    inputPhone1: '',
    inputPassword: '',
    timeCheck: 0,
    passwordView: false
  },
  onLoad: function () {
    WeAppStorage.getItem('reduxPersist:auth', (error, dat) => {
      if (!error) {
        console.log(dat);
        openid = JSON.parse(dat).openid;
      }
    });
  },
  _pageTo: function (event, url) {
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
  _passwordView: function () {
    this.setData({
      passwordView: !this.data.passwordView
    })
  },
  _forgetPassword: function () {

  },
  _Login: function (e) {
    let ERROR = false;
    let message = '';
    let url = '';
    let data = {};
    if (!this.data.passwordView) {
      if (!ERROR && !checkMobile(this.data.inputPhone)) {
        ERROR = true;
        message = '请输入正确的手机号';
      }
      if (!ERROR && !this.data.inputConfirm) {
        ERROR = true;
        message = '请输入验证码';
      }
      url = appConfig.apiBaseUrl + 'MiniProgram/Member/LoginBySmsCode';
      data = {
        openId: openid,
        phone: this.data.inputPhone,
        smsCode: this.data.inputConfirm,
        unionId: '',
        nickName: '',
        headImg: ''
      }
    } else if (this.data.passwordView) {
      if (!ERROR && !this.data.inputPhone1) {
        ERROR = true;
        message = '请输入用户名或手机号';
      }
      if (!ERROR && !this.data.inputPassword) {
        ERROR = true;
        message = '请输入密码';
      }
      url = appConfig.apiBaseUrl + 'MiniProgram/Member/LoginByPwd';
      data = {
        openId: openid,
        phone: this.data.inputPhone1,
        pwd: this.data.inputPassword
      }
    }

    if (ERROR) {
      wx.showModal({
        title: '温馨提示',
        content: message,
        showCancel: false
      });
      return;
    }

    fetchJson({
      url: url,
      data: data,
      method: 'POST',
    }).then((rd) => {
      WeAppStorage.setItem('uerInfo', JSON.stringify(rd.Data));
      app.stores.dispatch(loginActions());
      this._pageBack();
    }).catch((error) => {
      wx.showToast({
        title: error.message || '请求失败,请稍后重试！',
        icon: 'none',
        duration: 2000
      });
    });
  },
  _pageBack: function (num) {
    wx.navigateBack({
      delta: num ? num : 1
    })
  },
  _getConfirm: function () {
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
    fetchJson({
      url: appConfig.apiBaseUrl + 'MiniProgram/Message/SendLoginCode',
      data: {openId: openid, phone: this.data.inputPhone},
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
  setupTimer: function () {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.checkTime()
    }, 1000);
  },
  checkTime: function () {
    if (this.data.timeCheck > 0) {
      this.setData({timeCheck: this.data.timeCheck - 1});
      this.setupTimer();
    }
  },
  bindKeyInput: function (e) {
    // console.log(JSON.stringify(e));
    if (e && e.currentTarget.dataset.type && e.currentTarget.dataset.type == 'phone') {
      this.data.inputPhone = e.detail.value;
    } else if (e && e.currentTarget.dataset.type && e.currentTarget.dataset.type == 'confirm') {
      this.data.inputConfirm = e.detail.value;
    } else if (e && e.currentTarget.dataset.type && e.currentTarget.dataset.type == 'account') {
      this.data.inputPhone1 = e.detail.value;
    } else if (e && e.currentTarget.dataset.type && e.currentTarget.dataset.type == 'password') {
      this.data.inputPassword = e.detail.value;
    }

    if (this.data.inputConfirm && this.data.inputPhone) {
      this.data.canClick = true
    } else {
      this.data.canClick = false
    }
    if (this.data.inputPhone1 && this.data.inputPassword) {
      this.data.canClick2 = true
    } else {
      this.data.canClick2 = false
    }

    this.setData(this.data)
  },
});