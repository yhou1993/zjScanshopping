import {
  loginActions
} from '../../actions/loginActions';
import {enhancedConnect, fetchJson, WeAppStorage} from '../../utils/Tools';
import {Redux, appConfig} from '../../libs/index'

var app = getApp();

const pageConfig = {
  data: {
    popModal: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  newDate: {//区分redux更新字段
  },
  getPhoneNumber: function (e) {
    console.log("errMsg=" + e.detail.errMsg);
    console.log("iv=" + e.detail.iv);
    console.log("encryptedData=" + e.detail.encryptedData);

    if (e.detail.iv) {
      let session_key = '';
      let encryptedData = '';
      let iv = '';
      let openid = '';
      WeAppStorage.getItem('reduxPersist:auth', (error, dat) => {
        if (!error) {
          console.log(dat);
          session_key = JSON.parse(dat).session_key;
          encryptedData = e.detail.encryptedData;
          iv = e.detail.iv;
          openid = JSON.parse(dat).openid;
          fetchJson({
            url: appConfig.apiBaseUrl + 'MiniProgram/WeChat/decryptData',
            data: {sessionKey: session_key, encryptedData: encryptedData, iv: iv},
            method: 'POST',
          }).then((rd) => {
            fetchJson({
              url: appConfig.apiBaseUrl + 'MiniProgram/Member/LoginByWeChat',
              data: {
                openId: openid,
                sessionKey: session_key,
                encryptedData: encryptedData,
                iv: iv,
                unionId: '',
                nickName: '',
                headImg: ''
              },
              method: 'POST',
            }).then((Rd) => {
              WeAppStorage.setItem('uerInfo', JSON.stringify(Rd.Data));
              this.loginActions();
            }).catch((error) => {
              wx.showToast({
                title: error.message || '请求失败,请稍后重试！',
                icon: 'none',
                duration: 2000
              });
            });
          }).catch((error) => {
            wx.showToast({
              title: error.message || '请求失败,请稍后重试！',
              icon: 'none',
              duration: 2000
            });
          });
        }
      });
    } else {
      this._pageTo(null, '../login/Login')
    }
  },
  onLoad: function () {
    let _this = this;
    WeAppStorage.getItem('uerInfo', (error, dat) => {
      if (error) {
        _this.setData({
          popModal: true
        })
      } else {
        console.log(dat);
      }
    });
    this.store.subscribe(() => {//监听
      let State = this.store.getState();
      if (State && State.login) {
        if (State.login.type == 'Login_Success' && this.newDate['Login_Success'] !== State.login.expiredAt) {
          this.newDate['Login_Success'] = State.login.expiredAt;
          console.log(State.login);
          this.setData({
            popModal: false
          })
        }
      }
    })
  },
  onUnload() {
    this.unsubscribe();
  },
  onShow() {
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
  }
};

const mapStateToData = (state) => {
  return {
    login: state.login
  }
};
const mapDispatchToPage = (dispatch) => { //绑定action后可以使用this.store.dispatch(loginActions) || this.loginActions()
  return {
    loginActions: Redux.bindActionCreators(loginActions, dispatch)
  }
};

const nextPageConfig = enhancedConnect(mapStateToData, mapDispatchToPage)(pageConfig);
Page(nextPageConfig);