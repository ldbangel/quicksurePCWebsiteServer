<%@ page language="java" import="java.util.*,com.quicksure.insurance.entity.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
Userinfor userinfor = (Userinfor)session.getAttribute("loginUser");
String phoneNo = userinfor.getUsername()!=null?userinfor.getUsername():"";
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>投保信息</title>
</head>
<link rel="stylesheet" href="<%=path %>/views/css/headfoot.css">
<link rel="stylesheet" href="<%=path%>/views/css/style.css">
<link rel="stylesheet" href="<%=path%>/views/css/common.css">
<link rel="stylesheet" href="<%=path%>/views/css/popup.css">
<link rel="stylesheet" href="<%=path%>/views/css/lyz.calendar.css">

<body>
  <div id="head_top" class="head_top"></div>
  <div class="background_img" style='background:-webkit-radial-gradient(#fdfdfd 60%,#f1f1f1);background:radial-gradient(#fdfdfd 60%,#f1f1f1);'>
      <div id="VCF_content" class="VCF_content">
          <div class="main_content">
              <form class="content_box" action="<%=path%>/vehicleInfor/vehicleSumbit.do" method="post" id="form1">
               <input type="hidden" id="orderNo" name="orderNo" value="${insuranceDetailsVO.baseinfor.orderno}" readonly="readonly"/>
                <input style="display:none" type="text" id="brandcode" name="brandcode" value="${insuranceDetailsVO.vhlinfor.brandcode}" /> 
			    <input style="display:none" type="text" id="vhlval" name="vhlval" value="${insuranceDetailsVO.vhlinfor.vhlval}" />
			    <input style="display:none" type="text" id="setno" name="setno" value="${insuranceDetailsVO.vhlinfor.setno}" /> 
			    <input style="display:none" type="text" id="displacement"name="displacement" value="${insuranceDetailsVO.vhlinfor.displacement}" />
			    <input style="display:none" type="text" id="marketyear" name="marketyear" value="${insuranceDetailsVO.vhlinfor.marketyear}" />
			    <input style="display:none" type="text" id="brandName" name="brandName" value="${insuranceDetailsVO.vhlinfor.brandName}" />
			    <input style="display:none" type="text" id="citycode" name="citycode" value="${insuranceDetailsVO.baseinfor.deptno}" /> 
			    <input style="display:none" type="text" id="familyKind" name="familyKind" value="${insuranceDetailsVO.vhlinfor.familyKind}" /> 
			    <input style="display:none" type="text" id="newenergyflag" name="newenergyflag" value="${insuranceDetailsVO.vhlinfor.newenergyflag}" /> 
			    <input style="display:none" type="text" id="vhiinforid" name="vhiinforid" value="${insuranceDetailsVO.vhlinfor.vhiinforid}" /> 
			    <input style="display:none" type="text" id="absflag" name="absflag" value="${insuranceDetailsVO.vhlinfor.absflag}" /> 
			    <input style="display:none" type="text" id="alarmflag" name="alarmflag" value="${insuranceDetailsVO.vhlinfor.alarmflag}" /> 
			    <input style="display:none" type="text" id="airbagfalg" name="airbagfalg" value="${insuranceDetailsVO.vhlinfor.airbagfalg}" /> 
			    <input style="display:none" type="text" id="gearboxtype" name="gearboxtype" value="${insuranceDetailsVO.vhlinfor.gearboxtype}" />
			    <input style="display:none" type="text" id="fullweight" name="fullweight" value="${insuranceDetailsVO.vhlinfor.fullweight}" />   
                  <ul class="Navigation page_1">
                      <li><span>1</span>基本信息</li>
                      <li><span>2</span>报价信息</li>
                      <li><span>3</span>确认信息</li>
                      <li><span>4</span>支付</li>
                  </ul>
                  <div class="head_title lf">
                      <i></i><span>车辆信息</span>
                      <div class="Upload rg">上传行驶证照片，识别车辆信息 <label style="display:inline-block;width:35px;height:26px;background:url(<%=path%>/views/image/quote-icon2.png) no-repeat;margin-right:20px;"><input type="file" id="picFile" name="picFile" accept="image.jpg" capture="camera"onchange="readFile(this)" style="opacity:0;width: 35px;" /></label></div>
                  </div>
                  <div class="User_info lf" id='User_info'>
                      <div><span class="row_title"><strong>*</strong>投保城市</span><label class="info_box"><input type="text" value="${insuranceDetailsVO.baseinfor.deptAddress}" readonly="readonly" style="background-color: rgba(154, 148, 148, 0.22)"></label></div>
                      <div><span class="row_title"><strong>*</strong>车牌号码</span><label class="info_box"><input type="text" id="lcnno" name="lcnno" value="${insuranceDetailsVO.vhlinfor.lcnno}" maxlength="7" readonly="readonly" style="background-color: rgba(154, 148, 148, 0.22)"></label></div>
                      <div><span class="row_title"><strong>*</strong>注册日期</span><label class="info_box"><input type="text" id="registerdate" name="registerdate" value="${insuranceDetailsVO.vhlinfor.registerdate}" placeholder="请输入车辆注册日期" ></label><div id="Date_box"style="width:0px;height:0px;"></div></div>
                      <div><span class="row_title"><strong>*</strong>车架号VIN</span><label class="info_box"><input type="text" class='Hover' id="vinno" name="vinno" value="${insuranceDetailsVO.vhlinfor.vinno}" placeholder="请输入车架号" maxlength="17" onblur="Trim(this);setUpperCase(this);" onkeyup="if(value!=value.replace(/[\W]/g,''))value=value.replace(/[\W]/g,'')" ><div><img src="<%=path%>/views/image/cjh.gif"/></div></label><span class="error" id="error"><i></i></span></div>
                      <div><span class="row_title"><strong>*</strong>品牌型号</span><label class="info_box"><input type="text" id="model" name="model" value="${insuranceDetailsVO.vhlinfor.model}" placeholder="请输入品牌型号 "  onblur="Trim(this);setUpperCase(this);"><div><img src="<%=path%>/views/image/ppxh.gif" alt=""/></div></label><!-- <span class="error" id="error2"><i></i></span> --></div>
                      <!-- <div><span class="row_title"><strong>*</strong>配置型号</span><label class="info_box"><sapn class="pzxh" id="pzxh"></sapn></label>  -->
                      <div><span class="row_title" style="margin-left: -493px; margin-top: 15px;"><strong>*</strong>配置型号</span><span id="modelSerach" name="modelSerach" class='modelSerach'>选择车型</span> 
                      	  <div class="textarea1" id="model1" name="model1">
             				 <input type='text' value=''  class='Inpput_I' readonly/>
              				 <input type='text' value='' placeholder="点击获取配置型号" class='Inpput_II' id="pzxh" readonly/>             				 
           				  </div>   
                          <div class="select_table" id="select_table"><i class='line_1'></i><i class='line_2'></i><i class='line_3'></i><i class='line_4'></i><i class='line_5'></i>
                              <table class="select_title"><tr><td><span>车型</span></td><td><span>配置型号</span></td><td><span>上市时间</span></td><td><span>座位数</span></td><td>排量</td><td>新车购置价</td></tr></table>
                              <div class="m-wrapper" id="m-wrapper">
                                  <table class="select_content" id="select_content"></table>
                              </div>
                          </div>
                      </div>
                      <div><span class="row_title" style="margin-top: 29px;margin-left: -363px;"><strong>*</strong>发动机号</span><label class="info_box"><input type="text" id="engno" name="engno" value="${insuranceDetailsVO.vhlinfor.engno}" placeholder="请输入发动机号" maxlength="20" onblur="setUpperCase(this);" onkeyup="if(value!=value.replace(/[\W]/g,''))value=value.replace(/[\W]/g,'')"><div><img src="<%=path%>/views/image/fdjh.gif" alt=""/></div></label></div>
                      <div><span class="row_title"><strong>*</strong>是否过户</span><label class="selt_box "><input type="radio" name="radio" value="1" id="chgownerflag1"  name="chgownerflag" <c:if test="${insuranceDetailsVO.vhlinfor.chgownerflag=='1'}">checked="checked"</c:if>></label>是<label class="selt_box sel_on" style="margin-left:32px;"><input type="radio" id="chgownerflag2"  name="chgownerflag" value="0" <c:if test="${insuranceDetailsVO.vhlinfor.chgownerflag=='0' || insuranceDetailsVO.vhlinfor.chgownerflag==null}">checked="checked"</c:if>></label>否
                          <label style="margin-left:32px;position: relative;"><span class='transfer'>什么是过户？</span><div class="transfer_car"><h4>什么是过户？</h4><p class="p2">过户是指您的车辆所有人名称进行过变更。如果您的车是二手车，且属以下情况之一的，请点选“是”:</p><p class="p2">1.过户时间在上年买保险到今天之间</p><p class="p2">2.您的行驶证发证日期在一年之内</p></div></label></div>
                       <div style="display:none" id="gouhudate"><span class="row_title" ><strong>*</strong>过户日期</span><label class="info_box"><input type="text"id="trans_Date" name="transferdate"  placeholder="请输入过户日期" value="${insuranceDetailsVO.vhlinfor.transferdate}"></label><div id="info_box"style="width:0px;height:0px;"></div></div>
                  </div>
                  <div class="head_title lf">
                      <i></i><span>车主信息</span>
                  </div>
                  <div class="Owner_info lf">
                      <div><span class="row_title"><strong>*</strong>车主姓名</span><label class="info_box"><input type="text" id="drvowner" name="drvowner" value="${insuranceDetailsVO.vhlinfor.drvowner}" placeholder="请输入车主姓名" maxlength="4" onblur="Trim(this)"></label></div>
                      <div><span class="row_title"><strong>*</strong>车主身份证</span><label class="info_box"><input type="text" id="certificateno" name="certificateno" value="${insuranceDetailsVO.vhlinfor.certificateno}" placeholder="请输入车主身份证件号码" maxlength="18" onblur="setUpperCase(this);identityCodeValid(this.value);"></label></div>
                      <div><span class="row_title"><strong>*</strong>手机号</span><label class="info_box"><input type="text" placeholder="请输入手机号码" name="phoneno" id="phoneno" value="${insuranceDetailsVO.vhlinfor.phoneno}" maxlength="11"  onKeyUp="if(value!=value.replace(/[^\d]/g,''))value=value.replace(/[^\d]/g,'')"></label></div>
                  </div>
                  <div class="submit lf"><a href="" id="next">下一步</a></div>
              </form>
          </div>
          <div class="Sidebar_info rg"><img src="<%=path%>/views/image/side.png" alt="" /></div>
          <div class="clear"></div>
      </div>
  </div>
  

