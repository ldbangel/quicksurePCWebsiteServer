var initData;

$(document).ready(function() {
    var startTime = $('#Date_td').val();
	var endTime = $('#Date').val();
    init(startTime,endTime);
});

//初始化
function init(startTime,endTime){
	$("#prompt").html("正在加载，请稍等...");
	load(10000);
    //初始化我的订单页面
    $.getJSON(urlpath+'/myAccount/myAccountInit.do?startTime='+startTime+'&endTime='+endTime, function (data) {
    	initData = data;
    	orderCount0 = data.count0;
        orderCount1 = data.count1;
        orderCount2 = data.count2;
		orderCount3 = data.count3;
		orderCount4 = data.count4;
		$(".all_order").html(orderCount0);
        $(".wait_pay").html(orderCount1);
        $(".already_pay").html(orderCount2);
        $(".Stop_keep").html(orderCount3);
        $(".On").html(orderCount4);      
        tabShowRule();
        $('#pop').hide();
    });
}

//我的订单tab展示规则
function tabShowRule(){
	var This = $('.Order_list>.act'),A=$('.Order_list li');
	var index = This.index();
	var num = This.children().text();
	if(num==0){
		if($('.wait_pay').text()!=0 && index!=0){
			A.eq(0).click();
		}else if($('.already_pay').text()!=0 && index!=1){
			A.eq(1).click();
		}else if($('.Stop_keep').text()!=0 && index!=2){
			A.eq(2).click();
		}else if($('.On').text()!=0 && index!=3){
			A.eq(3).click();
		}else if($('.wait_pay').text()==0&&$('.already_pay').text()==0
				&&$('.Stop_keep').text()==0&&$('.On').text()==0){
			A.eq(0).click();
		}
	}else{
		if(index==0){
			A.eq(0).click();
		}else if(index==1){
			A.eq(1).click();
		}else if(index==2){
			A.eq(2).click();
		}else if(index==3){
			A.eq(3).click();
		}else if(index==4){
			A.eq(4).click();
		}
	}
}

//点击tab事件
$('.Order_list>li').click(function(e){
	$('#pager').html('');
	var This = $(this);
    e.preventDefault();
    This.addClass('act').siblings().removeClass('act');
    $('#Order_information').html("");
    var flag=This.index();
    $('#tabFlag').val(flag);
    var insuranceVOs;
    $('#pager').html('');
    if(flag == 0){
    	insuranceVOs = initData.insuranceDetailsVOs0;
    }else if(flag == 1){
    	insuranceVOs = initData.insuranceDetailsVOs1;
    }else if(flag == 2){
    	insuranceVOs = initData.insuranceDetailsVOs2;
    }else if(flag == 3){
    	insuranceVOs = initData.insuranceDetailsVOs3;
    }else if(flag == 4){
    	insuranceVOs = initData.insuranceDetailsVOs4;
    }
    showTab(flag,insuranceVOs,1);
});

