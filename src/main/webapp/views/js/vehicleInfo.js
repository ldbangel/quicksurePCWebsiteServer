var checkvincodeFlag1=false;
var checkvincodeFlag2=false;//车架号
var checkvincodeFlag3=false;

var idno=0;
var checkLcnNoFlag=false;//车牌号码
var checkOwnerNameFlag=false;//车主名字
var checkNewcarRegistdate=false;//新车注册日期
var checkphoneNoFlag=false; 


$(document).ready(function(){
	$('#phoneno').val(phoneNo);
	$('.selt_box>input').click(function(){console.log($(this));
	if($(this).attr('checked')=="checked"){$(this).parent().addClass("sel_on");$(this).parent().siblings("label").removeClass("sel_on");
	$(this).parent().siblings("label").children("input").removeAttr('checked');}
			});
			$('.info_box>input').focus(function(){
			 $(this).siblings('div').show();
			});
            $('.info_box>input').blur(function(){
			 $(this).siblings('div').hide();
			})
	$('.transfer').hover( function () {
				$('.transfer_car').show();
			},
			function () {
				$('.transfer_car').hide();
			}
	);
});

//是否过户：点击是的时候显示日期控件
$(".selt_box>input").eq(0).click(function(){
	$('#gouhudate').show();
});
//是否过户：点击否的时候隐藏日期控件
$(".selt_box>input").eq(1).click(function(){
	$('#trans_Date').val("");
	$('#gouhudate').hide();
});


var orderNo=$("#orderNo").val();
function searchByVIN(){
	/*$("#prompt").html("车型查询中，请稍等...");
	load(20000); */
   var vinNo=$("#vinno").val();
   var lcnNo=$("#lcnno").val();
   var registerdate=$("#registerdate").val();
   var vhiinforid=document.getElementById("vhiinforid").value;
   var vhldata={lcnno:lcnNo,vinno:vinNo,registerdate:registerdate,baseinforOrdeo:orderNo,vhiinforid:vhiinforid};
   $.ajax({  
	   type: "POST",  
	   url: getUrl()+"/vehicleInfor/modelSerachByVin.do",  
	   data: JSON.stringify(vhldata),//将对象序列化成JSON字符串  
	   dataType:"json",  
	   contentType : 'application/json;charset=utf-8', //设置请求头信息  
	   success: function(data){   	
		   if(data.length==0){    		
			   searchByModel();    		
		   }else{
			   $("#pop").hide();
			   $('#select_table').show();
			   $('#select_content').html("");	
	           for (var i = 0; i < data.length; i++) {
		    		$("#pop").hide();
		    		$('#select_table').show();	            	
		    		$('#select_content').append( '<tr class="single_list"><td>'+data[i].VehicleName+'</td><td>'+data[i].Remark+'</td><td>'+data[i].MarketDate+'</td><td>'+data[i].Seat+'</td><td>'+data[i].Displacement+'</td><td>'+data[i].PurchasePrice+'</td><td style="display:none">'+data[i].VehicleCode+'</td><td style="display:none">'+data[i].BrandName+'</td><td  style="display:none">'+data[i].ABSFlag+'</td><td  style="display:none">'+data[i].AlarmFlag+'</td><td  style="display:none">'+data[i].AirbagFlag+'</td><td style="display:none">'+data[i].NewEnergyFlag+'</td><td  style="display:none">'+data[i].FamilyName+'</td><td style="display:none">'+data[i].GearboxType+'</td><td style="display:none">'+data[i].FullWeight+'</td> </tr>');
	           };
           }
		   return true;
	   },  
	   error: function(res){ 
		   searchByModel();
	   }  
   });
}

