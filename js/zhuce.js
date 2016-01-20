$(function(){	
	function ajax(){		
		var phone=$(".phone").val();
		$.ajax({			
			type:"post",
			url:"https://www.goopal.com.cn/login/wxRegister",
			data: JSON.stringify({
				phone: phone
			}),
			dataType:"json",
			success: function(data) {
				
				if (data.status == 300) { // {msg: "用户登录/验证失败，请重新登录", status: "300"}
					if (window.location.href.indexOf('/index.html') === -1) {
						return window.location.href = 'index.html';
					}
				} else if (data.status == 304) { // {msg: "服务器异常", status: "300"}
					$.alert('服务器异常, 请联系后台人员!');
				}
				callback && callback.call(this, data);
				success && success.call(this, data);
			},
			error: function(xhrObj, text, err) {
				//console.log('Error: ', arguments);
				if (text === 'timeout') {
					$.alert('请求超时...<br>请检查您的网络');
				}
			},
			complete: function() {
				xhr = null;
				isRequesting = false;
			}
			
		});
	}
	ajax();
});