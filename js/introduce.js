$(function() {

    var hgToken = $.cookie("hgToken");

    $("#toTop").css("top", window.screen.availHeight / 2 - 100 + "px");

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

    $(window).scroll(function() {
        if ($(window).scrollTop() >= 100) {
            $("#toTop").fadeIn(300);
        } else {
            $("#toTop").fadeOut(300);
        };
    });

    $('#toTop').click(function() {
        $('html , body').animate({
            scrollTop: "0px"
        }, 800);
    });

    $(".button-box").on("tap", function() {
        if (buying.hasActivity) {
            window.location.href = buying.url;
        } else {
            $(".white_box").show();
            $(".black_box").show();
            $(this).hide();
        }
    });

    $("#popupclose,.popupspan").on("tap", function() {
        $(".white_box").hide();
        $(".black_box").hide();
        $(".popup_btn").hide();
        $(".buy_love_btn").show();
        $(".button-box").show();
    });

    $(".black_box").on('tap', function() {
        $(".white_box").hide();
        $(".black_box").hide();
        $(".popup_btn").hide();
        $(".buy_love_btn").show();
        $(".button-box").show();
    });
    $("#know").on("tap", function() {
        $(".white_box").hide();
        $(".black_box").hide();
        $(".popup_btn").hide();
        $(".buy_love_btn").show();
        $(".button-box").show();
    });

    $(".protocol").on("tap", function() {
        location.href = '../html/protocol.html';
    });

    $(".heart").on("tap", function() {
        $(".heartNumber")[0].focus();
    });

    // $(".heartNumber").keyup(function(){
    //        $(this).val($(this).val().replace("//D|^0/g",''));
    //    }).bind("paste",function(){
    //        $(this).val($(this).val().replace("//D|^0/g",''));     
    //    }).css("ime-mode", "disabled");

    var showWarnWin = function(mes, time) {
        var htmlStr = "<div class='warnWin'><span class='warn_font'>" + mes + "</span></div>";
        var time = time ? time : 1e3;
        if (!$(".warnWin").length) {
            $("body").append(htmlStr);
            $(".warnWin").css({
                position: "fixed",
                width: "150px",
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

    var buying = avalon.define({
        $id: "buying",
        newUser: true, //是否有交易的用户
        heartNumber: '',
        btnName: '购买爱心',
        hasActivity: false,
        shared: false,
        buyFlag: false,
        whetherJump: false,
        shareBtn: false,
        UNFINISH: true, //活动未结束
        url: '/lovehome/html/detail.html',
        check: function() {
            if (this.value) {
                if (this.value.length > 0) {
                    $(".heartNumber").css({
                        "color": "#333333"
                    });
                } else if (this.value.length == "") {
                    $(".heartNumber").css({
                        "color": "#ff8208"
                    });
                }
                if (this.value && this.value % 10 == 0 && this.value <= 300) {
                    $(".submit").css({
                        "background": "#FF8309",
                        "color": "white"
                    });
                    buying.whetherJump = true;
                    buying.checked = true;
                } else {
                    $(".submit").css({
                        "background": "#CDCDCD",
                        "color": "white"
                    });
                    buying.checked = false;
                    buying.whetherJump = false;
                }
            } else {
                $(".heartNumber").css({
                    "color": "#ff8208"
                });
                $(".submit").css({
                    "background": "#CDCDCD",
                    "color": "white"
                });
                buying.checked = false;
                buying.whetherJump = false;
            }
        },
        submit_click: function() {
            if (!buying.whetherJump) {
                showWarnWin("请输入购买金额", 1e3);
                return;
            }
            if (buying.heartNumber > 300) {
                showWarnWin("最多只能购买300", 1e3);
                buying.heartNumber = 300;
                return;
            }
            if (buying.heartNumber && buying.heartNumber % 10 == 0) {

            } else {
                showWarnWin("只能是10的倍数", 1e3);
            }
            if (buying.buyFlag) {
                return false;
            }
            buying.buyFlag = true;
            var param = {
                "heartNumber": parseInt(buying.heartNumber),
                "hgToken": hgToken
            };
            $.ajax({
                type: "post",
                url: buy,
                data: JSON.stringify(param),
                dataType: "json",
                success: function(result) {
                    if (result.status == 200) {
                        wx.chooseWXPay({ // 微信支付
                            //    						timeStamp: result.data.WEIXIN_MP_PAY.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                            timestamp: result.data.WEIXIN_MP_PAY.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                            nonceStr: result.data.WEIXIN_MP_PAY.nonceStr, // 支付签名随机串，不长于 32 位
                            package: result.data.WEIXIN_MP_PAY.package, // 统一支付接口返回的prepay_id参数值，提交格式如:prepay_id=***）
                            signType: result.data.WEIXIN_MP_PAY.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            paySign: result.data.WEIXIN_MP_PAY.paySign, // 支付签名
                            success: function(res) { // 成功
                                //alert('success:' + JSON.stringify(res));
                                location.href = '../html/detail.html';
                            },
                            fail: function(res) { // 失败
                                //alert('fail:' + JSON.stringify(res));
                                showWarnWin('fail:' + JSON.stringify(res), 1e3);
                            },
                            cancel: function(res) { // 取消
                                //alert('cancel:' + JSON.stringify(res));
                            },
                            trigger: function(res) { // 菜单点击
                                //alert('trigger:' + JSON.stringify(res));
                            },
                            complete: function(res) { // 完成
                                //alert('complete:' + JSON.stringify(res));

                            }
                        });
                    } else {
                        showWarnWin(result.msg, 1e3);
                    }
                    buying.buyFlag = false;
                },
                error: function(xhrObj, text, err) {
                    buying.buyFlag = false;
                },
                complete: function() {
                    buying.buyFlag = false;
                }
            });
        }
    });


    var init = function() {
        var data = parse(location.href);

        // 爱心详情
        var param = {
            "hgToken": hgToken
        };
        $.ajax({
            type: "post",
            url: detailInfo,
            data: JSON.stringify(param),
            dataType: "json",
            success: function(result) {
                if (result.status == 200) {
                    buying.finishTime = result.data.finishTime;
                    buying.activityStatus = result.data.activityStatus;
                    if (buying.finishTime) {
                        buying.UNFINISH = false;
                    }
                    if (result.data.type == 'TRANSFER') {
                        buying.btnName = '我的爱心';
                        buying.hasActivity = true;
                        if (buying.activityStatus != 'NORMAL' && result.data.status != 'SUCCESS') {
                            //传递失败的进入活动结束失败页面
                            buying.url = "/lovehome/html/final_withdraw.html";
                        } else {
                            buying.url = "/lovehome/html/detail.html";
                        }
                    } else if (result.data.type == 'BUY') {
                        buying.btnName = '我的爱心';
                        buying.hasActivity = true;
                        if (buying.activityStatus != 'NORMAL') {
                            // 活动结束
                            buying.url = "/lovehome/html/final_withdraw.html";
                        } else if (result.data.status == "BUY_SUCCESS") {
                            // 有购买记录,没有卖出						
                            buying.url = "/lovehome/html/mine_time.html";
                        } else {
                            buying.url = "/lovehome/html/detail.html";
                        }

                    }
                } else {
                    console.log(result.msg);
                    var options = {};
                    options.expires = 0;
                    $.cookie("hgToken", null, options);
                    window.location.href = "/lovehome/index.html";
                    //					showWarnWin(result.msg, 1e3);
                }
            }
        });

        var shareBtn = $.cookie("shareBtn");
        if (!shareBtn) {
            buying.shareBtn = true;
            var options = {};
            options.expires = 1;
            $.cookie("shareBtn", "shareBtn", options);
        }
    }

    init();

    setTimeout(function() {
        $(".mine").addClass('on');
    }, 100);
});
