var endDate;
$(function() {
    var gotoIndex = function() {
        // return;
        window.location.href = "/lovehome/index.html";
    };
    var hgToken = $.cookie("hgToken");
    if (!hgToken) {
        gotoIndex();
    }
    // hgToken = '80ef501d08084ff6943ba5374f10819e';
    /**
     * 天数间隔
     */
    var dateDiff = function(startDate, endDate) {
        var startTime = startDate.getTime();
        var endTime = endDate.getTime();
        var dates = Math.abs((endTime - startTime)) / (1000 * 60 * 60 * 24);
        return dates;
    }
    var detail = avalon.define({
        $id: "detail",
        BUYING: false,
        TRANSFER: false,
        HISTORY: false,
        finishIng: false,//是否开始倒计时
        activityStatus: 'NORMAL',
        buyFlag:false,
        heartNumberValue:'',
        whetherJump:false,
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
                if (this.value && this.value % 10 == 0) {
                    $(".submit").css({
                        "background": "#FF8309",
                        "color": "white"
                    });
                    detail.checked = true;
                } else {
                    $(".submit").css({
                        "background": "#CDCDCD",
                        "color": "white"
                    });
                    detail.checked = false;
                    detail.whetherJump = false;
                }
            } else {
                $(".heartNumber").css({
                    "color": "#333333"
                });
                $(".submit").css({
                    "background": "#CDCDCD",
                    "color": "white"
                });
                detail.checked = false;
                detail.whetherJump = false;
            }
        },
        submit_click: function() {
            if (detail.heartNumberValue > 300) {
                showWarnWin("最多只能购买300", 1e3);
                detail.heartNumberValue = 300;
                return;
            }
            if (detail.heartNumberValue && detail.heartNumberValue % 10 == 0) {

            } else {
                showWarnWin("只能是10的倍数", 1e3);
                return;
            }
            var param = {
                "heartNumber": parseInt(detail.heartNumberValue),
                "hgToken": hgToken
            };
            var baseUrl = "http://116.213.142.87:8080";
            var buyUrl = baseUrl+"/hg/buy/create";
            $.ajax({
                type: "post",
                url: buyUrl,
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
                    detail.buyFlag = false;
                },
                error: function(xhrObj, text, err) {
                    detail.buyFlag = false;
                },
                complete: function() {
                    detail.buyFlag = false;
                }
            });
        }
    });
    var buy = avalon.define({
        $id: "buy",
        heartNumber: 0.00,
        incomeNumber: 0.00, // 爱心收益
        statusStr: "",
        matchNo: "00001",
        failureReason: "失败",
        BUY_PROCESSING: true, // 买入进行中
        BUY_FAILURE: false, //购买失败  上线之后改成false
        heartStr: '已拥有爱心',
        createTime: '',
        ownerNumber: 0.00, // 已拥有爱心
        heartIncome: 0.00, // 爱心回报
        buy_click: function() {
            //window.location.href = "../html/introduce.html?buy=true";
            $(".white_box").show();
            $(".black_box").show();
            $(".buy_love_btn").hide();
        }
    });
    $("#popupclose,.popupspan").on("click",function(){
		$(".white_box").hide();
		$(".black_box").hide();
		$(".buy_love_btn").show();
		$(".heartNumber").val("");
		$(".submit").css({
            "background": "#CDCDCD",
            "color": "white"
        });
	});
	$(".black_box").on('click',function(){
		$(".white_box").hide();
		$(".black_box").hide();
		$(".buy_love_btn").show();
		$(".heartNumber").val("");
		$(".submit").css({
            "background": "#CDCDCD",
            "color": "white"
        });
	});
    var transfer = avalon.define({
        $id: "transfer",
        heartNumber: 0.00, // 拥有爱心
        incomeNumber: 0.00, // 爱心收益
        statusStr: "",
        status: "",
        createTime: '',
        matchNo: "00001",
        failureReason: "失败",
        PROCESSING: false,
        FAILURE: false,
        SUCCESS: false,
        // submit_click: function() {
        //     //提现申请
        // },
        buy_click: function() {
            //window.location.href = "../html/introduce.html?buy=true";
            $(".white_box").show();
            $(".black_box").show();
            $(".buy_love_btn").hide();
        }
    });
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

    var init = function() {
        var param = {
            "hgToken": hgToken
        };
        $(".wrap").hide();
        $.ajax({
            type: "post",
            url: detailInfo,
            data: JSON.stringify(param),
            dataType: "json",
            success: function(result) {
                if (result.status == 200) {
                    detail.finishTime = result.data.finishTime;
                    detail.activityStatus = result.data.activityStatus;
                    if(detail.finishTime){
                    	endDate=detail.finishTime;
                    	detail.finishIng=true;
                    	show_time();
                    }
                    //detail.activityStatus = "NORMAL"; //==============================(调适好功能后删掉这行)
                    if (result.data.type == 'TRANSFER') {
                        // 传递
                        detail.TRANSFER = true;
                        detail.BUYING = false;
                        transfer.PROCESSING = false;
                        transfer.SUCCESS = false;
                        transfer.FAILURE = false;
                        transfer.status = result.data.status;
                        transfer.matchNo = result.data.matchNo;
                        transfer.failureReason = result.data.failureReason;
                        transfer.heartNumber = result.data.heartNumber;
                        transfer.incomeNumber = result.data.incomeNumber;
                        transfer.createTime = result.data.createTime;
                        if (transfer.status == 'PROCESSING') {
                            //匹配中
                            transfer.PROCESSING = true;
                        } else if (transfer.status == 'SUCCESS') {
                            //成功
                            transfer.SUCCESS = true;
                        } else if (transfer.status == 'FAILURE') {
                            //失败
                            transfer.FAILURE = true;
                        }
                    } else if (result.data.type == 'BUY') {
                        // 买入
                        detail.BUYING = true;
                        detail.TRANSFER = false;
                        buy.heartNumber = result.data.heartNumber;
                        buy.status = result.data.status;
                        buy.BUY_PROCESSING = false;
                        buy.BUY_FAILURE = false;
                        buy.createTime = result.data.createTime;
                        buy.ownerNumber = 0.00;
                        buy.heartIncome = 0.00;
                        if (buy.status == 'BUY_PROCESSING') {
                            // 进行中
                            buy.statusStr = "匹配中...";
                            buy.BUY_PROCESSING = true;
                        } else if (buy.status == 'BUY_SUCCESS') {
                            // 购买成功
                            buy.statusStr = "购买成功";
                            buy.ownerNumber = buy.heartNumber;
                            var days = parseInt(dateDiff(new Date(), new Date(buy.createTime)));
                            if (days > 7) {
                                days = 7;
                            }
                            buy.incomeNumber = days * 0.01 * buy.ownerNumber;
                            window.location.href = "../html/mine_time.html";
                        } else if (buy.status == 'BUY_FAILURE') {
                            // 购买失败
                            buy.statusStr = "购买失败";
                            buy.heartStr = "零钱已到账";
                            buy.ownerNumber = buy.heartNumber;
                            buy.BUY_FAILURE = true;
                        } else if (buy.status == 'TRANSFER') {
                            // 进行中
                            buy.statusStr = "已传递";
                        }
                        buy.matchNo = result.data.matchNo;
                        buy.failureReason = result.data.failureReason;

                    }
                } else if (result.status == 9999) {
                    // 没有购买记录
                    window.location.href = "../html/home.html";
                } else {
                    console.log(result.msg);
                    var options = {};
                    options.expires = 0;
                    $.cookie("hgToken", null, options);
                    gotoIndex();
                }
            }
        });
        $.ajax({
            type: "POST",
            url: transferHistory,
            data: JSON.stringify(param),
            dataType: "json",
            success: function(result) {
                if (result.status == 200) {
                    if (result.data.list.length > 0) {
                        detail.HISTORY = true;
                    }
                } else {
                    console.log(result.msg);
                    var options = {};
                    options.expires = 0;
                    $.cookie("hgToken", null, options);
                    gotoIndex();
                }
            }
        });
        window.onfocus = function() {
            init();
        };
    }
    init();
    setTimeout(function() {
        $(".mine").addClass('on');
    }, 100);
});


function show_time() {
    var time_start = new Date().getTime(); //设定当前时间
    var time_end = endDate; //设定目标时间
    var time_distance = time_end - time_start;
    if (time_distance < 0) {
        time_distance = -time_distance;
    }
    //console.log("time_distance" + time_distance);
    var int_day = Math.floor(time_distance / 86400000)
    time_distance -= int_day * 86400000;
    var int_hour = Math.floor(time_distance / 3600000)
    time_distance -= int_hour * 3600000;
    var int_minute = Math.floor(time_distance / 60000)
    time_distance -= int_minute * 60000;
    var int_second = Math.floor(time_distance / 1000)
    if (int_day < 10) {
        int_day = "0" + int_day;
    }
    if (int_hour < 10) {
        int_hour = "0" + int_hour;
    }
    if (int_minute < 10) {
        int_minute = "0" + int_minute;
    }
    if (int_second < 10) {
        int_second = "0" + int_second;
    }
    // 显示时间 
    var timeStr=int_day+"天 "+int_hour+"时 "+int_minute+"分 "+int_second+"秒";
    $(".timercountdown").find("span").html(timeStr);
    // 设置定时器
    setTimeout("show_time()", 1000);
}