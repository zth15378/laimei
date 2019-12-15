
import { requestServerData } from './request.js'

module.exports={
	login(){
		return new Promise((resolve,reject)=>{
			wx.login({
		        success:  (res) => {
		          // 发送 res.code 到后台换取 openId, sessionKey, unionId
		          requestServerData('/Login/LoginSub','post',{
		            code:res.code,
		          }).then((loginres)=>{
		          		if(loginres.code==200){
			          		wx.setStorageSync('token', loginres.result['token']);
			          		resolve(loginres.result)
		          		}else{
		          			reject({
		          				code:loginres.code,
		          				message:loginres.message
		          			});
		          		}
			            // console.log(loginres);
			            // app.globalData.token=loginres.result.token;
			            // app.globalData.userInfo = loginres.result.user;
		          });
		        }
		      })
		})
	}
}