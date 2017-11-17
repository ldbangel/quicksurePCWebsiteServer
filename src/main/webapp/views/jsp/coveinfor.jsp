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
    <title>保费计算信息</title>
</head>
<link rel="stylesheet" href="<%=path %>/views/css/headfoot.css">
<link rel="stylesheet" href="<%=path %>/views/css/style.css">
<link rel="stylesheet" href="<%=path%>/views/css/popup.css">
<link rel="stylesheet" href="<%=path %>/views/css/lyz.calendar.css">
<body>
<div id="head_top" class="head_top"></div>
<div class="background_img" style='background:-webkit-radial-gradient(#fdfdfd 60%,#f1f1f1);background:radial-gradient(#fdfdfd 60%,#f1f1f1);'>
<div class="Pay_content" id="Pay_content">
    <div class="main_content lf">
        <form class="content_box" id="form" action="<%=path%>/PremiumCount/goToPersonInfor.do" method="post" >
            <ul class="Navigation page_2">
                <li><span>1</span>基本信息</li>
                <li><span>2</span>报价信息</li>
                <li><span>3</span>确认信息</li>
                <li><span>4</span>支付</li>
            </ul>
            <div class="head_title ">
                <i></i><span>交强险</span>&nbsp;&nbsp;
                <span class="select_row redioOne"><label class="selt_box has"><input type="radio" class="jqradio" id="jqradio" name="hg_IS" value="1"></label>是<label class="selt_box sel_on hsa" style="margin-left:32px;"><input type="radio" class="jqradio" name="hg_IS" checked="checked" value="0"></label>否</span>
            </div>
            <div class="hg_insure">
               <div><span class="row_title">起保日期</span><label class="info_box"><input type="text" id="JQ_DATE" <%-- <c:if test="${insuranceDetailsVO.baseinfor.jqpolicystartdate!=null&&insuranceDetailsVO.baseinfor.jqpolicystartdate!=''}">value='${insuranceDetailsVO.baseinfor.jqpolicystartdate}'</c:if> --%>></label><div id="Date_box"style="width:0px;height:0px;"></div></div>
               <div>
                   <ul class="hg_outlay_list">
                       <li><span>交强险保费</span><input  readonly type="text" id='jqpremium' <%-- <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='0357'}">value="${s.premium}"</c:if></c:forEach> --%>><span class="rg_ico">元</span></li>
                       <li><span>车船税</span><input readonly type="text" id='currenttax' <%-- value="${insuranceDetailsVO.taxinfor.sumuptax}" --%>><span class="rg_ico">元</span></li>
                   </ul>
               </div>
            </div>
            <div class="head_title ">
                <i></i><span>商业险</span>&nbsp;&nbsp;
                <span class="select_row "><label class="selt_box sel_on sy "><input type="radio" name="td_IS" checked="checked" id='td_Is'></label>是<label class="selt_box nsy" style="margin-left:32px;"><input type="radio" name="td_IS"></label>否</span>
            </div>
            <div class="trade_insure">
                <div><span class="row_title">起保日期</span><label class="info_box"><input type="text"id="SY_DATE" <%-- <c:if test="${insuranceDetailsVO.baseinfor.sypolicystartdate!=null&&insuranceDetailsVO.baseinfor.sypolicystartdate!=''}">value='${insuranceDetailsVO.baseinfor.sypolicystartdate}'</c:if> --%>></label><div id="info_box"style="width:0px;height:0px;"></div></div>
            </div>
            <div class="trade_table">
                <ul class="table_title">
                    <li>险种<label  class='check Check_All'><input  type="checkbox"></label></li>
                    <li>是否投保/保额(&yen;)</li>
                    <li>不计免赔</li>
                    <li>总保费</li>
                </ul>
                <table class="table_list" id='table_list'>
                    <tr>
                        <td>车辆损失险<label class="infor_icon">
                            <div class="infor_icon_box">
                                <h2>全车盗抢险</h2>
                                <p>保什么？</p>
                                <div>如果整车发生被偷被盗，保险公司将按条款进行赔偿。</div>
                                <p>我需要购买吗？</p>
                                <span>若存在以下任一情况，建议购买:</span>
                                <ul>
                                    <li>无固定车库 ,一般停车在露天停车场;</li>
                                    <li>经常开车出差 ,无固定停车地点</li>
                                    <li>车辆属于被易被盗车险。如广本雅阁、微型面包（昌河系列、五菱系列、长安系列、松花江系列等）</li>
                                </ul>
                                <p>选购指数</p>
                                <div><p><b></b></p><span>35%的用户会购买。</span></div>
                                <i></i>
                            </div>
                        </label></td>
                        <td ><select name="" id="modCode">
                            <option value="030101001" >不投保</option>
                            <option value="030101002" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030101'&&s.suminsured=='030101002'}">checked="checked"</c:if></c:forEach>>投保</option>
                        </select></td>
                        <td><label class='check'><input type="checkbox" id="modAbatement"></label></td>
                        <td><input class="inputtr" id="modTotalPremium" value='' readonly="readonly"/></td>
                    </tr>
                    <tr>
                        <td>第三责任险<label class="infor_icon">
                            <div class="infor_icon_box">
                                <h2>全车盗抢险</h2>
                                <p>保什么？</p>
                                <div>如果整车发生被偷被盗，保险公司将按条款进行赔偿。</div>
                                <p>我需要购买吗？</p>
                                <span>若存在以下任一情况，建议购买:</span>
                                <ul>
                                    <li>无固定车库 ,一般停车在露天停车场;</li>
                                    <li>经常开车出差 ,无固定停车地点</li>
                                    <li>车辆属于被易被盗车险。如广本雅阁、微型面包（昌河系列、五菱系列、长安系列、松花江系列等）</li>
                                </ul>
                                <p>选购指数</p>
                                <div><p><b></b></p><span>35%的用户会购买。</span></div>
                                <i></i>
                            </div>
                        </label></td>
                        <td><select name="" id="vtplQuota">
                         	<option value="030102001" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030102'&&s.suminsured=='306006001'}">selected="selected"</c:if></c:forEach>>不投保</option>
                            <option value="306006004" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030102'&&s.suminsured=='306006004'}">selected="selected"</c:if></c:forEach>>5W</option>
						    <option value="306006005" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030102'&&s.suminsured=='306006005'}">selected="selected"</c:if></c:forEach>>10W</option>
						    <option value="306006006" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030102'&&s.suminsured=='306006006'}">selected="selected"</c:if></c:forEach>>20W</option>
						    <option value="306006007" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030102'&&s.suminsured=='306006007'}">selected="selected"</c:if></c:forEach>>30W</option>
						    <option value="306006009" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030102'&&s.suminsured=='306006009'}">selected="selected"</c:if></c:forEach>>50W</option>
						    <option value="306006014" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030102'&&s.suminsured=='3060060014'}">selected="selected"</c:if></c:forEach>>100W</option>
                        </select></td>
                        <td><label  class='check'><input  type="checkbox" id="vtplAbatement"></label></td>
                        <td><input id="vtplTotalPremium" class="inputtr" value='' readonly="readonly"/></td>
                    </tr>
                    <tr>
                        <td>全车盗抢险<label class="infor_icon">
                            <div class="infor_icon_box">
                                <h2>全车盗抢险</h2>
                                <p>保什么？</p>
                                <div>如果整车发生被偷被盗，保险公司将按条款进行赔偿。</div>
                                <p>我需要购买吗？</p>
                                <span>若存在以下任一情况，建议购买:</span>
                                <ul>
                                    <li>无固定车库 ,一般停车在露天停车场;</li>
                                    <li>经常开车出差 ,无固定停车地点</li>
                                    <li>车辆属于被易被盗车险。如广本雅阁、微型面包（昌河系列、五菱系列、长安系列、松花江系列等）</li>
                                </ul>
                                <p>选购指数</p>
                                <div><p><b></b></p><span>35%的用户会购买。</span></div>
                                <i></i>
                            </div>
                        </label></td>
                        <td><select name="" id="theftCode">
                            <option value="030103001">不投保</option>
                            <option value="030103002" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030103'&&s.suminsured=='030103002'}">checked="checked"</c:if></c:forEach>>投保</option>
                        </select></td>
                        <td><label  class='check'><input  type="checkbox" id="theftAbatement"></label></td>
                        <td><input id="theftTotalPremium" class="inputtr" value='' readonly="readonly"/></td>
                    </tr>
                    <tr>
                        <td>司机座位责任险<label class="infor_icon">
                            <div class="infor_icon_box">
                                <h2>全车盗抢险</h2>
                                <p>保什么？</p>
                                <div>如果整车发生被偷被盗，保险公司将按条款进行赔偿。</div>
                                <p>我需要购买吗？</p>
                                <span>若存在以下任一情况，建议购买:</span>
                                <ul>
                                    <li>无固定车库 ,一般停车在露天停车场;</li>
                                    <li>经常开车出差 ,无固定停车地点</li>
                                    <li>车辆属于被易被盗车险。如广本雅阁、微型面包（昌河系列、五菱系列、长安系列、松花江系列等）</li>
                                </ul>
                                <p>选购指数</p>
                                <div><p><b></b></p><span>35%的用户会购买。</span></div>
                                <i></i>
                            </div>
                        </label></td>
                        <td><select name="" id="DriversCode">
                           <option value="030104001" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030104'&&s.suminsured=='030104001'}">selected="selected"</c:if></c:forEach>>不投保</option>
                           <option value="10000" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030104'&&s.suminsured=='10000'}">selected="selected"</c:if></c:forEach>>10000</option>
			               <option value="20000" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030104'&&s.suminsured=='20000'}">selected="selected"</c:if></c:forEach>>20000</option>
			               <option value="30000" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030104'&&s.suminsured=='30000'}">selected="selected"</c:if></c:forEach>>30000</option>
			               <option value="50000" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030104'&&s.suminsured=='50000'}">selected="selected"</c:if></c:forEach>>50000</option>
			               <option value="60000" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030104'&&s.suminsured=='60000'}">selected="selected"</c:if></c:forEach>>60000</option>
			               <option value="70000" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030104'&&s.suminsured=='70000'}">selected="selected"</c:if></c:forEach>>70000</option>
			               <option value="80000" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030104'&&s.suminsured=='80000'}">selected="selected"</c:if></c:forEach>>80000</option>
			               <option value="90000" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030104'&&s.suminsured=='90000'}">selected="selected"</c:if></c:forEach>>90000</option>
			               <option value="100000" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030104'&&s.suminsured=='100000'}">selected="selected"</c:if></c:forEach>>100000</option>
                        </select></td>
                        <td><label  class='check'><input type="checkbox" id="DriversAbatement"></label></td>
                        <td><input id="DriversTotalPremium" class="inputtr" value='' readonly="readonly"/></td>
                    </tr>
                    <tr>
                        <td>乘客座位责任险<label class="infor_icon">
                            <div class="infor_icon_box">
                                <h2>全车盗抢险</h2>
                                <p>保什么？</p>
                                <div>如果整车发生被偷被盗，保险公司将按条款进行赔偿。</div>
                                <p>我需要购买吗？</p>
                                <span>若存在以下任一情况，建议购买:</span>
                                <ul>
                                    <li>无固定车库 ,一般停车在露天停车场;</li>
                                    <li>经常开车出差 ,无固定停车地点</li>
                                    <li>车辆属于被易被盗车险。如广本雅阁、微型面包（昌河系列、五菱系列、长安系列、松花江系列等）</li>
                                </ul>
                                <p>选购指数</p>
                                <div><p><b></b></p><span>35%的用户会购买。</span></div>
                                <i></i>
                            </div>
                        </label></td>
                        <td><select name="" id="PassengerCode">
                        	<!-- '030105001'代表不投保 -->
                           <option value="030105001" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030105'&&s.suminsured=='030105001'}">selected="selected"</c:if></c:forEach>>不投保</option>
                           <option value="10000" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030105'&&s.suminsured=='10000'}">selected="selected"</c:if></c:forEach>>10000</option>
			               <option value="20000" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030105'&&s.suminsured=='20000'}">selected="selected"</c:if></c:forEach>>20000</option>
			               <option value="30000" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030105'&&s.suminsured=='30000'}">selected="selected"</c:if></c:forEach>>30000</option>
			               <option value="50000" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030105'&&s.suminsured=='50000'}">selected="selected"</c:if></c:forEach>>50000</option>
			               <option value="60000" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030105'&&s.suminsured=='60000'}">selected="selected"</c:if></c:forEach>>60000</option>
			               <option value="70000" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030105'&&s.suminsured=='70000'}">selected="selected"</c:if></c:forEach>>70000</option>
			               <option value="80000" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030105'&&s.suminsured=='80000'}">selected="selected"</c:if></c:forEach>>80000</option>
			               <option value="90000" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030105'&&s.suminsured=='90000'}">selected="selected"</c:if></c:forEach>>90000</option>
			               <option value="100000" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030105'&&s.suminsured=='100000'}">selected="selected"</c:if></c:forEach>>100000</option>
                        </select></td>
                        <td><label class='check'><input type="checkbox" id="PassengerAbatement"></label></td>
                        <td><input id="PassengerTotalPremium" class="inputtr" value='' readonly="readonly"/></td>
                    </tr>
                    <tr>
                        <td>自然损失险<label class="infor_icon">
                            <div class="infor_icon_box">
                                <h2>全车盗抢险</h2>
                                <p>保什么？</p>
                                <div>如果整车发生被偷被盗，保险公司将按条款进行赔偿。</div>
                                <p>我需要购买吗？</p>
                                <span>若存在以下任一情况，建议购买:</span>
                                <ul>
                                    <li>无固定车库 ,一般停车在露天停车场;</li>
                                    <li>经常开车出差 ,无固定停车地点</li>
                                    <li>车辆属于被易被盗车险。如广本雅阁、微型面包（昌河系列、五菱系列、长安系列、松花江系列等）</li>
                                </ul>
                                <p>选购指数</p>
                                <div><p><b></b></p><span>35%的用户会购买。</span></div>
                                <i></i>
                            </div>
                        </label></td>
                        <td><select name="" id="CombustionCode">
                            <option value="030108001">不投保</option>
                            <option value="030108002" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030108'&&s.suminsured=='030108002'}">checked="checked"</c:if></c:forEach>>投保</option>
                           </select></td>
                        <td><label class='check'><input type="checkbox" id="CombustionAbatement"></label></td>
                        <td><input id="CombustionTotalPremium" class="inputtr" value='' readonly="readonly"/></td>
                    </tr>
                    <tr>
                        <td>玻璃单独破碎险<label class="infor_icon">
                            <div class="infor_icon_box">
                                <h2>全车盗抢险</h2>
                                <p>保什么？</p>
                                <div>如果整车发生被偷被盗，保险公司将按条款进行赔偿。</div>
                                <p>我需要购买吗？</p>
                                <span>若存在以下任一情况，建议购买:</span>
                                <ul>
                                    <li>无固定车库 ,一般停车在露天停车场;</li>
                                    <li>经常开车出差 ,无固定停车地点</li>
                                    <li>车辆属于被易被盗车险。如广本雅阁、微型面包（昌河系列、五菱系列、长安系列、松花江系列等）</li>
                                </ul>
                                <p>选购指数</p>
                                <div><p><b></b></p><span>35%的用户会购买。</span></div>
                                <i></i>
                            </div>
                        </label></td>
                        <td><select name="" id="GlassCode">
                        	<option value="030107001" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030107'&&s.suminsured=='030107001'}">selected="selected"</c:if></c:forEach>>不投保</option>
                            <option value="303011001" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030107'&&s.suminsured=='303011001'}">selected="selected"</c:if></c:forEach>>国产玻璃</option>
	                  		<option value="303011002" <c:forEach items="${insuranceDetailsVO.coverageinfors}" var="s"><c:if test="${s.insrnccode=='030107'&&s.suminsured=='303011002'}">selected="selected"</c:if></c:forEach>>进口玻璃</option>
                        </select></td>
                        <td><label  class='check'><input type="checkbox" id="GlassQuota"></label></td>
                        <td><input id="GlassTotalPremium" class="inputtr" value='' readonly="readonly"/></td>
                    </tr>
                </table>
            </div>
            <div class="count_list lf">
                <div><p class="top_p"><i></i>商业险</p><p class="bottom_p"><strong>&yen;</strong><span class='trade_copay' id='sypremium'><%-- ${insuranceDetailsVO.baseinfor.sypremium} --%></span></p></div>
                <span class="icon_span">+</span>
                <div><p class="top_p"><i></i>交强险</p><p class="bottom_p"><strong>&yen;</strong><span class='hg_copay' id='jqpremium1'><%-- ${insuranceDetailsVO.baseinfor.jqpremium} --%></span></p></div>
                <span class="icon_span">+</span>
                <div><p class="top_p"><i></i>车船税</p><p class="bottom_p"><strong>&yen;</strong><span class='travel_copay' id='currenttax1'><%-- ${insuranceDetailsVO.taxinfor.sumuptax} --%></span></p></div>
                <span class="icon_span">=</span>
                <div><p class="top_p"><i></i>保费总额</p><p class="bottom_p"><strong>&yen;</strong><span class='total_copay' id='totalPremium'><%-- ${insuranceDetailsVO.baseinfor.totalPremium} --%></span></p></div>
            </div>
         <!--  <div class="form_btn"><input type="button" onclick="getQuote()" value="计算保费" /><a class="count_btn" href="javascript:submitFrom();">确认报价</a></div> -->
           <div class="form_btn"><input type="button" id="getQuote" value="计算保费" /><a class="count_btn" href="javascript:submitFrom();">确认报价</a></div>
        </form>
    </div>
    <div class="Sidebar_info rg"><img src="<%=path %>/views/image/side.png" alt="" /></div>
    <div class="clear"></div>
