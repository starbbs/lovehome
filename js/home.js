$(function(){
	var hgToken=$.cookie("hgToken");

	$(".buy_love_btn").on("tap",function(){
		$(".white_box").show();
		$(".black_box").show();	
	});	
	
	$("#close").on("tap",function(){
		$(".white_box").hide();
		$(".black_box").hide();
	});	
		
	$(".content").on("tap",function(){
		location.href = 'html/introduce.html';
	});	
	
//	$(".btn").on("tap",function(){
//		location.href = 'html/mine.html';
//	});
	
	$(".protocol").on("tap",function(){
		location.href = 'html/protocol.html';
	});	
	
	var buying = avalon.define({
        $id: "buying",
        checked:false,//校验通过
        heartNumber:'',
        check:function(){
        	if(this.value && this.value>9 && this.value%10==0){
        		$(".submit").css({
					"background":"#FF8309",
					"color":"white"
				});
        		buying.checked=true;
        	}else{
        		$(".submit").css({
					"background":"#CDCDCD",
					"color":"white"
				});
        		buying.checked=false;
        	}
        },
        submit_click:function(){
    		var param = {
    			"heartNumber" :buying.heartNumber,
    			"hgToken":hgToken
    		};
    		$.ajax({
    			type : "post",
    			url : buy,
    			data : JSON.stringify(param),
    			dataType : "json",
    			success : function(result) {
    				if(result.status==200){
    					wx.chooseWXPay({ // 微信支付
    						timeStamp: result.data.WEIXIN_MP_PAY.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
//    						timestamp: result.data.WEIXIN_MP_PAY.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
    						nonceStr: result.data.WEIXIN_MP_PAY.nonceStr, // 支付签名随机串，不长于 32 位
    						package: result.data.WEIXIN_MP_PAY.package, // 统一支付接口返回的prepay_id参数值，提交格式如:prepay_id=***）
    						signType: result.data.WEIXIN_MP_PAY.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
    						paySign: result.data.WEIXIN_MP_PAY.paySign, // 支付签名
    						success: function(res) { // 成功
    							alert('success:' + JSON.stringify(res));
    						},
    						fail: function(res) { // 失败
    							alert('fail:' + JSON.stringify(res));
    						},
    						cancel: function(res) { // 取消
    							alert('cancel:' + JSON.stringify(res));
    						},
    						trigger: function(res) { // 菜单点击
    							alert('trigger:' + JSON.stringify(res));
    						},
    						complete: function(res) { // 完成
    							alert('complete:' + JSON.stringify(res));
    							
    						}
    					});
    				}else{
    					alert(result.msg);
    				}
    			}
    		});	
        }
    });
});

