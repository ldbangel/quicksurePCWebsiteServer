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
    <title>我的订单</title>
    <link rel="stylesheet" href="<%=path %>/views/css/headfoot.css">
    <link rel="stylesheet" href="<%=path %>/views/css/myAccounnt.css">
    <link rel="stylesheet" href="<%=path %>/views/css/common.css">
    <link rel="stylesheet" href="<%=path %>/views/css/lyz.calendar.css">
</head>
<body>
<div id="head_top" class="head_top"></div>
<div class="background_img" style='background:-webkit-radial-gradient(#fdfdfd 60%,#f1f1f1);background:radial-gradient(#fdfdfd 60%,#f1f1f1);'>
<div class="myAccount_content">
	<input type="hidden" id="tabFlag" value=""/>
	<input type="hidden" id="search_content" value=""/>
    <div class="list_table lf">
        <div class="head_Owner"><img src="<%=path %>/views/image/TX4.png" alt=""><span class="phone">${loginUser.username}</span></div>
        <ul>
            <li><i class="ico_manage"></i>用户管理</li>
            <li><i class="ico_order"></i>我的订单</li>
            <li><i class="ico_insurance"></i>我的保单</li> 
            <li><i class="ico_car"></i>我的爱车</li>
            <li><i class="ico_getAddress"></i>配送地址</li>
            <li><i class="ico_integral"></i>我的积分</li>
        </ul>
    </div>
    <div class="content_right rg">
        <div class="head_title">
        	<i></i><span>我的订单</span>
        </div>
        <div class="search_box">
        	<span>选择日期</span>
        	<input type="text" id="Date_td"><label id="info_box"></label>&nbsp;&nbsp;至&nbsp;&nbsp;
        	<input type="text" id="Date"><label id="Date_box"></label>
        	<button class="search_btn" onclick="searchByTime()">查询</button>
        </div>
        <div class="table_title">
            <ul class="Order_list">
                <li class="act">全部订单(<span class="all_order"></span>)</li>
                <li>待支付(<span class="wait_pay"></span>)</li>
                <li>已支付(<span class="already_pay"></span>)</li>
                <li>暂存(<span class="Stop_keep"></span>)</li>
                <li>已撤销(<span class="On"></span>)</li>
            </ul>
            <div class="tab_ft"><span class="ft_first">投保信息</span><span>订单总价</span><span>订单状态</span><span>订单操作</span></div>
        </div>
        <div class="box_product" id="Order_information">
        	
        </div>
        <ul id="pager"style='display:block;'>

    	</ul>
    </div>
</div>
<div class='clear' style='clear:both'></div>
</div>
<!-- 加载框 -->
<div id="pop" style="position:fixed;top:0px;left:0px;width:100%;height:100%;z-index: 100;display:none;">
	<div style="position: fixed;top:35%; width:100%;height:auto;text-align:center;">
	     <span style='display:inline-block;height: auto;border-radius: 5px;background: rgba(0,0,0,0.6);color: #fff;font-size: 10px;letter-spacing: 2px; padding: 20px;'>
	        <img  src="<%=path%>/views/image/mu_loading.gif" style='width: 36px; margin-bottom: 5px;'>
	        <p id="prompt"></p>
		</span>
	</div>
</div>
<div class="errorhei" style="display:none">
	<div class="errortan">
		<p class="errortan1">信息提示<a class="errortan3" href="javascript:void(0);"><img src="<%=path%>/views/image/Clear.png"/></a></p>
		<p class="errortan2"><div id="Message" style="font-size: 17px; padding-bottom: 20px;margin-top: 20px; color:#333"></div></p>
	</div>
</div>
<!-- 订单详情展示 -->
<div class="shade_box">
    <div class="detail_box" id="detail_box">
        <div class="detail_title">爱车购保信息 <span>X</span></div>
	      <div id="detail_content"style="height: 435px;width: 100%;">
	      <div style="height: 1000px;width:100%;margin: 0px auto;top: 0px;position: absolute;">
	      <div class="content">
	      	<div id="basic_mation">
		        <div class="top_title"><i class='i1'><img style="width: 18px;" src="<%=path%>/views/image/jbxx.png"></i>基本信息</div>
				<div><table id="orderDetail_base"></table></div>
            </div>
	        <div id="Insurance_date">
		        <div class="top_title"><i class='i2'><img style="width: 22px;" src="<%=path%>/views/image/bxqx.png"></i>保险期限</div>
		        <div><table id="orderDetail_time"></table></div>
		    </div> 
		    <div id="Insurance_list">
		        <div class="top_title"><i class='i3'><img style="width: 20px;" src="<%=path%>/views/image/xzxx.png"></i>险种信息</div>
		        <table id="orderDetail_info"></table>
		    </div> 
          </div>
       </div>                 
     </div>
   </div>
 </div>
<div id="footer" class="footer"></div>
</body>
<script src="<%=path %>/views/js/jquery.1.7.2.min.js"></script>
<script type="text/javascript">
	$('#head_top').load('<%=path %>/views/jsp/header.jsp');
    $('#footer').load('<%=path %>/views/jsp/footer.jsp');
	var urlpath = "<%=path%>";
</script>
<script src="<%=path %>/views/js/plugin/lyz.calendar.min.js"></script>
<script src="<%=path %>/views/js/myAccount.js"></script>
<script  src="<%=path %>/views/js/plugin/zUI.js "></script>
<script>
   $(function(){
        $("#detail_content").panel({iWheelStep:32});
    });
    $(document).ready(function(){
        var Height=$("html").outerHeight(),Width=$(window).width();
        $('.shade_box').css("height",Height).css('width',Width);
        if(Width>750){
            var left=(Width-750)/2; $(".detail_box").css('left',left)
        }
        if(Height>480){
            var top=(Height-480)/6;$(".detail_box").css('top',top)
        }

    $(window).resize(function(){
        var Height=$('html').outerHeight(),Width=$(window).width();
        $('.shade_box').css("height",Height).css('width',Width);
       if(Width>750){
            var left=(Width-750)/2; $(".detail_box").css('left',left)
        }
        if(Height>480){
            var top=(Height-480)/6;$(".detail_box").css('top',top)
        }
    })
    });
    $(".detail_title span").click(function(){
        $('.shade_box').hide();
        $('.content table').html("");
    })
</script>
</html>