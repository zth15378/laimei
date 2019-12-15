
import { requestServerData } from '../../utils/request.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    wonderful:[
      {
        "image":"https://xcx.lesmills.com.cn/images/banner1_1.png",
        "name":"BODYPUMP大师课",
        "time":"11月2日-12月2日",
        "desc": "BODYPUMP适合希望迅速实现瘦身，紧致和美效果的..."
      },
      {
        "image": "https://xcx.lesmills.com.cn/images/banner1_1.png",
        "name": "BODYPUMP大师课",
        "time": "11月2日-12月2日",
        "desc": "BODYPUMP适合希望迅速实现瘦身，紧致和美效果的..."
      },
      {
        "image": "https://xcx.lesmills.com.cn/images/banner1_1.png",
        "name": "BODYPUMP大师课",
        "time": "11月2日-12月2日",
        "desc": "BODYPUMP适合希望迅速实现瘦身，紧致和美效果的..."
      },
      {
        "image": "https://xcx.lesmills.com.cn/images/banner1_1.png",
        "name": "BODYPUMP大师课",
        "time": "11月2日-12月2日",
        "desc": "BODYPUMP适合希望迅速实现瘦身，紧致和美效果的..."
      },
      {
        "image": "https://xcx.lesmills.com.cn/images/banner1_1.png",
        "name": "BODYPUMP大师课",
        "time": "11月2日-12月2日",
        "desc": "BODYPUMP适合希望迅速实现瘦身，紧致和美效果的..."
      },
      {
        "image": "https://xcx.lesmills.com.cn/images/banner1_1.png",
        "name": "BODYPUMP大师课",
        "time": "11月2日-12月2日",
        "desc": "BODYPUMP适合希望迅速实现瘦身，紧致和美效果的..."
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //banner接口
    requestServerData('Index/getBanner','GET',{}).then( res =>{
      if(res.code==200) {
        this.setData({
          bannerList:res.result
        })
      }
    })
    //
    wx.getLocation({
      type: 'wgs84',
      success(res) {
       // console.log(res)
       
      }
    })
    
  },
//banner跳转
  handlerImage(e) {
    let linType=e.target.dataset.item;
    console.log(linType.type)
    if(linType.type==1) {
        wx.navigateTo({
          url: '../login/index',
        })
    }else if(linType.type == 2) {

    }
  }
})