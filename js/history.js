$(function(){
	var hgToken=$.cookie("hgToken");
	// hgToken = '09f5ca246c7244dfa32fdddb6fc8daad';
	if(!hgToken){
		window.location.href="/lovehome/index.html";
	}
	/**
	 * 天数间隔
	 */
	var dateDiff = function(startDate, endDate) {
		var startTime =startDate.getTime();
		var endTime = endDate.getTime();
		var dates = Math.abs((endTime-startTime)) / (1000 * 60 * 60 * 24);
		return dates;
	}
	
	var history = avalon.define({
		$id : "history",
		list:[]
	});
	
	var init=function(){
		var param = {
			"hgToken":hgToken
		};
		$.ajax({
			type : "POST",
			url : transferHistory,
			data : JSON.stringify(param),
			dataType : "json",
			success : function(result) {
				if(result.status==200){
					for(var i=0;i<result.data.list.length;i++){
						var item=result.data.list[i];
						if((i+1)%2==0){
							item.even=true;
						}else{
							item.even=false;
						}
						if(item.status=='BUY_PROCESSING'){
							item.statusStr='购买中';
							item.time=item.createTime;
						}else if(item.status=='BUY_SUCCESS'){
							item.statusStr='购买成功';
							item.time=item.successTime;
						}else if(item.status=='BUY_FAILURE'){
							item.statusStr='购买失败';
							item.time=item.createTime;
						}else if(item.status=='TRANSFER'){
							item.statusStr='已传递';
							item.time=item.transferTime;
						}
						if(!item.incomeNumber){
							var days=parseInt(dateDiff(new Date(),new Date(item.createTime)));
							if(days>7){
								days=7;
							}
							item.incomeNumber =days*0.01*item.heartNumber;	
							
						}
						history.list.push(item);
					}
				}else{
					console.log(result.msg);
					var options={};
					options.expires =0;
					$.cookie("hgToken",null,options);
					window.location.href="/lovehome/index.html";
				}
			}
		});	
	}
	
	init();
	
	setTimeout(function() {
		$(".mine").addClass('on');
	}, 100);
});

