import {WeAppRedux} from '../libs/index'

export function enhancedConnect(mapToState, mapToDispatch) {
  return function (pageConfig) {
    return WeAppRedux.connect(mapToState, mapToDispatch)(pageConfig)
  }
}