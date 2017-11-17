$(document).ready(function(){
 /*   $('#head_top').load('header.html');
    $('#footer').load('yhl_footer.html');*/
    $('#car_owner').show();
    $('.tab_list>span').click(function(){var ID=$(this).attr('class');
        $(this).addClass('active').siblings('span').removeClass('active');
        $("#"+ID).show().siblings().hide();
    })

    $('.check>input').click(function(){
        if($(this).attr('checked')=='checked'){$(this).attr('checked','checked'),$(this).parent().addClass('check_on');}else{
            $(this).removeAttr('checked'),$(this).parent().removeClass('check_on');
        }
    })
    //勾选复选框复制
    $('.tab_list i').click(function(){
       var val=$(this).attr('data-val');
       if(val==1){                                
    	   if($(this).hasClass("check_on")){
               $(this).removeClass("check_on");
               removeCopy(1);
           }else{
        	   $(this).addClass('check_on');
        	   copy(1);
           		
           }
       }
       if(val==2){
    	   if($(this).hasClass("check_on")){
               $(this).removeClass("check_on");
               removeCopy(2);
           }else{
        	   $(this).addClass('check_on');
        	   copy(2);
           		
           }
       }
        
    })
});
$('.get_address_top i').click(function(){
	 if($(this).hasClass("check_on")){
         $(this).removeClass("check_on");
         removeCopy(3);
     }else{
    	 $(this).addClass('check_on');
    	   copy(3);
     }
	
})
$("#city").click(function (e) {
    SelCity(this,e);
});
$("#city2").click(function (e) {
    SelCity(this,e);
});
$("#city3").click(function (e) {
    SelCity(this,e);
});
$("#city4").click(function (e) {
    SelCity(this,e);
});

/**
 * 
 * 获取地区编码
 */
function setDeptNo(areaValue,type){
	var province, city, county;
	if (areaValue != null && "undefined" !== typeof (areaValue)) {
		var areaArray = areaValue.split(",");
		if (areaArray !== null) {
			if (areaArray[0] !== null) {
				province = areaArray[0];
			}
			if (areaArray[1] !== null) {
				city = areaArray[1];
			}
			if (areaArray[2] !== null) {
				county = areaArray[2];
			}
		}
	}
	if (provincedata != null && "undefined" !== typeof (provincedata)) {
		for ( var i = 0; i < provincedata.length; i++) {
			if (provincedata[i].name === province) {
				for ( var j = 0; j < provincedata.length; j++) {
					if (provincedata[i].deptinforid === provincedata[j].parentid
							&& provincedata[j].name === city) {
						var deptCode = provincedata[j].deptinforid;
						if (deptCode != null&& "undefined" !== typeof (deptCode)) {
							if(type==1){
								$("#ownerszipcode").val(deptCode);
							}else if(type==2){
								$("#applicationzipcode").val(deptCode);
							}else if(type==3){
								$("#insurezipcode").val(deptCode);
							}else if(type==4){
								$("#Delivery_ZipCode").val(deptCode);
							}
						}
					}
				}
			}
		}
	}
}

/**
 * 
 * 点击弹框复制信息
 */
function copy(type){
	var ownersaddress ;
	var name = $('#ownersname').val();//姓名
	var phone = $('#ownersphoneno').val();//电话
	var certcode = $('#ownerscerticode').val();//身份证 	
	var ownersaddress=$("#city").val();//地址	
	var ownersdetailaddress = $('#ownersdetailaddress').val();//详细地址
	if(type==1){//被保人
		$('#applicationname').val(name);
		$('#applicationphoneno').val(phone);
		$('#applicationcerticode').val(certcode);		
		$('#city2').val(ownersaddress);			
		$('#applicationdetailaddress').val(ownersdetailaddress); 
	}
	if(type==2){//投保人
		$('#insurename').val(name);
		$('#insurephoneno').val(phone);
		$('#insurecerticode').val(certcode);	
		$('#city3').val(ownersaddress);				
		$('#insuredetailaddress').val(ownersdetailaddress);
	}
	if(type==3){//送单地址
		$('#deliveryname').val(name);
		$('#deliveryphone').val(phone);		
		$('#city4').val(ownersaddress);						
		$('#deliverydetailaddress').val(ownersdetailaddress);
	}
}
/**
 * 
 * 移除值
 */
