//验证功能函数
function check(field){
	var value=field.value.trim();
     if(calLength(value)==0){
         return 1;
     }else if(calLength(value)>=4&&calLength(value)<=16){
         return 3;
     }else{
     	return 4;
     }

}


//显示验证结果颜色函数
function changeColor(field){
    switch(check(field)){
    	case 1:
    	field.className="fault";
    	field.nextElementSibling.nextElementSibling.innerHTML="必填，姓名不能为空";
    	field.nextElementSibling.nextElementSibling.style.color="red";
    	break;
    	case 3:
    	field.className="correct";
    	field.nextElementSibling.nextElementSibling.innerHTML="格式正确";
    	field.nextElementSibling.nextElementSibling.style.color="green";
    	break;
    	case 4:
    	field.className="fault";
    	field.nextElementSibling.nextElementSibling.innerHTML="格式错误";
    	field.nextElementSibling.nextElementSibling.style.color="red";
        default:
        break;
    }
}
//计算字符串长度的函数
function calLength(str){
	 var codelength=0;
     for (var i = 0; i < str.length; i++) {
     	var count=str.charCodeAt(i);
     	/*
     	charCodeAt()函数：返回指定位置的字符的Unicode编码。这个返回值是0~65535之间的整数。
     	*/
     	if(count>=0&&count<=128){
              codelength+=1;
     	}else{
     		codelength=codelength+2;
     	}
     }
     return codelength;
}

//初始化函数
function init(){
	var inputList=document.querySelectorAll("input");
	inputList[0].value="";
	inputList[1].onclick=function(){
		changeColor(inputList[0]);
	}
}

window.onload=init();
