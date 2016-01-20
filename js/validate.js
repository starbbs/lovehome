;(function($){
	
	var isValidationPattren=null;

	var Validation=function(){
		var rols={
			phone:{
				check:function(value){
					if(value){
							console.log(value)
						return isValidationPattren(value,/^\d{2,}$/)
					}
					return false
				},
				msg:"请输入正确的金额(为10的倍数)"
			}
		};
		function isValidationPattren(value,reg){
			var regExp=reg;
			var value=value;
			if(value>9&&value%10==0){				
			
				$(".submit").css({
					"background":"#FF8309",
					"color":"white"
				})
//				var value1=value.parseFloat(2)
				return regExp.test(value);
			}else{
				$(".submit").css({
					"background":"#CDCDCD",
					"color":"white"
				})				
				return false;
			}
			
		};
		return {
			addrole:function(name,obj){
				return rols[name]=obj
			},
			getrole:function(name){
				return rols[name]
			}
		};
		
	};
	
	//创建一个表单的构造函数
	var Form=function(form){
		var fields=[];
		form.find('[validation]').each(function(i,v){
			var field=$(this);
			if(field.attr('validation')!==undefined){
				fields.push(new Field(field));	
			}
		});
		this.fields=fields;
	}
	Form.prototype={
		valiteAll:function(){
			for(var field in this.fields){
				this.fields[field].validate();
				console.log(this.fields[field].validate());
			}
		},
		isvalite:function(){
			for(var field in this.fields){
				var aa=this.fields[field].valite;
				if(!aa){
					return false
				}
				return true;
			}
			this.fields[0].testemail();
		}
	}

	//创建一个控件的构造函数
	var Field=function(field){
		this.f=field;
		this.valite=false;
		this.attach('focus');
		this.attach('change');
	}
	Field.prototype={
		attach:function(event){
			var that=this;
			this.f.bind('focus',function(){
				var op=$(this).next();
				op.show().html(op.attr('node-type'));
			});
			this.f.bind('change',function(){
				
				that.validate();
			})
			this.f.bind('keyup',function(){
				
				that.validate();
			})
		},
		validate:function(){
			var val=this.f.val();
			var field_name=this.f.attr('validation');
					var txt=this.f.next(),
						obj=$.validation.getrole(field_name);
					txt.show();
					this.f.unbind('keyup');
					this.attach('keyup');
					if(!obj.check(val)){
						txt.html(obj.msg).addClass('error');
						this.valite=false
					}
					else{
						if(field_name=='email'){
							this.testemail();
						}
						txt.html("输入正确").removeClass('error').addClass('right');
						this.valite=true
					}
		},
		testemail:function(){
			var obj=$.validation.getrole('isHasThisEmail'),
				val=this.f.val(),
				txt=this.f.next();
			if(!obj.check(val)){
				txt.html(obj.msg).addClass('error')
				this.valite=false
			}
			else{
				
				txt.html("输入正确").removeClass('error').addClass('right');
				this.valite=true
			}
		}

	}
	$.extend($.fn,{
		validation:function(){
			$.validation=new Validation();
			var form=new Form($(this));
			$(this).on('submit',function(e){
				e.preventDefault();
				form.valiteAll();

			})	
		}
	});
})(jQuery)