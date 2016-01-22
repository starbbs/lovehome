$(function() {

	/**
	 * 参数存到data中
	 */
	var parse = function(str) {
		var data = {};
		if(str.indexOf('?')>0){
			str=str.split('?')[1];
			str.split('&').forEach(function(item) {
				var arr = item.split('=');
				data[arr[0]] = arr[1];
			});
		}
		return data;
	};

	

	var hgToken = $.cookie("hgToken");
	if (!hgToken) {
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
			type : 'post',
			url : wxLoing,
			data : JSON.stringify(param),
			dataType : 'json',
			success : function(result) {
				if(result.status==200){
					if(result.data.hgToken){
						//已注册
						$.cookie("hgToken",result.data.hgToken);
						window.location.href="html/detail.html";				
					}else{
						//未注册
						var openId=result.data.openid;
						//alert(result.data);
						var url="html/zhuce.html?openId="+openId+"&referUserId="+referUserId;
						window.location.href=url;
					}
				}else{
					alert("授权失败"+result.msg);
				}
			}
		});

	} else {
		// 自动登录
		var param = {
			"hgToken" : hgToken
		};
		$(".wrap").hide();
		$.ajax({
			type : "post",
			url : detailInfo,
			data : JSON.stringify(param),
			dataType : "json",
			success : function(result) {
				if (result.status == 200) {
					if (result.data.type == 'NOT_ACTIVITY') {
						// 没有购买记录
						window.location.href = "/html/home.html";
					} else {
						// 有购买记录
						window.location.href = "/html/detail.html";
					}
				} else if (result.status == 9999) {
					// 没有购买记录
					window.location.href = "/html/home.html";
				} else {
					alert(result.msg);
				}
			}
		});
	}
});
