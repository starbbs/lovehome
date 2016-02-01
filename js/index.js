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
	var init=function(){
		if (!hgToken) {
			// 没有登录	
			var param = {
				"code" : data.code
			};
			if(!data.code){
				console.log(setWxUrl(window.location.href,data.referId));
				window.location.href=setWxUrl(window.location.href,data.referId);
			}else{
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
								if(referUserId && referUserId!="STATE"){
									window.location.href = "/lovehome/html/home.html?referUserId="+referUserId;	
								}else{
									window.location.href = "/lovehome/html/home.html";
								}				
							}else{
								//未注册
								var openId=result.data.openid;
								//alert(result.data);
								var url="/lovehome/html/zhuce.html?openId="+openId+"&referUserId="+referUserId;
								window.location.href=url;
							}
						}else{
							alert("授权失败"+result.msg);
						}
					}
				});
			}
		} else {
			if(referUserId && referUserId!="STATE"){
				window.location.href = "/lovehome/html/home.html?referUserId="+referUserId;	
			}else{
				window.location.href = "/lovehome/html/home.html";
			}
		}
		
	}
	
	window.onfocus=function (){
		init();
		
		setTimeout(function() {
			$(".mine").addClass('on');
		}, 100);
	};
});