//展示tab
function showTab(flag,Data,That_Page){
	var orderCount;
    if(flag == 0){
	    orderCount=orderCount0;
	    for(var i=0;i<Data.length;i++){
	    	var status="";
       	    if(Data[i].baseinfor.orderstate==10){
       	    	status="待定";
       	    }else if(Data[i].baseinfor.orderstate==20){
       		    status="已报价";
       	    }else if(Data[i].baseinfor.orderstate==30){
       		    status="已下单";
       	    }else if(Data[i].baseinfor.orderstate==40){
       		    status="待支付";
       	    }else if(Data[i].baseinfor.orderstate==50){
       		    status="已支付";
       	    }else if(Data[i].baseinfor.orderstate==60){
       		    status="已生效";
       	    }else if(Data[i].baseinfor.orderstate==70){
       		    status="待配送";
       	    }else if(Data[i].baseinfor.orderstate==80){
       		    status="已撤销";
       	    }else if(Data[i].baseinfor.orderstate==90){
       	    	status="已配送";
       	    }
       	    addPolicyInfo(Data[i],status);
        }
	}else if(flag == 1){
	    orderCount=orderCount1;
 	    for(var i=0;i<Data.length;i++){
 		    var orderstate="";
 		    if(Data[i].baseinfor.orderstate==30){
 			    orderstate="已下单";
 		    }else{
 			    orderstate="待支付";
 		    }
 		    addPolicyInfo(Data[i],orderstate);
 	    }
    }else if(flag == 2){
 	    orderCount=orderCount2;
 	    for(var i=0;i<Data.length;i++){
 		    var orderstate="";
 		    if(Data[i].baseinfor.orderstate==50){
 			    orderstate="已支付";
 		    }else if(Data[i].baseinfor.orderstate==60){
 			    orderstate="已生效";
 		    }else if(Data[i].baseinfor.orderstate==70){
 			    orderstate="待配送";
 		    }else if(Data[i].baseinfor.orderstate==90){
 		    	orderstate="已配送";
 		    }
 		    addPolicyInfo(Data[i],orderstate);
 	    }
    }else if(flag == 3){
 	    orderCount=orderCount3;
 	    for(var i=0;i<Data.length;i++){
 		    var orderstate="";
 		    if(Data[i].baseinfor.orderstate==10){
 			    orderstate="待定";
 		    }else{
 			    orderstate="已报价";
 		    }
 		    addPolicyInfo(Data[i],orderstate);
 	    }
    }else if(flag == 4){
 	    orderCount=orderCount4;
 	    for(var i=0;i<Data.length;i++){
 		    var orderstate = "已撤销";
 		    addPolicyInfo(Data[i],orderstate);
 	    }
    }
    var Last_Page;
    if(typeof(orderCount)==undefined || orderCount==null || orderCount==""){
	    Last_Page = 1;
    }else{
	    Last_Page = parseInt(orderCount/5)+parseInt(orderCount%5>0?1:0);
    }
    Pager(That_Page,Last_Page);
}

