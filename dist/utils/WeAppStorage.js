'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// 储存数据
var WeAppStorage = {
  setItem: function setItem(key, value) {
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    wx.setStorage({ key: key, data: value, fail: function fail() {
        return callback('false');
      } });
  },
  getItem: function getItem(key) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    wx.getStorage({ key: key, success: function success(res) {
        return callback(undefined, res.data);
      }, fail: function fail() {
        return callback('false');
      } });
  },
  removeItem: function removeItem(key) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    wx.removeStorage({ key: key, fail: function fail() {
        return callback('false');
      } });
  },
  getAllKeys: function getAllKeys() {
    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

    wx.getStorageInfo({ success: function success(res) {
        return callback && callback(undefined, res.keys);
      }, fail: function fail() {
        return callback('false');
      } });
  }
};

exports.default = WeAppStorage;