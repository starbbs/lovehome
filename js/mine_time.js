$(".buy_love_btn").on("tap",function(){

});		
$("#close").on("tap",function(){
	$(".white_box").hide();
	$(".black_box").hide();
});

var endDate;//创建时间
var transferDay=1;//传递封存天数-1天
var transferForceDay=7;//强制传递天数
var buyIng;
$(function(){ 
//	var hgToken = $.cookie("hgToken");
	var hgToken = "09f5ca246c7244dfa32fdddb6fc8daad";
	/**
	 * 天数间隔
	 */
	var dateDiff = function(startDate, endDate) {
		var startTime =startDate.getTime();
		var endTime = endDate.getTime();
		var dates = Math.abs((endTime-startTime)) / (1000 * 60 * 60 * 24);
		return dates;
	}
	
	buyIng = avalon.define({
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
		days:0,
		commit_click:function(){
			if(buyIng.days>transferDay){
				$(".white_box").show();
				$(".black_box").show();
			}	
		},
		transfer_click : function() {
			if(buyIng.days>=transferDay){
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
						buyIng.heartNumber = result.data.heartNumber;
						buyIng.status = result.data.status;
						buyIng.BUY_PROCESSING = false;
						buyIng.createTime = result.data.createTime;
						buyIng.successTime = result.data.successTime;
						buyIng.ownerNumber = 0.00;
						buyIng.heartIncome = 0.00;
						if (buyIng.status == 'BUY_SUCCESS') {
							// 购买成功
							buyIng.statusStr = "购买成功";
							buyIng.ownerNumber = buyIng.heartNumber.toFixed(2);
							if(buyIng.successTime){
								buyIng.days=parseInt(dateDiff(new Date(),new Date(buyIng.successTime)));
							}
							if(buyIng.days>transferForceDay){
								buyIng.days=transferForceDay;
							}
							buyIng.transferTip=(buyIng.days>=transferDay?"强制传递":"爱心传递");
							buyIng.heartIncome =(buyIng.days*0.01*buyIng.ownerNumber).toFixed(2);							
							endDate=buyIng.successTime;
							if(buyIng.days>=transferDay){
								$(".no_btn").css("background","orange");
								$(".no_btn").css("opacity","1");
							}
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
		
		show_time();
	}

	init();
	
	
});

	function show_time(){ 
	var time_start = new Date().getTime(); //设定当前时间
	
	var time_end =  endDate+(1000*60*60*24*(buyIng.days>=transferDay?transferForceDay:transferDay)); //设定目标时间
	var time_distance = time_end - time_start; 
	if(time_distance<0){
		time_distance=-time_distance;
	}
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
	
	setTimeout(function() {
		$(".mine").addClass('on');
	}, 100);
}