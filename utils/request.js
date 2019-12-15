let platfrom = wx.getSystemInfoSync();
//let host ='https://localhost/laymay/public/index.php/api';
//if (platfrom.platfrom =='devtools') {
 let host ='https://h5.rup-china.com/laymay/public/index.php/api/';
//}
const app=getApp();
console.log(app.globalData.token)
module.exports.requestServerData = function (url, method, data) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + url,
      data: data,
      header: {
        'Content-Type': 'application/json',
        'token':app.globalData.token
      },
      method: method,
      success: function (res) {
        resolve(res.data)
      },
      fail: function (res) {
        reject(res.data)
      }
    })
  })
}
