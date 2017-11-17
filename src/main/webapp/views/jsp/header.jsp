<%@page import="com.quicksure.insurance.entity.Userinfor"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
 
 Userinfor userinfo= null;
if(session.getAttribute("loginUser")!=null){
  userinfo=(Userinfor)session.getAttribute("loginUser");
}
String userName=userinfo!=null?userinfo.getUsername():"登录";
int userType = userinfo!=null?userinfo.getUsertype():0;
request.setAttribute("userType",userType); 
session.setAttribute("Userinfor",userinfo);
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <base href="<%=basePath%>">
    <title>My JSP 'header.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
</head>

<script type="text/javascript">
	function getUrl() {
		return "<%=path%>";
  	}
    var provincedata;
    var userName="<%=userName%>";
    var firstscreenFlag=true;
    if(userName=="null"){
    	userName="";
    }
</script>
  
<body>
<div class="head_content">
    <img src="<%=path%>/views/image/logo.png" alt="">
    <ul class="menu">
        <li><a href="<%=path%>/views/jsp/quickSurehome.jsp">首页</a></li>
        <li><a href="<%=path%>/views/jsp/infor_publish.jsp?#1">服务与理赔</a></li>
        <li><a href="<%=path%>/views/jsp/infor_publish.jsp?#0">关于我们</a></li>
        <li><a href="<%=path%>/views/jsp/myAccount.jsp">我的订单</a></li>
        <li>
            <a class="removea td_left" href="<%=path%>/views/jsp/loginUser.jsp" ><%=userName%></a><i></i>
            <span class="select_a">
                <a class="regist" href="<%=path%>/views/jsp/registUser.jsp">注册</a>
                <a class="out_user hidden" href="javascript:login();">退出</a>
            </span>
        </li> 
    </ul>
</div>
</body>  

<script src="<%=path%>/views/js/header.js"></script>
</html>
