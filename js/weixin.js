var weixin = {
	// 参数
	appId : null,
	timestamp : null,
	nonceStr : null,
	signature : null,
	// 分享
	title : '果仁宝-爱心压岁钱',
	desc : '我是袋鼠, 过年我带你玩爱心压岁钱,还能实现大凉山母亲的希望!',
	link : 'http://www.goopal.com.cn/lovehome/index.html',
	imgUrl : 'http://wx.qlogo.cn/mmopen/I54xE2sNh84J6ymOgAVJMufK6xs0EbRPql4vbmFTjo76NYrBLuY0HiaOicDibxNeqiahvCPYtKotCoUW0vfdEfdxHfXuicRUYEsxP/0',
	type : '',
	dataUrl : '',
	success : function() { // 用户确认分享后执行的回调函数
		alert('分享成功');
	},
	cancel : function() { // 用户取消分享后执行的回调函数
		alert('分享取消');
	},
	/**
	 * [setShare 设置微信分享]
	 * 
	 * @Author 张树垚
	 * @DateTime 2016-01-13 16:38:42
	 * @param {[string]}
	 *            type [分享类型, all, timeline, appMessage]
	 * @param {[json]}
	 *            options [分享标题] {[string]} options.title [description]
	 *            {[string]} options.desc [description] {[string]} options.link
	 *            [description] {[string]} options.imgUrl [description]
	 */
	setShare : function(type, options) {
		if (typeof type !== 'string') {
			options = type;
			type = 'all';
		}
		options = options || {};
		if (arguments.length === 0 || type === 'all' || type === 'timeline') { // 分享到朋友圈
			wx.onMenuShareTimeline($.extend({
				title : weixin.title, // 分享标题
				link : weixin.link, // 分享链接
				imgUrl : weixin.imgUrl, // 分享图标
				success : weixin.success,
				cancel : weixin.cancel,
			}, options));
		}
		if (arguments.length === 0 || type === 'all' || type === 'appMessage') {
			wx.onMenuShareAppMessage($.extend({
				title : weixin.title, // 分享标题
				desc : weixin.desc, // 分享描述
				link : weixin.link, // 分享链接
				imgUrl : weixin.imgUrl, // 分享图标
				type : weixin.type, // 分享类型,music、video或link，不填默认为link
				dataUrl : weixin.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
				success : weixin.success,
				cancel : weixin.cancel,
			}, options));
		}
	},
};

var param = {};
param.url = (function() {
	var href = window.location.href;
	var i1 = href.indexOf('?');
	var i2 = href.indexOf('#');
	if (i1 > -1 && i2 > -1) {
		Math.min(i1, i2);
	}
	return href;
})();

var init=function(){
	var hgToken = $.cookie("hgToken");
	if(hgToken){
		var params = {
				"hgToken":hgToken
			};
		$.ajax({
			type : "post",
			url : myUserInfo,
			data : JSON.stringify(params),
			dataType : "json",
			success : function(data) {
				if (data.status == 200) {
					weixin.title='果仁宝-爱心压岁钱';
					weixin.desc ='我是'+data.data.nick+', 过年我带你玩爱心压岁钱,还能实现大凉山母亲的希望!';
					weixin.link='http://www.goopal.com.cn/lovehome/index.html?referId='+data.data.userId;
					weixin.imgUrl=data.data.photo;
					weixin.setShare();
				} else {
					console.log(data);
				}
			}
		});
	}
	
};

$.ajax({
	type : "post",
	url : wxSign,
	data : JSON.stringify(param),
	dataType : "json",
	success : function(data) {
		if (data.status == 200) {
			var returnData = data.data.signatureData;
			wx.config({
				debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId : weixin.appId = returnData.appId, // 必填，公众号的唯一标识
				timestamp : weixin.timestamp = returnData.timestamp, // 必填，生成签名的时间戳
				nonceStr : weixin.nonceStr = returnData.nonceStr, // 必填，生成签名的随机串
				signature : weixin.signature = returnData.signature, // 必填，签名，见附录1
				jsApiList : [ // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				// 分享接口
				'onMenuShareTimeline', // 微信分享到朋友圈
				'onMenuShareAppMessage', // 分享给朋友
				'onMenuShareQQ', // 分享到QQ
				'onMenuShareWeibo', // 分享到腾讯微博
				'onMenuShareQZone', // 分享到QQ空间
				// 音频接口
				'startRecord', // 开始录音
				'stopRecord', // 停止录音
				'onVoiceRecordEnd', // 监听录音自动停止
				'playVoice', // 播放语音接口
				'pauseVoice', // 暂停播放
				'stopVoice', // 停止播放
				'onVoicePlayEnd', // 监听语音播放完毕
				'uploadVoice', // 上传语音
				'downloadVoice', // 下载语音
				// 图像接口
				'chooseImage', // 拍照或从手机相册中选图接口
				'previewImage', // 预览图片接口
				'uploadImage', // 上传图片接口
				'downloadImage', // 下载图片接口
				// 智能接口
				'translateVoice', // 识别音频并返回识别结果
				// 设备信息
				'getNetworkType', // 获取网络状态
				// 地理位置
				'openLocation', // 使用微信内置地图查看位置
				'getLocation', // 获取地理位置
				// 界面操作
				'hideOptionMenu', // 隐藏右上角菜单
				'showOptionMenu', // 显示右上角菜单
				'hideMenuItems', // 批量隐藏功能按钮
				'showMenuItems', // 批量显示功能按钮
				'hideAllNonBaseMenuItem', // 隐藏所有非基础按钮
				'showAllNonBaseMenuItem', // 显示所有功能按钮
				'closeWindow', // 关闭当前网页窗口
				// 微信扫一扫
				'scanQRCode', // 调起微信扫一扫
				// 微信支付
				'chooseWXPay', // 发起一个微信支付请求
				// 微信小店
				'openProductSpecificView', // 跳转微信商品页
				// 微信卡券
				'addCard', // 批量添加卡券
				'chooseCard', // 拉取适用卡券列表并获取用户选择信息
				'openCard', // 查看微信卡包中的卡券
				// 摇一摇周边
				'startSearchBeacons', // 开启查找周边ibeacon设备
				'stopSearchBeacons', // 关闭查找周边ibeacon设备
				'onSearchBeacons', // 监听周边ibeacon设备
				]
			});
			wx.ready(function() {
				init();
			});
		} else {
			console.log(data);
		}
	}
});
