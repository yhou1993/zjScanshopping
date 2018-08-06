import {
  showNotification,
  hideNotification,
} from '../../actions/notificationActions';
import {enhancedConnect} from '../../utils/enhancedConnect';
import {Redux, appConfig} from '../../libs/index'
import {fetchJson} from '../../utils/fetch';
import WeAppStorage from '../../utils/WeAppStorage';

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

    if(e.detail.iv){
      let session_key = '';
      WeAppStorage.getItem('reduxPersist:auth', (error, dat) => {
        if (!error) {
          console.log(dat);
          session_key = dat.session_key;
        }
      });

      let encryptedData = e.detail.encryptedData;
      let iv = e.detail.iv;

      fetchJson({
        url: appConfig.apiBaseUrl + 'wechatminiprogram/decryptdata',
        data: {sessionKey: session_key, encryptedData: encryptedData, iv: iv},
        method: 'GET',
      }).then((rd) => {
      }).catch((error) => {
      });
    }else {

    }
  },
  onLoad: function () {
    let _this = this;
    WeAppStorage.getItem('uerInfo', (error, dat) => {
      if (error) {
        // wx.hideTabBar();
        _this.setData( {
          popModal: true
        })
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
  onUnload() {
    // this.unsubscribe();
  },
  onShow() {
    // console.log(this.data.isShowProjectForm)
  }
};

const mapStateToData = (state) => {
  return {
    notification: state.notification
  }
};
const mapDispatchToPage = (dispatch) => { //绑定action后可以使用this.store.dispatch(showProjectForm) || this.showProject()
  return {
    showNotification: Redux.bindActionCreators(showNotification, dispatch),
    hideNotification: Redux.bindActionCreators(hideNotification, dispatch)
  }
};

const nextPageConfig = enhancedConnect(mapStateToData, mapDispatchToPage)(pageConfig);
Page(nextPageConfig);