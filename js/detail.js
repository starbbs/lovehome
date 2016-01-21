$(function(){

	var hgToken=$.cookie("hgToken");
	
	var detail = avalon.define({
        $id: "detail",
        BUYING: true
    });
	
	var buy = avalon.define({
        $id: "buy",
        heartNumber: 0.00,
        statusStr:"",
        matchNo:"00001",
        failureReason:"失败",
        BUY_PROCESSING:true,//买入进行中
        click:function(){
        	
        }
    });
	
	var transfer = avalon.define({
        $id: "buy",
        heartNumber: 0.00,
        ownerNumber:0.00,//拥有爱心
        heartIncome:0.00,//爱心收益
        statusStr:"",
        matchNo:"00001",
        failureReason:"失败",
        BUY_PROCESSING:true,//买入进行中
        click:function(){
        	
        }
    });
	var init=function(){		
		var param = {
			"hgToken":hgToken
		};
		$(".wrap").hide();
		$.ajax({
			type : "POST",
			url : detail,
			data : JSON.stringify(param),
			dataType : "json",
			contentType : "application/json;charset=UTF-8",
			success : function(result) {
				if(result.status==200){
					if(result.data.type=='TRANSFER'){
						//传递
						detail.BUYING=false;
					}else{
						//买入
						detail.BUYING=true;
					}
				}else if(result.status==9999){
					//没有购买记录
					window.location.href="home.html";
				}else{
					alert(result.msg);
				}
			}
		});	
	}
});

