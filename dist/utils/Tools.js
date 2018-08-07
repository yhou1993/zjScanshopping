'use strict';

var _fetch = require('./fetch');

var _city = require('./city');

var _enhancedConnect = require('./enhancedConnect');

var _WeAppStorage = require('./WeAppStorage');

var _WeAppStorage2 = _interopRequireDefault(_WeAppStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// check mobile validity
var checkMobile = function checkMobile(data) {
  var regMobile = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/; //手机
  // let regTel1 = /^(0\d{2,3}-)?[\d]{7,8}$/; //座机带区号
  if (!data) {
    return false;
  } else if (regMobile.test(data)) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  checkMobile: checkMobile,
  fetchJson: _fetch.fetchJson,
  area: _city.area,
  enhancedConnect: _enhancedConnect.enhancedConnect,
  WeAppStorage: _WeAppStorage2.default
};