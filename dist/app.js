'use strict';

var _WeAppStorage = require('./utils/WeAppStorage');

var _WeAppStorage2 = _interopRequireDefault(_WeAppStorage);

var _auth = require('./actions/auth');

var _index = require('./libs/index');

var _fetch = require('./utils/fetch');

var _index2 = require('./reducers/index');

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//app.js
var Provider = _index.WeAppRedux.Provider;
var persistStore = _index.ReduxPersist.persistStore,
    autoRehydrate = _index.ReduxPersist.autoRehydrate;
var createStore = _index.Redux.createStore,
    compose = _index.Redux.compose,
    applyMiddleware = _index.Redux.applyMiddleware;


var devtool = (0, _index.RemoteReduxDevTools)({ hostname: 'localhost', port: 5678, secure: false });

var store = createStore(_index3.default, //所有state
compose(applyMiddleware(_index.thunk), autoRehydrate(), devtool)
//compose 合并为一个参数 applyMiddleware(thunk)使用中间件，操作state
//autoRehydrate()自动增强器，他会做些简单的合并逻辑，而且如果 state 被 reducer 改变了，他也会「聪明的」用改动后的值替换掉 storage 中原来的值
//devtool 监听state变化
);

var tryToLogin = function tryToLogin(err, state) {
  console.log(JSON.stringify(state));
  // if (!state || !state.auth || !state.auth.authenticated || (state.auth.expiredAt + 604800000) <= new Date().getTime()) {
  // }
  wx.checkSession({
    success: function success() {
      console.log('session_key 未过期');
    },
    fail: function fail() {
      console.log('session_key 过期');
      wx.login({
        success: function success(res) {
          if (res.code) {
            console.log('获取用户登录状态成功' + JSON.stringify(res));
            (0, _fetch.fetchJson)({
              url: _index.appConfig.apiBaseUrl + 'MiniProgram/WeChat/onLogin',
              data: { code: res.code }
            }).then(function (rd) {
              store.dispatch((0, _auth.login)(rd.data.openid, rd.data.session_key));
            }).catch(function (error) {});
          } else {
            console.log('获取用户登录状态失败');
          }
        },
        fail: function fail(res) {
          console.log('获取用户登录状态失败');
        }
      });
    }
  });
};

persistStore(store, { storage: _WeAppStorage2.default, debounce: 200, whitelist: ['auth'] }, tryToLogin); //永久储存store('auth')

App(Provider(store)({
  onLaunch: function onLaunch() {
    var that = this;
    wx.getSystemInfo({
      success: function success(res) {
        console.log(JSON.stringify(res));
        that.globalData.systemInfo = res;
      }
    });
  },
  globalData: {
    systemInfo: {},
    userInfo: null
  }
}));