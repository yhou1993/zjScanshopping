import {MD5, appConfig} from '../libs/index';

const preDefinedError = {
  404: '请求地址不存在',
  500: '服务器发生错误',
  401: '用户未认证'
};

const stringSort = (str) => {//排序的函数
  console.log(str);
  let ARR = str.split('');
  ARR = ARR.sort();
  ARR = ARR.join('');
  return ARR;
};

const deleteNullOrEmpty = (obj) => {//去空函数
  let newObj = {};
  for (let i in obj) {//遍历newkey数组
    if (obj[i] !== null && obj[i] !== '') {
      let j = i.toLowerCase();
      newObj[j] = obj[i];//向新创建的对象中按照排好的顺序依次增加键值对
    }
  }
  return newObj;
};

const objectToString = (obj) => { //键值对拼接
  let StrA = [];
  let STR = '';
  for (let i in obj) {//遍历newkey数组
    let str = i + '=' + obj[i];
    StrA.push(str);
  }
  STR = StrA.join('&');
  return STR;
};

//拼接参数 例如：{a:1,b:2}   a=1&b=2
export const queryParameters = (data) => {
  return Object.keys(data).map(
    (key) => {
      return [key, data[key]].join('=');
    }
  ).join('&');
};

const signFunction = (data) => {
  data = objectToString(data);
  data = stringSort(data);
  data = (appConfig.validatename + appConfig.Password + data).toLowerCase();
  console.log(data);
  let s = MD5(data);
  console.log(s);
  return s;
};

//数据请求
export const fetchJson = (options = {}, message = '加载中') => {
  if (message != "") {
    wx.showLoading({
      title: message,
    });
    // wx.showNavigationBarLoading();
  }

  const requestHeaders = options.header || {'content-type': 'application/json'};

  let params = {
    header: requestHeaders,
    method: options.method || 'GET',
  };

  if (!options.data) {
    options.data = {}
  }

  options.data.sign = signFunction(options.data);
  options.data.validatename = appConfig.validatename;

  let url = options.url;
  if (params.method == 'GET') {
    url += `?${queryParameters(options.data)}`;
  } else if (params.method == 'POST') {
    params.data = options.data;
  }

  console.log(url);
  console.log(JSON.stringify(params));

  return new Promise((resolve, reject) => {
    wx.request({
      url,
      ...params,
      success: function (res) {
        // wx.hideNavigationBarLoading();
        wx.hideLoading();
        console.log(JSON.stringify(res));
        if (res.statusCode == 200) {
          resolve(res);
        } else {
          reject(new Error((res && res.data && res.data.message) || preDefinedError[res.statusCode] || '请求失败,请重试'));
        }
      },
      fail: function (error) {
        // wx.hideNavigationBarLoading();
        wx.hideLoading();
        console.log(JSON.stringify(error));
        reject(error)
      }
    })
  })
};
