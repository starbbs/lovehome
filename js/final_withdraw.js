$(function() {

	var gotoIndex = function() {
		// return;
		window.location.href="/lovehome/index.html";
	};

	var hgToken = $.cookie("hgToken");
//	hgToken="2558076ebf4240e28f6b43a7e49f018f";
	if(!hgToken){
		gotoIndex();
	}

	var detail = avalon.define({
		$id : "detail",
		heartNumber : 0.00,
		incomeNumber : 0.00,// 爱心收益
		matchNo : "00001",
		heartIncome : 0.00,// 爱心回报
		HISTORY:false,
		rewardStatus:false,
		rewardMoney:0.00,
		summary_click :function(){
			window.location.href = "../html/summary.html";
		}
	});

	
	
	
	var init = function() {
		var param = {
			"hgToken" : hgToken
		};
		$.ajax({
			type : "post",
			url : detailInfo,
			data : JSON.stringify(param),
			dataType : "json",
			success : function(result) {
				if (result.status == 200) {
					detail.finishTime=result.data.finishTime;
					detail.activityStatus=result.data.activityStatus;
					detail.rewardMoney=result.data.rewardMoney;
					detail.rewardStatus=result.data.rewardStatus;
					if (result.data.type == 'TRANSFER') {
						// 传递
						detail.matchNo = result.data.matchNo;
						detail.heartNumber = result.data.heartNumber;
						detail.incomeNumber = result.data.incomeNumber;
						detail.createTime = result.data.createTime;
					} else if (result.data.type == 'BUY') {
						// 买入
						detail.heartNumber = result.data.heartNumber;
						detail.status = result.data.status;
						detail.createTime = result.data.createTime;						
						detail.matchNo = result.data.matchNo;

					}
				} else {
					console.log(result.msg);
					var options={};
					options.expires =0;
					$.cookie("hgToken",null,options);
					gotoIndex();
				}
			}
		});
		
		$.ajax({
			type : "POST",
			url : transferHistory,
			data : JSON.stringify(param),
			dataType : "json",
			success : function(result) {
				if(result.status==200){
					if(result.data.list.length>0){
						detail.HISTORY=true;
					}
				}else{
					console.log(result.msg);
					var options={};
					options.expires =0;
					$.cookie("hgToken",null,options);
					gotoIndex();
				}
			}
		});	
		
		window.onfocus=function (){
			init();	
		};
	}

	init();	
	
	setTimeout(function() {
		$(".mine").addClass('on');
	}, 100);
	
});
