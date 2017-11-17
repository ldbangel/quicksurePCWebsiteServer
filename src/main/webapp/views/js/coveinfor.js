var dataSuccess = 0; //保费试算成功 标志
//保费计算成功之后，做出任何修改必须要重新计算保费
$('html').ready(function(){
	//点击复选框
	$('.check').on("click",function(){
		if(dataSuccess==1){
			dataSuccess=0;
            $('#Message').html("做出任何改变后请重新点击保费计算！");
            $('.errorhei').show();			
		}				
	})
	$('.infor_icon').hover(function(){
		$(this).children('div').show();
	},function(){$(this).children('div').hide()});
	//点击日期插件
  /*$('.info_box>input').on("click",function(){
		if(dataSuccess==1){
			dataSuccess=0;
            $('#Message').html("做出任何改变后请重新点击保费计算！");
            $('.errorhei').show();			
		}				
	})
	
	$('.info_box>input').on("change",function(){
		if(dataSuccess==1){
			dataSuccess=0;
            $('#Message').html("做出任何改变后请重新点击保费计算！");
            $('.errorhei').show();			
		}				
	})*/
	
	//点击单选按钮
	$('.selt_box>input').on("click",function(){
		if(dataSuccess==1){
			dataSuccess=0;
            $('#Message').html("做出任何改变后请重新点击保费计算！");
            $('.errorhei').show();			
		}	
	})
	
	//点击下拉列表
	$('select').on("change",function(){
		if(dataSuccess==1){
			dataSuccess=0;
            $('#Message').html("做出任何改变后请重新点击保费计算！");
            $('.errorhei').show();			
		}	
	})
	
})

function getCoverage() {
    var coverageList = new Array();
    //交强
    if ($(".has").children('input').attr('checked')=="checked") {
        var TCPLdeductibleflag = null;
        var TCPLsuminsured = 1; //保额
        coverageList.push({
            insrnccode: "357",
            suminsured: TCPLsuminsured,
            deductibleflag: TCPLdeductibleflag
        });
    } else {
        $("#CTPLQuota").val("");
        $("#CTPLPremium").val("");//较强险保费
        $("#currenttax").val("");//车船税
        $("#appDate_1").val("");
    }
    //车损
    if($("#modCode").val()!='030101001'){
    	var modsuminsured = 1; //车损保额
    	var moddeductibleflag; //不计免赔
    	if ($("#modAbatement").prop("checked")) {
            moddeductibleflag = 1;
        } else {
            moddeductibleflag = 0;
        }
    	coverageList.push({
            insrnccode: "101",
            suminsured: modsuminsured,
            deductibleflag: moddeductibleflag
        });
    } else {
        $("#modQuota").val("");//保额
        $("#modQuotaPremium").val("");//应交保费
        $("#modductiblePremium").val("");
        $("#modTotalPremium").val("");
        $("#trl1").hide();
    }
    //三者
    if ($("#vtplQuota").val()!='030102001') {
        var vtpldeductibleflag; //不计免赔
        var vtplsuminsured = $("#vtplQuota").val(); //保额
        if ($("#vtplAbatement").prop("checked")) {
            vtpldeductibleflag = 1;
        } else {
            vtpldeductibleflag = 0;
        }
        coverageList.push({
            insrnccode: "102",
            suminsured: vtplsuminsured,
            deductibleflag: vtpldeductibleflag
        });
    } else {
        $("#vtplPremium").val("");
        $("#vtplductiblePremium").val("");
        $("#vtplTotalPremium").val("");
        $("#trl2").hide();
    }
    //盗抢
    if ($("#theftCode").val()!='030103001') {
        var TheftDeductibleflag;
        var TheftSuminsured = 1; //保额
        if ($("#theftAbatement").prop("checked")) {
            TheftDeductibleflag = 1;
        } else {
            TheftDeductibleflag = 0;
        }
        coverageList.push({
            insrnccode: "103",
            suminsured: TheftSuminsured,
            deductibleflag: TheftDeductibleflag
        });
    } else {
        $("#theftQuota").val("");
        $("#theftPremium").val("");
        $("#theftductiblePremium").val("");
        $("#theftTotalPremium").val("");
        $("#trl3").hide();
    }
    //司机责任
    if ($("#DriversCode").val()!='030104001') {
        var Driversdeductibleflag; //不计免赔
        var Driverssuminsured = $("#DriversCode").val();; //保额
        if ($("#DriversAbatement").prop("checked")) {
            Driversdeductibleflag = 1;
        } else {
            Driversdeductibleflag = 0;
        }
        coverageList.push({
            insrnccode: "104",
            suminsured: Driverssuminsured,
            deductibleflag: Driversdeductibleflag
        });
    } else {
        $("#DriversPremium").val("");
        $("#DriversductiblePremium").val("");
        $("#DriversTotalPremium").val("");
        $("#trl4").hide();
    }
    //乘客责任
    if ($("#PassengerCode").val()!='030105001') {
        var Passengerdeductibleflag; //不计免赔
        var Passengersuminsured = $("#PassengerCode").val();; //保额
        if ($("#PassengerAbatement").prop("checked")) {
            Passengerdeductibleflag = 1;
        } else {
            Passengerdeductibleflag = 0;
        }
        coverageList.push({
            insrnccode: "105",
            suminsured: Passengersuminsured,
            deductibleflag: Passengerdeductibleflag
        });
    } else {
        $("#PassengerPremium").val("");
        $("#PassengerductiblePremium").val("");
        $("#PassengerTotalPremium").val("");
        $("#trl5").hide();
    }
    //自燃
    if ($("#CombustionCode").val()!='030108001') {
        var CombustionDeductibleflag;
        var CombustionSuminsured = 1; //保额
        if ($("#CombustionAbatement").prop("checked")) {
            CombustionDeductibleflag = 1;
        } else {
            CombustionDeductibleflag = 0;
        }
        coverageList.push({
            insrnccode: "108",
            suminsured: CombustionSuminsured,
            deductibleflag: CombustionDeductibleflag
        });
    } else {
        $("#CombustionQuota").val("");
        $("#CombustionPremium").val("");
        $("#CombustionductiblePremium").val("");
        $("#CombustionTotalPremium").val("");
        $("#trl6").hide();
    }
    //玻璃
    if ($("#GlassCode").val()!='030107001') {
        var GlassDeductibleflag;
        var Glasssuminsured = $("#GlassCode").val(); //保额
        coverageList.push({
            insrnccode: "107",
            suminsured: Glasssuminsured,
            deductibleflag: GlassDeductibleflag
        });
    } else {
        $("#GlassQuotaPremium").val("");
        $("#GlassTotalPremium").val("");
        $("#trl7").hide();
    }
    
    //起保时间
    var syStartDate = document.getElementById("SY_DATE").value;
    var jqStartDate = document.getElementById("JQ_DATE").value;
    if (syStartDate != null || jqStartDate != null || orderNo != null) {
        coverageList.push({
            sypolicystartdate: syStartDate,
            jqpolicystartdate: jqStartDate,
            baseinfororderno: ""
        });
    }
    
    return coverageList;
}

