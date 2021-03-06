//app.js
import {WeAppStorage, fetchJson} from './utils/Tools';
import {authActions} from './actions/authActions';
import reducers from './reducers/index';
import {Redux, ReduxPersist, thunk, RemoteReduxDevTools, WeAppRedux, appConfig} from './libs/index';

const {Provider} = WeAppRedux;
const {persistStore, autoRehydrate} = ReduxPersist;
const {createStore, compose, applyMiddleware} = Redux;

const devtool = RemoteReduxDevTools({hostname: 'localhost', port: 5678, secure: false});

const store = createStore(
  reducers, //所有state
  compose(applyMiddleware(thunk), autoRehydrate(), devtool)
  //compose 合并为一个参数 applyMiddleware(thunk)使用中间件，操作state
  //autoRehydrate()自动增强器，他会做些简单的合并逻辑，而且如果 state 被 reducer 改变了，他也会「聪明的」用改动后的值替换掉 storage 中原来的值
  //devtool 监听state变化
);

const tryToLogin = (err, state) => {
  console.log(JSON.stringify(state));
  // if (!state || !state.auth || !state.auth.authenticated || (state.auth.expiredAt + 604800000) <= new Date().getTime()) {
  // }
  wx.checkSession({
    success: function () {
      console.log('session_key 未过期');
    },
    fail: function () {
      console.log('session_key 过期');
      wx.login({
        success: function (res) {
          if (res.code) {
            console.log('获取用户登录状态成功' + JSON.stringify(res));
            fetchJson({
              url: appConfig.apiBaseUrl + 'MiniProgram/WeChat/onLogin',
              data: {code: res.code}
            }).then((rd) => {
              store.dispatch(authActions(rd.openid, rd.session_key));
            }).catch((error) => {
            });
          } else {
            console.log('获取用户登录状态失败');
          }
        },
        fail: function (res) {
          console.log('获取用户登录状态失败');
        }
      });
    }
  })
};

persistStore(store, {storage: WeAppStorage, debounce: 200, whitelist: ['auth']}, tryToLogin);//永久储存store('auth')

App(Provider(store)({
  onLaunch: function () {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(JSON.stringify(res));
        that.globalData.systemInfo = res;
      }
    });

    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log('已经授权');
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log("UserInfo=" + res.userInfo);
              that.userInfo = res.userInfo;
            }
          })
        } else {
          console.log('未授权');
        }
      }
    })
  },
  globalData: {
    systemInfo: {},
    userInfo: null
  },
  stores: store
}));