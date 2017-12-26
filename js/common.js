;var myjs = {
	trim:function(str,type) {
		//去除空格  type 1-所有空格  2-前后空格  3-前空格 4-后空格
	    switch (type){
	        case 1:return str.replace(/\s+/g,"");
	        case 2:return str.replace(/(^\s*)|(\s*$)/g, "");
	        case 3:return str.replace(/(^\s*)/g, "");
	        case 4:return str.replace(/(\s*$)/g, "");
	        default:return str;
	    }
	},
	checkType:function(str, type) {
			//checkType('165226226326','phone')
			//false
			//大家可以根据需要扩展
	    switch (type) {
	        case 'email':
	            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
	        case 'phone':
	            return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
	        case 'tel':
	            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
	        case 'number':
	            return /^[0-9]$/.test(str);
	        case 'english':
	            return /^[a-zA-Z]+$/.test(str);
	        case 'chinese':
	            return /^[\u4E00-\u9FA5]+$/.test(str);
	        case 'lower':
	            return /^[a-z]+$/.test(str);
	        case 'upper':
	            return /^[A-Z]+$/.test(str);
	        default :
	            return true;
	    }
	},
	addClass:function(obj,classStr){
    	if (!this.hasClass(obj,classStr)){
    		obj.className += " " + classStr
    	};
	},
	removeClass:function(obj,classStr){
	    if (this.hasClass(obj,classStr)) {
	        var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
	        obj.className = obj.className.replace(reg, '');
	    }
	},

	upDigit:function(n) {   
		//upDigit(168752632)
		//"人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"
		//upDigit(1682)
		//"人民币壹仟陆佰捌拾贰元整"
		//upDigit(-1693)
		//"欠人民币壹仟陆佰玖拾叁元整"
	    var fraction = ['角', '分','厘'];  
	    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];  
	    var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];  
	    var head = n < 0? '欠人民币': '人民币';  
	    n = Math.abs(n);  
	    var s = '';  
	    for (var i = 0; i < fraction.length; i++)   
	    {
	        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, ''); 
	    } 
	    s = s || '整';  
	    n = Math.floor(n);  
	    for (var i = 0; i < unit[0].length && n > 0; i++)   
	    {  
	        var p = '';  
	        for (var j = 0; j < unit[1].length && n > 0; j++)   
	        {  
	            p = digit[n % 10] + unit[1][j] + p; 
	            n = Math.floor(n / 10);
	        }
	        //s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')+ unit[0][i] + s; 
	        s = p+ unit[0][i] + s;
	    }
	    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
	},
	randomColor:function (){
		//随进产生颜色
	    //randomNumber是上面定义的函数
	    //写法1
	    return 'rgb(' + randomNumber(255) + ',' + randomNumber(255) + ',' + randomNumber(255) + ')';
	    
	    //写法2
	    return '#'+Math.random().toString(16).substring(2).substr(0,6);
	    
	    //写法3
	    var color='#';
	    for(var i=0;i<6;i++){
	        color+='0123456789abcdef'[randomNumber(15)];
	    }
	    return color;
	},
	getEndTime:function(endTime){
		//到某一个时间的倒计时
		//getEndTime('2017/7/22 16:0:0')
		//"剩余时间6天 2小时 28 分钟20 秒"
	    var startDate=new Date();  //开始时间，当前时间
	    var endDate=new Date(endTime); //结束时间，需传入时间参数
	    var t=endDate.getTime()-startDate.getTime();  //时间差的毫秒数
	    var d=0,h=0,m=0,s=0;
	    if(t>=0){
	      d=Math.floor(t/1000/3600/24);
	      h=Math.floor(t/1000/60/60%24);
	      m=Math.floor(t/1000/60%60);
	      s=Math.floor(t/1000%60);
	    } 
	    return "剩余时间"+d+"天 "+h+"小时 "+m+" 分钟"+s+" 秒";
	},
	mumber_format:function (num,decimals=0){
		/*
		@descript:格式化数字
		@param：num[float],decimals[int]
		 */
		if(typeof num !== "number"||typeof decimals !== "number"){
			throw new Error('param type is error!');
		}
		var num_arr = (num.toString()).split(".");
		var num_end=""
		if(num_arr.length == 1){
			num_arr[1]=[];
		}
		if(num_arr[1].length>=decimals){
			num_end = num_arr[1].substr(0,decimals);
		}else{
				num_end = num_arr[1];
			for (var i = 0 , len = decimals-num_arr[1].length;i<len;i++) {
				num_end +="0";
			}
		}
		return num_arr[0]+"."+num_end;
	}
}