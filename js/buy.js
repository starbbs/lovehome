$(function(){

	
	$(document).on('click', '.submit', function() {
		
		
	});
	
	var init=function(){
		var hgToken=$.cookie("hgToken");
		var phone=$(".phone").val();
		var heartNumber=$(".heartNumber").val();
		var param = {
			"heartNumber" :heartNumber,
			"hgToken":hgToken
		};
		$.ajax({
			type : "POST",
			url : buy,
			data : JSON.stringify(param),
			dataType : "json",
			contentType : "application/json;charset=UTF-8",
			success : function(result) {
				if(result.status==200){

				}else{
					alert(result.msg);
				}
			}
		});	
	}
});

