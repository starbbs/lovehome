$(".buy_love_btn").on("tap", function() {

});
$("#close").on("tap", function() {
    $(".white_box").hide();
    $(".black_box").hide();
});

$(".black_box").on('tap', function() {
    $(".white_box").hide();
    $(".black_box").hide();
});

var endDate; //创建时间
var transferDay = 1; //传递封存天数-1天
var transferForceDay = 7; //强制传递天数
var buyIng;
var radialObj;

var showWarnWin = function(mes, time) {
    var htmlStr = "<div class='warnWin'><span class='warn_font'>" + mes + "</span></div>";
    var time = time ? time : 1e3;
    if (!$(".warnWin").length) {
        $("body").append(htmlStr);
        $(".warnWin").css({
            position: "fixed",
            top: "40%",
            left: "50%",
            width: "150px",
            height: "40px",
            "line-height": "20px",
            margin: "-20px 0px 0px -75px",
            "border-radius": "5px",
            "vertical-align": "middle",
            background: "#000000",
            color: "#fff",
            "text-align": "center",
            opacity: "0.7"
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

$(function() {
    var hgToken = $.cookie("hgToken");
    //var hgToken = "80ef501d08084ff6943ba5374f10819e";
    /**
     * 天数间隔
     */
    var dateDiff = function(startDate, endDate) {
        var startTime = startDate.getTime();
        var endTime = endDate.getTime();
        var dates = Math.abs((endTime - startTime)) / (1000 * 60 * 60 * 24);
        return dates;
    }

    buyIng = avalon.define({
        $id: "buy",
        heartNumber: 0.00,
        statusStr: "",
        matchNo: "00001",
        failureReason: "失败",
        BUY_PROCESSING: true, // 买入进行中
        BUY_FAILURE: false, //购买失败
        createTime: '',
        transferTip: '爱心传递',
        ownerNumber: 0.00, // 已拥有爱心
        heartIncome: 0.00, // 爱心回报
        days: 0,
        HISTORY: false,
        commit_click: function() {
            if (buyIng.days >= transferDay) {
                $(".white_box").show();
                $(".black_box").show();
            }
        },
        transfer_click: function() {
            if (buyIng.days >= transferDay) {
                var param = {
                    "hgToken": hgToken
                };
                $.ajax({
                    type: "post",
                    url: sellApply,
                    data: JSON.stringify(param),
                    dataType: "json",
                    success: function(result) {
                        if (result.status == 200) {
                            window.location.href = "../html/detail.html";
                        } else {
                            showWarnWin(result.msg, 1e3);
                        }
                    }
                });
            }
        }
    });


    var init = function() {
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
                    if (result.data.type == 'BUY') {
                        // 买入
                        buyIng.heartNumber = result.data.heartNumber;
                        buyIng.status = result.data.status;
                        buyIng.BUY_PROCESSING = false;
                        buyIng.createTime = result.data.createTime;
                        buyIng.successTime = result.data.successTime;
                        buyIng.ownerNumber = 0.00;
                        buyIng.heartIncome = 0.00;
                        if (buyIng.status == 'BUY_SUCCESS') {
                            // 购买成功
                            buyIng.statusStr = "购买成功";
                            if (buyIng.heartNumber) {
                                buyIng.ownerNumber = buyIng.heartNumber;
                            };
                            
                            if (buyIng.successTime) {
                                buyIng.days = parseInt(dateDiff(new Date(), new Date(buyIng.successTime)));
                            }
                            if (buyIng.days > transferForceDay) {
                                buyIng.days = transferForceDay;
                            }
                            buyIng.transferTip = (buyIng.days >= transferDay ? "强制传递" : "爱心传递");
                            buyIng.heartIncome = (buyIng.days * 0.01 * buyIng.ownerNumber);
                            endDate = buyIng.successTime;
                            console.log("开始时间" + endDate);
                            var time_start = new Date().getTime(); //设定当前时间
                            console.log("当前时间" + time_start);
                            var time_end = endDate + (1000 * 60 * 60 * 24 * (buyIng.days >= transferDay ? transferForceDay : transferDay)); //设定目标时间
                            console.log("结束时间" + time_end);
                            var time_distance = (time_start - endDate) / (time_end - endDate);
                            console.log("time_distance" + time_distance);
                            callbackwithgrb(time_distance.toFixed(2));
                            if (buyIng.days >= transferDay) {
                                $(".no_btn").css("background", "orange");
                                $(".no_btn").css("opacity", "1");
                            }
                        }
                    }
                } else if (result.status == 9999) {
                    // 没有购买记录
                    window.location.href = "../html/home.html";
                } else {
                    //                    showWarnWin(result.msg, 1e3);
                    console.log(result.msg);
                    var options = {};
                    options.expires = 0;
                    $.cookie("hgToken", null, options);
                    window.location.href = "/lovehome/index.html";
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
                        buyIng.HISTORY = true;
                    }
                } else {
                    console.log(result.msg);
                    var options = {};
                    options.expires = 0;
                    $.cookie("hgToken", null, options);
                    window.location.href = "/lovehome/index.html";
                }
            }
        });

        show_time();

        window.onfocus = function() {
            init();
        };
    }

    init();

    setTimeout(function() {
        $(".mine").addClass('on');
    }, 100);
});

function callbackwithgrb(objhaha) {
    // $('#menu_content_instance').radialIndicator({
    //     barWidth: 1,
    //     initValue: 0,
    //     barColor: '#ffffff',
    //     barBgColor: '#f37363',
    //     fontWeight:'normal',
    //     roundCorner: true,
    //     percentage: true,
    //     minValue: 0,
    //     maxValue: 100,
    //     displayNumber: false
    // });
    // radialObj = $('#menu_content_instance').data("radialIndicator");
    // console.log(objhaha);
    // radialObj.animate(objhaha*100);
    // $('#menu_content_instance').asPieProgress({
    //     namespace: 'pie_progress',
    //     goal: objhaha*100,
    //     min: 0,
    //     max: 100,
    //     speed: 30,
    //     easing: 'linear'
    // });
    // $('.pie_progress').asPieProgress('start');
}

function show_time() {
    var time_start = new Date().getTime(); //设定当前时间
    var time_end = endDate + (1000 * 60 * 60 * 24 * (buyIng.days >= transferDay ? transferForceDay : transferDay)); //设定目标时间
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
    $("#time_d").html(int_day);
    $("#time_h").html(int_hour);
    $("#time_m").html(int_minute);
    $("#time_s").html(int_second);
    $("#time_d_text").html("天");
    $("#time_h_text").html("时");
    $("#time_m_text").html("分");
    $("#time_s_text").html("秒");
    // 设置定时器
    setTimeout("show_time()", 1000);
}
