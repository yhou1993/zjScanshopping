import WeAppRedux from 'wechat-weapp-redux';
import * as Redux from 'redux';
import * as ReduxPersist from 'redux-persist';//持久化store
import thunk from 'redux-thunk'; //中间件
import MD5 from 'md5';//加密

import appConfig from './appConfig'; //接口环境

let RemoteReduxDevTools = f => f => f;

if (process.env.NODE_ENV !== 'production') {
  RemoteReduxDevTools = require('./remote-redux-devtools').default; //devTool
}

export {Redux, WeAppRedux, ReduxPersist, thunk, RemoteReduxDevTools, appConfig, MD5};
