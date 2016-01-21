$(".buy_love_btn").on("tap",function(){
	$(".white_box").show();
	$(".black_box").show();	
});		
$("#close").on("tap",function(){
	$(".white_box").hide();
	$(".black_box").hide();
});		
$(function(){
    $('#register').validation();
})		
$(function(){	
	$(".btn").on("tap",function(){
		location.href = '../html/mine.html';
	});
});			