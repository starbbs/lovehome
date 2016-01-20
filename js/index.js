$(function() {

	/**
	 * 参数存到data中
	 */
	var parse = function(str) {
		var data = {};
		str.split('&').forEach(function(item) {
			var arr = item.split('=');
			data[arr[0]] = arr[1];
		});
		return data;
	};

	

	var loveToken = $.cookie("loveToken");
	if (!loveToken) {
		// 没有登录
		var href = window.location.href;
		var data=parse(href);
		var referUserId= data.state;
		var param = {
			"code" : data.code
		};
		if(!data.code){
			window.location.href=setWxUrl(window.location.href);
		}
		$.ajax({
			type : "POST",
			url : wxLoing,
			data : JSON.stringify(param),
			dataType : "json",
			contentType : "application/json;charset=UTF-8",
			success : function(result) {
				if(result.status==200){
					if(result.data.hgToken){
						//已注册
						$.cookie("hgToken",result.data.hgToken);
						window.location.href="html/home.html";
						
					}else{
						//未注册
						var openId=result.data.openId;
						window.location.href="html/zhuce.html?openId"+openId+"&referUserId="+referUserId;
					}
				}else{
					alert("授权失败"+result.msg);
				}
			}
		});

	} else {
		// 自动登录
		window.location.href="html/home.html";
	}
});
