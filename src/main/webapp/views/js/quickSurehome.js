var checkLcnNoFlag=false;//车牌号码


//页面初始化，获取行政区域等信息
$(document).ready(function() {
	$.ajaxSettings.async = false;
	$.getJSON(getUrl()+'/views/js/json/department.json', function (data) {
		provincedata=data;
	});
});


$("#city").click(function (e) {
    SelCity(this,e);
});

//车辆未上牌选择
$('.press_bt').eq(0).click(function(){
	debugger;
	depAddress=$("#city").val();
	if($(this).hasClass("ON")){
		$("#car_plate").removeAttr('readonly')
		if(depAddress!=null&&"undefined"!==typeof(depAddress)){
			 setDeptNoandLcnNo(depAddress,true);			 
		}else{
			$("#car_plate").val(" ");
			$(this).removeClass("ON");
		}		
	}else{
		$("#car_plate").val("*-*").attr('readonly',true);
	    $(this).addClass("ON"); //ON代表新车未上牌
	}
});
	

//通过选中的城市地区，赋行政区域,车牌赋值
function setDeptNoandLcnNo(areaValue,updateLcnNo) {
	$('.press_bt').removeClass('ON');
	/*$("#errorMessageforLcnNo").hide();*/
	var province, city, county;
	if (areaValue != null && "undefined" !== typeof (areaValue)) {
		var areaArray = areaValue.split("-");
		if (areaArray !== null) {
			if (areaArray[0] !== null) {
				province = areaArray[0];//获取省份
			}
			if (areaArray[1] !== null) {
				city = areaArray[1];    //获取城市
			}
			if (areaArray[2] !== null) {
				county = areaArray[2];  //获取区，镇
			}
		}
	}
	if (provincedata != null && "undefined" !== typeof (provincedata)) {
		for ( var i = 0; i < provincedata.length; i++) {
			if (provincedata[i].name === $.trim(province)) {
				for ( var j = 0; j < provincedata.length; j++) {
					if (provincedata[i].deptinforid === provincedata[j].parentid
							&& provincedata[j].name === $.trim(city)) {						
						var deptCode = provincedata[j].deptinforid;
						var lcnNo=provincedata[j].licensePlate;												
						for(var k=0;k<provincedata.length; k++){
							if(provincedata[j].deptinforid === provincedata[k].parentid&& provincedata[k].name === $.trim(county)){
								deptCode=provincedata[k].deptinforid;
							}
						}
						if (deptCode != null
								&& "undefined" !== typeof (deptCode)&&""!==deptCode) {							
								$("#deptno").val(deptCode);														
						}
					if (lcnNo != null
								&& "undefined" !== typeof (lcnNo)) {
							if(!$(".press_bt").hasClass('ON')&&updateLcnNo){								
									$("#car_plate").val(lcnNo);
									$("#car_plate").focus();															
							}else if(updateLcnNo){
								$("#phoneNo").focus();
							}
						}
					}
				}
			}
		}
	}
}
/**
 * 首页提交表单
 */
$("#count").click( function () {          
     var city=document.getElementById("city").value;
     var carNo=document.getElementById("car_plate").value;              
      checkLcnNo();//校验车牌号码
      if(city=="" || city==null || city==undefined){
      	$('#Message').html("投保城市不能为空");
        $("#errorhei").show();            	
      	return false;
      }else if(carNo=="" || carNo==null || carNo==undefined){
      	$('#Message').html("车牌号不能为空");
      	$("#errorhei").show();              	
      	return false;
      }else if(!checkLcnNoFlag){
      	$('#Message').html("车牌号码输入有误");
      	$("#errorhei").show();  
      	return false;	
    	}else {
    		document.getElementById("form").submit();
    	}	
});


//车牌号校验
function checkLcnNo() {
	var car_num = document.getElementById('car_plate').value;
	if("*-*"!==car_num){
		var reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
		if (reg.test(car_num) != true) {
			checkLcnNoFlag=false;
			$('#Message').html("车牌号输入有误");
			$("#errorhei").show();	
			return false;
		 }else{
			checkLcnNoFlag=true;	
			return true;
		}
	}else{
		checkLcnNoFlag=true;
		return true;
	}
}


$("#ensure").click(function(){
	$("#errorhei").hide();
});
	



