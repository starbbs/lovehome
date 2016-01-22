$(function(){
	var hgToken=$.cookie("hgToken");
	
	var shareReturn = avalon.define({
		$id : "shareReturn",
		returnHeartNumber : 0.00,
		totalReturnHeartNumber : 0.00,
		list:[],
		withdraw_click : function() {
			var param = {
					"hgToken":hgToken
				};
				$.ajax({
					type : "POST",
					url : shareReturnWithdrawReq,
					data : JSON.stringify(param),
					dataType : "json",
					success : function(result) {
						if(result.status==200){
							alert("提现成功");
						}else{
							alert(result.msg);
						}
					}
				});	
		}
	});

	
	var init=function(){
		var param = {
			"hgToken":hgToken
		};
		$.ajax({
			type : "post",
			url : shareReturnInfo,
			data : JSON.stringify(param),
			dataType : "json",
			success : function(result) {
				if(result.status==200){
					if(result.data.returnHeartNumber){
						shareReturn.returnHeartNumber=result.data.returnHeartNumber;
					}
					if(result.data.totalReturnHeartNumber){
						shareReturn.totalReturnHeartNumber=result.data.totalReturnHeartNumber;
					}					
					for(var i=0;i<result.data.list.length;i++){
						var item=result.data.list[i];
						shareReturn.list.push(item);
					}
				}else{
					alert(result.msg);
				}
			}
		});	
	}
	
	init();
});

