'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enhancedConnect = enhancedConnect;

var _index = require('../libs/index');

function enhancedConnect(mapToState, mapToDispatch) {
  return function (pageConfig) {
    return _index.WeAppRedux.connect(mapToState, mapToDispatch)(pageConfig);
  };
}