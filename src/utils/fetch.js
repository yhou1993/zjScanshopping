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

//键值对拼接 例如：{a:1,b:2}   a=1&b=2
const queryParameters = (data) => {
  return Object.keys(data).map(
    (key) => {
      return [key, data[key]].join('=');
    }
  ).join('&');
};

const signFunction = (data) => {
  data = objectToString(data);
  data = stringSort(data);
  data = (appConfig.validatename + appConfig.Password + data + new Date().getTime()).toLowerCase();
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
  // options.data.validatename = appConfig.validatename;

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
        wx.hideLoading();
        console.log(JSON.stringify(res));
        let error = {};
        if (res.statusCode == 200) {
          if(res.data.Success == false || res.data.Success == 'false' || res.data.success == false || res.data.success == 'false'){
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
      fail: function (error) {
        console.log(JSON.stringify(error));
        wx.hideLoading();
        let Error = {};
        Error.message = '内部请求异常,请稍后重试';
        reject(Error)
      }
    })
  })
};
