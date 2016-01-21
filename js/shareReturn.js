$(function(){
	var hgToken=$.cookie("hgToken");
	
	
	$(document).on('click', '.submit', function() {
		var param = {
			"hgToken":hgToken
		};
		$.ajax({
			type : "POST",
			url : shareReturnWithdrawReq,
			data : JSON.stringify(param),
			dataType : "json",
			contentType : "application/json;charset=UTF-8",
			success : function(result) {
				if(result.status==200){
					alert("提现成功");
				}else{
					alert(result.msg);
				}
			}
		});	
	});
	
	var init=function(){
		var param = {
			"hgToken":hgToken
		};
		$.ajax({
			type : "POST",
			url : shareReturnInfo,
			data : JSON.stringify(param),
			dataType : "json",
			contentType : "application/json;charset=UTF-8",
			success : function(result) {
				if(result.status==200){
					var returnHeartNumber=result.data.returnHeartNumber;
					for(var i=0;i<result.data.list.length;i++){
						var item=result.data.list[i];
					}
				}else{
					alert(result.msg);
				}
			}
		});	
	}
});

