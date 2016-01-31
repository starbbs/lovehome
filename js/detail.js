$(function() {

	var hgToken = $.cookie("hgToken");
	if(!hgToken){
		window.location.href="/lovehome/index.html";
	}
	
	$(".buy_love_btn").on("tap",function(){
		$(".white_box").show();
		$(".black_box").show();
		$(this).hide();
	});	
	
	$("#close").on("tap",function(){
		$(".white_box").hide();
		$(".black_box").hide();
		$(".buy_love_btn").show();
	});	
	
	/**
	 * 天数间隔
	 */
	var dateDiff = function(startDate, endDate) {
		var startTime =startDate.getTime();
		var endTime = endDate.getTime();
		var dates = Math.abs((endTime-startTime)) / (1000 * 60 * 60 * 24);
		return dates;
	}

	var detail = avalon.define({
		$id : "detail",
		BUYING : false,
		TRANSFER:false,
		HISTORY:false
	});

	var buy = avalon.define({
		$id : "buy",
		heartNumber : 0.00,
		incomeNumber : 0.00,// 爱心收益
		statusStr : "",
		matchNo : "00001",
		failureReason : "失败",
		BUY_PROCESSING : true,// 买入进行中
		BUY_FAILURE:false,//购买失败
		createTime : '',
		ownerNumber : 0.00,// 已拥有爱心
		heartIncome : 0.00,// 爱心回报
		buy_click :function(){
			window.location.href = "../html/introduce.html?buy=true";
		}
	});

	var transfer = avalon.define({
		$id : "transfer",
		heartNumber : 0.00,// 拥有爱心
		incomeNumber : 0.00,// 爱心收益
		statusStr : "",
		status : "",
		createTime : '',
		matchNo : "00001",
		failureReason : "失败",
		PROCESSING:false,
		FAILURE:false,
		SUCCESS:false,
		submit_click : function() {
			//提现申请
			
		},
		buy_click :function(){
			window.location.href = "../html/introduce.html?buy=true";
		}
	});
	
	
	var buying = avalon.define({
        $id: "buying",
        newUser:true,//是否有交易的用户
        heartNumber:'',
        check:function(){
//        	if(this.value && this.value>9 && this.value%10==0){
        	if(this.value){
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
    			"heartNumber" :parseInt(buying.heartNumber),
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
//    						timeStamp: result.data.WEIXIN_MP_PAY.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
    						timestamp: result.data.WEIXIN_MP_PAY.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
    						nonceStr: result.data.WEIXIN_MP_PAY.nonceStr, // 支付签名随机串，不长于 32 位
    						package: result.data.WEIXIN_MP_PAY.package, // 统一支付接口返回的prepay_id参数值，提交格式如:prepay_id=***）
    						signType: result.data.WEIXIN_MP_PAY.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
    						paySign: result.data.WEIXIN_MP_PAY.paySign, // 支付签名
    						success: function(res) { // 成功
    							//alert('success:' + JSON.stringify(res));
    							location.href = '../html/detail.html';
    						},
    						fail: function(res) { // 失败
    							alert('fail:' + JSON.stringify(res));
    						},
    						cancel: function(res) { // 取消
    							//alert('cancel:' + JSON.stringify(res));
    						},
    						trigger: function(res) { // 菜单点击
    							//alert('trigger:' + JSON.stringify(res));
    						},
    						complete: function(res) { // 完成
    							//alert('complete:' + JSON.stringify(res));
    							
    						}
    					});
    				}else{
    					alert(result.msg);
    				}
    			}
    		});	
        }
    });
	
	var init = function() {
		var param = {
			"hgToken" : hgToken
		};
		$(".wrap").hide();
		$.ajax({
			type : "post",
			url : detailInfo,
			data : JSON.stringify(param),
			dataType : "json",
			success : function(result) {
				if (result.status == 200) {
					if (result.data.type == 'TRANSFER') {
						// 传递
						detail.TRANSFER = true;
						detail.BUYING = false;
						transfer.PROCESSING=false;
						transfer.SUCCESS=false;
						transfer.FAILURE=false;
						transfer.status=result.data.status;
						transfer.matchNo = result.data.matchNo;
						transfer.failureReason = result.data.failureReason;
						transfer.heartNumber = result.data.heartNumber;
						transfer.incomeNumber = result.data.incomeNumber;
						transfer.createTime = result.data.createTime;
						if(transfer.status=='PROCESSING'){
							//匹配中
							transfer.PROCESSING=true;
						}else if(transfer.status=='SUCCESS'){
							//成功
							transfer.SUCCESS=true;
						}else if(transfer.status=='FAILURE'){
							//失败
							transfer.FAILURE=true;
						}
					} else if (result.data.type == 'BUY') {
						// 买入
						detail.BUYING = true;
						detail.TRANSFER = false;
						buy.heartNumber = result.data.heartNumber;
						buy.status = result.data.status;
						buy.BUY_PROCESSING = false;
						buy.BUY_FAILURE = false;
						buy.createTime = result.data.createTime;
						buy.ownerNumber = 0.00;
						buy.heartIncome = 0.00;
						if (buy.status == 'BUY_PROCESSING') {
							// 进行中
							buy.statusStr = "匹配中...";
							buy.BUY_PROCESSING = true;
						} else if (buy.status == 'BUY_SUCCESS') {
							// 购买成功
							buy.statusStr = "购买成功";
							buy.ownerNumber = buy.heartNumber;
							var days=parseInt(dateDiff(new Date(),new Date(buy.createTime)));
							if(days>7){
								days=7;
							}
							buy.incomeNumber=days*0.01*buy.ownerNumber;
							window.location.href = "../html/mine_time.html";
						} else if (buy.status == 'BUY_FAILURE') {
							// 购买失败
							buy.statusStr = "购买失败";
							buy.BUY_FAILURE=true;
						} else if (buy.status == 'TRANSFER') {
							// 进行中
							buy.statusStr = "已传递";
						}
						buy.matchNo = result.data.matchNo;
						buy.failureReason = result.data.failureReason;

					}
				} else if (result.status == 9999) {
					// 没有购买记录
					window.location.href = "../html/home.html";
				} else {
					console.log(result.msg);
					var options={};
					options.expires =0;
					$.cookie("hgToken",null,options);
					window.location.href="/lovehome/index.html";
				}
			}
		});
		
		$.ajax({
			type : "POST",
			url : transferHistory,
			data : JSON.stringify(param),
			dataType : "json",
			success : function(result) {
				if(result.status==200){
					if(result.data.list.length>0){
						detail.HISTORY=true;
					}
				}else{
					console.log(result.msg);
					var options={};
					options.expires =0;
					$.cookie("hgToken",null,options);
					window.location.href="/lovehome/index.html";
				}
			}
		});	
	}

	init();
	
	setTimeout(function() {
		$(".mine").addClass('on');
	}, 100);
});
