<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>My JSP 'yhl_footer.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
  </head>
  
<body>
    <div class='f_content'>
	    <div class="YHL_left">
	        <ul>
	            <li><a href="<%=path%>/views/jsp/infor_publish.jsp?#0">关于我们</a>|</li>
	            <li><a href="<%=path%>/views/jsp/infor_publish.jsp?#2">用户反馈</a>|</li>
	            <li><a>保单验证</a>|</li>
	            <li><a href="<%=path%>/views/jsp/infor_publish.jsp?#3">交强险示范条款</a>|</li>
	            <li><a href="<%=path%>/views/jsp/infor_publish.jsp?#4">商业险示范条款</a>|</li>
	            <li><a href="<%=path%>/views/jsp/infor_publish.jsp?#5">信息披露</a>|</li>
	            <li><a>商务合作</a></li>
	            <div class="clear"></div>
	        </ul>
	        <p>服务热线: 0755-33209677 | 服务时间: 09:00-18:00 邮箱: cli@quicksure.com</p>
	        <p>地址: 深圳市南山区科研路9号比克科技大厦2201F</p>
	        <p>2017慧英保险 | 玉芦笛（深圳）咨询有限公司 | 黔 | CP备16001281号</p>
	       <%--  <p>销售产品由重要合作伙伴提供: <span>华邦保险</span> <img src="<%=path%>/views/image/hbbx.png" alt=""></p> --%>
	    </div>
	    <div class="YHL_right"><img src="<%=path%>/views/image/qr-code.png" alt=""><p>扫描关注公众号</p></div>
	    <div class="clear"></div>
	</div>
</body>
  
<script type="text/javascript">
	function getUrl() {
		return "<%=path%>";
  	}
</script>
</html>
