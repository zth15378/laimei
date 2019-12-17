
import { requestServerData } from '../../utils/request.js'
var app = getApp();
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
    ],
    hasUserInfo:false,
    token:"",
    // gaode_key:"5ec409921655ef6f5abdd91d09d8b3a7",
    gaode_key:"54364b65034962dc4f41227ab70241e4",
    curLatLng:[],
    addressComponent:{
      city:"广州市",
    },
    home_nav_list:[
      {name:"活动",icon:"http://static.boycodes.cn/laimei-images/activity.png",type:1,url:"../live/index",auth:true},
      {name:"相册",icon:"http://static.boycodes.cn/laimei-images/photo.png",type:2,url:"https://www.baidu.com/"},
      {name:"商城",icon:"http://static.boycodes.cn/laimei-images/mall.png",type:2,url:"https://www.baidu.com/"},
      {name:"俱乐部",icon:"http://static.boycodes.cn/laimei-images/club.png",type:2,url:"https://www.baidu.com/"},
      {name:"官网",icon:"http://static.boycodes.cn/laimei-images/website.png",type:2,url:'https://lesmills.com.cn/'},
    ],
  },
  pressHomeNavItem(e){
     let item=e.currentTarget.dataset.item;
     console.log('item',item);
     if(item.type==1){
        if(item.auth){
          if(!app.globalData.token || !app.globalData.userInfo.mobile){
            wx.navigateTo({
              url:'../login/index',
            });
          }
        }else{
            wx.navigateTo({
              url:item.url,
            });

        }
     }else{
        wx.navigateTo({
          url:'../mywebview/mywebview?url='+item.url,
        });
     }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  wx.navigateTo({
    //   url: '../live-detail/index?id=16',
    // })
    //banner接口
    requestServerData('Index/getBanner','GET',{}).then( res =>{
      if(res.code==200) {
        this.setData({
          bannerList:res.result
        })
      }
    });
    if (app.globalData.token) {
      this.setData({
        token: app.globalData.token,
        hasUserInfo: true
      })
    } else {
      app.userInfoReadyCallback = res => {
        this.setData({
          token: res.token,
          hasUserInfo: true
        })
        console.log("userInfoReadyCallback",res);
      }
    }

    wx.getLocation({
      type: 'wgs84',
      success:(res)=> {
       console.log("getLocation",res)
        // requestServerData() 
        var curLatLng=[res.longitude,res.latitude];
        this.data.curLatLng=curLatLng;
        var url ="https://restapi.amap.com/v3/geocode/regeo?key="+this.data.gaode_key+"&location="+curLatLng.join(",");
        // console.log('url',url);
        wx.request({
          url:url,
          success:(res)=>{
              // console.log('address',res);
              if(res.data.info=='OK'){
                this.setData({
                  addressComponent:res.data.regeocode.addressComponent
                })
              }
          }
        })
      }
    });
    
  },
//banner跳转
  handlerImage(e) {
    let item=e.currentTarget.dataset.item;
    console.log(item)
    if(item.type==1) {
        if(app.isLogin()){
          if(item.url=='live'){
              wx.navigateTo({
                url: '../live-detail/index?id=16',
              })
          }else{
            wx.showToast({
              title: "识别不到参数",
              icon: 'none'
            })
          }
        }else{
          wx.navigateTo({
            url: '../login/index',
          })
        }
    }else if(item.type == 2) {
       wx.navigateTo({
          url:'../mywebview/mywebview?url='+item.url,
        });
    }
  }
})