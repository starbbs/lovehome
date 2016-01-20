var baseUrl="http://116.213.142.87:8080";

//var baseUrl="http://www.goopal.com.cn";


var setWxUrl = function(url) {
	return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx55923db8dfb94e44&redirect_uri=' + encodeURIComponent(url) + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
};

/**
 * 微信登录，如果没有注册不返回hgToken
 * {code:"234324sfsd"}
 * return 
 * openid 微信openId
 * hgToken 用户token-未注册的不返回
 */
var wxLoing=baseUrl+"/hg/user/wxlogin";

/**
 * 绑定手机号
 * {phone:"15079817107",identifyingCode:"3355",
 * "openId":"2423rwefijo2i3r23rio",referUserId:21321}
 * return
 * hgToken 用户token
 */
var register=baseUrl+"/hg/user/register";

/**
 * 发送短信验证码
 * {phone:"15079817107"}
 */
var sendCode=baseUrl+"/hg/common/sendCode";

/**
 * 购买爱心
 * {heartNumber:200,hgToken:"ewwerwr32432fwefwe"}
 * appId
 * timeStamp
 * nonceStr
 * package
 * signType
 * paySign
 */
var buy=baseUrl+"/hg/buy/create";



