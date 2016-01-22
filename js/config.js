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

/**
 * 分享爱心回报信息
 * {hgToken:"ewwerwr32432fwefwe"}
 * returnHeartNumber 分享回报金额
 * list 分享贡献列表
 * nick 用户昵称
 * photo 头像
 * hearNumber 贡献金额
 */
var shareReturnInfo=baseUrl+"/hg/returnHeart/info";

/**
 * 分享回报提现申请
 * {hgToken:"ewwerwr32432fwefwe"}
 */
var shareReturnWithdrawReq=baseUrl+"/hg/returnHeart/withdrawReq";

/**
 * 分享回报提现申请
 * {hgToken:"ewwerwr32432fwefwe"}
 * list
 * successTime
 * createTime
 * transferTime
 * heartNumber
 * status
 */
var transferHistory=baseUrl+"/hg/buy/list";

/**
 * 详情页面
 * {hgToken:"ewwerwr32432fwefwe"}
 * BuyHeart
 * heartNumber
 * incomeNumber
 * status
 * createTime
 * successTime
 * transferTime
 * matchNo
 * outOrderCode
 * payResult
 * -----------------
 * TransferHeart
 * heartNumber
 * incomeNumber
 * status
 * createTime
 * successTime
 * matchNo
 * outOrderCode
 * payResult
 */
var detailInfo=baseUrl+"/hg/summary/detail";

/**
 * 
 */
var wxSign=baseUrl+"/hg/common/weixin/signature";

/**
 * 转卖申请
 * {hgToken:"ewwerwr32432fwefwe"}
 */
var sellApply=baseUrl+"/hg/transferOut/apply";

/**
 * 项目结束计算提现金额
 */
var getReward=baseUrl+"/hg/summary/getReward";

/**
 * 最后提现申请
 */
var reward=baseUrl+"/hg/summary/reward";


/**
 * 传递历史
 */
var transferHistory=baseUrl+"/hg/buy/list";


