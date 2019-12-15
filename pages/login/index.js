const app=getApp();
import { requestServerData } from '../../utils/request.js'
Page({
  data: {
    mobile:'',
    codeinput:'',
    password:'',
    verification:'',
    verificationCode:'',
    message:"获取验证码",
    sendyzm:false,
    secret:false,
    codemessage:'',
    showerror:false
  },
  onLoad: function (options) {
    console.log(app.globalData)
      //获取检验码
    requestServerData('Login/getYzm','GET',{
    }).then( res =>{
      console.log(res)
      this.setData({
        verificationCode:res.result.code
      })
    })
  },
  //刷新检验码
  handlerVerfic() {
    requestServerData('Login/getYzm', 'GET', {
    }).then(res => {
      console.log(res)
      this.setData({
        verificationCode: res.result.code
      })
    })
  },
//手机号获取
  mobile(e) {
    this.setData({
      mobile:e.detail.value
    })
  },
  //验证码获取
  codeinput(e) {
    this.setData({
      codeinput: e.detail.value
    })
  },
  //校验码
  verification(e) {
    this.setData({
      verification: e.detail.value
    })
  },
  //密码获取
  password(e) {
    this.setData({
      password: e.detail.value
    })
  },
  //发送验证码
  handerCode() {
    if (this.data.mobile == '') {
          this.setData({
            codemessage:'请输入手机号',
            showerror:true
          })
          return;
        }
    if (this.data.verification == '') {
      this.setData({
        codemessage: '请输入检验码',
        showerror: true
      })
      return;
    }
    if (this.data.verification != this.data.verificationCode) {
      this.setData({
        codemessage: '检验码错误',
        showerror: true
      })
      return;
    }
    if (!this.data.sendyzm){
      requestServerData('Login/getMobileCode', 'POST', {
        code:this.data.verification,
        mobile:this.data.mobile
      }).then(res => {
        console.log(res)
        if(res.code == 200) {
          wx.showToast({
            title: '短信发送成功',
            icon:'none'
          })
          let time = 60, _self = this;
          let timer = setInterval(() => {
            time--;
            if (time < 1) {
              _self.setData({
                message: '获取验证码',
                sendyzm: false
              })
              clearInterval(timer);
            } else {
              _self.setData({
                message: time + 's重发',
                sendyzm: true
              })
            }
          }, 1000);

        }else{
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
        }
       
      })
    
     
    }
  },
  // 阅读隐私
  handlreSecret() {
      if(this.data.secret){
        this.setData({
          secret:false
        })
      }else{
        this.setData({
          secret: true
        })
      }
  },
  //注册
  handlerRegister() {
        if(this.data.secret) {
          if(this.data.mobile==''){
            this.setData({
              codemessage: '请输入手机号',
              showerror: true
            })
            return;
          }
          if (this.data.verification == '') {
            this.setData({
              codemessage: '请输入校验码',
              showerror: true
            })
            return;
          }
          if (this.data.verification != this.data.verificationCode) {
            this.setData({
              codemessage: '检验码错误',
              showerror: true
            })
            return;
          }
          if (this.data.codeinput == '') {
            this.setData({
              codemessage: '请输入验证码',
              showerror: true
            })
            return;
          }
          if (this.data.password == '') { 
            this.setData({
              codemessage: '请输入密码',
              showerror: true
            })
            return;
          }
          console.log(app.globalData)
          requestServerData('Login/register', 'POST', {
            mobile: this.data.mobile,
            mobileCode: this.data.codeinput,
            encryptedData: app.globalData.encryptedData,
            iv: app.globalData.iv,
            rawData: app.globalData.rawData,
            signature: app.globalData.signature,
          }).then(res => {
            console.log(res)
            if(res.code == 200) {
              wx.showToast({
                title: '注册成功',
                icon: 'none'
              })
              wx.switchTab({
                url: 'pages/user/index',
              })
            }else{
              wx.showToast({
                title: res.message,
                icon: 'none'
              })
            }
            
          })
        }
  },
 
})