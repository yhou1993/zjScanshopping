let appConfig = {
  apiBaseUrl: 'http://mall.zhongjiu.cn/',
  validatename: 'mini',
  Password: "m1i2n3i4p@5#r6o$7g8!r9a0m",
};

if (process.env.NODE_ENV == 'development') {
  appConfig.apiBaseUrl = "http://mall.zhongjiu.cn/";
}

export default appConfig;