function searchByModel(){
   var model = $('#model');
   var modleName = model.val();
   var vhldata={vehiclename:modleName,baseinforOrdeo:orderNo};
   
   $.ajax({  
	type: "POST",  
	url: getUrl()+"/vehicleInfor/modelSerachByName.do",  
	data: JSON.stringify(vhldata),//将对象序列化成JSON字符串  
	dataType:"json",  
	contentType : 'application/json;charset=utf-8', //设置请求头信息  
	success: function(data){ 		
	    if(data.length==0){
	    	$("#pop").hide();
	    	$('#select_table').show();
	    	$('#select_content').append('<tr><td><p>没有检索到！</p></td></tr>')
	         
	        }else{
	        	$("#pop").hide();
	        	$('#select_table').show();
	        	$('#select_content').html("");
	            for (var i = 0; i < data.length; i++) {
	            	 $('#select_content').append( '<tr class="single_list"><td>'+data[i].VehicleName+'</td><td>'+data[i].Remark+'</td><td>'+data[i].MarketDate+'</td><td>'+data[i].Seat+'</td><td>'+data[i].Displacement+'</td><td>'+data[i].PurchasePrice+'</td><td style="display:none">'+data[i].VehicleCode+'</td><td style="display:none">'+data[i].BrandName+'</td><td  style="display:none">'+data[i].ABSFlag+'</td><td  style="display:none">'+data[i].AlarmFlag+'</td><td  style="display:none">'+data[i].AirbagFlag+'</td><td style="display:none">'+data[i].NewEnergyFlag+'</td><td  style="display:none">'+data[i].FamilyName+'</td><td style="display:none">'+data[i].GearboxType+'</td><td style="display:none">'+data[i].FullWeight+'</td> </tr>');
		            };
	        }
	    $("#pop").hide();
	    $('.beijing').show();
	    $('.con4_tang5').show();
	    },  
    error: function(res){   
    	 $("#pop").hide();
     	 $("#Message").html("车型查询失败");
     	 $('.errorhei').show();
     	 $('.beijing').hide();
     	//Hide();
    }  
   });
}

//车辆查询调华安接口
function modelSearch(){
	var vinNo=$("#vinno").val();
	var modleName = $('#model').val();
	var lcnNo=$("#lcnno").val();
	var registerdate=$("#registerdate").val();
	var vhiinforid=document.getElementById("vhiinforid").value;
	var vhldata={
			lcnno:lcnNo,
			vinno:vinNo,
			registerdate:registerdate,
			baseinforOrdeo:orderNo,
			vhiinforid:vhiinforid,
			vehiclename:modleName};
	$.ajax({  
	   type: "POST",  
	   url: getUrl()+"/vehicleInfor/modelSearchFromSinosafe.do",  
	   data: JSON.stringify(vhldata),//将对象序列化成JSON字符串  
	   dataType:"json",  
	   contentType : 'application/json;charset=utf-8', //设置请求头信息  
	   success: function(data){   	
		   if(data.length==0){    		
			   $("#Message").html("");
			   $("#pop").hide();
			   $("#Message").html("车型查询失败");
			   $('.errorhei').show();
			   $('.beijing').hide();
		   }else{
			   $("#pop").hide();
			   $('#select_table').show();
			   $('#select_content').html("");	
	           for (var i = 0; i < data.length; i++) {
		    		$("#pop").hide();
		    		$('#select_table').show();	            	
		    		$('#select_content').append( '<tr class="single_list"><td>'+data[i].MODEL_NAME+'</td><td>'+data[i].CAR_REMARK+'</td><td>'+data[i].MARKET_YEAR+'</td><td>'+data[i].SET_NUM+'</td><td>'+data[i].DISPLACEMENT+'</td><td>'+data[i].CAR_PRICE+'</td><td style="display:none">'+data[i].MODEL_CODE+'</td><td style="display:none">'+data[i].BRAND_NAME+'</td><td style="display:none">'+data[i].F_ABS+'</td><td style="display:none">'+data[i].F_ALARM+'</td><td style="display:none">'+data[i].N_AIRBAG+'</td><td style="display:none">'+data[i].NEW_ENERGY_FLAG+'</td><td style="display:none">'+data[i].FAMILY_NAME+'</td><td style="display:none">'+data[i].TRANSMISSIONT_TYPE+'</td><td style="display:none">'+data[i].QUALITY+'</td> </tr>');
	           };
           }
		   return true;
	   },  
	   error: function(res){
		   $("#Message").html("");
		   $("#pop").hide();
		   $("#Message").html("车型查询失败");
		   $('.errorhei').show();
		   $('.beijing').hide();
	   }  
	});
}