//我的订单详情动态加载
function addPolicyInfo(insuranceDetailsVO,orderstate){
	var orderno="'"+insuranceDetailsVO.baseinfor.orderno+"'";
	var useId="'"+insuranceDetailsVO.baseinfor.userinforid+"'";
	var order_info = $('#Order_information');
	var sp_div = $('<div class="single_product"/>');
	sp_div.append($('<div class="product_title">').append('<i class="check_icon"></i>订单号: <span class="prd_number">'+insuranceDetailsVO.baseinfor.orderno+'</span><p class="rg">投保日期:<span class="date_val">'+insuranceDetailsVO.baseinfor.createtime.slice(0,11)+'</span></p>'));
	var mm_div = $('<table class="prd_ft_box"/>');
	var mm_tr = $('<tr/>');
	mm_tr.append($('<td/>').append('<img src="'+urlpath+'/views/image/'+ insuranceDetailsVO.vhlinfor.codeName+'.jpg" class="car_img"/>'));
	var mm_td2= $('<td/>').append('<p class="main_search">车牌号: <span class="Car_number">'+insuranceDetailsVO.vhlinfor.lcnno+'</span>车主:<span class="user_Name">'+insuranceDetailsVO.vhlinfor.drvowner+'</span></p>');
	if(insuranceDetailsVO.baseinfor.sypolicystartdate != null && insuranceDetailsVO.baseinfor.sypolicystartdate != ""){
		mm_td2.append($('<p style="color:#333;">商业险起期:<span class="begin_date">'+insuranceDetailsVO.baseinfor.sypolicystartdate.slice(0,11)+'</span></p>'));
	}
	if(insuranceDetailsVO.baseinfor.jqpolicystartdate != null && insuranceDetailsVO.baseinfor.jqpolicystartdate !=""){
		mm_td2.append($('<p style="color:#333;">交强险起期:<span class="begin_date">'+insuranceDetailsVO.baseinfor.jqpolicystartdate.slice(0,11)+'</span></p>'));
	}
	if(insuranceDetailsVO.baseinfor.orderstate==30||insuranceDetailsVO.baseinfor.orderstate==40){
		if(insuranceDetailsVO.baseinfor.syapplicationno != null){
			mm_td2.append($('<p style="color:#333;"><pre>商业投保单号:</pre><span class="end_date">'+insuranceDetailsVO.baseinfor.syapplicationno+'</span></p>'));
		}
		if(insuranceDetailsVO.baseinfor.jqapplicationno != null){
			mm_td2.append($('<p style="color:#333;"><pre>交强投保单号:</pre><span class="end_date">'+insuranceDetailsVO.baseinfor.jqapplicationno+'</span></p>'));
		}
	}
	if(insuranceDetailsVO.baseinfor.orderstate==50||insuranceDetailsVO.baseinfor.orderstate==60||insuranceDetailsVO.baseinfor.orderstate==70||insuranceDetailsVO.baseinfor.orderstate==90){
		if(insuranceDetailsVO.baseinfor.sypolicyno!=null){
			mm_td2.append($('<p style="color:#333;"><pre>商业保单号:</pre><span class="end_date">'+insuranceDetailsVO.baseinfor.sypolicyno+'</span></p>'));
		}
		if(insuranceDetailsVO.baseinfor.jqpolicyno!=null){
			mm_td2.append($('<p style="color:#333;"><pre>交强保单号:</pre><span class="end_date">'+insuranceDetailsVO.baseinfor.jqpolicyno+'</span></p>'));
		}
	}
	mm_tr.append(mm_td2);
	mm_tr.append('<td><p class="total_price">&yen;<span>'+insuranceDetailsVO.baseinfor.totalPremium+'</span></p></td>');
	mm_tr.append('<td class="state "><p>'+orderstate+'</p></td> ');
	var mm_td3 = $('<td/>');
	if(insuranceDetailsVO.baseinfor.orderstate>=20){
		mm_td3.append('<p><a href="javascript:showOrderDetail('+orderno+','+useId+');">订单详情</a></p>')
	}
	if(insuranceDetailsVO.baseinfor.orderstate==30||insuranceDetailsVO.baseinfor.orderstate==40){
		mm_td3.append('<p><a href="javascript:continuePay('+orderno+','+useId+');" >继续支付</a></p><p><a href="javascript:cancelOrder('+orderno+','+useId+');" >取消订单</a></p>');
	}
	if(insuranceDetailsVO.baseinfor.orderstate==10||insuranceDetailsVO.baseinfor.orderstate==20){
		mm_td3.append('<p><a href="javascript:continueInsure('+orderno+','+useId+');" >继续投保</a></p><p><a href="javascript:cancelOrder('+orderno+','+useId+');" >取消订单</a></p>');
	}
	mm_tr.append(mm_td3);
	mm_div.append(mm_tr);
	sp_div.append(mm_div);
	order_info.append(sp_div);
}

//分页栏
function Pager(That_Page,Last_Page){
	 var pager=$('#pager');
	 pager.html("");
	 if((That_Page-1)>0){
		 pager.append("<li class='prevPage None first att' ><span>首页</span></li>");
		 pager.append("<li class='prevPage None prev att' ><span>上一页</span></li>");
	 }else{
		 pager.append("<li class='prevPage' ><span>首页</span></li>");
		 pager.append(" <li class='prevPage '><span>上一页</span></li>");
     }
     if((That_Page-1)>0){pager.append("<li class='att'>"+parseInt(That_Page-1)+"</li>");}
     pager.append("<li class='active'>"+That_Page+"</li>");
     if((That_Page+1)<=Last_Page){pager.append("<li class='att'>"+ parseFloat(That_Page+1) +"</li>");}
     if((That_Page+1)<=Last_Page){
    	 pager.append(" <li class='nextPage None_1 next att'><span>下一页</span></li>");
    	 pager.append(" <li class='nextPage None_1 last att' data-lastpage="+Last_Page+"><span>尾页</span></li>");
     }else{
    	 pager.append(" <li class='nextPage'><span>下一页</span></li>");
    	 pager.append(" <li class='nextPage'><span>尾页</span></li>");
     }
     pager.append(" <li class='AllPage'><span>共"+Last_Page+"页</span></li>");
}	

