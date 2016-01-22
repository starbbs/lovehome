$(function() {

	var hgToken = $.cookie("hgToken");

	/**
	 * 天数间隔
	 */
	var dateDiff = function(startDate, endDate) {
		var startTime =startDate.getTime();
		var endTime = endDate.getTime();
		var dates = Math.abs((endTime-startTime)) / (1000 * 60 * 60 * 24);
		return dates;
	}

	var detail = avalon.define({
		$id : "detail",
		BUYING : true
	});

	var buy = avalon.define({
		$id : "buy",
		heartNumber : 0.00,
		statusStr : "",
		matchNo : "00001",
		failureReason : "失败",
		BUY_PROCESSING : true,// 买入进行中
		BUY_FAILURE:false,//购买失败
		createTime : '',
		ownerNumber : 0.00,// 已拥有爱心
		heartIncome : 0.00,// 爱心回报
		click : function() {

		}
	});

	var transfer = avalon.define({
		$id : "transfer",
		heartNumber : 0.00,// 拥有爱心
		incomeNumber : 0.00,// 爱心收益
		statusStr : "",
		status : "",
		createTime : '',
		matchNo : "00001",
		failureReason : "失败",
		PROCESSING:false,
		FAILURE:false,
		SUCCESS:false,
		submit_click : function() {
			//提现申请
		}
	});
	var init = function() {
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
					if (result.data.type == 'TRANSFER') {
						// 传递
						detail.BUYING = false;
						transfer.PROCESSING=false;
						transfer.SUCCESS=false;
						transfer.FAILURE=false;
						transfer.status=result.data.status;
						transfer.matchNo = result.data.matchNo;
						transfer.failureReason = result.data.failureReason;
						transfer.heartNumber = result.data.heartNumber;
						transfer.incomeNumber = result.data.incomeNumber;
						transfer.createTime = result.data.createTime;
						if(transfer.status=='PROCESSING'){
							//匹配中
							transfer.FAILURE=true;
						}else if(transfer.status=='SUCCESS'){
							//成功
							transfer.SUCCESS=true;
						}else if(transfer.status=='FAILURE'){
							//失败
							transfer.FAILURE=true;
						}
					} else {
						// 买入
						detail.BUYING = true;
						buy.heartNumber = result.data.heartNumber;
						buy.status = result.data.status;
						buy.BUY_PROCESSING = false;
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
							var days=parseInt(dateDiff(new Date(),new Date(buy.createTime)));
							if(days>7){
								days=7;
							}
							buy.heartIncome =days*0.01*buy.ownerNumber;			
							window.location.href = "../html/mine_time.html?days="+days+"&ownerNumber="+buy.ownerNumber+"&heartIncome="+buy.heartIncome;
						} else if (buy.status == 'BUY_FAILURE') {
							// 购买失败
							buy.statusStr = "购买失败";
							buy.BUY_FAILURE=true;
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
					alert(result.msg);
				}
			}
		});
	}

	init();
});
