$(function() {

	var gotoIndex = function() {
		// return;
		window.location.href="/lovehome/index.html";
	};

	var hgToken = $.cookie("hgToken");
//	hgToken="2558076ebf4240e28f6b43a7e49f018f";
	if(!hgToken){
		gotoIndex();
	}

	var summary = avalon.define({
		$id : "summary",
		nick:'',//用户昵称
		buyHeartNumber : 0.00,//购买总金额
		times : 0.00,//购买次数
		retrunHeartNumber : 0.00,//分享回报金额
		heartBoxNumber : 0.00,//贡献爱心基金
		thanks:false,
		rewardStatus:false,//提现状态
		createTime:null,
		finishTime:null,
		heartNumber:0.00,//爱心基金池总收益
		countUser:0,//参与人数
		countTransfer:0,//传递次数
		remainingMoney:0.00,//奉献金额
		rewardMoney:0.00,//返回奖金
		timestr:'',//经历时长
		summary_click :function(){
			summary.thanks=true;
			$(".summary-view").addClass("on");
		},
		back_click :function(){
			summary.thanks=false;
			$(".summary-view").removeClass("on");
		},
		withdraw_click:function(){
			//提现申请		
			var param = {
					"hgToken" : hgToken
				};
			$.ajax({
				type : "post",
				url : getReward,
				data : JSON.stringify(param),
				dataType : "json",
				success : function(result) {
					if (result.status == 200) 
					{
						alert("提现成功!");
						summary.rewardStatus=true;
					} else {
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
		$.ajax({
			type : "post",
			url : findalSummary,
			data : JSON.stringify(param),
			dataType : "json",
			success : function(result) {
				if (result.status == 200) {
					summary.buyHeartNumber=result.data.buyHeartNumber;//购买总金额
					summary.times=result.data.times;//购买次数
					if(result.data.retrunHeartNumber){
						summary.retrunHeartNumber=result.data.retrunHeartNumber;//分享回报金额
					}
					if(result.data.heartBoxNumber){
						summary.heartBoxNumber=result.data.heartBoxNumber;//贡献爱心基金
					}
					summary.rewardStatus=result.data.rewardStatus;//提现状态
					if(result.data.rewardMoney){
						summary.rewardMoney=result.data.rewardMoney;//返回奖金
					}
					summary.nick=result.data.nick;//用户昵称
					
				} else {
//					console.log(result.msg);
//					var options={};
//					options.expires =0;
//					$.cookie("hgToken",null,options);
//					gotoIndex();
				}
			}
		});
		
		$.ajax({
			type : "post",
			url : thanksNote,
			data : JSON.stringify(param),
			dataType : "json",
			success : function(result) {
				if (result.status == 200) {
					summary.createTime=result.data.createTime;//开始时间
					summary.finishTime=result.data.finishTime;//结束时间
					if(summary.finishTime){
						summary.timestr=show_time(new Date(summary.createTime).getTime(),new Date(summary.finishTime).getTime());
					}
					
					summary.heartNumber=result.data.heartNumber;//爱心基金池总收益
					summary.countUser=result.data.countUser;//参与用户数
					summary.countTransfer=result.data.countTransfer;//传递次数
					if(result.data.remainingMoney){
						summary.remainingMoney=result.data.remainingMoney;//奉献金额
					}	
					
				} else {
//					console.log(result.msg);
//					var options={};
//					options.expires =0;
//					$.cookie("hgToken",null,options);
//					gotoIndex();
				}
			}
		});
		
		
		window.onfocus=function (){
			init();	
		};
	}

	function show_time(time_start,time_end) {
	    var time_distance = time_end - time_start;
	    if (time_distance < 0) {
	        time_distance = -time_distance;
	    }
	    //console.log("time_distance" + time_distance);
	    var int_day = Math.floor(time_distance / 86400000)
	    time_distance -= int_day * 86400000;
	    var int_hour = Math.floor(time_distance / 3600000)
	    time_distance -= int_hour * 3600000;
	    var int_minute = Math.floor(time_distance / 60000)
	    time_distance -= int_minute * 60000;
	    var int_second = Math.floor(time_distance / 1000)
	    if (int_day < 10) {
	        int_day = "0" + int_day;
	    }
	    if (int_hour < 10) {
	        int_hour = "0" + int_hour;
	    }
	    if (int_minute < 10) {
	        int_minute = "0" + int_minute;
	    }
	    if (int_second < 10) {
	        int_second = "0" + int_second;
	    }
	    // 显示时间 
	    var timeStr=int_day+"天 "+int_hour+"时 "+int_minute+"分 "+int_second+"秒";
	    return  timeStr;
	}
	
	init();	
	
	setTimeout(function() {
		$(".mine").addClass('on');
	}, 100);
	
	
});
