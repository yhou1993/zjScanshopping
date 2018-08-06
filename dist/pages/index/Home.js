'use strict';

var _notificationActions = require('../../actions/notificationActions');

var _enhancedConnect = require('../../utils/enhancedConnect');

var _index = require('../../libs/index');

var _fetch = require('../../utils/fetch');

var _WeAppStorage = require('../../utils/WeAppStorage');

var _WeAppStorage2 = _interopRequireDefault(_WeAppStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pageConfig = {
  data: {
    popModal: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  newDate: {//区分redux更新字段
  },
  getPhoneNumber: function getPhoneNumber(e) {
    console.log("errMsg=" + e.detail.errMsg);
    console.log("iv=" + e.detail.iv);
    console.log("encryptedData=" + e.detail.encryptedData);

    if (e.detail.iv) {
      var session_key = '';
      _WeAppStorage2.default.getItem('reduxPersist:auth', function (error, dat) {
        if (!error) {
          console.log(dat);
          session_key = dat.session_key;
        }
      });

      var encryptedData = e.detail.encryptedData;
      var iv = e.detail.iv;

      (0, _fetch.fetchJson)({
        url: _index.appConfig.apiBaseUrl + 'wechatminiprogram/decryptdata',
        data: { sessionKey: session_key, encryptedData: encryptedData, iv: iv },
        method: 'GET'
      }).then(function (rd) {}).catch(function (error) {});
    } else {}
  },
  onLoad: function onLoad() {
    var _this = this;
    _WeAppStorage2.default.getItem('uerInfo', function (error, dat) {
      if (error) {
        // wx.hideTabBar();
        _this.setData({
          popModal: true
        });
      } else {
        console.log(dat);
      }
    });
    // 查看是否授权
    // wx.getSetting({
    //   success: function (res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       console.log('已经授权');
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console.log("UserInfo=" + res.userInfo)
    //         }
    //       })
    //     } else {
    //       console.log('未授权')
    //     }
    //   }
    // })


    // this.store.subscribe(() => {//监听
    //   let State = this.store.getState();
    //   if (State && State.projects) {
    //     if (State.projects.type == 'SHOW_PROJECT_FORM' && this.newDate['SHOW_PROJECT_FORM'] !== State.projects.expiredAt) {
    //       this.newDate['SHOW_PROJECT_FORM'] = State.projects.expiredAt;
    //       console.log(State.projects)
    //     }
    //   }
    // })
  },
  onUnload: function onUnload() {
    // this.unsubscribe();
  },
  onShow: function onShow() {
    // console.log(this.data.isShowProjectForm)
  }
};

var mapStateToData = function mapStateToData(state) {
  return {
    notification: state.notification
  };
};
var mapDispatchToPage = function mapDispatchToPage(dispatch) {
  //绑定action后可以使用this.store.dispatch(showProjectForm) || this.showProject()
  return {
    showNotification: _index.Redux.bindActionCreators(_notificationActions.showNotification, dispatch),
    hideNotification: _index.Redux.bindActionCreators(_notificationActions.hideNotification, dispatch)
  };
};

var nextPageConfig = (0, _enhancedConnect.enhancedConnect)(mapStateToData, mapDispatchToPage)(pageConfig);
Page(nextPageConfig);