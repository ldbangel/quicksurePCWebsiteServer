$(document).ready(function() {
//	$("#phoneno").focus();
	$("#pop").hide();
});
var _interval;
var checkphoneNoFlag=false;
var checkcodeflag=false;
if(typeof(phoneNo)!=="undefined"&&phoneNo!==null){
  $("#phoneno").val(phoneNo);
  $("#phonenum").val(phoneNo);
}

$(document).ready(function(){
	if(localStorage.getItem('key')!=null){
		$('.inputstyle').val(localStorage.getItem('key'));
		$('.remember').attr('checked','checked');
	}else{ 
		
	}
});

$(function(){
	//手机动态登录
	$('#switch_qlogin').click(function(){
		$('#switch_login').removeClass("switch_btn_focus").addClass('switch_btn');
		$('#switch_qlogin').removeClass("switch_btn").addClass('switch_btn_focus');
		$('#switch_bottom').animate({left:'0px',width:'70px'});
		$('#qlogin').css('display','none');
		$('#web_qr_login').css('display','block');
		});
	
	//账户登录
	$('#switch_login').click(function(){
		$('#switch_login').removeClass("switch_btn").addClass('switch_btn_focus');
		$('#switch_qlogin').removeClass("switch_btn_focus").addClass('switch_btn');
		$('#switch_bottom').animate({left:'154px',width:'70px'});
		$('#qlogin').css('display','block');
		$('#web_qr_login').css('display','none');
		});
	if(getParam("a")=='0')
	{
		$('#switch_login').trigger('click');
	}
});

//获取验证码
var _interval;
function getCheckCode(){
	checkphone(1);
	if(checkphoneNoFlag){
		var num=60;
	    var Span=document.getElementsByClassName('code')[0].getElementsByTagName('span')[0];

	    Span.setAttribute('class','Color ');
	    console.log(num);
	    _interval=setInterval( function time(){
	        Span.innerHTML=' ';
	        num--;
	        Span.innerHTML=num+'s';
	        if(num<=0){
	            Span.removeAttribute("class");
	            Span.innerHTML='获取验证码';
	           clear();
	        }
	    },1000);
		 function clear(){
		     clearInterval(_interval);
		 }

		var phoneno=$("#phoneno").val();
		$.ajax({
			url : getUrl()+"/loginUser/phoneCheck.do",
			async: false ,
			data: {phoneno:phoneno},
			success : function(generation){
			}
		});
	}
}
//用户登录
function userLogin(usertype){
	if(usertype=="1"){
		var phoneCheckCode=$("#phoneCheckCode").val();
		var username=$("#phoneno").val();
		checkphone(usertype);
		if(checkphoneNoFlag){
			checkphonetest(usertype);
			if(checkcodeflag){
				$.ajax({
					url : getUrl()+"/loginUser/checkPhoneCode.do",
					async: false ,
					data: {checkCode:phoneCheckCode,phoneno:username},
					success : function(result){
						if(result=="true"){
							$("#prompt").html("正在登录，请稍等...");
							load(15000);
				    		$.ajax({
				    			url : getUrl()+"/loginUser/userLogin.do",
								async: false ,
								data: {
									username:username,
									usertype:usertype,
									},
				    			success : function(result){
				    				$("#pop").hide();
				    				if(result=="1"){
				    					$('#Message').html("登录失败！");
								    	$('.errorhei').show();
									}else{
										clearInterval(_interval);
										if(action && typeof(action)!="undefined" && action!=null && action=="myaccount"){
											window.location.href = getUrl()+"/views/jsp/myAccount.jsp";
										}else if(!dptcode || typeof(dptcode)=="undefined" || dptcode==null || dptcode==""){
											window.location.href = getUrl()+"/views/jsp/quickSurehome.jsp?deptAddress="+deptAddress+"&lcnno="+lcnNo+"&deptno="+dptcode;
										}else{
											window.location.href = getUrl()+"/vehicleInfor/goToVehicleScreen.do?deptAddress="+deptAddress+"&lcnno="+lcnNo+"&deptno="+dptcode;
										}
									}
				    			},  
				    		    error: function(res){   
				    		    	 $("#pop").hide();
				    		     	 $("#Message").html("登录失败");
				    		     	 $('.errorhei').show();				    		     	
				    		     	//Hide();
				    		    }  
				    		});
			    		}else{
			    			$('#Message').html("验证码输入有误！");
					    	$('.errorhei').show();
					    	//Hide();
					    	$("#phoneCheckCode").focus();
					    	
			    		}
			    	},
	    		    error: function(res){   
	    		    	 $("#pop").hide();
	    		     	 $("#Message").html("登录失败");
	    		     	 $('.errorhei').show();				    		     	
	    		     	//Hide();
	    		    } 
			    });
			}
		}
	}else{
		var password=$("#psw").val();
		var username=$("#phonenum").val();
		checkphone(usertype);
		if(checkphoneNoFlag){
			checkphonetest(usertype);
			if(checkcodeflag){
				$("#prompt").html("正在登录，请稍等...");
				load(15000);
				$.ajax({
					type: "post",
					url : getUrl()+"/loginUser/userLogin.do",
					async: false ,
					data: {username:username,password:password,usertype:usertype},
					success : function(result){
						console.log(result);
						$("#pop").hide();
						if(result=="3"){
							$('#Message').html("用户名不存在或密码输入错误！");
					    	$('.errorhei').show();
						}else{
							if(typeof(action)!="undefined" && action!=null && action=="myaccount"){
								window.location.href = getUrl()+"/views/jsp/myAccount.jsp";
							}else if(!dptcode || typeof(dptcode)=="undefined" || dptcode==null || dptcode==""){
								window.location.href = getUrl()+"/views/jsp/quickSurehome.jsp?deptAddress="+deptAddress+"&lcnno="+lcnNo+"&deptno="+dptcode;
							}else{
								window.location.href = getUrl()+"/vehicleInfor/goToVehicleScreen.do?deptAddress="+deptAddress+"&lcnno="+lcnNo+"&deptno="+dptcode;
							}
						}
					},					 
	    		    error: function(res){   
	    		    	 $("#pop").hide();
	    		     	 $("#Message").html("登录失败");
	    		     	 $('.errorhei').show();				    		     	
	    		     	//Hide();
	    		    } 
				});
			}
		}
	}
}

