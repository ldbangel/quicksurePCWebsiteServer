/*var checkvincodeFlag1=false;
var checkvincodeFlag2=false;//车架号
var checkvincodeFlag3=false;
var idno=0;
var checkLcnNoFlag=false;//车牌号码
var checkOwnerNameFlag=false;//车主名字
var checkNewcarRegistdate=false;//新车注册日期
var checkphoneNoFlag=false; 

$('#ensure').click(function(){
    $('.errorhei').hide();
    }) ;

!(function ($, window, document, undefined) {

  var Plugin = function (elem, options) {
                                        //车架号的Value取值放这里，例如：this.che_jia_hao=$("#che_jia_hao").val();
    this.$elem = elem;
    this.$home = $('#count'); //首页报价按钮
    this.$btn = $('#next');//车辆信息页面下一步按钮
    this.$btnP = $('#next_p');//人员信息页面下一步按钮
    this.$search=$('#pzxh');//车型查询按钮
    this.$getQuate=$('#getQuote');//点击保费计算按钮
    this.$oMask = $('#mask_shadow');
    this.$oTitle = this.$elem.find('.title');
    this.$title_text = this.$oTitle.find('p');
    this.$close = this.$oTitle.find('span');

    this.b_stop = true; // 防止重复点击
    this.page_w = $(window).width();
    this.page_h = $(window).height();

    this.defaults = {
      ifDrag: false,
      dragLimit: false
    };

    this.opts = $.extend({}, this.defaults, options);
  };

   
  Plugin.prototype = {
    inital: function () { // 初始化
      var self = this;

      this.$title_text.text(this.$title_text.attr('data-title'));
      this.$elem.css({left: (this.page_w - this.$elem.width()) / 2});

      this.$elem.on('click', function () {
        return false;
      });
      //首页校验
      this.$home.on('click', function () {
          *//**
           * 提交表单
           *//*        
           var city=document.getElementById("city").value;
           var carNo=document.getElementById("car_plate").value;         
            debugger;
            checkLcnNo();//校验车牌号码
            if(city=="" || city==null || city==undefined){
            	$('#Message').html("投保城市不能为空");
            	self.popbox();             	
            	return false;
            }else if(carNo=="" || carNo==null || carNo==undefined){
            	$('#Message').html("车牌号不能为空");
            	self.popbox();             	
            	return false;
            }else if(!checkLcnNoFlag){
            	$('#Message').html("车牌号码输入有误");
            	self.popbox(); 
            	return false;	
          	}else {
          		$("#prompt").html("正在加载，请稍等...");
          		load(15000);
          		document.getElementById("form").submit();
          	}	
      
        self.b_stop = false;
        return false;
      });
      //车型查询前发动机号和车架号校验
      this.$search.on('click', function (){
    	  var vinno=document.getElementById("vinno").value;
    	  var model=document.getElementById("model").value;
    	  validateVIN();//校验车架号
    	  if (vinno=="" || vinno==null || vinno==undefined){
    	    	$('#Message').html("车架号不能为空");
    	    	self.popbox(); 
    	    	return false;
    	    }else if(!checkvincodeFlag1){
    	    	$('#Message').html("车架号必须为17位");
    	    	self.popbox(); 
    	    	return false;
    	    }else if(!checkvincodeFlag2){
    	    	$('#Message').html("车架号不能有O,Q,I,*字符");
    	    	self.popbox(); 
    	    	return false;
    	    }else if(!checkvincodeFlag3){    	    	                   
    	    	$('#Message').html("车架号只能是英文和数字组合");
    	    	self.popbox(); 
    	    	return false;
    	    }else if (model=="" || model==null || model==undefined){
    	    	$('#Message').html("品牌名称不能为空");
    	    	self.popbox(); 
               	return false;
    	    }else{
    	    	$("#prompt").html("车型查询中，请稍等...");
    	    	load(20000);    	    	
    	    	$('#select_content').html("");
    	    	event.stopPropagation();   
    	    	modelSearch();
    	    	//searchByModel();
    	    }

          self.b_stop = false;
          return false;
      });
      //车辆信息页面校验
      this.$btn.on('click', function () {
    	  if(page==2){
    		  var registerdate=document.getElementById("registerdate").value;
              var vinno=document.getElementById("vinno").value;         
              var model=document.getElementById("model").value;
               var engno=document.getElementById("engno").value;            
               var transferdate = document.getElementById("trans_Date").value;
               var drvowner = document.getElementById("drvowner").value;
               var certificateno = document.getElementById("certificateno").value;
               var  modelDescription=$("#pzxh").html();
               debugger;
               checkRegistdate();//校验新车注册日期
               checkLcnNo();//校验车牌号码
               validateName();//校验车主姓名
              validateVIN();//校验车架号
              checkPhoneV();//手机号码校验
               if(lcnno=="" || lcnno==null || lcnno==undefined){
               	$('#Message').html("车牌号不能为空");
               	self.popbox();             	
               	return false;
               }else if(!checkLcnNoFlag){
               	$('#Message').html("车牌号码输入有误");
               	self.popbox(); 
               	return false;
               }else 
            	   if(registerdate=="" || registerdate==null || registerdate==undefined){
               	$('#Message').html("车辆注册日期不能为空");
               	self.popbox();   
               	return false;
               }else if(!checkNewcarRegistdate){
               	$('#Message').html("新车注册日期不得与当前日期相差9个月(北京、上海不得相差7天)");
               	self.popbox(); 
               	return false;
               }else if (vinno=="" || vinno==null || vinno==undefined){
               	$('#Message').html("车架号不能为空");
               	self.popbox();
               	return false;
               }else if(!checkvincodeFlag1){
               	$('#Message').html("车架号必须为17位");
               	self.popbox();
               	return false;
               }else if(!checkvincodeFlag2){
               	$('#Message').html("车架号不能有O,Q,I,*字符");
               	self.popbox();
               	return false;
               }else if(!checkvincodeFlag3){
               	$('#Message').html("车架号只能是英文和数字组合");
               	self.popbox();
               	return false;
               }else if (model=="" || model==null || model==undefined){
               	$('#Message').html("品牌名称不能为空");
               	self.popbox();
               	return false;
               }else if (engno=="" || engno==null || engno==undefined){
               	$('#Message').html("发动机号不能为空");
               	self.popbox();
           		return false;// 
               }else if($('#chgownerflag1').attr("checked")=='checked' && (transferdate==  null || transferdate == "" || transferdate==undefined)){
               	$('#Message').html("过户日期不能为空");
               	self.popbox();
               	return false;  
               }else if (drvowner=="" || drvowner==null || drvowner==undefined){
               	$('#Message').html("车主名称不能为空");
               	self.popbox();
               	return false;
               }else if(!checkOwnerNameFlag){
               	$('#Message').html("名字输入有误！");
               	self.popbox();            	
               	return false;
               }else if (certificateno=="" || certificateno==null || certificateno==undefined){
               	$('#Message').html("身份证不能为空");
               	self.popbox();             	
               	return false;	
               }
               else if (idno==1){
               	$('#Message').html("身份证信息有误,请检查！");
               	self.popbox();  
           		return false;
             	} else if(!checkphoneNoFlag){
             		$('#Message').html("手机号码输入有误 ！");
               	self.popbox();  
           		return false;
             	}else {
             		$("#prompt").html("正在加载，请稍等...");
             		load(15000);
             		document.getElementById("form1").submit();
             	}
    		 
    	  }
 	
      
        self.b_stop = false;
        return false;
      });
      //人员信息页面的校验
      this.$btnP.on('click', function (event) {
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
    	  

    	  *//**
    	   * 
    	   * 第四个页面信息校验
    	   *//*
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
    	  		self.popbox();
    	     		return false;
    	  	}else{
    	  		return true;
    	  	}
    	  }


    	  *//**
    	   * 校验地址
    	   *//*
    	  function checkAddress(value,type){
    	  	if(value==null||"undefined"==value||""==value){
    	  		if(type==="own"){
    	  			$("#Message").html("车主地址不能为空");
    	  			self.popbox();
    	         		return false;
    	  		}else if(type==="app"){
    	  			$("#Message").html("被保人地址不能为空");
    	  			self.popbox();
    	  	   		return false;
    	  		}else if(type=="insure"){
    	  			$("#Message").html("投保人地址不能为空");
    	  			self.popbox();
    	  	   		return false;
    	  		}else if(type=="delivery"){
    	  			$("#Message").html("配送人地址不能为空");
    	  			self.popbox();
    	  	   		return false;
    	  		}
    	  	}else{
    	  		return true;
    	  	}	
    	  }
    	  *//**
    	   * 校验详细地址
    	   *//*
    	  function checkAddressDetails(value,type){
    	  	if(value==null||"undefined"==value||""==value){
    	  		if(type==="own"){
    	  			$("#Message").html("车主详细地址不能为空");
    	  			self.popbox();
    	  	   		return false;
    	  		}else if(type==="app"){
    	  			$("#Message").html("被保人详细地址地址不能为空");
    	  			self.popbox();
    	  	   		return false;
    	  		}else if(type=="insure"){
    	  			$("#Message").html("投保人详细地址地址不能为空");
    	  			self.popbox();
    	  	   		return false;
    	  		}else if(type=="delivery"){
    	  			$("#Message").html("配送人详细地址不能为空");
    	  			self.popbox();
    	  	   		return false;
    	  		}
    	  	}else{
    	  		return true;
    	  	}	
    	  }
    	  *//**
    	   * 校验手机号
    	   *//*
    	  function checkPhone(value,type){
    	  	if(value==null||"undefined"==value||""==value){
    	  		if(type==="own"){
    	  			$("#Message").html("车主手机号不能为空");
    	  			self.popbox();
    	  	   		return false;
    	  		}else if(type==="app"){
    	  			$("#Message").html("被保人手机号不能为空");
    	  			self.popbox();
    	  	   		return false;
    	  		}else if(type=="insure"){
    	  			$("#Message").html("投保人手机号不能为空");
    	  			self.popbox();
    	  	   		return false;
    	  		}else if(type=="delivery"){
    	  			$("#Message").html("配送人手机号不能为空");
    	  			self.popbox();
    	  	   		return false;
    	  		}
    	  	} else if (!(/^1[34578]\d{9}$/.test(value))) {
    	  	if(type==="own"){
    	  		$("#Message").html("车主手机号输入有误");
    	  		self.popbox();
    	     		return false;
    	  	}else if(type==="app"){
    	  		$("#Message").html("被保人手机号输入有误");
    	  		self.popbox();
    	     		return false;
    	  	}else if(type=="insure"){
    	  		$("#Message").html("投保人手机号输入有误");
    	  		self.popbox();
    	     		return false;
    	  	}else if(type=="delivery"){
    	  		$("#Message").html("配送人手机号输入有误");
    	  		self.popbox();
    	     		return false;
    	  	}
    	  }else{
    	  	return true;
    	  }	
    	  }
    	  *//**
    	   * 校验身份证
    	   *//*
    	  function checkId(value,type){
    	  	if(value==null||"undefined"==value||""==value){
    	  		if(type==="own"){
    	  			$("#Message").html("车主身份证不能为空");
    	  			self.popbox();
    	  	   		return false;
    	  		}else if(type==="app"){
    	  			$("#Message").html("被保人身份证不能为空");
    	  			self.popbox();
    	  	   		return false;
    	  		}else if(type=="insure"){
    	  			$("#Message").html("投保人身份证不能为空");
    	  			self.popbox();
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
    	  				self.popbox();
    	  		   		return false;
    	  			}else if(type==="app"){
    	  				$("#Message").html("被保人身份证输入有误，请检查");
    	  				self.popbox();
    	  		   		return false;
    	  			}else if(type=="insure"){
    	  				$("#Message").html("投保人身份证输入有误，请检查");
    	  				self.popbox();
    	  		   		return false;
    	  			}		
    	  	    }else{
    	  	    	return true;
    	  	    }
    	  	}
    	  }

    	  *//**
    	   * 校验姓名
    	   *//*
    	  function checkName(value,type){	
    	  	if(value==null||"undefined"==value||""==value){
    	  		if(type==="own"){
    	  			$("#Message").html("车主姓名不能为空");
    	  			self.popbox();
    	  	   		return false;
    	  		}else if(type==="app"){
    	  			$("#Message").html("被保人姓名不能为空");
    	  			self.popbox();
    	  	   		return false;
    	  		}else if(type=="insure"){
    	  			$("#Message").html("投保人姓名不能为空");
    	  			self.popbox();
    	  	   		return false;
    	  		}else if(type=="delivery"){
    	  			$("#Message").html("配送人姓名不能为空");
    	  			self.popbox();
    	  	   		return false;
    	  		}
    	  	}else if (!(/^[\u4e00-\u9fa5 ]{2,20}$/.test(value))) {
    	  		if(type==="own"){
    	  			$("#Message").html("车主姓名输入有误，请检查");
    	  			self.popbox();
    	  	   		return false;
    	  		}else if(type==="app"){
    	  			$("#Message").html("被保人姓名输入有误，请检查");
    	  			self.popbox();
    	  	   		return false;
    	  		}else if(type=="insure"){
    	  			$("#Message").html("投保人姓名输入有误，请检查");
    	  			self.popbox();
    	  	   		return false;
    	  		}	else if(type=="delivery"){
    	  			$("#Message").html("配送人姓名姓名输入有误，请检查");
    	  			self.popbox();
    	  	   		return false;
    	  		}	
    	  	} else{
    	  		return true;
    	  	}	
    	  }

    	  
    	  self.b_stop = false;
          return false;
      });
      
      //点击保费计算
      this.$getQuate.on('click', function () {
    	     dataSuccess = 0;
    	    
    	    //险种规则搭配
    	    if ($("#modCode").val()!='030101001' || $("#vtplQuota").val()!='030102001' || $("#theftCode").val()!='030103001' || $("#DriversCode").val()!='030104001' || $("#PassengerCode").val()!='030105001') {
    	        //车辆损失险  ,第三者责任险，全车盗抢险，司机座位责任险，乘客座位责任险
    	    } else {
    		    $("#prompt").hide();
    	        $('#Message').html("必须选择一个主险投保");
    	        self.popbox();
	  	   		return false;
    	    }
    	    //不能单车损和选择了附加险不选择车损
    	    if ($("#CombustionCode").val()!='030108001' || $("#GlassCode").val()!='030107001') {
    	       //自然损失险，玻璃单独破碎险
    	    	if ($("#modCode").val()!='030101001') {
    	            if ($("#vtplQuota").val()!='030102001' || $("#theftCode").val()!='030103001' || $("#DriversCode").val()!='030104001' || $("#PassengerCode").val()!='030105001') {

    	            } else {           
    		            $("#prompt").hide();
    	                $('#Message').html("不能单承保车损和附加险");
    	                self.popbox(); 
    	            	return false;
    	            }
    	        } else if ($("#PassengerCode").val()!='030105001') {
    	            if ($("#DriversCode").val()!='030104001') {
    	            	$("#prompt").hide();
    	                $('#Message').html("承保车损了才能承保附加险");
    	                self.popbox(); 
    	            	return false;
    	            } else {
    	            	
    	            	$("#prompt").hide();
    	                $('#Message').html("承保车损了才能承保附加险+承保司机责任险才能承保乘客责任险");
    	                self.popbox(); 
    	            	return false;
    	            }
    	        } else {
    	        	
    	        	$("#prompt").hide();
    	            $('#Message').html("承保车损了才能承保附加险");
    	            self.popbox(); 
                	return false;
    	        }
    	    }
    	    //不能单车损
    	    if ($("#modCode").val()!='030101001') {
    	        if ($("#vtplQuota").val()!='030102001' || $("#theftCode").val()!='030103001' || $("#DriversCode").val()!='030104001' || $("#PassengerCode").val()!='030105001') {

    	        } else {
    	        	
    		        $("#prompt").hide();
    	            $('#Message').html("不能单独投保车损险");
    	            self.popbox(); 
                	return false;
    	        }
    	    }
    	    //必须选择了司机责任才能选择乘客
    	    if ($("#PassengerCode").val()!='030105001') {
    	        if ($("#DriversCode").val()!='030104001') {

    	        } else {
    	        
    		        $("#prompt").hide();
    	            $('#Message').html("承保司机责任险才能承保乘客责任险");
    	            self.popbox(); 
                	return false;
    	        }
    	    }
    	   
    	    var syDate = document.getElementById("SY_DATE").value;
    	    var jqDate = document.getElementById("JQ_DATE").value;
    	    if (syDate == "" || syDate == null || syDate == undefined) {
    	    	$("#prompt").hide();
    	        $('#Message').html("商业险起保时间不能为空");
    	        self.popbox(); 
            	return false;
    	    }
    	    if ($('has').children('input').attr('checked')=="checked") {
    	        if (jqDate == "" || jqDate == null || jqDate == undefined) {
    	        	$("#prompt").hide();
    	            $('#Message').html("交强险起保时间不能为空");
    	            self.popbox(); 
                	return false;
    	        }
    	    }
    	    var coveragelist = getCoverage();
    	   $("#prompt").html("保费计算中，请稍等...");
    	    load(60000);
    	    $.ajax({
    	        type: "POST",
    	        url: getUrl() + "/PremiumCount/premiumCount.do",
    	        data: JSON.stringify(coveragelist),
    	        //将对象序列化成JSON字符串  
    	        dataType: "json",
    	        async: true,
    	        contentType: 'application/json;charset=utf-8',
    	        success: function(data) {
    	            var sypremium;
    	            var jqpremium;
    	            var currenttax;
    	            var currenttax1;
    	            var totalPremium;
    	            var coverageinfors = data.coverageinfors;
    	            $("#pop").hide();
    	            // 如果返回错误给予友好提示框
    	            var errorcode = "E00000030";
    	            var errorcode2 = "C99999999";
    	            if (data.userinfor.errorCode == null && data.baseinfor.sypremium == null) {
    	                dataSuccess = 0;
    	                $('#Message').html("请求失败或者超时,请稍后重试！");
    	                self.popbox(); 
    	            	return false;
    	            } else if (data.userinfor.errorCode == errorcode || data.userinfor.errorCode == errorcode2|| data.userinfor.errorCode !== null ) {
    	                if (data.userinfor.agentFlag == 1) {
    	                    var errorMessage = data.userinfor.errorMessage;
    	                    $("#Message").html(errorMessage);
    	                    self.popbox(); 
        	            	return false;
    	                    $('#next').hide();
    	                    $("#trl1").hide();
    	                    $("#trl2").hide();
    	                    $("#trl3").hide();
    	                    $("#trl4").hide();
    	                    $("#trl5").hide();
    	                    $("#trl6").hide();
    	                    $("#trl7").hide();
    	                } else {
    	                    $('#Message').html("保费计算失败，请拨打客服热线4009989989咨询！");
    	                    self.popbox(); 
        	            	return false;
    	                    $('#next').hide();
    	                    $('#next').hide();
    	                    $("#trl1").hide();
    	                    $("#trl2").hide();
    	                    $("#trl3").hide();
    	                    $("#trl4").hide();
    	                    $("#trl5").hide();
    	                    $("#trl6").hide();
    	                    $("#trl7").hide();
    	                }
    	            } else {
    	                $('#errorService').hide();
    	                $('#next').show();
    	                var inputSYdate = $("#SY_DATE").val();//录入的时间
    	                var inputJQdate = $("#JQ_DATE").val();//
    	                var returnSYdate = data.baseinfor.sypolicystartdate;//平台返回的时间
    	                var returnJQdate = data.baseinfor.jqpolicystartdate;
    	                
    	                if(inputJQdate==""||inputJQdate==null){
    	                    returnSYdate=returnSYdate.substring(-1,10);
    		             	if(inputSYdate!==returnSYdate){
    		             		
    		             		$("#SY_DATE").val(returnSYdate);
    		             		$('#Message').html("填写的商业起保时间为:"+inputSYdate+" 实际为:"+returnSYdate+" 已经回填正确的时间！");
    		             		self.popbox(); 
    	        	            return false;
    		             		
    		             	}
    	                }else{
    	                	returnSYdate=returnSYdate.substring(-1,10);
    	                	returnJQdate=returnJQdate.substring(-1,10);
    	                	if(inputSYdate!== returnSYdate && inputJQdate!==returnJQdate){
    	                	
    	                		$("#SY_DATE").val(returnSYdate);
    	                		$("#JQ_DATE").val(returnJQdate);
    	                		$('#Message').html("填写的商业起保时间为:"+inputSYdate+" 实际为:"+returnSYdate+" 填写的交强起保时间为:"+inputJQdate+" 实际为:"+returnJQdate+" 已经回填正确的时间！");
    	                		self.popbox(); 
    	        	            return false;
    	                	}else if(inputSYdate!==returnSYdate){
    	                		
    	                		$("#SY_DATE").val(returnSYdate);
    	                		$('#Message').html("填写的商业起保时间为:"+inputSYdate+" 实际为:"+returnSYdate+" 已经回填正确的时间！");
    	                		self.popbox(); 
    	        	            return false;
    	                	}else if(inputJQdate!==returnJQdate){
    	                		
    	                		$("#JQ_DATE").val(returnJQdate);
    	                		$('#Message').html("填写的交强起保时间为:"+inputSYdate+" 实际为:"+returnSYdate+" 已经回填正确的时间！"); 
    	                		self.popbox(); 
    	        	            return false;
    	                	}
    	                }
    	            }

    	            if (data.baseinfor != null) {
    	                if (data.baseinfor.sypremium !== null) {
    	                    sypremium = data.baseinfor.sypremium;
    	                    $("#sypremium").html(sypremium);
    	                    $("#b1").show();
    	                }else{
    	                	$("#sypremium").html("");    	
    	                }
    	                if (data.baseinfor.jqpremium !== null) {
    	                    jqpremium = data.baseinfor.jqpremium;
    	                    $("#jqpremium").val(jqpremium);
    	                    $("#jqpremium1").html(jqpremium);
    	                    $("#b2").show();
    	                } else {
    	                    $("#jqpremium").val("");
    	                    $("#jqpremium1").html("");
    	                    $("#b2").hide();
    	                }
    	                if (data.baseinfor.totalPremium !== null) {
    	                    totalPremium = data.baseinfor.totalPremium;
    	                    $("#totalPremium").html(totalPremium);
    	                } else {
    	                    $("#totalPremium").html("");
    	                }
    	                if (data.baseinfor.jqpolicystartdate !== null) {
    	                    $("#appDate_1").val(data.baseinfor.jqpolicystartdate);
    	                }
    	                if (data.baseinfor.sypolicystartdate !== null) {
    	                    $("#appDate").val(data.baseinfor.sypolicystartdate);
    	                }
    	            }
    	            if (data.taxinfor !== null) {
    	                if (data.taxinfor.sumuptax !== null) {
    	                    currenttax = data.taxinfor.sumuptax;
    	                    $("#currenttax").val(data.taxinfor.sumuptax);
    	                    $("#currenttax1").html(currenttax);
    	                    $("#b3").show();
    	                }else{
    	                	$("#currenttax").val("");
    	                    $("#currenttax1").html("");
    	                    $("#b3").hide();
    	                }
    	            } else {
    	                $("#currenttax1").val("");
    	                $("#currenttax").html("");
    	                $("#b3").hide();
    	            }
    	            if (coverageinfors !== null && data.baseinfor.sypremium !== null) {
    	                dataSuccess = 1;
    	                for (var i = 0; i < coverageinfors.length; i++) {
    	                    var coveragr = coverageinfors[i];
    	                    if (coveragr.insrnccode === "0357") {
    	                        if (coveragr.premium != null) {
//    	                            $("#CTPLQuota").val(coveragr.suminsured);
    	                            $("#jqpremium").val(coveragr.premium);
    	                        }
    	                    }
    	                    if (coveragr.insrnccode === "030101") {
    	                        $("#modQuota").val(coveragr.suminsured);
    	                        $("#modQuotaPremium").val(coveragr.premium);
    	                        $("#modductiblePremium").val(coveragr.nyl12);
    	                        $("#modTotalPremium").val((parseFloat(coveragr.premium)+parseFloat(coveragr.nyl12)).toFixed(2));
    	                        $("#trl1").show();
    	                    }
    	                    if (coveragr.insrnccode === "030102") {
    	                        $("#vtplPremium").val(coveragr.premium);
    	                        $("#vtplductiblePremium").val(coveragr.nyl12);
    	                        $("#vtplTotalPremium").val((parseFloat(coveragr.premium)+parseFloat(coveragr.nyl12)).toFixed(2));
    	                        $("#trl2").show();
    	                    }
    	                    if (coveragr.insrnccode === "030103") {
    	                        $("#theftQuota").val(coveragr.suminsured);
    	                        $("#theftPremium").val(coveragr.premium);
    	                        $("#theftductiblePremium").val(coveragr.nyl12);
    	                        $("#theftTotalPremium").val((parseFloat(coveragr.premium)+parseFloat(coveragr.nyl12)).toFixed(2));
    	                        $("#trl3").show();
    	                    }
    	                    if (coveragr.insrnccode === "030104") {
    	                        $("#DriversPremium").val(coveragr.premium);
    	                        $("#DriversductiblePremium").val(coveragr.nyl12);
    	                        $("#DriversTotalPremium").val((parseFloat(coveragr.premium)+parseFloat(coveragr.nyl12)).toFixed(2));
    	                        $("#trl4").show();
    	                    }
    	                    if (coveragr.insrnccode === "030105") {
    	                        $("#PassengerPremium").val(coveragr.premium);
    	                        $("#PassengerductiblePremium").val(coveragr.nyl12);
    	                        $("#PassengerTotalPremium").val((parseFloat(coveragr.premium)+parseFloat(coveragr.nyl12)).toFixed(2));
    	                        $("#trl5").show();
    	                    }
    	                    if (coveragr.insrnccode === "030108") {
    	                        $("#CombustionQuota").val(coveragr.suminsured);
    	                        $("#CombustionPremium").val(coveragr.premium);
    	                        $("#CombustionductiblePremium").val(coveragr.nyl12);
    	                        $("#CombustionTotalPremium").val((parseFloat(coveragr.premium)+parseFloat(coveragr.nyl12)).toFixed(2));
    	                        $("#trl6").show();
    	                    }
    	                    if (coveragr.insrnccode === "030107") {
    	                        $("#GlassQuotaPremium").val(coveragr.premium);
    	                        $("#GlassTotalPremium").val(coveragr.premium);
    	                        $("#trl7").show();
    	                    }
    	                }
    	            }else{
    	            	$("#sypremium").val("");
    	            }
    	            if (sypremium == null || sypremium == undefined) {
    	                sypremium = 0.00;
    	            }
    	            if (jqpremium == null || jqpremium == undefined) {
    	                jqpremium = 0.00;
    	            }
    	            if (currenttax == null || currenttax == undefined) {
    	                currenttax = 0.00;
    	                currenttax1 = 0.00;
    	            }
    	            totalPremium = parseFloat(sypremium) + parseFloat(jqpremium) + parseFloat(currenttax);
    	            if (totalPremium == 0 || totalPremium == null || totalPremium == undefined) {
    	            	$("#totalPremium").html("");
    	            	$("#b1").hide();
    	            } else {
    	                $("#totalPremium").html(totalPremium.toFixed(2));
    	            }
    	        },
    	        error: function(res) {           
    	        
    	            $('#Message').html("保费计算失败");
    	            self.popbox(); 
    	            return false;
    	        }
    	    });
    	    
    	    
    	      	  
    	  self.b_stop = false;
           return false;
         });     
      
      this.$close.on('click', function () {
        self.closePopbox();

        return false;
      });

      $(document.body).on('click', function () {
        self.closePopbox();
      });

      // 拖拽事件
      this.$oTitle.on('mousedown', function (ev) {
        if (self.opts.ifDrag) {
          self.drag(ev);
        }

        return false;
      });
    },

    popbox: function () { // 显示弹窗
      var self = this;

      this.$oMask.show().animate({opacity: 1});;
      this.$elem.show().animate({opacity: 1}, function () {
        self.b_stop = true;
      });
    },

    closePopbox: function () { // 关闭弹窗
      var self = this;

      if (this.b_stop) {
        this.$oMask.animate({opacity: 0}, function () {
          $(this).hide();
        });;
        this.$elem.animate({opacity: 0, top: 150}, function () {
          $(this).hide();
        });
      }
    },

    drag: function (ev) { // 拖拽事件
      var self = this;
      var oEvent = ev || window.event;
      var disX = oEvent.clientX - this.$elem.offset().left;
      var disY = oEvent.clientY - this.$elem.offset().top;
      var _move = true;

      $(document).mousemove(function (ev) {
        if (_move) {
          var oEvent = ev || window.event;
          var offset_l = oEvent.clientX - disX;
          var offset_t = oEvent.clientY - disY;

          if (self.opts.dragLimit) {
            if (offset_l <= 0) {
              offset_l = 0;
            } else if (offset_l >= self.page_w - self.$elem.width()) {
              offset_l = self.page_w - self.$elem.width();
            }

            if (offset_t <= 0) {
              offset_t = 0;
            } else if (offset_t >= self.page_h - self.$elem.height()) {
              offset_t = self.page_h - self.$elem.height();
            }
          }

          self.$elem.css({left: offset_l, top: offset_t});
        }
      }).mouseup(function () {
        _move = false;
      });
    },

    constructor: Plugin
  };

  $.fn.popup = function (options) {
    var plugin = new Plugin(this, options);

    return plugin.inital();
  };

})(window.jQuery, window, document);
$(function () {
  $('#popup').popup({ifDrag: false, dragLimit: false});

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

//车牌号校验
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
}
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



*/