/**
 * 点击保费计算按钮校验
 */
$('#getQuote').click(function () {
	     dataSuccess = 0;	    
	    //险种规则搭配
	    if ($("#modCode").val()!='030101001' || $("#vtplQuota").val()!='030102001' || $("#theftCode").val()!='030103001' || $("#DriversCode").val()!='030104001' || $("#PassengerCode").val()!='030105001') {
	        //车辆损失险  ,第三者责任险，全车盗抢险，司机座位责任险，乘客座位责任险
	    } else {
		    $("#prompt").hide();
	        $('#Message').html("必须选择一个主险投保");
	        $("#errorhei").show();
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
	                $("#errorhei").show();
	            	return false;
	            }
	        } else if ($("#PassengerCode").val()!='030105001') {
	            if ($("#DriversCode").val()!='030104001') {
	            	$("#prompt").hide();
	                $('#Message').html("承保车损了才能承保附加险");
	                $("#errorhei").show();
	            	return false;
	            } else {
	            	
	            	$("#prompt").hide();
	                $('#Message').html("承保车损了才能承保附加险+承保司机责任险才能承保乘客责任险");
	                $("#errorhei").show(); 
	            	return false;
	            }
	        } else {
	        	
	        	$("#prompt").hide();
	            $('#Message').html("承保车损了才能承保附加险");
	            $("#errorhei").show();
          	return false;
	        }
	    }
	    //不能单车损
	    if ($("#modCode").val()!='030101001') {
	        if ($("#vtplQuota").val()!='030102001' || $("#theftCode").val()!='030103001' || $("#DriversCode").val()!='030104001' || $("#PassengerCode").val()!='030105001') {

	        } else {
	        	
		        $("#prompt").hide();
	            $('#Message').html("不能单独投保车损险");
	            $("#errorhei").show();
          	return false;
	        }
	    }
	    //必须选择了司机责任才能选择乘客
	    if ($("#PassengerCode").val()!='030105001') {
	        if ($("#DriversCode").val()!='030104001') {

	        } else {
	        
		        $("#prompt").hide();
	            $('#Message').html("承保司机责任险才能承保乘客责任险");
	            $("#errorhei").show();
          	return false;
	        }
	    }
	   
	    var syDate = document.getElementById("SY_DATE").value;
	    var jqDate = document.getElementById("JQ_DATE").value;
	    if (syDate == "" || syDate == null || syDate == undefined) {
	    	$("#prompt").hide();
	        $('#Message').html("商业险起保时间不能为空");
	        $("#errorhei").show();
      	return false;
	    }
	    if ($(".has").children('input').attr('checked')=="checked") {
	        if (jqDate == "" || jqDate == null || jqDate == undefined) {
	        	$("#prompt").hide();
	            $('#Message').html("交强险起保时间不能为空");
	            $("#errorhei").show();
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
	                $("#errorhei").show(); 
	            	return false;
	            } else if (data.userinfor.errorCode == errorcode || data.userinfor.errorCode == errorcode2|| data.userinfor.errorCode !== null ) {
	                if (data.userinfor.agentFlag == 1) {
	                    var errorMessage = data.userinfor.errorMessage;
	                    $("#Message").html(errorMessage);
	                    $("#errorhei").show();
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
	                    $("#errorhei").show();
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
	              /*  $('#errorService').hide();
	                $('#next').show();*/
	                var inputSYdate = $("#SY_DATE").val();//录入的时间
	                var inputJQdate = $("#JQ_DATE").val();//
	                var returnSYdate = data.baseinfor.sypolicystartdate;//平台返回的时间
	                var returnJQdate = data.baseinfor.jqpolicystartdate;
	                
	                if(inputJQdate==""||inputJQdate==null){
	                    returnSYdate=returnSYdate.substring(-1,10);
		             	if(inputSYdate!==returnSYdate){
		             		
		             		$("#SY_DATE").val(returnSYdate);
		             		$('#Message').html("填写的商业起保时间为:"+inputSYdate+" 实际为:"+returnSYdate+" 已经回填正确的时间！");
		             		$("#errorhei").show();
	        	            return false;
		             		
		             	}
	                }else{
	                	returnSYdate=returnSYdate.substring(-1,10);
	                	returnJQdate=returnJQdate.substring(-1,10);
	                	if(inputSYdate!== returnSYdate && inputJQdate!==returnJQdate){
	                	
	                		$("#SY_DATE").val(returnSYdate);
	                		$("#JQ_DATE").val(returnJQdate);
	                		$('#Message').html("填写的商业起保时间为:"+inputSYdate+" 实际为:"+returnSYdate+" 填写的交强起保时间为:"+inputJQdate+" 实际为:"+returnJQdate+" 已经回填正确的时间！");
	                		$("#errorhei").show();
	        	            return false;
	                	}else if(inputSYdate!==returnSYdate){
	                		
	                		$("#SY_DATE").val(returnSYdate);
	                		$('#Message').html("填写的商业起保时间为:"+inputSYdate+" 实际为:"+returnSYdate+" 已经回填正确的时间！");
	                		$("#errorhei").show();
	        	            return false;
	                	}else if(inputJQdate!==returnJQdate){
	                		
	                		$("#JQ_DATE").val(returnJQdate);
	                		$('#Message').html("填写的交强起保时间为:"+inputSYdate+" 实际为:"+returnSYdate+" 已经回填正确的时间！"); 
	                		$("#errorhei").show();
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
	                $("#currenttax1").html("");
	                $("#currenttax").html("");
	                $("#b3").hide();
	            }
	            if (coverageinfors !== null && data.baseinfor.sypremium !== null) {
	                dataSuccess = 1;
	                for (var i = 0; i < coverageinfors.length; i++) {
	                    var coveragr = coverageinfors[i];
	                    if (coveragr.insrnccode === "0357") {
	                        if (coveragr.premium != null) {
//	                            $("#CTPLQuota").val(coveragr.suminsured);
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
	            $("#errorhei").show();
	            return false;
	        }
	    });
   });     




function submitFrom() {
//    $("#prompt").html("数据加载中，请稍等...");
//    load(15000);
	if(dataSuccess==1){
		$("#form").submit();
	}else{
		$('#Message').html("保费计算成功才能报价");
        $("#errorhei").show();
	}
    
}

$("#ensure").click(function(){
	$("#errorhei").hide();
});
	
//加载框
function load(outtimes){
	$("#pop").show();
	setTimeout(function(){$('#pop').hide()
	},outtimes);
}
