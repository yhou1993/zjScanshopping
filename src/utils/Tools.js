import {fetchJson} from './fetch'
import {area} from './city'
import {enhancedConnect} from './enhancedConnect';
import WeAppStorage from './WeAppStorage';

// check mobile validity
const checkMobile = (data) => {
  let regMobile = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;//手机
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
  checkMobile,
  fetchJson,
  area,
  enhancedConnect,
  WeAppStorage
};