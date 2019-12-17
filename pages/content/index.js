// pages/active/active.js
import { requestServerData } from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: 2,
    background:'',
    subbanner:[],
    vertical: false,
    interval: 2000,
    duration: 500,
    billIndex: 0,
    contenInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    requestServerData('/Programlive/GetLiveDetail?id=16').then((res) => {
      console.log("res", res);
      if (res.code == 200) {
        this.setData({
          background: res.result.topimg,
          subbanner:res.result.showimg,
          contenInfo:res.result.blurb
        });
        
      } else {

      }
      // if()
    })
  },
  liveVideo() {
 wx.navigateTo({
      url: '../live-detail/index?id=16',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    this.setData({
      billIndex: 1
    })
    setTimeout(function () {
      that.setData({
        billIndex: 2
      })
    }, 600)
    setTimeout(function () {
      that.setData({
        billIndex: 3
      })
    }, 1200)
    setTimeout(function () {
      that.setData({
        billIndex: 4
      })
    }, 1800)

  },



})