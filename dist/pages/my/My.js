'use strict';

var _loginActions = require('../../actions/loginActions');

var _Tools = require('../../utils/Tools');

var _index = require('../../libs/index');

var app = getApp();

var pageConfig = {
  data: {
    popModal: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  newDate: {//区分redux更新字段
  },
  getPhoneNumber: function getPhoneNumber(e) {
    var _this2 = this;

    console.log("errMsg=" + e.detail.errMsg);
    console.log("iv=" + e.detail.iv);
    console.log("encryptedData=" + e.detail.encryptedData);

    if (e.detail.iv) {
      var session_key = '';
      var encryptedData = '';
      var iv = '';
      var openid = '';
      _Tools.WeAppStorage.getItem('reduxPersist:auth', function (error, dat) {
        if (!error) {
          console.log(dat);
          session_key = JSON.parse(dat).session_key;
          encryptedData = e.detail.encryptedData;
          iv = e.detail.iv;
          openid = JSON.parse(dat).openid;
          (0, _Tools.fetchJson)({
            url: _index.appConfig.apiBaseUrl + 'MiniProgram/WeChat/decryptData',
            data: { sessionKey: session_key, encryptedData: encryptedData, iv: iv },
            method: 'POST'
          }).then(function (rd) {
            (0, _Tools.fetchJson)({
              url: _index.appConfig.apiBaseUrl + 'MiniProgram/Member/LoginByWeChat',
              data: {
                openId: openid,
                sessionKey: session_key,
                encryptedData: encryptedData,
                iv: iv,
                unionId: '',
                nickName: '',
                headImg: ''
              },
              method: 'POST'
            }).then(function (Rd) {
              _Tools.WeAppStorage.setItem('uerInfo', JSON.stringify(Rd.Data));
              _this2.loginActions();
            }).catch(function (error) {
              wx.showToast({
                title: error.message || '请求失败,请稍后重试！',
                icon: 'none',
                duration: 2000
              });
            });
          }).catch(function (error) {
            wx.showToast({
              title: error.message || '请求失败,请稍后重试！',
              icon: 'none',
              duration: 2000
            });
          });
        }
      });
    } else {
      this._pageTo(null, '../login/Login');
    }
  },
  onLoad: function onLoad() {
    var _this3 = this;

    var _this = this;
    _Tools.WeAppStorage.getItem('uerInfo', function (error, dat) {
      if (error) {
        _this.setData({
          popModal: true
        });
      } else {
        console.log(dat);
      }
    });
    this.store.subscribe(function () {
      //监听
      var State = _this3.store.getState();
      if (State && State.login) {
        if (State.login.type == 'Login_Success' && _this3.newDate['Login_Success'] !== State.login.expiredAt) {
          _this3.newDate['Login_Success'] = State.login.expiredAt;
          console.log(State.login);
          _this3.setData({
            popModal: false
          });
        }
      }
    });
  },
  onUnload: function onUnload() {
    this.unsubscribe();
  },
  onShow: function onShow() {},
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
  }
};

var mapStateToData = function mapStateToData(state) {
  return {
    login: state.login
  };
};
var mapDispatchToPage = function mapDispatchToPage(dispatch) {
  //绑定action后可以使用this.store.dispatch(loginActions) || this.loginActions()
  return {
    loginActions: _index.Redux.bindActionCreators(_loginActions.loginActions, dispatch)
  };
};

var nextPageConfig = (0, _Tools.enhancedConnect)(mapStateToData, mapDispatchToPage)(pageConfig);
Page(nextPageConfig);