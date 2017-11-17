<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String action = request.getParameter("action"); //定义一个action监视登录前的动作，登录之后返回到之前的动作去
/* String phoneNo = request.getParameter("phoneNo")==null?"":request.getParameter("phoneNo"); */
String deptAddress=request.getParameter("deptAddress")==null?"":request.getParameter("deptAddress"); //这个是首页填完信息再去登录的时候带过来的
String address = request.getParameter("address")==null?"":request.getParameter("address"); //这个地址是首页定位之后带过来的
if(address!=null){
	address=new String(address.getBytes("iso8859-1"),"utf-8");
}
deptAddress = deptAddress=="" || deptAddress==null?address:deptAddress; //上面两个地址哪个不为空就用哪个，都为空的话就为空
String lcnNo=request.getParameter("lcnno");
String chepai = request.getParameter("chepai");
if(chepai!=null){
	chepai=new String(chepai.getBytes("iso8859-1"),"utf-8");
}
lcnNo = lcnNo==""||lcnNo==null?chepai:lcnNo;
String dptcode = request.getParameter("deptno");

%>
<html lang="zh-cn">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>慧英登录</title>
    <link rel="stylesheet" href="<%=path %>/views/css/headfoot.css">
    <link rel="stylesheet" href="<%=path %>/views/css/style.css">
    <link rel="stylesheet" href="<%=path %>/views/css/login.css">
    
    <script type="text/javascript">
    var action = "<%=action%>";
	<%-- var phoneNo = "<%=phoneNo %>"; --%>
    var address = "<%=address %>";
    var deptAddress = "<%=deptAddress %>";
 <%--    var userName="<%=userName%>"; --%>
    var chepai = "<%=chepai %>";
    var lcnNo = "<%=lcnNo %>";
    var dptcode= "<%=dptcode %>";
    if(dptcode=="null"){
		dptcode="";
	}
    if(action=="null"){
		action="";
	}
	if(lcnNo=="null"){
		lcnNo="";
	}
	if(deptAddress=="null"){
		deptAddress="";
	}
	if(chepai=="null"){
		chepai="";
	}
	if(address=="null"){
		address="";
	}
	
