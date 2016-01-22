$(".buy_love_btn").on("tap",function(){
//	if(days>3){
//		$(".white_box").show();
//		$(".black_box").show();
//	}	
	$(".white_box").show();
	$(".black_box").show();
});		
$("#close").on("tap",function(){
	$(".white_box").hide();
	$(".black_box").hide();
});
$(".btn").on("tap",function(){
	location.href = 'html/mine.html';
});

var endDate;//创建时间
var days;//过了有几天
$(function(){ 
	var hgToken = $.cookie("hgToken");

	/**
	 * 天数间隔
	 */
	var dateDiff = function(startDate, endDate) {
		var startTime =startDate.getTime();
		var endTime = endDate.getTime();
		var dates = Math.abs((endTime-startTime)) / (1000 * 60 * 60 * 24);
		return dates;
	}
	
	var buy = avalon.define({
		$id : "buy",
		heartNumber : 0.00,
		statusStr : "",
		matchNo : "00001",
		failureReason : "失败",
		BUY_PROCESSING : true,// 买入进行中
		BUY_FAILURE:false,//购买失败
		createTime : '',
		transferTip:'爱心传递',
		ownerNumber : 0.00,// 已拥有爱心
		heartIncome : 0.00,// 爱心回报
		transfer_click : function() {
			var param = {
				"hgToken" : hgToken
			};
			$.ajax({
				type : "post",
				url : sellApply,
				data : JSON.stringify(param),
				dataType : "json",
				success : function(result) {
					if (result.status == 200) {
						window.location.href = "../html/detail.html";
					}else {
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
			url : detailInfo,
			data : JSON.stringify(param),
			dataType : "json",
			success : function(result) {
				if (result.status == 200) {
					if (result.data.type == 'BUY') {
						// 买入
						buy.heartNumber = result.data.heartNumber;
						buy.status = result.data.status;
						buy.BUY_PROCESSING = false;
						buy.createTime = result.data.createTime;
						buy.successTime = result.data.successTime;
						buy.ownerNumber = 0.00;
						buy.heartIncome = 0.00;
						if (buy.status == 'BUY_SUCCESS') {
							// 购买成功
							buy.statusStr = "购买成功";
							buy.ownerNumber = buy.heartNumber.toFixed(2);
							var days=parseInt(dateDiff(new Date(),new Date(buy.createTime)));
							if(days>7){
								days=7;
							}
							buy.transferTip=(days>3?"强制传递":"爱心传递");
							buy.heartIncome =(days*0.01*buy.ownerNumber).toFixed(2);
							endDate=buy.createTime;//暂时用创建时间调试
//							endDate=buy.successTime;
							show_time();
						}
					}
				} else if (result.status == 9999) {
					// 没有购买记录
					window.location.href = "../html/home.html";
				} else {
					alert(result.msg);
				}
			}
		});
	}

	init();
	
	
});

	function show_time(){ 
	var time_start = new Date().getTime(); //设定当前时间
	var time_end =  endDate+(1000*60*60*24*(days>3?7:3)); //设定目标时间
	var time_distance = time_end - time_start; 
	var int_day = Math.floor(time_distance/86400000) 
	time_distance -= int_day * 86400000; 
	var int_hour = Math.floor(time_distance/3600000) 
	time_distance -= int_hour * 3600000; 
	var int_minute = Math.floor(time_distance/60000) 
	time_distance -= int_minute * 60000; 
	var int_second = Math.floor(time_distance/1000)  
	if(int_day < 10){ 
		int_day = "0" + int_day; 
	} 
	if(int_hour < 10){ 
		int_hour = "0" + int_hour; 
	} 
	if(int_minute < 10){ 
		int_minute = "0" + int_minute; 
	} 
	if(int_second < 10){
		int_second = "0" + int_second; 
	} 
	// 显示时间 
	$("#time_d").html(int_day); 
	$("#time_h").html(int_hour); 
	$("#time_m").html(int_minute); 
	$("#time_s").html(int_second); 
	// 设置定时器
	setTimeout("show_time()",1000); 
	
	
}