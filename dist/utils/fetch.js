'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchJson = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _index = require('../libs/index');

var preDefinedError = {
  404: '请求地址不存在',
  500: '服务器发生错误',
  401: '用户未认证'
};

var stringSort = function stringSort(str) {
  //排序的函数
  console.log(str);
  var ARR = str.split('');
  ARR = ARR.sort();
  ARR = ARR.join('');
  return ARR;
};

var deleteNullOrEmpty = function deleteNullOrEmpty(obj) {
  //去空函数
  var newObj = {};
  for (var i in obj) {
    //遍历newkey数组
    if (obj[i] !== null && obj[i] !== '') {
      var j = i.toLowerCase();
      newObj[j] = obj[i]; //向新创建的对象中按照排好的顺序依次增加键值对
    }
  }
  return newObj;
};

var objectToString = function objectToString(obj) {
  //键值对拼接
  var StrA = [];
  var STR = '';
  for (var i in obj) {
    //遍历newkey数组
    var str = i + '=' + obj[i];
    StrA.push(str);
  }
  STR = StrA.join('&');
  return STR;
};

//键值对拼接 例如：{a:1,b:2}   a=1&b=2
var queryParameters = function queryParameters(data) {
  return Object.keys(data).map(function (key) {
    return [key, data[key]].join('=');
  }).join('&');
};

var signFunction = function signFunction(data) {
  data = objectToString(data);
  data = stringSort(data);
  data = (_index.appConfig.validatename + _index.appConfig.Password + data).toLowerCase();
  console.log(data);
  var s = (0, _index.MD5)(data);
  console.log(s);
  return s;
};

//数据请求
var fetchJson = exports.fetchJson = function fetchJson() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '加载中';

  if (message != "") {
    wx.showLoading({
      title: message
    });
    // wx.showNavigationBarLoading();
  }

  var requestHeaders = options.header || { 'Content-Type': 'application/x-www-form-urlencoded' };

  var params = {
    header: requestHeaders,
    method: options.method || 'GET'
  };

  if (!options.data) {
    options.data = {};
  }

  options.data.expires = new Date().getTime();
  options.data.sign = signFunction(options.data);
  // options.data.validatename = appConfig.validatename;

  var url = options.url;
  if (params.method == 'GET') {
    url += '?' + queryParameters(options.data);
  } else if (params.method == 'POST') {
    params.data = options.data;
  }

  console.log(url);
  console.log(JSON.stringify(params));

  return new Promise(function (resolve, reject) {
    wx.request(_extends({
      url: url
    }, params, {
      success: function success(res) {
        wx.hideLoading();
        console.log(JSON.stringify(res));
        var error = {};
        if (res.statusCode == 200) {
          if (res.data.Success == false || res.data.Success == 'false' || res.data.success == false || res.data.success == 'false') {
            error.message = res.data.Msg || res.data.msg || res.data.Message || res.data.message || '请求失败,请稍后重试';
            reject(error);
            return;
          }
          resolve(res.data);
        } else {
          error.message = preDefinedError[res.statusCode] || '请求失败,请稍后重试';
          reject(error);
        }
      },
      fail: function fail(error) {
        console.log(JSON.stringify(error));
        wx.hideLoading();
        var Error = {};
        Error.message = '内部请求异常,请稍后重试';
        reject(Error);
      }
    }));
  });
};