let platfrom = wx.getSystemInfoSync();
//let host ='https://localhost/laymay/public/index.php/api';
//if (platfrom.platfrom =='devtools') {
 let host ='https://h5.rup-china.com/laymay/public/index.php/api/';
//}
module.exports.requestServerData = function (url, method, data={},loadingRes) {
  return new Promise(function (resolve, reject) {
    if(loadingRes){
       wx.showLoading({
        mask:true,
        title:loadingRes.msg||"加载中..."
      });
    }
    var token = wx.getStorageSync('token');
    wx.request({
      url: host + url,
      data: data,
      header: {
        'Content-Type': 'application/json',
        'token':token
      },
      method: method,
      success: function (res) {
        resolve(res.data)
        wx.hideLoading()
      },
      fail: function (res) {
        reject(res.data)
        wx.hideLoading()
      }
    })
  })
}