//点击分页页码
$('#pager').on('click','#pager>li',function(event){
   var This=$(this),fewPage,flag=$('.Order_list>.act').index();
   var content = $('#search_content').val();
   var startTime = $('#Date_td').val();
   var endTime = $('#Date').val();
   if(This.hasClass("active")){
       return true;
   }else if(This.children().length!=0){
	   if(This.hasClass("None_1")||This.hasClass("None")){//判断上一页或下一页
		   if(This.hasClass("prev")){//判断首页或尾页
			   fewPage=parseFloat(parseInt(This.siblings('.active').text())-1);
		   }else if(This.hasClass("next")){
			   fewPage=parseFloat(parseInt(This.siblings('.active').text())+1);
		   }else if(This.hasClass("first")){
			   fewPage=parseFloat(parseInt(1));
		   }else{
			   fewPage=parseFloat(parseInt(This.attr('data-lastpage')));
		   }
	   }else{
		   return true;
	   }
       getdata(fewPage,flag,startTime,endTime);
       $(document).scrollTop(200);
   }else{
       This.addClass("active").siblings('.active').removeClass('active');
       fewPage=parseFloat(This.text());
       flag=$('.Order_list').children('.act').index();
       getdata(fewPage,flag,startTime,endTime);
       $(document).scrollTop(200);
   }
});

//点击分页页码，请求后台返回对应页码的数据
function getdata(fewPage,flag,startTime,endTime){
   $.getJSON(urlpath+'/myAccount/getMyOrders.do?curPage='+fewPage+'&flag='+flag+'&startTime='+startTime+'&endTime='+endTime, function (data) {
	   orderCount0 = data.count0;
	   orderCount1 = data.count1;
       orderCount2 = data.count2;
       orderCount3 = data.count3;
       orderCount4 = data.count4;
       var Data = data.insuranceDetailsVOs;
		
       $(".all_order").html(orderCount0);
       $(".wait_pay").html(orderCount1);
       $(".already_pay").html(orderCount2);
       $(".Stop_keep").html(orderCount3);
       $(".On").html(orderCount4);

       $('#Order_information').html("");
	   var That_Page = fewPage;
	   showTab(flag,Data,That_Page);
   });
}

//根据时间查询
function searchByTime(){
	var startTime = $('#Date_td').val();
	var endTime = $('#Date').val();
	init(startTime,endTime);
}

//继续支付
function continuePay(orderno,userinforid){//继续支付
	$("#prompt").html("正在支付，请稍等...");
	load(60000);
	$.ajax({
	   type : "POST",
	   url : urlpath+"/myAccount/continuePay.do?orderno="+orderno,
       async: false ,
	   success : function(result){
		   $("#pop").hide();
		   if(result==null||result==""){
			   $('#Message').html("支付异常！");
			   $('.errorhei').show();
		   }else{
			   window.location.href=result;
		   }
	   },
	   error: function(res){
		   $("#pop").hide();
		   $("#Message").html("支付异常");
		   $('.errorhei').show();
	   }  
	});
}