</script>
  </head>
  <body>
    <!--头部跟随开始-->
    <div id="head_top" class="head_top"></div>
    <div class="login">
      <div class="header">
        <div class="switch" id="switch">
         	<a class="switch_btn" id="switch_qlogin" href="javascript:void(0);" tabindex="7">手机动态登录</a>
			<a class="switch_btn_focus" id="switch_login" href="javascript:void(0);" tabindex="8">账号密码登录</a>
        </div>
      </div>    
      <div class="web_qr_login" id="web_qr_login" style="display: none;">    
        <div class="web_login" id="web_login">
          <div class="login-box">
			      <div class="login_form">
				      <form action="" name="loginform" accept-charset="utf-8" id="login_form" class="loginForm" method="post" onsubmit="return Check()">
                <input type="hidden" name="did" value="0">
                <input type="hidden" name="to" value="log">

                <div class="uinArea" id="uinArea">
                  <label class="input-tips" for="u"></label>
                  <div class="inputOuter" id="uArea">
                    <input style="border-width: 0; border-bottom: 1px solid #ddd; text-indent: 28px; font-size: 15px; color: rgb(51,51,51);" type="text" id="phoneno" name="username" class="inputstyle" maxlength="11" placeholder="请输入手机号" onKeyUp="if(value!=value.replace(/[^\d]/g,''))value=value.replace(/[^\d]/g,'')">
                  </div>
                </div>
                <div class="pwdArea" id="pwdArea">
                  <label class="input-tips input-tips-2" for="p"></label> 
                  <div class="inputOuter" id="pArea">
                    <input style="border-width: 0; border-bottom: 1px solid #ddd; text-indent: 28px; font-size: 15px; color: rgb(51,51,51);" type="password" id="phoneCheckCode" name="p" class="inputstyle" placeholder="请输入验证码">
                    <label class="code"><span href="" style="position:absolute;right:0px;width: 82px;text-align: center;color: #fff;background: #f63c30;border-radius: 3px;line-height: 30px;cursor: pointer;top: 11px;" onclick="getCheckCode();">获取验证码</span></label>
                  </div>
                </div>

                <!-- <div class="remember"><label><input type="radio" name="">&nbsp;&nbsp;&nbsp;记住手机号</label></div> -->

                <div style="padding-left: 0;margin-top: 20px;">
                  <input type="button" value="立即登录" style="width: 300px; height: 48px; font-size: 18px;" class="button_blue" onclick="userLogin(1);">
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="qlogin" id="qlogin">
        <div class="web_login">
          <form name="form2" id="regUser" accept-charset="utf-8"  action="" method="post" onsubmit="return Check()">
  	        <input type="hidden" name="to" value="reg">
  		      <input type="hidden" name="did" value="0">
            <ul class="reg_form" id="reg-ul">
              <li>
                <label for="user"  class="input-tips2"></label>
                <div class="inputOuter2">
                  <input style="border-width: 0; border-bottom: 1px solid #ddd; text-indent: 28px; font-size: 15px; color: rgb(51,51,51);" type="text" id="phonenum" name="user" maxlength="11" class="inputstyle2" placeholder="请输入用户名" onKeyUp="if(value!=value.replace(/[^\d]/g,''))value=value.replace(/[^\d]/g,'')">
                </div>
              </li>
              <li>
                <label for="passwd" class="input-tips2 input-tips2-2"></label>
                <div class="inputOuter2">
                  <input  style="border-width: 0; border-bottom: 1px solid #ddd; text-indent: 28px; font-size: 15px; color: rgb(51,51,51);" type="password" id="psw"  name="passwd" maxlength="16" class="inputstyle2" placeholder="请输入密码">
                </div>
              </li>
              <li>
                <div class="inputArea" style="margin-top: 20px;" >
                  <input style="border-width: 0; border-bottom: 1px solid #ddd; width: 300px; height: 48px; font-size: 18px;" type="button" id="reg" class="button_blue" value="立即登录" onclick="userLogin(2);">
                </div>
              </li>
              <div class="cl"></div>
            </ul>
          </form>
        </div>
      </div>

      <div class="cl retrieve-reg"><a href="<%=path%>/views/jsp/resetPassword.jsp">找回密码</a><span>|</span><a href="<%=path%>/views/jsp/registUser.jsp"><span>注册</span></a></div>
    </div>
    
	<!-- <div class="errorhei" id='errorhei' >
		<div style="position: fixed;top: 35%; width:100%;height:auto;text-align:center;">
			<div style="width:85%;margin:0 auto;max-width:300px;background:#fff;color: #333; border-radius:5px;padding: 20px 0px 3px 0px;box-shadow: 0 0 20px 2px #333;">
				<h2 style='font-size: 17px;color: #222;'>提示信息</h2>
				<p style='margin-bottom: 10px;font-size: 12px;padding: 15px 20px;text-align: center; color:#444;'id="Message"></p>
				<div style='border-top:1px solid #ddd;font-size:17px;color:#333;padding: 8px 0px;'><span style='display:block;width:100%;font-size:15px' id="ensure">确定</span></div>
			</div>
	  	</div>
	</div> -->
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
	<div id="footer" class="footer"></div>
</body>
<script src="<%=path %>/views/js/jquery-1.9.0.min.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
	     $('#head_top').load('<%=path%>/views/jsp/header.jsp');
         $('#footer').load('<%=path%>/views/jsp/footer.jsp');
	});
</script>
<script src="<%=path %>/views/js/login.js"></script>
<script type="text/javascript">
	function getUrl() {
		return "<%=path%>";
  	}
  	$('#ensure').click(function(){
    	$('.errorhei').hide();
    }) ;
</script>
</html>