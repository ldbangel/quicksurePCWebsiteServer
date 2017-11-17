<%@page import="com.quicksure.insurance.entity.Userinfor"%>
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
    <title>密码重置</title>
    <link rel="stylesheet" href="<%=path %>/views/css/headfoot.css">
    <link rel="stylesheet" href="<%=path%>/views/css/resetPassword.css">
    <link rel="stylesheet" href="<%=path%>/views/css/style.css">
</head>
<body>
<div id="head_top" class="head_top">
        <!-- <div style="width:1170px;margin:0 auto;">
        <iframe src="header.html"  height="50px" marginheight=0 marginwidth=0 scrolling=no style="border:none;width: 1170px"></iframe>
        </div> -->
</div>
<div class="max_div">
    <div class="content">
        <form action="">
            <div><i  class="iphone_ico"></i><input type="text" id="phoneno" placeholder="请输入手机号码"  maxlength="11"></div>
            <div><i  class="psw_ico"></i><input type="password" id="psw" maxlength="16" placeholder="密码长度大于6位的字符+数字组合"></div>
            <div><i class="psw_ico"></i><input type="password" id="confirmPsw" placeholder="请重复录入一遍密码"></div>
            <div id="CheckCode" style="margin-top: 15px;"><input type="text" id="phoneCheckCode" placeholder="请输入验证码"  maxlength="6" style="widht:180px"> <span class="Get_Vfcode" style='position: absolute;right: 28px;width: 82px;text-align: center;color: #fff;background: #f63c30;border-radius: 3px;line-height: 30px;cursor: pointer;'onclick="getCheckCode();">获取验证码</span></div>
            <div class="btn"><input type="button" value="密码重置" onclick="resetPassword(); "></div>
            <div class="login"><a href="<%=path%>/views/jsp/loginUser.jsp" class="rg" style="text-decoration:none;">登录</a></div>
        </form>
    </div>
</div>

	<!-- 错误信息提示框 -->
	<div id="errorhei" class="errorhei" style="z-index: 100; display:none;position: fixed; width: 100%;height: 100%; background: rgba(0,0,0,0.5);top: 0;">
    <div style="   position: fixed;top: 35%; width:100%;height:auto;text-align:center;">
        <div style="width:85%;margin:0 auto;max-width:300px;background:#fff;color: #333; border-radius:5px;padding: 20px 0px 3px 0px;box-shadow: 0 0 20px 2px #333;">
            <h2 style="font-size: 17px;color: #222;color: #aeaeae;padding-bottom:5px;">提示信息</h2>
            <p style="margin-bottom: 10px;font-size: 12px;padding: 15px 20px;text-align: center; color:#444;" id="Message"></p >
            <div style="border-top:1px solid #ddd;font-size:17px;color:#333;padding: 8px 0px;"><span style="display:block;width:100%;font-size:15px" id="ensure">确定</span></div>
        </div>
    </div>
    </div>
<div style="position:fixed;top:0px;left:0px;width:100%;height:100%;z-index: 100;display:none;"id="pop">
	<div style="position: fixed;top:35%; width:100%;height:auto;text-align:center;">
	     <span style='display:inline-block;height: auto;border-radius: 5px;background: rgba(0,0,0,0.6);color: #fff;font-size: 10px;letter-spacing: 2px; padding: 20px;'>
	        <img  src="<%=path%>/views/image/mu_loading.gif" style='width: 36px; margin-bottom: 5px;'>
	        <p id="prompt"></p>
		</span>
	</div>
</div>

<div id="footer" class="footer">
   
</div>
</body>
<script src="<%=path%>/views/js/jquery.1.7.2.min.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
	     $('#head_top').load('<%=path%>/views/jsp/header.jsp');
         $('#footer').load('<%=path%>/views/jsp/footer.jsp');
	});
</script>
<script src="<%=path%>/views/js/common.js"></script>
<script src="<%=path%>/views/js/resetPassword.js"></script>
<script src="<%=path%>/views/js/quickSurehome.js"></script>
<script type="text/javascript">
	$('#ensure').click(function(){
    $('.errorhei').hide();
    }) ;
</script>
</html>