//取消订单
function cancelOrder(orderno,userid){//取消订单
   var content = $('#search_content').val();
   var flag=$('.Order_list>.act').index();
   var A=$('.Order_list li');
   if(window.confirm('你确定要取消订单?')){
	    $("#prompt").html("正在撤销，请稍等...");
		load(60000);
		$.ajax({
		   type : "POST",
		   url : urlpath+"/myAccount/cancelOrder.do?orderno="+orderno,
		   success : function(result){
			    $("#pop").hide();
			    debugger;
				if(result=="success"){
					$('#Message').html("取消成功！");
					$('.errorhei').show();
					$('.errortan3').click(function(){
						$('.errorhei').hide();
						init(content);
						if(flag==0){
							A.eq(0).click();
						}else if(flag==1){
							A.eq(1).click();
						}else if(flag==2){
							A.eq(2).click();
						}else if(flag==3){
							A.eq(3).click();
						}else if(flag==4){
							A.eq(4).click();
						}
					});
				}else{
					$('#Message').html("取消失败！");
					$('.errorhei').show();
				}
		   },
		   error: function(res){
		    	$("#pop").hide();
		     	$("#Message").html("取消失败");
		     	$('.errorhei').show();
		    }  		   
		});
        return true;
    }
}
   
//展示订单详情
function showOrderDetail(orderno,userinforid){
	$.ajax({
	   type : "POST",
	   url : urlpath+"/myAccount/orderDetails.do?orderno="+orderno,
       async:true,
	   success : function(data){
		   if(data != null){
			   var orderDetail_base = $('#orderDetail_base');
			   var orderDetail_time = $('#orderDetail_time');
			   var orderDetail_info = $('#orderDetail_info');
			   //险种基本信息
			   var tr_base_1 = $('<tr/>').append('<td>被保人</td>');
			   if(data.insuranceperinfor.insurename!=null && data.insuranceperinfor.insurename!=''){
				   tr_base_1.append('<td>'+data.insuranceperinfor.insurename+'</td>');
			   }else{
				   tr_base_1.append('<td>暂无数据</td>');
			   }
			   orderDetail_base.append(tr_base_1);
			   var tr_base_2 = $('<tr/>').append('<td>车牌号</td>');
			   if(data.vhlinfor.lcnno!=null && data.vhlinfor.lcnno!=''){
				   tr_base_2.append('<td>'+data.vhlinfor.lcnno+'</td>');
			   }else{
				   tr_base_2.append('<td>暂无数据</td>');
			   }
			   orderDetail_base.append(tr_base_2);
			   var tr_base_3 = $('<tr/>').append('<td>车辆所属人</td>');
			   if(data.vhlinfor.drvowner!=null && data.vhlinfor.drvowner!=''){
				   tr_base_3.append('<td>'+data.vhlinfor.drvowner+'</td>');
			   }else{
				   tr_base_3.append('<td>暂无数据</td>');
			   }
			   orderDetail_base.append(tr_base_3);
			   var tr_base_4 = $('<tr/>').append('<td>发动机号</td>');
			   if(data.vhlinfor.engno!=null && data.vhlinfor.engno!=''){
				   tr_base_4.append('<td>'+data.vhlinfor.engno+'</td>');
			   }else{
				   tr_base_4.append('<td>暂无数据</td>');
			   }
			   orderDetail_base.append(tr_base_4);
			   var tr_base_5 = $('<tr/>').append('<td>车架号</td>');
			   if(data.vhlinfor.vinno!=null && data.vhlinfor.vinno!=''){
				   tr_base_5.append('<td>'+data.vhlinfor.vinno+'</td>');
			   }else{
				   tr_base_5.append('<td>暂无数据</td>');
			   }
			   orderDetail_base.append(tr_base_5);
			   var tr_base_6 = $('<tr/>').append('<td>核定载客数</td>');
			   if(data.vhlinfor.vinno!=null && data.vhlinfor.vinno!=''){
				   tr_base_6.append('<td>'+data.vhlinfor.vinno+'</td>');
			   }else{
				   tr_base_6.append('<td>暂无数据</td>');
			   }
			   orderDetail_base.append(tr_base_6);
			   var tr_base_7 = $('<tr/>').append('<td>初登日期</td>');
			   if(data.vhlinfor.registerdate!=null && data.vhlinfor.registerdate!=''){
				   tr_base_7.append('<td>'+data.vhlinfor.registerdate+'</td>');
			   }else{
				   tr_base_7.append('<td>暂无数据</td>');
			   }
			   orderDetail_base.append(tr_base_7);
			   var tr_base_8 = $('<tr/>').append('<td>新车购置价</td>');
			   if(data.vhlinfor.vhlval!=null && data.vhlinfor.vhlval!=''){
				   tr_base_8.append('<td>'+data.vhlinfor.vhlval+'元</td>');
			   }else{
				   tr_base_8.append('<td>暂无数据</td>');
			   }
			   orderDetail_base.append(tr_base_8);
			   var tr_base_9 = $('<tr/>').append('<td>总保费</td>');
			   if(data.baseinfor.totalPremium!=null && data.baseinfor.totalPremium!=''){
				   tr_base_9.append('<td>'+data.baseinfor.totalPremium+'</td>');
			   }else{
				   tr_base_9.append('<td>暂无数据</td>');
			   }
			   orderDetail_base.append(tr_base_9);
			   //险种期限
			   var tr_time_1 = $('<tr/>').append('<td>商业险</td>');
			   if(data.baseinfor.sypolicystartdate!=null && data.baseinfor.sypolicystartdate!=''){
				   tr_time_1.append('<td>'+data.baseinfor.sypolicystartdate+'（0时）起 至'+data.baseinfor.sypolicyenddate+'（24时）止</td>');
			   }else{
				   tr_time_1.append('<td>暂无数据</td>');
			   }
			   orderDetail_time.append(tr_time_1);
			   var tr_time_2 = $('<tr/>').append('<td>交强险</td>');
			   if(data.baseinfor.jqpolicystartdate!=null && data.baseinfor.jqpolicystartdate!=''){
				   tr_time_2.append('<td>'+data.baseinfor.jqpolicystartdate+'（0时）起 至'+data.baseinfor.jqpolicyenddate+'（24时）止</td>');
			   }else{
				   tr_time_2.append('<td>暂无数据</td>');
			   }
			   orderDetail_time.append(tr_time_2);
			   //险种信息
			   var tr_info_1 = $('<tr/>').append('<th>承保险别</th><th>保额（元）</th><th>保费（元）</th><th>不计免赔保费（元）</th>');
			   orderDetail_info.append(tr_info_1);
			   var covelist = data.coverageinfors;
			   for(var i=0;i<covelist.length;i++){
				   var tr = $('<tr/>');
				   var td_1 = $('<td/>');
				   if(covelist[i].insrnccode=='030101'){
					   td_1.append('车辆损失险');
				   }else if(covelist[i].insrnccode=='030102'){
					   td_1.append('第三者责任险');
				   }else if(covelist[i].insrnccode=='030103'){
					   td_1.append('全车盗强险');
				   }else if(covelist[i].insrnccode=='030104'){
					   td_1.append('司机座位责任险');
				   }else if(covelist[i].insrnccode=='030105'){
					   td_1.append('乘客座位责任险');
				   }else if(covelist[i].insrnccode=='030107'){
					   td_1.append('玻璃破碎险');
				   }else if(covelist[i].insrnccode=='030108'){
					   td_1.append('自燃险');
				   }else if(covelist[i].insrnccode=='030115'){
					   td_1.append('机动车损失无法找到第三方损失险');
				   }else if(covelist[i].insrnccode=='030116'){
					   td_1.append('制定专车修理厂');
				   }else if(covelist[i].insrnccode=='030119'){
					   td_1.append('不计免赔总保费');
				   }else if(covelist[i].insrnccode=='0357'){
					   td_1.append('交强险');
				   }
				   tr.append(td_1);
				   var td_2 = $('<td/>');
				   if(covelist[i].suminsured==null || covelist[i].suminsured=='' || covelist[i].suminsured=='0' || covelist[i].suminsured=='0.00'){
					   td_2.append('--');
				   }else if(covelist[i].suminsured!=null && covelist[i].suminsured!='' && covelist[i].suminsured!='0' && covelist[i].suminsured!='0.00'){
					   td_2.append(covelist[i].suminsured);
				   }
				   tr.append(td_2);
				   var td_3 = $('<td/>');
				   if(covelist[i].premium==null || covelist[i].premium==''|| covelist[i].premium=='0' || covelist[i].premium=='0.00'){
					   td_3.append('--');
				   }else if(covelist[i].premium!=null && covelist[i].premium!=''&& covelist[i].premium!='0' && covelist[i].premium!='0.00'){
					   td_3.append(covelist[i].premium);
				   }
				   tr.append(td_3);
				   var td_4 = $('<td/>');
				   if(covelist[i].nyl12==null || covelist[i].nyl12==''|| covelist[i].nyl12=='0' || covelist[i].nyl12=='0.00'){
					   td_4.append('--');
				   }else if(covelist[i].nyl12!=null && covelist[i].nyl12!=''&& covelist[i].nyl12!='0' && covelist[i].nyl12!='0.00'){
					   td_4.append(covelist[i].nyl12);
				   }
				   tr.append(td_4);
				   orderDetail_info.append(tr);
			   }
			   if(data.baseinfor.taxpremiu!=null && data.baseinfor.taxpremium!=''&& data.baseinfor.taxpremium!='0'&& data.baseinfor.taxpremium!='0.00'){
				   var tr_info_3 = $('<tr/>').append('<td>车船税</td>').append('<td>--</td>').append('<td>'+data.baseinfor.taxpremium+'</td>').append('<td>--</td>');
				   orderDetail_info.append(tr_info_3);
			   }
		   }
	   },
	   error: function(res){
		   $("#pop").hide();
		   $("#Message").html("投保失败");
		   $('.errorhei').show();
	    }  
	});
	$('.shade_box').show();
}

