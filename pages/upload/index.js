// pages/upload/index.js
const app=getApp();
import { requestServerData } from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      uploadImage:[]
  },
  onLoad(options) {
    requestServerData('Programlive/GetLiveDetail','POST',{
      id:16
    })
    .then( res =>{
      console.log(res)
    })
  },
  handlerUpload() {
    let _self=this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        _self.setData({
          uploadImage:res.tempFilePaths
        })
      }
    })
  }
})