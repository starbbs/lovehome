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
	var data=parse(window.location.href);
	var referUserId= data.state;
//	alert("referUserId:"+referUserId);
	var init=function(){
		if (!hgToken) {
			// 没有登录	
			var param = {
				"code" : data.code
			};
			if(!data.code){
//				alert("!data.code:"+referUserId);
				window.location.href=setWxUrl(window.location.href,referUserId);
			}else{
				$.ajax({
					type : 'post',
					url : wxLoing,
					data : JSON.stringify(param),
					dataType : 'json',
					success : function(result) {
						if(result.status==200){
							var openId=result.data.openid;
							if(result.data.hgToken){
//								alert("已注册:"+referUserId);
								//已注册
								$.cookie("hgToken",result.data.hgToken);
								if(referUserId && referUserId!="STATE"){
									window.location.href = "/lovehome/html/home.html?openId="+openId+"&referUserId="+referUserId;
								}else{
									window.location.href = "/lovehome/html/home.html?openId="+openId;
								}			
							}else{
								//未注册
//								alert("未注册:"+referUserId);
								if(referUserId && referUserId!="STATE"){
									window.location.href = "/lovehome/html/home.html?openId="+openId+"&referUserId="+referUserId;
								}else{
									window.location.href = "/lovehome/html/home.html?openId="+openId;
								}
							}
						}else{
							alert("授权失败"+result.msg);
						}
					}
				});
			}
		} else {
//			alert("没有token:"+referUserId);
			if(referUserId && referUserId!="STATE"){
				window.location.href = "/lovehome/html/home.html?referUserId="+referUserId;
			}else{
				window.location.href = "/lovehome/html/home.html";
			}
		}
		
		window.onfocus=function (){
			init();
		};
	}
	
	init();
	
	setTimeout(function() {
		$(".mine").addClass('on');
	}, 100);
	
	window.onfocus=function (){
		init();
	};
});