//选中车辆查询的某条记录
$('#select_content').on('click','.single_list',function(){
	var text1=$(this).children().eq(0).html();
	var text2=$(this).children().eq(1).html();
	var text3=$(this).children().eq(2).html();
	var text4=$(this).children().eq(3).html();
	var text5=$(this).children().eq(4).html();
	var text6=$(this).children().eq(5).html();
	var text7=$(this).children().eq(6).html();
	var text8=$(this).children().eq(7).html();
	var text9=$(this).children().eq(8).html();
	var text10=$(this).children().eq(9).html();
	var text11=$(this).children().eq(10).html();
	var text12=$(this).children().eq(11).html();
	var text13=$(this).children().eq(12).html();
	var text14=$(this).children().eq(13).html();
	var text15=$(this).children().eq(14).html();
	
	$("#marketyear").val(text3);
    $("#setno").val(text4);
    $("#displacement").val(text5);
    $("#vhlval").val(text6);
    $("#brandcode").val(text7);
    $("#brandName").val(text8);
    $('#model').val(text1);
    /*$('#alarmflag').val(text10);
    $('#airbagfalg').val(text11);
    $('#newenergyflag').val(text12);
    $('#gearboxtype').val(text14);
    $('#absflag').val(text9);*/
    if(text10 == "undefined"){
    	$('#alarmflag').val("");
    }else{
    	$('#alarmflag').val(text10);
    }
    if(text11 == "undefined"){
    	$('#airbagfalg').val("");
    }else{
    	$('#airbagfalg').val(text11);
    }
    if(text12 == "undefined"){
    	$('#newenergyflag').val("");
    }else{
    	$('#newenergyflag').val(text12);
    }
    if(text14 == "undefined"){
        $('#gearboxtype').val("");
    }else{
    	$('#gearboxtype').val(text14);
    }
    if(text9 == "undefined"){
    	$('#absflag').val("");
    }else{
        $('#absflag').val(text9);
    }
    $('#familyKind').val(text13);
    $('#fullweight').val(text15);	
    
    var string = text2+" "+text3+" "+text4+"座  "+text5+" 报价:"+text6;
    var str1 = string.slice(0,20);
	var str3 = string.slice(20,60);
	$('.Inpput_I').val(str1);
	$('.Inpput_II').val(str3);
    // var text=$(this).text();
    // $('#pzxh').text(string);
    $('#select_table').hide();
});

$('#vinno').keyup(function(){
    $('#error').hide();
    }) ;
$('#model').keyup(function(){
    $('#error2').hide();
    }) ;

//加载框
function load(outtimes){
	$("#pop").show();
	setTimeout(function(){$('#pop').hide()
	},outtimes);
}

//车型查询，车架号校验
$("#model1,#modelSerach").click( function (){
	  var vinno=document.getElementById("vinno").value;
	  var model=document.getElementById("model").value;
	  validateVIN(); //校验车架号
	  if (vinno=="" || vinno==null || vinno==undefined){
	    	$('#Message').html("车架号不能为空");
	    	$("#errorhei").show();
	    	return false;
	    }else if(!checkvincodeFlag1){
	    	$('#Message').html("车架号必须为17位");
	    	$("#errorhei").show();
	    	return false;
	    }else if(!checkvincodeFlag2){
	    	$('#Message').html("车架号不能有O,Q,I,*字符");
	    	$("#errorhei").show();
	    	return false;
	    }else if(!checkvincodeFlag3){    	    	                   
	    	$('#Message').html("车架号只能是英文和数字组合");
	    	$("#errorhei").show();
	    	return false;
	    }else if (model=="" || model==null || model==undefined){
	    	$('#Message').html("品牌名称不能为空");
	    	$("#errorhei").show(); 
         	return false;
	    }else{
	    	$("#prompt").html("车型查询中，请稍等...");
	    	load(30000);    	    		    	
//	    	searchByVIN();  //车辆查询调精友
	    	modelSearch();  //车辆查询调华安
	    }
});

