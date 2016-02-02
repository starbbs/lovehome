$(function() {
	var hgToken = $.cookie("hgToken");

	/**
	 * 参数存到data中
	 */
	var parse = function(str) {
		var data = {};
		if (str.indexOf('?') > 0) {
			str = str.split('?')[1];
			str.split('&').forEach(function(item) {
				var arr = item.split('=');
				data[arr[0]] = arr[1];
			});
		}
		return data;
	};

	$(".buy_love").on("tap", function() {
		if (buying.hasActivity) {
			window.location.href =buying.url;
		} else {
			$(".white_box").show();
			$(".black_box").show();
			$(this).hide();
		}

	});

	$("#close").on("tap", function() {
		$(".white_box").hide();
		$(".black_box").hide();
		$(".buy_love_btn").show();
	});

	$(".introduce-div").on("tap", function() {
		if(!hgToken){
			window.location.href =buying.url;
			//alert(buying.url);
			return;
		}
		location.href = '../html/introduce.html';
	});

	$(".protocol").on("tap", function() {
		location.href = '../html/protocol.html';
	});

	var buying = avalon.define({
		$id : "buying",
		newUser : true,// 是否有交易的用户
		heartNumber : '',
		btnName : '购买爱心',
		hasActivity : false,
		photo:'',
		nick:'',
		finishTime:null,
		activityStatus:'NORMAL',
		url:'/lovehome/html/introduce.html',
		shared:false,
		go_click:function(){
			window.location.href =buying.url;
		},
		check : function() {
			// if(this.value && this.value>9 && this.value%10==0){
			if (this.value) {
				$(".submit").css({
					"background" : "#FF8309",
					"color" : "white"
				});
				buying.checked = true;
			} else {
				$(".submit").css({
					"background" : "#CDCDCD",
					"color" : "white"
				});
				buying.checked = false;
			}
		},
		submit_click : function() {
			var param = {
				"heartNumber" : parseFloat(buying.heartNumber),
				"hgToken" : hgToken
			};
			$.ajax({
				type : "post",
				url : buy,
				data : JSON.stringify(param),
				dataType : "json",
				success : function(result) {
					if (result.status == 200) {
						wx.chooseWXPay({ // 微信支付
						// timeStamp: result.data.WEIXIN_MP_PAY.timeStamp, //
						// 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
							timestamp : result.data.WEIXIN_MP_PAY.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
							nonceStr : result.data.WEIXIN_MP_PAY.nonceStr, // 支付签名随机串，不长于
																			// 32 位
							package : result.data.WEIXIN_MP_PAY.package, // 统一支付接口返回的prepay_id参数值，提交格式如:prepay_id=***）
							signType : result.data.WEIXIN_MP_PAY.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
							paySign : result.data.WEIXIN_MP_PAY.paySign, // 支付签名
							success : function(res) { // 成功
								// alert('success:' + JSON.stringify(res));
								location.href = '../html/detail.html';
							},
							fail : function(res) { // 失败
								alert('fail:' + JSON.stringify(res));
							},
							cancel : function(res) { // 取消
								// alert('cancel:' + JSON.stringify(res));
							},
							trigger : function(res) { // 菜单点击
								// alert('trigger:' + JSON.stringify(res));
							},
							complete : function(res) { // 完成
								// alert('complete:' + JSON.stringify(res));

							}
						});
					} else {
						alert(result.msg);
					}
				}
			});
		}
	});

	var init = function() {
		var data = parse(location.href);
		if(hgToken){
			// 爱心详情
			var param = {
				"hgToken" : hgToken
			};
			$.ajax({
				type : "post",
				url : detailInfo,
				data : JSON.stringify(param),
				dataType : "json",
				success : function(result) {
					if (result.status == 200) {
						buying.finishTime=result.data.finishTime;
						buying.activityStatus=result.data.activityStatus;
						if (result.data.type == 'TRANSFER') {
							// 活动结束
							buying.btnName = '我的爱心';
							buying.hasActivity = true;	
							if(buying.activityStatus!='NORMAL' && result.data.status!='SUCCESS'){							
								//传递失败的进入活动结束失败页面
								buying.url="/lovehome/html/final_withdraw.html";
							}else{
								buying.url="/lovehome/html/detail.html";
							}
							
						}else if (result.data.type == 'BUY') {
							buying.btnName = '我的爱心';
							buying.hasActivity = true;	
							if(buying.activityStatus!='NORMAL'){
								// 活动结束
								buying.url="/lovehome/html/final_withdraw.html";
							}else if(result.data.status=="BUY_SUCCESS" && buying.activityStatus=='NORMAL'){
								// 有购买记录,没有卖出
								buying.url="/lovehome/html/mine_time.html";
							}else{
								buying.url="/lovehome/html/detail.html";
							}
						}					
					} else {
//						alert(result.msg);
						console.log(result.msg);
						var options={};
						options.expires =0;
						$.cookie("hgToken",null,options);
						window.location.href="/lovehome/index.html";
					}
				}
			});

		}else{
			if(data.referUserId){			
				buying.url="http://www.goopal.com.cn/lovehome/html/zhuce.html?referUserId="+data.referUserId;
				if(data.openId){
					buying.url=buying.url+"&openId="+data.openId;
				}
			}else{
				buying.url="http://www.goopal.com.cn/lovehome/html/zhuce.html";
				if(data.openId){
					buying.url=buying.url+"?openId="+data.openId;
				}
			}
		}	
		if (data.referUserId) {
			//alert(data.referUserId);
			var params = {
				"referUserId":data.referUserId
			};
			$.ajax({
				type : "post",
				url : otherUserInfo,
				data : JSON.stringify(params),
				dataType : "json",
				success : function(result) {
					if (result.status == 200) {
						buying.photo=result.data.photo;
						buying.nick=result.data.nick;
						buying.shared=true;					
					} else {
						//alert(result.msg);
					}
				}
			});
			
		}
		
		window.onfocus=function (){
			init();	
		};

	}

	init();	
	
	setTimeout(function() {
		$(".mine").addClass('on');
	}, 100);
});
