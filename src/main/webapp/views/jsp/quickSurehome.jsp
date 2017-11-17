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
    <title>慧英保险</title>
    <script type="text/javascript">
    	function getUrl() {
			return "<%=path%>";
	  	}
	    var provincedata;
	    var FirstscreenFlag=true; 
	</script>
</head>
<link rel="stylesheet" href="<%=path %>/views/css/headfoot.css">
<link rel="stylesheet" href="<%=path %>/views/css/style.css">
<link rel="stylesheet" href="<%=path %>/views/css/popup.css">
<link href="<%=path %>/views/video-js/video-js.css" rel="stylesheet" type="text/css">
<style>
    ._citys { max-width: 450px;
        display: inline-block;
        border: 2px solid #eee;
        padding: 5px;
        position: relative;
        background:#fff;left: -84px;
        top: 5px;
        width: 304px;}
    ._citys span { color: #56b4f8; height: 15px; width: 15px; line-height: 15px; text-align: center; border-radius: 3px; position: absolute; right: 10px; top: 10px; border: 1px solid #56b4f8; cursor: pointer; }
    ._citys0 { width: 100%; height: 34px; display: inline-block; border-bottom: 2px solid #56b4f8; padding: 0; margin: 0; }
    ._citys0 li { display: inline-block; line-height: 34px; font-size: 15px; color: #888; width: 80px; text-align: center; cursor: pointer; }
    .citySel { background-color: #56b4f8; color: #fff !important; }
    ._citys1 { width: 100%; display: inline-block; padding: 10px 0;height: 186px; overflow-y: scroll; }
    ._citys1 a { max-width: 83px; height: 35px; display: inline-block; background-color: #f5f5f5; color: #666; margin-left: 6px; margin-top: 3px; line-height: 35px; text-align: center; cursor: pointer; font-size: 13px; overflow: hidden;padding:0px 5px; }
    ._citys1 a:hover { color: #fff; background-color: #56b4f8; }
    .AreaS { background-color: #56b4f8 !important; color: #fff !important; }
</style>

<body>
<!--头部跟随开始-->
 <div id="head_top" class="head_top"></div>
 <div class="Content">
    <div id="content_banner" class="content_banner">
        <div class="con">
                <form action="<%=path%>/vehicleInfor/goToVehicleScreen.do" class="obt_quote" method="post" name="form"  id="form" enctype="application/x-www-form-urlencoded">
                    <p class="tl">车险试算</p>
                    <input  style="display:none" type="text" id="deptno" name="deptno"/>
                    <div>
                      	 投保城市<input id="city" name="deptAddress"   type="text" class="city" value="${insuranceDetailsVO.baseinfor.deptAddress}" placeholder="请选择对应的城市" readonly="readonly" style="width: 230px;position: relative;z-index: 100;"><i style="position: absolute;left: 356px;top: 58px;"></i>
                    </div>
                    <div style="border-top:none;">
                       	 车牌号码<input type="text" id="car_plate" value='${insuranceDetailsVO.vhlinfor.lcnno}' name="lcnno" placeholder="请输入车牌号"  maxlength="7" onblur="setUpperCase(this);" ><label>未上牌</label><span class='press_bt'></span>
                    </div>
                    <div class="Quote_div"><a href="javascript:void(0)" id="count">获取报价</a></div>
                    <table class="online_phone">
                        <tr>
                            <td class="online"><i></i></td>
                            <td><p>在线</p><p>客服</p></td>
                            <td class="yhl_tel"><i></i></td>
                            <td><p>服务热线</p><span>0755-33209677</span></td>
                        </tr>
                    </table>
                </form>
                <div class="video_rg">
                    <video id="example_video_1" class="video-js vjs-default-skin" controls preload="none" width="570" height="385"
                           poster="<%=path%>/views/image/video.png"
                           data-setup="{}">
                        <source src="<%=path%>/views/video/video.mp4" type='video/mp4' />
                    </video>

                </div>
        </div>
    </div>
	<div id="" class="product_list">
		<div >
			<a href=""><div class='more-cp'><ul><li><h3>更多产品</h3></li><li><p>其他保险产品，让生活多一份保障。</p><p>家财保险，意外保险...</p></li></ul></div></a>
			<a href=""><div class='property-bx'><ul><li><h3>家财保险</h3></li><li><p>爱家有约， 安全可靠</p></li></ul></div></a>
			<a href=""><div class='accident-bx'><ul><li><h3>意外保险</h3></li><li><p>贴心保障， 意外无忧</p></li></ul></div></a>
		</div>
	<div class='clear'></div>
 </div >
</div>

<!-- <div id="popup" style="top:35%;position: fixed">
    <div class="title">
        <p data-title="温馨提示"></p>
        <span>x</span>
    </div>
    <div class="cont" id="Message">车架号有误，请核对！</div>
</div> -->
<div id="mask_shadow"></div>
<!--主题内容结束-->

<!--以下为页脚-->
<div id="footer" class="footer"></div>

<div id="errorhei" class="errorhei" style="z-index: 100; display:none;position: fixed; width: 100%;height: 100%; background: rgba(0,0,0,0.5);top: 0;">

    <div style="   position: fixed;top: 35%; width:100%;height:auto;text-align:center;">
        <div style="width:85%;margin:0 auto;max-width:300px;background:#fff;color: #333; border-radius:5px;padding: 20px 0px 3px 0px;box-shadow: 0 0 20px 2px #333;">
            <h2 style="font-size: 17px;color: #222;color: #aeaeae;padding-bottom:5px;">提示信息</h2>
            <p style="margin-bottom: 10px;font-size: 12px;padding: 15px 20px;text-align: center; color:#444;" id="Message"></p >
            <div style="border-top:1px solid #ddd;font-size:17px;color:#333;padding: 8px 0px;"><span style="display:block;width:100%;font-size:15px" id="ensure">确定</span></div>
        </div>
    </div>
</div>

</body>

<script src="<%=path %>/views/js/jquery.1.7.2.min.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
	     $('#head_top').load('<%=path %>/views/jsp/header.jsp');
         $('#footer').load('<%=path %>/views/jsp/footer.jsp');
	});
</script>
<script src="<%=path %>/views/js/plugin/citySet.js"></script>
<script src="<%=path %>/views/js/plugin/cityJson.js"></script>
<script src="<%=path %>/views/js/plugin/Popt.js"></script>
<script src="<%=path %>/views/video-js/video.js"></script>

<script>
    videojs.options.flash.swf = "video-js.swf";
</script>
<script src='<%=path %>/views/js/quickSurehome.js'></script>
<script src='<%=path %>/views/js/common.js'></script>

</html>