//车辆信息页面校验
$('#next').click(function(event) {
	  if(page==2){
		var registerdate=document.getElementById("registerdate").value;
        var vinno=document.getElementById("vinno").value;         
        var model=document.getElementById("model").value;
         var engno=document.getElementById("engno").value;            
         var transferdate = document.getElementById("trans_Date").value;
         var drvowner = document.getElementById("drvowner").value;
         var certificateno = document.getElementById("certificateno").value;
         var  modelDescription=$(".Inpput_I").val()+$(".Inpput_II").val();
         checkRegistdate();//校验新车注册日期
         /*checkLcnNo();//校验车牌号码*/
         validateName();//校验车主姓名
         validateVIN();//校验车架号
         checkPhoneV();//手机号码校验
      	 if(registerdate=="" || registerdate==null || registerdate==undefined){
         	$('#Message').html("车辆注册日期不能为空");
         	$("#errorhei").show(); 
         	return false;
         }else if(!checkNewcarRegistdate){
         	$('#Message').html("新车注册日期不得与当前日期相差9个月(北京、上海不得相差7天)");
         	$("#errorhei").show();  
         	return false;
         }else if (vinno=="" || vinno==null || vinno==undefined){
         	$('#Message').html("车架号不能为空");
         	$("#errorhei").show(); 
         	return false;
         }else if(!checkvincodeFlag1){
         	$('#Message').html("车架号必须为17位");
         	$("#errorhei").show(); 
         	return false;
         }else if(!checkvincodeFlag2){
         	$('#Message').html("车架号不能有O,Q,I,*字符");
         	$("#errorhei").show(); 
         	return false;
         }else if(!checkvincodeFlag3){
         	$('#Message').html("车架号只能是英文和数字组合");
         	$("#errorhei").show(); 
         	return false;
         }else if (model=="" || model==null || model==undefined){
         	$('#Message').html("品牌名称不能为空");
         	$("#errorhei").show(); 
         	return false;
         }else if (engno=="" || engno==null || engno==undefined){
         	$('#Message').html("发动机号不能为空");
         	$("#errorhei").show(); 
     		return false;// 
         }else if($('#chgownerflag1').attr("checked")=='checked' && (transferdate==  null || transferdate == "" || transferdate==undefined)){
         	$('#Message').html("过户日期不能为空");
         	$("#errorhei").show(); 
         	return false;  
         }else if (drvowner=="" || drvowner==null || drvowner==undefined){
         	$('#Message').html("车主名称不能为空");
         	$("#errorhei").show(); 
         	return false;
         }else if(!checkOwnerNameFlag){
         	$('#Message').html("名字输入有误！");
         	$("#errorhei").show();            	
         	return false;
         }else if (certificateno=="" || certificateno==null || certificateno==undefined){
         	$('#Message').html("身份证不能为空");
         	$("#errorhei").show();            	
         	return false;	
         }
         else if (idno==1){
         	$('#Message').html("身份证信息有误,请检查！");
         	$("#errorhei").show(); 
     		return false;
       	} else if(!checkphoneNoFlag){
       		$('#Message').html("手机号码输入有误 ！");
       		$("#errorhei").show(); 
     		return false;
       	} else  if(modelDescription=="" || modelDescription==null || modelDescription==undefined){      	
      		$('#Message').html("配置型号不允许为空，请选择配置型号");
    		$('#errorhei').show();
    		return false;  		   	
       	}else {
       		$("#prompt").html("正在加载，请稍等...");
       		load(60000);
       		event.preventDefault();
       		document.getElementById("form1").submit();
       	}		 
	  }
});

//车主姓名校验
function validateName(){
	var val=document.getElementById('drvowner').value;
	var reg = /^[\u4e00-\u9fa5]{2,4}$/i; 
	if(val==''||val==null||val==undefined){
		checkOwnerNameFlag=false;		
	}else if(!reg.test(val)){
		checkOwnerNameFlag=false;		
	}else{
		checkOwnerNameFlag=true;
	}
}

//车架号校验
function validateVIN() {
	var vinlimit = /^\w*[a-zA-Z]+\w*$/;
	var vinCode=document.getElementById('vinno').value;
	if(vinCode.length>17 || vinCode.length<17){
		checkvincodeFlag1=false;
		return false;
	}else if((vinCode.indexOf('Q') >= 0) || (vinCode.indexOf('I') >= 0) || (vinCode.indexOf('O') >= 0) || (vinCode.indexOf('*') >= 0)){
		checkvincodeFlag1=true;
		checkvincodeFlag2=false;
	    return false;
    }else if(!vinlimit.test(vinCode)){
    	checkvincodeFlag1=true;
		checkvincodeFlag2=true;
    	checkvincodeFlag3=false;
    }else{
    	checkvincodeFlag1=true;
    	checkvincodeFlag2=true;
    	checkvincodeFlag3=true;
    	//searchByVIN();
    }
}

