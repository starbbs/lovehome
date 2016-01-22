var FloatCalFun = new Object();
// 获取参数精度，如果为整数则精度为0
FloatCalFun._getPrecision = function(arg) {
	if (arg.toString().indexOf(".") == -1) {
		return 0;
	} else {
		return arg.toString().split(".")[1].length;
	}

}
// 获取小数的整数形式
FloatCalFun._getIntFromFloat = function(arg) {
	if (arg.toString().indexOf(".") == -1) {
		return arg;
	} else {
		return Number(arg.toString().replace(".", ""));
	}
}
// 乘法
FloatCalFun.floatMulti = function(arg1, arg2) {
	var precision1 = this._getPrecision(arg1);
	var precision2 = this._getPrecision(arg2);
	var tempPrecision = 0;

	tempPrecision += precision1;
	tempPrecision += precision2;
	var int1 = this._getIntFromFloat(arg1);
	var int2 = this._getIntFromFloat(arg2);
	return (int1 * int2) * Math.pow(10, -tempPrecision);
}
// 加法
FloatCalFun.floatAdd = function(arg1, arg2) {
	var precision1 = this._getPrecision(arg1);
	var precision2 = this._getPrecision(arg2);
	var temp = Math.pow(10, Math.max(precision1, precision2));
	return (this.floatMulti(arg1, temp) + this.floatMulti(arg2, temp)) / temp;
}
// 减法
// arg1 被减数
// arg2 减数
FloatCalFun.floatSubtract = function(arg1, arg2) {
	var precision1 = this._getPrecision(arg1);
	var precision2 = this._getPrecision(arg2);
	var temp = Math.pow(10, Math.max(precision1, precision2));
	return (this.floatMulti(arg1, temp) - this.floatMulti(arg2, temp)) / temp;
}
// //除法
// arg1 被除数
// arg2 除数
FloatCalFun.floatDiv = function(arg1, arg2) {
	var precision1 = this._getPrecision(arg1);
	var precision2 = this._getPrecision(arg2);
	var int1 = this._getIntFromFloat(arg1);
	var int2 = this._getIntFromFloat(arg2);
	var result = (int1 / int2) * Math.pow(10, precision2 - precision1);
	return result;
}