//继续投保
function continueInsure(orderno,userinforid){
   $.ajax({
	   type : "POST",
	   url : urlpath+"/myAccount/continueInsure.do?orderno="+orderno,
       async: false ,
	   success : function(path){
		   if(path != ""){
			   window.location.href=getUrl()+path;
		   }else{
			   return false;
		   }
	   },
	   error: function(res){
	    	 $("#pop").hide();
	     	 $("#Message").html("投保失败");
	     	 $('.errorhei').show();
	     		     
	    }  
   });
}

//菜单栏和(header.jsp)浮动
$(window).scroll(function(){
	var top=$(document).scrollTop();
	if($(document).scrollTop()>30 && $(document).scrollTop()<755){
		$('.list_table').css('top',45+top);
	}
	/*if($('html').scrollTop()>120||$(document).scrollTop()>120){
		$('#head_top').addClass('fead').css('background','linear-gradient(90deg, #dcdcdc 10%, #e3e3e3 20%, #dcdcdc 80%)')
	}else{
		$('#head_top').removeClass('fead').css('background','linear-gradient(90deg, #dcdcdc 10%, #e3e3e3 20%, #dcdcdc 80%)')
	}*/
});

//日期插件
$(function () {
    $("#Date").calendar({
        controlId: "divDate",
        speed: 200,
        complement: true,
        readonly: true,
        upperLimit: new Date(),
        lowerLimit: new Date("2016/2/13")
    });
    $("#Date_td").calendar({
        controlId: "Datediv",
        speed: 200,
        complement: true,
        readonly: true,
        upperLimit: new Date(),
        lowerLimit: new Date("2016/2/13")
    });
});

//定时关闭弹出框
function load(outtimes){
	$("#pop").show();
	setTimeout(function(){$('#pop').hide();
	},outtimes);
}

$('.table_title li').click(function(){
    $(this).addClass('act').siblings().removeClass('act');
});
