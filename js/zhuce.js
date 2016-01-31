$(function() {
    $(document).on('click', '.main_yanzheng_get_btn', function() {
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
                                showWarnWin("验证码已发送", 1e3);
                            } else {
                                showWarnWin("验证码已发送", 1e3);
                            }
                        },
                        error: function() {
                            showWarnWin("网络异常", 1e3);
                        }
                    });
                    thisObj.removeClass("sending");
                    timer(thisObj, 60);
                } else {
                    showWarnWin(verTel, 1e3);
                    return false;
                }
            } else {
                showWarnWin("请输入手机号码", 1e3);
                return false;
            }
        }

    });
    $(document).on('click', '.next_btn', function() {
        var self = $(this);
        var phone = $(".phone").val();
        var identifyingCode = $(".identifyingCode").val();
        if (!phone) {
            showWarnWin("请输入手机号", 1e3);
            return;
        }
        if(!identifyingCode) {
        	showWarnWin("请输入验证码", 1e3);
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
                    showWarnWin(result.msg, 1e3);
                }
            }
        });
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
    var htmlStr = "<div class='warnWin'><span class='warn_font'>" + mes + "</span></div>";
    var time = time ? time : 1e3;
    if (!$(".warnWin").length) {
        $("body").append(htmlStr);
        $(".warnWin").css({
            position: "fixed",
            top: "26%",
            left: "50%",
            width: "150px",
            height: "60px",
            "line-height": "22px",
            margin: "-20px 0px 0px -75px",
            "border-radius": "5px",
            "vertical-align": "middle",
            background: "#000000",
            color: "#333333",
            "text-align": "center",
            opacity: "0.7",
            "z-index": "10000"
        });
        $(".warn_icon").css({
            display: "block",
            width: "32px",
            height: "32px",
            "text-align": "center",
            margin: "10px auto 0",
            "font-size": "30px"
        });
        $(".warn_font").css({
            display: "block",
            "font-family": "黑体",
            "margin-top": "10px",
            "font-size": "15px"
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
        varMes = "请输入正确的手机号码"
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
        o.text("获取验证码");
        isTimer = true;
    } else {
        o.text(wait + " s");
        wait--;
        setTimeout(function() {
            timer(o, wait);
        }, 1e3);
    }
};

function checkNum(thisobj) {
    var phone = $(".phone").val();
    mobilenum = phone;
    console.log(mobilenum);
    var flag = verify(mobilenum, "tel");
    var sendNode = $(".main_yanzheng_get_btn");
    if (flag == true) {
        if (flag === true) {
            sendNode.addClass('sending');
            $(".main_yanzheng_get_btn").css("color", "#6888D9");
        } else {
            sendNode.removeClass('sending');
            $(".main_yanzheng_get_btn").css("color", "#ccc");
            isTimer = false;
        }
    } else {
        //sendNode.removeClass('sending');
        //$(".main_yanzheng_get_btn").css("color", "#ccc");
    }
}