function removeCopy(type){
	if(type==1){
		$('#applicationname').val("");
		$('#applicationphoneno').val("");
		$('#applicationcerticode').val("");	
		$('#city2').val("");						
		$('#applicationdetailaddress').val(""); 
	}
	if(type==2){
		$('#insurename').val("");
		$('#insurephoneno').val("");
		$('#insurecerticode').val("");		
		$('#city3').val("");						
		$('#insuredetailaddress').val("");
	}
	if(type==3){
		$('#deliveryname').val("");
		$('#deliveryphone').val("");		
		$('#city4').val("");			
		$('#deliverydetailaddress').val("");
	}
}

/**
 * 人员信息页面的校验
 */
$('#next_p').click(function (event) {
	  event.preventDefault();
	  if(submitCheck()){
			//点击保存的时候给对应编码赋值

		   var btr=$('.tab_list i').eq(0).hasClass('check_on');
		    var tbr=$('.tab_list i').eq(1).hasClass('check_on');
		    
			   	if ($('.get_address_top i').hasClass("check_on")) {
				    $('#deliveryCopyCheckbox').val("1");
				}
			   	if (btr) {
				    $('#appCoypCheckbox').val("1");
				}
			   	if (tbr) {
				    $('#insureCopyCheckbox').val("1");
				}
			    var ownerdemo=$('#city').val();
			    setDeptNo(ownerdemo, 1);
				var appdemo=$('#city2').val();
				setDeptNo(appdemo,2);
				var insuredemo=$('#city3').val();
				setDeptNo(insuredemo,3);
				var deliverydemo=$('#city4').val();
				setDeptNo(deliverydemo,4);
				$("#prompt").html("订单确认中，请稍等...");
		  		load(40000);
		  		
		  		var orderNo=$("#orderNo").val();
		  		
				$("#submit_form").submit();	
		   }
	  

	  /**
	   * 
	   * 第四个页面信息校验
	   */
	  function submitCheck(){
	  	var ownAddress;                       
	  	var appAddress;
	  	var insureAddress;
	  	var deliveryAddress;
	  	var ownName=$("#ownersname").val();
	  	var ownId=$("#ownerscerticode").val();
	  	var ownPhone=$("#ownersphoneno").val();	
	  	ownAddress=$("#city").val();
	  	var ownAddressDetails=$("#ownersdetailaddress").val();
	  	var applicationname=$("#applicationname").val();
	  	var applicationcerticode=$("#applicationcerticode").val();
	  	var applicationphoneno=$("#applicationphoneno").val();	
	  	appAddress=$("#city2").val();
	  	var appAddressDetails=$("#applicationdetailaddress").val();
	  	var insurename=$("#insurename").val();
	  	var insurecerticode=$("#insurecerticode").val();
	  	var insurephoneno=$("#insurephoneno").val();
	  	insureAddress=$("#city3").val();
	  	var insureAddressDeatis=$("#insuredetailaddress").val();
	  	var deliveryname=$("#deliveryname").val();
	  	var deliveryphone=$("#deliveryphone").val();
	  	deliveryAddress=$("#city4").val();
	  	var deliveryAddressDetails=$("#deliverydetailaddress").val();
	  	var checkboxflag=$('.check').hasClass('check_on');
	  	if(!checkName(ownName,"own")){
	  		 return false;
	  	}
	  	if(!checkId(ownId,"own")){
	  		 return false;
	  	}
	  	if(!checkPhone(ownPhone,"own")){
	  		 return false;
	  	}
	  	if(!checkAddress(ownAddress,"own")){
	  		 return false;
	  	}
	  	if(!checkAddressDetails(ownAddressDetails,"own")){
	  		 return false;
	  	}
	  	if(!checkName(applicationname,"app")){
	  		 return false;
	  	}
	  	if(!checkId(applicationcerticode,"app")){
	  		 return false;
	  	}
	  	if(!checkPhone(applicationphoneno,"app")){
	  		 return false;
	  	}	
	  	if(!checkAddress(appAddress,"app")){
	  		 return false;
	  	}
	  	if(!checkAddressDetails(appAddressDetails,"app")){
	  		 return false;
	  	}
	  	if(!checkName(insurename,"insure")){
	  		 return false;
	  	}
	  	if(!checkId(insurecerticode,"insure")){
	  		 return false;
	  	}
	  	if(!checkPhone(insurephoneno,"insure")){
	  		 return false;
	  	}
	  	if(!checkAddress(insureAddress,"insure")){
	  		 return false;
	  	}
	  	if(!checkAddressDetails(insureAddressDeatis,"insure")){
	  		 return false;
	  	}
	  	if(!checkName(deliveryname,"delivery")){
	  		 return false;
	  	}
	  	if(!checkPhone(deliveryphone,"delivery")){
	  		 return false;
	  	}
	  	if(!checkAddress(deliveryAddress,"delivery")){
	  		 return false;
	  	}
	  	if(!checkAddressDetails(deliveryAddressDetails,"delivery")){
	  		 return false;
	  	}
	  	if(!checkboxflag){
	  		$("#Message").html("请阅读并同意《免责说明》《保险条款》《强保条款》《投保申明》");
	  		$("#errorhei").show();
	     	return false;
	  	}else{
	  		return true;
	  	}
	  }


	  /**
	   * 校验地址
	   */
	  function checkAddress(value,type){
	  	if(value==null||"undefined"==value||""==value){
	  		if(type==="own"){
	  			$("#Message").html("车主地址不能为空");
	  			$("#errorhei").show();
	         		return false;
	  		}else if(type==="app"){
	  			$("#Message").html("被保人地址不能为空");
	  			$("#errorhei").show();
	  	   		return false;
	  		}else if(type=="insure"){
	  			$("#Message").html("投保人地址不能为空");
	  			$("#errorhei").show();
	  	   		return false;
	  		}else if(type=="delivery"){
	  			$("#Message").html("配送人地址不能为空");
	  			$("#errorhei").show();
	  	   		return false;
	  		}
	  	}else{
	  		return true;
	  	}	
	  }
	  /**
	   * 校验详细地址
	   */
	  function checkAddressDetails(value,type){
	  	if(value==null||"undefined"==value||""==value){
	  		if(type==="own"){
	  			$("#Message").html("车主详细地址不能为空");
	  			$("#errorhei").show();
	  	   		return false;
	  		}else if(type==="app"){
	  			$("#Message").html("被保人详细地址地址不能为空");
	  			$("#errorhei").show();
	  	   		return false;
	  		}else if(type=="insure"){
	  			$("#Message").html("投保人详细地址地址不能为空");
	  			$("#errorhei").show();
	  	   		return false;
	  		}else if(type=="delivery"){
	  			$("#Message").html("配送人详细地址不能为空");
	  			$("#errorhei").show();
	  	   		return false;
	  		}
	  	}else{
	  		return true;
	  	}	
	  }
	  /**
	   * 校验手机号
	   */
	  function checkPhone(value,type){
	  	if(value==null||"undefined"==value||""==value){
	  		if(type==="own"){
	  			$("#Message").html("车主手机号不能为空");
	  			$("#errorhei").show();
	  	   		return false;
	  		}else if(type==="app"){
	  			$("#Message").html("被保人手机号不能为空");
	  			$("#errorhei").show();
	  	   		return false;
	  		}else if(type=="insure"){
	  			$("#Message").html("投保人手机号不能为空");
	  			$("#errorhei").show();
	  	   		return false;
	  		}else if(type=="delivery"){
	  			$("#Message").html("配送人手机号不能为空");
	  			$("#errorhei").show();
	  	   		return false;
	  		}
	  	} else if (!(/^1[34578]\d{9}$/.test(value))) {
	  	if(type==="own"){
	  		$("#Message").html("车主手机号输入有误");
	  		$("#errorhei").show();
	     		return false;
	  	}else if(type==="app"){
	  		$("#Message").html("被保人手机号输入有误");
	  		$("#errorhei").show();
	     		return false;
	  	}else if(type=="insure"){
	  		$("#Message").html("投保人手机号输入有误");
	  		$("#errorhei").show();
	     		return false;
	  	}else if(type=="delivery"){
	  		$("#Message").html("配送人手机号输入有误");
	  		$("#errorhei").show();
	     		return false;
	  	}
	  }else{
	  	return true;
	  }	
	  }
	  /**
	   * 校验身份证
	   */
	  function checkId(value,type){
	  	if(value==null||"undefined"==value||""==value){
	  		if(type==="own"){
	  			$("#Message").html("车主身份证不能为空");
	  			$("#errorhei").show();
	  	   		return false;
	  		}else if(type==="app"){
	  			$("#Message").html("被保人身份证不能为空");
	  			$("#errorhei").show();
	  	   		return false;
	  		}else if(type=="insure"){
	  			$("#Message").html("投保人身份证不能为空");
	  			$("#errorhei").show();
	  	   		return false;
	  		}
	  	}else{
	  	var code=value;
	  	 var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
	  	    var tip = "";
	  	    var pass= true;
	  	    if(!code || !/^\d{6}(19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
	  	        tip = "The format of Id no is wrong!";
	  	        pass = false;
	  	    }

	  	    else if(!city[code.substr(0,2)]){
	  	        tip = "Area code is wrong ";
	  	        pass = false;
	  	    }
	  	    else{
	  	        // 18位身份证需要验证最后一位校验位
	  	        if(code.length == 18){
	  	            code = code.split('');
	  	            // ∑(ai×Wi)(mod 11)
	  	            // 加权因子
	  	            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
	  	            // 校验位
	  	            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
	  	            var sum = 0;
	  	            var ai = 0;
	  	            var wi = 0;
	  	            for (var i = 0; i < 17; i++)
	  	            {
	  	                ai = code[i];
	  	                wi = factor[i];
	  	                sum += ai * wi;
	  	            }
	  	            var last = parity[sum % 11];
	  	            if(parity[sum % 11] != code[17]){
	  	                tip = "The last character is wrong!";
	  	                pass =false;
	  	            }
	  	        }
	  	    }
	  	    if(!pass){
	  	    	if(type==="own"){
	  				$("#Message").html("车主身份证输入有误，请检查");
	  				$("#errorhei").show();
	  		   		return false;
	  			}else if(type==="app"){
	  				$("#Message").html("被保人身份证输入有误，请检查");
	  				$("#errorhei").show();
	  		   		return false;
	  			}else if(type=="insure"){
	  				$("#Message").html("投保人身份证输入有误，请检查");
	  				$("#errorhei").show();
	  		   		return false;
	  			}		
	  	    }else{
	  	    	return true;
	  	    }
	  	}
	  }

	  /**
	   * 校验姓名
	   */
	  function checkName(value,type){	
	  	if(value==null||"undefined"==value||""==value){
	  		if(type==="own"){
	  			$("#Message").html("车主姓名不能为空");
	  			$("#errorhei").show();
	  	   		return false;
	  		}else if(type==="app"){
	  			$("#Message").html("被保人姓名不能为空");
	  			$("#errorhei").show();
	  	   		return false;
	  		}else if(type=="insure"){
	  			$("#Message").html("投保人姓名不能为空");
	  			$("#errorhei").show();
	  	   		return false;
	  		}else if(type=="delivery"){
	  			$("#Message").html("配送人姓名不能为空");
	  			$("#errorhei").show();
	  	   		return false;
	  		}
	  	}else if (!(/^[\u4e00-\u9fa5 ]{2,20}$/.test(value))) {
	  		if(type==="own"){
	  			$("#Message").html("车主姓名输入有误，请检查");
	  			$("#errorhei").show();
	  	   		return false;
	  		}else if(type==="app"){
	  			$("#Message").html("被保人姓名输入有误，请检查");
	  			$("#errorhei").show();
	  	   		return false;
	  		}else if(type=="insure"){
	  			$("#Message").html("投保人姓名输入有误，请检查");
	  			$("#errorhei").show();
	  	   		return false;
	  		}	else if(type=="delivery"){
	  			$("#Message").html("配送人姓名姓名输入有误，请检查");
	  			$("#errorhei").show();
	  	   		return false;
	  		}	
	  	} else{
	  		return true;
	  	}	
	  }
});


//加载框
function load(outtimes){
	$("#pop").show();
	setTimeout(function(){$('#pop').hide()
	},outtimes);
}

$('html').ready(function() {
	$.getJSON(getUrl()+'/vehicleInfor/getDptCode.do', function (data) {
	    provincedata=data;
	});
});
function setDeptNo(areaValue,type){
	var province, city, county;
	if (areaValue != null && "undefined" !== typeof (areaValue)) {
		var areaArray = areaValue.split("-");
		if (areaArray !== null) {
			if (areaArray[0] !== null) {
				province = areaArray[0];
			}
			if (areaArray[1] !== null) {
				city = areaArray[1];
			}
			if (areaArray[2] !== null) {
				county = areaArray[2];
			}
		}
	}
	if (provincedata != null && "undefined" !== typeof (provincedata)) {
		for ( var i = 0; i < provincedata.length; i++) {
			if (provincedata[i].name === province) {
				for ( var j = 0; j < provincedata.length; j++) {
					if (provincedata[i].deptinforid === provincedata[j].parentid
							&& provincedata[j].name === city) {
						var deptCode = provincedata[j].deptinforid;
						if (deptCode != null&& "undefined" !== typeof (deptCode)) {
							if(type==1){
								$("#ownerszipcode").val(deptCode);
							}else if(type==2){
								$("#applicationzipcode").val(deptCode);
							}else if(type==3){
								$("#insurezipcode").val(deptCode);
							}else if(type==4){
								$("#Delivery_ZipCode").val(deptCode);
							}
						}
					}
				}
			}
		}
	}
}



function changevalue(type){
	var name = $('#ownersname').val();
	var phone = $('#ownersphoneno').val();
	var certcode = $('#ownerscerticode').val(); 
	var ownersaddress=$("#city1").val();
	var ownersdetailaddress = $('#ownersdetailaddress').val();
    var btr=$('.tab_list i').eq(0).hasClass('check_on');
    var tbr=$('.tab_list i').eq(1).hasClass('check_on');		
	if (btr) {
			if(type=="ownersname"){
				$('#applicationname').val(name);
			}else if(type=="ownerscerticode"){
				$('#applicationcerticode').val(certcode.toLocaleUpperCase());
			}else if(type=="ownersphoneno"){
				$('#applicationphoneno').val(phone);
			}else if(type=="ownersaddress"){				
					$('#city2').val(ownersaddress);								
			}else if(type=="ownersdetailaddress"){
				$('#applicationdetailaddress').val(ownersdetailaddress);
			}
	}if(tbr){
		if(type=="ownersname"){
			$('#insurename').val(name);
		}else if(type=="ownerscerticode"){
			$('#insurecerticode').val(certcode.toLocaleUpperCase());
		}else if(type=="ownersphoneno"){
			$('#insurephoneno').val(phone);
		}else if(type=="ownersaddress"){		
				$('#city3').val(ownersaddress);							
		}else if(type=="ownersdetailaddress"){			
				$('#insuredetailaddress').val(ownersdetailaddress);					
		}
	}if($('.get_address_top i').hasClass("check_on")){
		if(type=="ownersname"){
			$('#deliveryname').val(name);
		}else if(type=="ownersphoneno"){
			$('#deliveryphone').val(phone);
		}else if(type=="ownersaddress"){		
				$('#city4').val(ownersaddress);			
		}else if(type=="ownersdetailaddress"){			
				$('#deliverydetailaddress').val(ownersdetailaddress);		
		}
	}	
}

$("#ensure").click(function(){
	$("#errorhei").hide();
});
$(window).scroll(function(){
	var top=$(document).scrollTop();
	if($(document).scrollTop()>30 && $(document).scrollTop()<500){
		$('.Sidebar_info').css('top',45+top);
	}
	
});
