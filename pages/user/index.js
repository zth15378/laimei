import { requestServerData} from '../../utils/request.js'
const app=getApp();
Page({
  data: {
      showLogin:false,
      userInfo:{}
  },
  onLoad() {
    requestServerData('Login/LoginSub','POST',{
      code:app.globalData.code
    })
    .then( res =>{
      app.globalData.token=res.result.token;
      console.log(res.result.user)
      if (res.result.user==''){
        this.setData({
          showLogin:true
        })
      }else{
        this.setData({
          userInfo:res.result.user
        })
      }
    })
    .catch( res =>{
      wx.showToast({
        title: res.message,
        icon:'none'
      })
    })
  },
  // 获取用户信息
  bindGetUserInfo() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              app.globalData.iv = res.iv;
              app.globalData.encryptedData = res.encryptedData;
              app.globalData.rawData = res.rawData;
              app.globalData.signature = res.signature;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              wx.redirectTo({
                url: '../login/index',
              })
            }
          })
        }
      }
    })
  },
  //更新资料
  handlerUpdate() {
    requestServerData('Login/LoginSub', 'POST', {
      code: app.globalData.code
    })
      .then(res => {
        app.globalData.token = res.result.token;
        console.log(res.result.user)
        if (res.result.user == '') {
          this.setData({
            showLogin: true
          })
        } else {
          wx.showToast({
            title: '更新成功',
            icon:'none'
          })
          this.setData({
            userInfo: res.result.user
          })
        }
      })
      .catch(res => {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      })
  },
  onShareAppMessage: function () {

  }
})