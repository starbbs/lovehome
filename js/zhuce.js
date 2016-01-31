var whetherClick = false;

$(function() {
	$(".main_yanzheng_get_btn").on("click",function(){
		$(this).css("color","#6888D9");
        var thisObj = $(this);
        var sendCodeUrl = sendCode;
        var tel = $(".phone").val();
        var verTel = "";
        if (thisObj.hasClass('sending')) {
            if (tel) {
                verTel = verify(tel, "tel");
                var datavalue = {
                    "phone": tel
                };
                if (verTel === true) {
                    isTimer = true;
                    var aj = $.ajax({
                        url: sendCodeUrl,
                        data: JSON.stringify(datavalue),
                        type: 'post',
                        cache: false,
                        dataType: 'json',
                        success: function(data) {
                            if (data.status == "200") {
                                showWarnWin("验证码已发送", 800);
                                timer(thisObj, 60);
                            } else {
                                showWarnWin("验证码已发送", 800);
                            }
                        },
                        error: function() {
                            showWarnWin("网络异常", 800);
                        }
                    });
                    thisObj.removeClass("sending");
                } else {
                    showWarnWin(verTel, 800);
                    return false;
                }
            } else {
                showWarnWin("请输入手机号", 800);
                return false;
            }
        }
	})
	
	
	$(".next_btn").on("click",function(){
		if(whetherClick) {
			var self = $(this);
	        var phone = $(".phone").val();
	        var identifyingCode = $(".identifyingCode").val();
	        $(this).css("background","#5977c5");
	        if (!phone) {
	            showWarnWin("请输入手机号", 800);
	            return;
	        }
	        if(!identifyingCode) {
	        	showWarnWin("请输入验证码", 800);
	            return;
	        }
	        var data = parse(window.location.href);
	        var param = {
	            "phone": phone,
	            "identifyingCode": identifyingCode,
	            "openId": data.openId
	        };
	        if (data.referUserId != 'STATE') {
	            param.referUserId = data.referUserId;
	        }
	        $.ajax({
	            type: "post",
	            url: register,
	            data: JSON.stringify(param),
	            dataType: "json",
	            success: function(result) {
	                if (result.status == 200) {
	                    $.cookie("hgToken", result.data.hgToken);
	                    if (data.referUserId != 'STATE') {
	                        window.location.href = "/lovehome/html/home.html?referUserId=" + data.referUserId;
	                    } else {
	                        window.location.href = "/lovehome/html/home.html";
	                    }
	                } else {
	                    //showWarnWin(result.msg, 800);
	                }
	            }
	        });
		}
	});
	
    /**
     * 参数存到data中
     */
    var parse = function(str) {
        var data = {};
        if (str.indexOf('?') > 0) {
            str = str.split('?')[1];
            str.split('&').forEach(function(item) {
                var arr = item.split('=');
                data[arr[0]] = arr[1];
            });
        }
        return data;
    };
});
var time = 0; //验证码倒计时
var showWarnWin = function(mes, time) {
    var htmlStr = "<div class='warnWin'><div class='warn_font'>" + mes + "</div></div>";
    var time = time ? time : 800;
    if (!$(".warnWin").length) {
        $("body").append(htmlStr);
        $(".warnWin").css({
            position: "fixed",
            width:"150px",
            top: "16%",
            left: "50%",
            height: "34px",
            "line-height": "34px",
            margin: "-20px 0px 0px -75px",
            "border-radius": "5px",
            "vertical-align": "middle",
            background: "#000000",
            color: "#333333",
            "text-align": "center",
            opacity: "0.9",
            "z-index": "10000"
        });
        $(".warn_font").css({
            display: "inline",
            "margin-top": "10px",
            "font-size": "15px",
            "font-weight":"400",
            "width":"100%",
            "color":"#ffffff"
        });
        setTimeout(function() {
            $(".warnWin").remove();
        }, time);
    }
};
var verify = function(inputData, dataType) {
    var reg = "";
    var varMes = "";
    if (dataType === "name") {
        reg = /^[\u4E00-\u9FA5]{2,5}$/;
        varMes = "姓名请输入2~5个汉字";
    } else if (dataType === "tel") {
        reg = /^(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
        varMes = "请输入正确手机号"
    } else if (dataType === "verCode") {
        reg = /^\d{6}$/;
        varMes = "验证码不正确"
    } else {
        reg = /^.*$/
    }
    if (inputData) {
        inputData = inputData.trim()
    }
    return reg.test(inputData) ? reg.test(inputData) : varMes
};

var isTimer = "";
var timer = function(o, wait) {
    if (wait == 0 || isTimer == false) {
        o.addClass("sending");
        $(o).css("color","#6888D9");
        o.text("获取验证码");
        isTimer = true;
    } else {
        o.text(wait + " 秒" +"后重发");
        $(o).css("color","#dddddd");
        wait--;
        setTimeout(function() {
            timer(o, wait);
        }, 800);
    }
};

function checkNum(thisobj) {
    var phone = $(".phone").val();
    mobilenum = phone.trim();
    var flag = verify(mobilenum, "tel");
    var sendNode = $(".main_yanzheng_get_btn");
    if (flag == true) {
        if (flag === true) {
            sendNode.addClass('sending');
            $(".main_yanzheng_get_btn").css("color", "#6888D9");
            if($("#yanzhengmacode").val()!=""){
    			var verCode = $("#yanzhengmacode").val();
    			var verCodeflag = verify(verCode,"verCode");
    			if(verCodeflag==true){
    				$(".next_btn").css("color","white");
    				whetherClick = true;
    			} else {
    				$(".next_btn").css("color","#aabff5");
    			}
            }
        } else {
            sendNode.removeClass('sending');
            $(".main_yanzheng_get_btn").css("color", "#ccc");
            isTimer = false;
        }
    } else {
        //sendNode.removeClass('sending');
        //$(".main_yanzheng_get_btn").css("color", "#ccc");
        $(".next_btn").css("color","#aabff5");
    }
}

function checkCode(thisObj) {
    var mobilenum = $(".phone").val();
    var flag = verify(mobilenum, "tel");
    var verCode = thisObj.value;
    var verCodeflag = verify(verCode,"verCode");
    var next_btn = $(".next_btn");
    console.log(verCode);
    console.log(verCodeflag);
    if(flag==true&&verCodeflag==true){
    	$(".next_btn").css("color","white");
    	whetherClick = true;
    } else {
    	$(".next_btn").css("color","#aabff5");
    	whetherClick = false;
    }
}
