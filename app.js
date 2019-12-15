//app.js
App({
  onLaunch: function () {
    // 展示本地存储
    wx.login({
      success: res => {
        this.globalData.code=res.code;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
 
  },
  globalData: {
    encryptedData:'',
    iv:'',
    rawData:'',
    signature:'',
    code:'',
    token:''
  }
})