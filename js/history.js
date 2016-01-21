$(function(){
	var hgToken=$.cookie("hgToken");

	var init=function(){
		var param = {
			"hgToken":hgToken
		};
		$.ajax({
			type : "POST",
			url : transferHistory,
			data : JSON.stringify(param),
			dataType : "json",
			contentType : "application/json;charset=UTF-8",
			success : function(result) {
				if(result.status==200){
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

