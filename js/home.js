$(function(){
	$(".buy_love_btn").on("tap",function(){
		$(".white_box").show();
		$(".black_box").show();	
	});	
	
	$("#close").on("tap",function(){
		$(".white_box").hide();
		$(".black_box").hide();
	});	
	
	$('#register').validation();
	
	$(".content").on("tap",function(){
		location.href = 'html/introduce.html';
	});	
	
	$(".btn").on("tap",function(){
		location.href = 'html/mine.html';
	});
	
	$(".protocol").on("tap",function(){
		location.href = 'html/protocol.html';
	});	
});