function checkphonetest(type) {
	var codee='';
	var reg="";
	if(type=='1'){
		checkphone(type);
		if(checkphoneNoFlag){
			$("#errorPhoneno").css("display", "none");
			$("#nullPhoneno").css("display", "none");
			reg=/^\d{6}$/;
			codee=$('#phoneCheckCode').val();
			if(codee==null||"undefined"==typeof codee||""==codee){
				checkcodeflag=false;
				$('#Message').html("请输入验证码！");
		    	$('#errorhei').show();
		    	//Hide();
		    	$("#phoneCheckCode").focus();
				
			}else{
				if(!reg.test(codee)){
					checkcodeflag=false;
					$('#Message').html("验证码输入有误！");
			    	$('#errorhei').show();
			    	//Hide();
					$("#phoneCheckCode").focus();
				}else{
					checkcodeflag=true;
				}
			}
		}
	}if(type=='2'){
		checkphone(type);
		if(checkphoneNoFlag){
			codee=$('#psw').val();
			reg=/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,20}$/;
			if(codee==null||"undefined"==typeof codee||""==codee){
				checkcodeflag=false;
				$('#Message').html("请输入密码！");
		    	$('#errorhei').show();
		    	//Hide();
		    	$("#psw").focus();
			}else{
				if(!reg.test(codee)){
					$('#Message').html("密码输入有误！");
			    	$('#errorhei').show();
			    	//Hide();
			    	$("#psw").focus();
					checkcodeflag=false;
				}else{
					checkcodeflag=true;
				}
			}
		}
	}
}
//获取用户登录类型
function checkphone(type) {
	var phone='';
	if(type=='1'){
		phone=$("#phoneno").val();
		if(phone==null||"undefined"==typeof phone||""==phone){
			checkphoneNoFlag=false;
			$('#Message').html("请输入手机号！");
	    	$('.errorhei').show();
	    	//Hide();
			$("#phoneno").focus();
			return false;
		}else{
			if(!(/^1[34578]\d{9}$/.test(phone))){
				checkphoneNoFlag=false;
				$('#Message').html("手机号输入有误！");
		    	$('.errorhei').show();
		    	//Hide();
				
				$("#phoneno").focus();
				return false;
			}else{
				checkphoneNoFlag=true;
			}
		}
	}
	if(type=='2'){
		phone=$("#phonenum").val();
		if(phone==null||"undefined"==phone||""==phone){
			checkphoneNoFlag=false;
			$('#Message').html("请输入手机号！");
	    	$('.errorhei').show();
	    	//Hide();
			$("#phonenum").focus();
			return false;
		}else{
			if(!(/^1[34578]\d{9}$/.test(phone))){
				checkphoneNoFlag=false;
				$('#Message').html("手机号输入有误！");
		    	$('.errorhei').show();
		    	//Hide();
				$("#phonenum").focus();
				return false;
			}else{
				checkphoneNoFlag=true;
			}
		}
	}
}

$('.remenber').click(function(){
      if($(this).attr('checked')!=null){
		   $('.remenber').attr('checked','checked');
	  }else{
		   $('.remenber').removeAttr('checked');
	  }
});

	$('.errortan3').click(function(){
	    $('.errorhei').hide();
	});

function load(outtimes){
	$("#pop").show();
	setTimeout(function(){$('#pop').hide()
	},outtimes);
}

//注册按钮
function regist(){
	window.location.href=getUrl()+"/views/jsp/registUser.jsp?address="+address+"&chepai="+chepai+"&dptcode="+dptcode;
}

/*function logintab(){
	scrollTo(0);
	$('#switch_qlogin').removeClass("switch_btn_focus").addClass('switch_btn');
	$('#switch_login').removeClass("switch_btn").addClass('switch_btn_focus');
	$('#switch_bottom').animate({left:'154px',width:'96px'});
	$('#qlogin').css('display','none');
	$('#web_qr_login').css('display','block');
}*/
function getParam(pname) { 
	var params = location.search.substr(1); 
	var ArrParam = params.split('&'); 
	if (ArrParam.length == 1) { 
	    return params.split('=')[1]; 
	} 
	else { 
	    for (var i = 0; i < ArrParam.length; i++) { 
	        if (ArrParam[i].split('=')[0] == pname) { 
	            return ArrParam[i].split('=')[1]; 
	        } 
	    } 
	} 
}  
var reMethod = "GET",
	pwdmin = 6;