
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>支付页面</title>
    <link rel="stylesheet" href="<%=path %>/views/css/headfoot.css">
    <link rel="stylesheet" href="<%=path%>/views/css/style.css">
</head>
<body>
<div id="head_top" class="head_top"></div>
  <div class="background_img" style='background:-webkit-radial-gradient(#fdfdfd 60%,#f1f1f1);background:radial-gradient(#fdfdfd 60%,#f1f1f1);'>
<div class="payInfors_content" id="payInfors_content">
 <form class="content_box lf" action="<%=path%>/paymentInfor/paymentApplication.do" method="post" name="form"  id="form" enctype="application/x-www-form-urlencoded">
     <ul class="Navigation page_4">
         <li><span>1</span>基本信息</li>
         <li><span>2</span>报价信息</li>
         <li><span>3</span>确认信息</li>
         <li><span>4</span>支付</li>
     </ul>
     <div class="top_out"><i></i>
         <p>
         <strong>您的订单已成功提交</strong>
         <span>为保证您的保单能按时起效,请尽快完成支付。</span></p>
     </div>
     <div class="head_title ">
         <i></i><span>投保车辆</span><span class="rg"style="font-size:14px;">订单号: <input type="text" style="width: 161px;" id="orderNo" name="orderNo" value="${insuranceDetailsVO.baseinfor.orderno}" readonly="readonly" ></span>
     </div>
     <div class="order_infor">
         <table class="table_1">
             <tr class="tb_title"><td>险种</td><td></td><td>生效日期</td><td></td><td>金额( &yen; )</td></tr>
         </table>
         <table class="table_2">
             <c:if test="${!empty insuranceDetailsVO.baseinfor.jqpremium}"><tr class="tr_list"><td>交强险</td><td></td><td><span>${insuranceDetailsVO.baseinfor.jqpolicystartdate}</span>起</td><td></td><td>${insuranceDetailsVO.baseinfor.jqpremium}</td></tr></c:if>
             <c:if test="${!empty insuranceDetailsVO.baseinfor.sypremium}"><tr class="tr_list"><td>商业险</td><td></td><td><span>${insuranceDetailsVO.baseinfor.sypolicystartdate}</span>起</td><td></td><td>${insuranceDetailsVO.baseinfor.sypremium}</td></tr></c:if>
             <c:if test="${!empty insuranceDetailsVO.baseinfor.taxpremium}"><tr class="tr_list"><td>车船税</td><td></td><td></td><td></td><td>${insuranceDetailsVO.baseinfor.taxpremium}</td></tr></c:if>
         </table>
     </div>
     <p class="total_cost">应付总额:<span>${insuranceDetailsVO.baseinfor.totalPremium}</span>元</p>
     <!-- <div class="pay_submit"><a href="javascript:submitFrom()">立即支付</a></div> -->
     <div class="pay_submit"><a href="<%=path%>">确认保费</a></div>
 </form>
    <div class="Sidebar_info rg"><img src="<%=path%>/views/image/side.png" alt="" /></div>
    <div class="clear"></div>
</div>
</div>
<div id="footer" class="footer"></div>
<!-- 加载框 -->
<div style="position:fixed;top:0px;left:0px;width:100%;height:100%;z-index: 100;display:none;"id="pop">
<div style="position: fixed;top:35%; width:100%;height:auto;text-align:center;">
     <span style='display:inline-block;height: auto;border-radius: 5px;background: rgba(0,0,0,0.6);color: #fff;font-size: 10px;letter-spacing: 2px; padding: 20px;'>
        <img  src="<%=path%>/views/image/mu_loading.gif" style='width: 36px; margin-bottom: 5px;'>
        <p id="prompt"></p>
	</span>
	 
</div>
</div>

</body>
<script src="<%=path%>/views/js/jquery.1.7.2.min.js"></script>
<script src="<%=path%>/views/js/paymentInfor.js"></script>
   <script type="text/javascript">
	function getUrl() {
		return "<%=path%>";
  	}
</script>
<script type="text/javascript">
	$(document).ready(function(){
	     $('#head_top').load('<%=path%>/views/jsp/header.jsp');
         $('#footer').load('<%=path%>/views/jsp/footer.jsp');
	});
	
	$('html').ready(function(){
	$("#pop").hide();
});
var errorMessage = "${errorMessage}";
var errorCode = "${errorCode}";	
  var ii;
	function submitFrom() {	
		  $("#prompt").html("正在支付,请稍后...");
  		  load(20000);
		  $("#form").submit();
	
	}
//延迟时间
function load(outtimes){
	$("#pop").show();
	setTimeout(function(){$('#pop').hide()
	},outtimes);
}

 var error = "C99999999";
var error2 = "E00000030";
/* //判断，如果错误了，显示错误消息，反之
if (error == errorCode || error2 == errorCode) {
    $("#Message").html(errorMessage);
    $('.error_Box').show();
} else {
    layer.close(ii);
    $('.error_Box').hide();
}	 */

$(window).scroll(function(){
	var top=$(document).scrollTop();
	if($(document).scrollTop()>30 && $(document).scrollTop()<500){
		$('.Sidebar_info').css('top',45+top);
	}
	
});
</script>
</html>