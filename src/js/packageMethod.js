//js获取项目根路径，如： http://localhost:8083/uimcardprj  
function getRootPath(){  
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp  
    var curWwwPath=window.document.location.href;  
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp  
    var pathName=window.document.location.pathname;  
    var pos=curWwwPath.indexOf(pathName);  
    //获取主机地址，如： http://localhost:8083  
    var localhostPaht=curWwwPath.substring(0,pos);  
    //获取带"/"的项目名，如：/uimcardprj  
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);  
    return(localhostPaht+projectName);  
} 

//表单数据转成对象
function parseFormToObj(form) {
	var array = $(form).serializeArray();
	var param = "{";
	for (var i = 0; i < array.length; i++) {
		var name = array[i].name;
		var value = $.trim(array[i].value);
		var placeholder = $.trim($("[name='" + name + "']").attr("placeholder"));
		if (value === null || value === "" || value === placeholder) {
			param = param + "\"" + name + "\":'',";
		} else {
			param = param + "\"" + name + "\":'" + value + "',";
		}
	}

	if (param.indexOf(",") != -1) {
		param = param.substring(0, param.length - 1);
	}
	param = param + "}";
	return (new Function("","return "+param))();
}

//获取地址栏属性的数据
function getUrlParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null) return unescape(r[2]); return null;
}

//日期格式  "2017-05-10 15:12:10"
function add0(m){return m<10?'0'+m:m }
function   formatDate(data)   {  
	if(data==null || data==undefined){
		return ""
	}
  	var time = new Date(data);
  	var y = time.getFullYear();
  	var m = time.getMonth()+1;
  	var d = time.getDate();
  	var h = time.getHours();
  	var mm = time.getMinutes();
  	var s = time.getSeconds();
  	return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
} 

//获取前12个月的数据返回对象 ["2016-06","2016-07"....]
function getMonth(now) {
    var d = new Date(now.replace(/[^\d]/g, "/") + "/1");
    var result = [];
    d.setMonth(d.getMonth() - 12);
    for(var i = 0; i < 12; i++) {
        d.setMonth(d.getMonth() + 1);
        var m = d.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        result.push(d.getFullYear() + "-" + m);
    }
    return result;
}

//获取前7天的日期 返回对象  ["05-03","05-04"....]
function getDays(date) {
	var result = [];
	date.setDate(date.getDate() - 7);
    for(var i = 0; i < 7; i++) {
    	date.setDate(date.getDate() + 1);
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        result.push(m + "-" + d);
    }
    return result;
}


jQuery.extend({
	paths : {
		root : getRootPath(),
		admin : getRootPath() + "/admin"
	},
    regexps : {//正则
		phone : /^1[34578]\d{9}$/,
		email : /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
		idNumber : /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
		nameCn : /^[\u4E00-\u9FA5]{1,6}$/,
		nameEn : /^[0-9a-zA-Z_]{1,}$/,
		accountNum : /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/,
	},
	objToArray : function(obj){
		var arr = [];
		for (var key in obj) 
		{
			arr.push({
				key:key,
				val:obj[key]
			});
		}
		
		return arr
	}
});