/*//车牌号校验
function checkLcnNo() {
	var car_num = document.getElementById('car_plate').value;
	if("*-*"!==car_num){
	var reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
	if (reg.test(car_num) != true) {		
    	checkLcnNoFlag=false;
	} else {
		checkLcnNoFlag=true;
	}
    }else if("*-*"==car_num){
    	checkLcnNoFlag=true;
    }
}*/
//手机号码校验
function checkPhoneV() {
	var phone = $("#phoneno").val();

	if (!(/^1[34578]\d{9}$/.test(phone))) {
		checkphoneNoFlag=false;
		return false;
	} else {
		checkphoneNoFlag=true;
	}

}

//新车注册日期校验
function checkRegistdate(){
	//北京上海相差7天,其他相差9个月
	var carnumber=document.getElementById('lcnno').value;
	var registerdate=document.getElementById("registerdate").value;
	var citycode = $("#citycode").val();
	var test=citycode.substring(0,3);
	if("*-*"==carnumber){//新车
		if(test=='110' || test=='310'){//北京上海编码以110 310开头
			var dd = new Date();  
	        dd.setDate(dd.getDate()-7);//获取七天前的日期  
	        var y = dd.getFullYear();   
	        var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0  
	        var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0  
	        var dayBefore=y+"-"+m+"-"+d;
	        if(registerdate<dayBefore){
	        	checkNewcarRegistdate=false;
	        }else{
	        	checkNewcarRegistdate=true;
	        };
		}else{
			var dd1 = new Date();  
			dd1.setMonth(dd1.getMonth()-9);//获取9个月前的日期  
	        var y = dd1.getFullYear();   
	        var m = (dd1.getMonth()+1)<10?"0"+(dd1.getMonth()+1):(dd1.getMonth()+1);//获取当前月份的日期，不足10补0  
	        var d = dd1.getDate()<10?"0"+dd1.getDate():dd1.getDate();//获取当前几号，不足10补0  
	        var dayBefore=y+"-"+m+"-"+d;
	        if(registerdate<dayBefore){
	        	checkNewcarRegistdate=false;
	        }else{
	        	checkNewcarRegistdate=true;
	        };
		};
	}else{
		checkNewcarRegistdate=true;
	}
}

$("#ensure").click(function(){
	$("#errorhei").hide();
});

$(function () {
	$("#registerdate").calendar({
		controlId: "divDate",                                 // 弹出的日期控件ID，默认: $(this).attr("id") + "Calendar"
		speed: 200,                                           // 三种预定速度之一的字符串("slow", "normal", or "fast")或表示动画时长的毫秒数值(如：1000),默认：200
		complement: true,                                     // 是否显示日期或年空白处的前后月的补充,默认：true
		readonly: true,                                       // 目标对象是否设为只读，默认：true
		upperLimit: new Date(),                               // 日期上限，默认：NaN(不限制)
		lowerLimit: new Date("2016/2/13")                // 日期下限，默认：NaN(不限制)
		/*callback: function () {                               // 点击选择日期后的回调函数
			alert("您选择的日期是：" + $("#Date").val());
		}*/
	});
	$("#trans_Date").calendar({
		controlId: "Datediv",                                 // 弹出的日期控件ID，默认: $(this).attr("id") + "Calendar"
		speed: 200,                                           // 三种预定速度之一的字符串("slow", "normal", or "fast")或表示动画时长的毫秒数值(如：1000),默认：200
		complement: true,                                     // 是否显示日期或年空白处的前后月的补充,默认：true
		readonly: true,                                       // 目标对象是否设为只读，默认：true
		upperLimit: new Date(),                               // 日期上限，默认：NaN(不限制)
		lowerLimit: new Date("2016/2/13")                // 日期下限，默认：NaN(不限制)
		/*callback: function () {                               // 点击选择日期后的回调函数
			alert("您选择的日期是：" + $("#Date").val());
		}*/
	});
});
$(function(){
	$("#m-wrapper").panel({iWheelStep:32});
});

$('#select_content').on('click','p',function(){
	$('#select_table').hide();
});
$(document.body).on('click', function () {
	$('#select_table').hide();
});
$('.select_title').on('click', function () {
	return false;
});

$(window).scroll(function(){
	var top=$(document).scrollTop();
	if($(document).scrollTop()>30 && $(document).scrollTop()<500){
		$('.Sidebar_info').css('top',45+top);
	}
	
});
