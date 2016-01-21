$(".buy_love_btn").on("tap",function(){
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
$(function(){ 
		show_time();
	});
	function show_time(){
	var time_start = new Date("2016/1/21 11:50:00").getTime();	
	var time_now = new Date().getTime(); //设定当前时间
	var time_end =  new Date(time_start+259200000).getTime(); //设定目标时间
	var time_distance = time_end - time_now; 
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