</div>
</div>
<!-- 加载框 -->
<div style="position:fixed;top:0px;left:0px;width:100%;height:100%;z-index: 100;display:none;"id="pop">
	<div style="position: fixed;top:35%; width:100%;height:auto;text-align:center;">
	     <span style='display:inline-block;height: auto;border-radius: 5px;background: rgba(0,0,0,0.6);color: #fff;font-size: 10px;letter-spacing: 2px; padding: 20px;'>
	        <img  src="<%=path%>/views/image/mu_loading.gif" style='width: 36px; margin-bottom: 5px;'>
	        <p id="prompt"></p>
		</span>
		 
	</div>
</div>

<!--检验提示框  -->
<!-- <div id="popup" style="top:35%;position: fixed">
    <div class="title">
        <p data-title="温馨提示"></p>
        <span>x</span>
    </div>
    <div class="cont" id="Message">车架号有误，请核对！</div>
</div> -->

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
<div id="footer" class="footer"></div>
</body>
<script src="<%=path %>/views/js/jquery.1.7.2.min.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
	     $('#head_top').load('<%=path%>/views/jsp/header.jsp');
         $('#footer').load('<%=path%>/views/jsp/footer.jsp');
	});
</script>
<script src="<%=path %>/views/js/plugin/PIf.js"></script>
<script src="<%=path %>/views/js/plugin/lyz.calendar.min.js"></script>
<script src="<%=path %>/views/js/common.js"></script>
<script src="<%=path %>/views/js/coveinfor.js"></script>
<%-- <script src="<%=path %>/views/js/popup.js"></script> --%>
</html>