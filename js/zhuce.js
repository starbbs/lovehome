$(function(){	
	var time=0;//验证码倒计时
	$(document).on('click', '.main_yanzheng_get', function() {
		if(timer>0){
			return;
		}
		var self = $(this);
		var phone=$(".phone").val();
		if(!phone){
			alert("请输入手机号");
			return;
		}
		var param = {
				"phone" :phone
			};
		$.ajax({
			type : 'post',
			url : sendCode,
			data : JSON.stringify(param),
			dataType : 'json',
			success : function(result) {
				if(result.status==200){
					alert(result.data.identifyingCode);
				}else{
					alert(result.msg);
				}
			}
		});	
			
		var timer = setInterval(function() {
			time--;
			if (time <= 0) {
				clearInterval(timer);
				self.html('重新发送');
			} else {
				self.html(time + '秒后重发');
			}
		}, 1000);
	});

	$(document).on('click', '.next_btn', function() {
		var self = $(this);
		var phone=$(".phone").val();
		var identifyingCode=$(".identifyingCode").val();
		if(!phone || !identifyingCode){
			alert("请输入手机号或验证码");
			return;
		}
		var data=parse(window.location.href);

		var param = {
				"phone" :phone,
				"identifyingCode":identifyingCode,
				"openId":data.openId
			};
		if(data.referUserId!='STATE'){
			param.referUserId=data.referUserId;
		}
		$.ajax({
			type : "post",
			url : register,
			data : JSON.stringify(param),
			dataType : "json",
			success : function(result) {
				if(result.status==200){
					$.cookie("hgToken",result.data.hgToken);
					window.location.href="../html/home.html";
				}else{
					alert(result.msg);
				}
			}
		});	
	});
	
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
});