$(function(){
	$("#toTop").css("top",window.screen.availHeight/2-100+"px");
	$(window).scroll(function(){
		if($(window).scrollTop() >= 100){
			$("#toTop").fadeIn(300);
		}else{
			$("#toTop").fadeOut(300);
		};
	});
$('#toTop').click(function(){$('html , body').animate({scrollTop: "0px"},800);});});
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