<!-- <div id="popup" style="top:35%;position: fixed">
    <div class="title">
        <p data-title="温馨提示"></p>
        <span>x</span>
    </div>
    <div class="cont" id="Message">车架号有误，请核对！</div>
</div> -->
<!-- <div id="mask_shadow"></div> -->
<!--错误信息提示框  -->
<div id="errorhei" class="errorhei" style="z-index: 100; display:none;position: fixed; width: 100%;height: 100%; background: rgba(0,0,0,0.5);top: 0;">

    <div style="   position: fixed;top: 35%; width:100%;height:auto;text-align:center;">
        <div style="width:85%;margin:0 auto;max-width:300px;background:#fff;color: #333; border-radius:5px;padding: 20px 0px 3px 0px;box-shadow: 0 0 20px 2px #333;">
            <h2 style="font-size: 17px;color: #222;color: #aeaeae;padding-bottom:5px;">提示信息</h2>
            <p style="margin-bottom: 10px;font-size: 12px;padding: 15px 20px;text-align: center; color:#444;" id="Message"></p >
            <div style="border-top:1px solid #ddd;font-size:17px;color:#333;padding: 8px 0px;"><span style="display:block;width:100%;font-size:15px" id="ensure">确定</span></div>
        </div>
    </div>
</div>

<!-- 车型查询加载框 -->
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
<script src="<%=path%>/views/js/jquery.1.7.2.min.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
	     $('#head_top').load('<%=path%>/views/jsp/header.jsp');
         $('#footer').load('<%=path%>/views/jsp/footer.jsp');
	});
</script>
<script src="<%=path%>/views/js/plugin/citySet.js"></script>
<script src="<%=path%>/views/js/plugin/cityJson.js"></script>
<script src="<%=path%>/views/js/plugin/Popt.js"></script>
<script src="<%=path%>/views/js/plugin/lyz.calendar.min.js"></script>
<script src="<%=path%>/views/js/vehicleInfo.js"></script>
<script src="<%=path%>/views/js/common.js"></script>
<script src="<%=path%>/views/js/plugin/zUI.js"></script>
<script type="text/javascript">
	function getUrl() {
		return "<%=path%>";
  	}
  	var page=2;
  	var phoneNo = "<%=phoneNo%>";
  	if(phoneNo=="null"){
    	phoneNo="";
    }
</script>
</html>