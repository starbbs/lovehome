$(function(){
	var hgToken=$.cookie("hgToken");
	if(!hgToken){
		window.location.href="/lovehome/index.html";
	}
	
	var shareReturn = avalon.define({
		$id : "shareReturn",
		returnHeartNumber : 0.00,
		totalReturnHeartNumber : 0.00,
		list:[],
		withdraw_click : function() {
			if(shareReturn.returnHeartNumber>=1){
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
							location.href = '../html/shareReturn.html';
						}else{
							alert(result.msg);
						}
					}
				});		
			}			
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
					if(shareReturn.returnHeartNumber<=0){
						$(".cash_btn").css({
							"background":"#CDCDCD",
							"color":"white"
						});
					}
					if(Number(shareReturn.returnHeartNumber)<1){
						$(".button").css({
							"background":"#cecece",
							"color":"#cccccc"
						})
					}
					if(result.data.totalReturnHeartNumber){
						shareReturn.totalReturnHeartNumber=result.data.totalReturnHeartNumber;
					}					
					for(var i=0;i<result.data.list.length;i++){
						var item=result.data.list[i];
						shareReturn.list.push(item);
					}
				}else{
					console.log(result.msg);
                	var options={};
            		options.expires =0;
            		$.cookie("hgToken",null,options);
					window.location.href="/lovehome/index.html";
				}
			}
		});	
	}
	
	init();
	
	setTimeout(function() {
		$(".mine").addClass('on');
	}, 100);
});

