// 储存数据
const WeAppStorage = {
  setItem: function (key, value, callback = () => {
  }) {
    wx.setStorage({key: key, data: value, fail: () => callback('false')})
  },
  getItem: function (key, callback = () => {
  }) {
    wx.getStorage({key: key, success: (res) => callback(undefined, res.data), fail: () => callback('false')})
  },
  removeItem: function (key, callback = () => {
  }) {
    wx.removeStorage({key: key, fail: () => callback('false')})
  },
  getAllKeys: function (callback = () => {
  }) {
    wx.getStorageInfo({success: (res) => callback && callback(undefined, res.keys), fail: () => callback('false')})
  }
};

export default WeAppStorage