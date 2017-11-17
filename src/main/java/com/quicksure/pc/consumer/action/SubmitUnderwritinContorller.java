package com.quicksure.pc.consumer.action;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.quicksure.insurance.entity.Deliveryinfor;
import com.quicksure.insurance.entity.InsuranceDetailsVO;
import com.quicksure.insurance.entity.Insuranceperinfor;
import com.quicksure.insurance.service.InsuranceService;
import com.quicksure.insurance.util.InsuranceDetailsVOHelp;
import com.quicksure.insurance.util.StringUtils;
import com.quicksure.pc.consumer.utils.MapUtil;
import com.quicksure.pc.consumer.utils.OperateRedis;


@Controller
@RequestMapping("/submitInfor")
public class SubmitUnderwritinContorller {
	
	@Autowired
	private InsuranceService insuranceService;
	
	@Resource
	private OperateRedis operateRedis;
		private static final Logger logger = Logger
				.getLogger(SubmitUnderwritinContorller.class);

		@RequestMapping("/submitUnderwriting.do")
		public  String submitUnderwriting(Deliveryinfor deliveryinfor,Insuranceperinfor insuranceperinfor,ModelMap modelMap,
				HttpServletRequest httprequest,HttpServletResponse response){
			logger.info("提核获取传输过来的订单号--提核开始--： "+httprequest.getParameter("orderNo"));
			
			
			String sessionId = httprequest.getSession().getId();
			InsuranceDetailsVO insuranceDetails = null;
			/**
			 * 从redies中获取数据
			 */
			Map<byte[], byte[]> mapbyte = operateRedis.getHash(sessionId);
			Map<String,Object> map = MapUtil.resolveByteMap(mapbyte);
			InsuranceDetailsVO insuranceDetailsVO = (InsuranceDetailsVO) map.get("insurance");
			if(StringUtils.checkStringEmpty(sessionId)){
				insuranceDetails = insuranceDetailsVO;
			}else{
				InsuranceDetailsVO insuranceDetailsVo = InsuranceDetailsVOHelp
						.initInsuranceDetailsVO();
				insuranceDetails = insuranceDetailsVo;
			}
			
			int insuranceperinforid=0;
			if(insuranceDetails!=null&&insuranceDetails.getInsuranceperinfor()!=null&&insuranceDetails.getInsuranceperinfor().getInsuranceperinforid()!=null){
				insuranceperinforid = insuranceDetails.getInsuranceperinfor().getInsuranceperinforid();
			}
			int deliveryinforid=0;
			if(insuranceDetails!=null&&insuranceDetails.getDeliveryinfor()!=null&&insuranceDetails.getDeliveryinfor().getDeliveryid()!=null){
				deliveryinforid=insuranceDetails.getDeliveryinfor().getDeliveryid();
			}
			if(insuranceperinforid!=0){//投保信息ID
				insuranceperinfor.setInsuranceperinforid(insuranceperinforid);
			}
			if(deliveryinforid!=0){//收件人信息id
				deliveryinfor.setDeliveryid(deliveryinforid);
			}
			if(insuranceDetails.getBaseinfor()!=null){
				if(insuranceDetails.getBaseinfor().getQuoteno()!=null){
					
				}else{
					String quotano =httprequest.getParameter("quotano");
					insuranceDetails.getBaseinfor().setQuoteno(quotano);
				}
			}
			
			insuranceDetails.setDeliveryinfor(deliveryinfor);
			insuranceDetails.setInsuranceperinfor(insuranceperinfor);
			
			
			InsuranceDetailsVO insuranceUnderwrite=new InsuranceDetailsVO();
			String Success = ""; 
			synchronized(this){
			try {	
				insuranceUnderwrite = insuranceService.submitUnderwriting(insuranceDetails);
			
			//获取错误信息传给前台jsp(EL)
			String errorMessage = insuranceUnderwrite.getInterfaceslogsWithBLOBs().getResponsemessage();
			String errorCode = insuranceUnderwrite.getInterfaceslogsWithBLOBs().getResponsecode();
			int agentFlag=0;
			if(insuranceUnderwrite.getUserinfor()!=null){
				agentFlag=insuranceUnderwrite.getUserinfor().getAgentFlag();
			}
					modelMap.addAttribute("agentFlag", agentFlag);
					modelMap.addAttribute("errorMessage", errorMessage);
					modelMap.addAttribute("errorCode", errorCode);
				Success = insuranceUnderwrite.getInterfaceslogsWithBLOBs().getInterfacesstatu();
			if(Success.equals("10")){
				int lastImplementPage=5;
				insuranceUnderwrite.getBaseinfor().setLastImplementPage(lastImplementPage);
				if(insuranceUnderwrite.getBaseinfor().getOrderstate()==20){
					//总价格四舍五入保留2个小数点
					String totalPremium = insuranceUnderwrite.getBaseinfor().getTotalPremium();
					insuranceUnderwrite.getBaseinfor().setTotalPremium(String.format("%.2f", Double.parseDouble(totalPremium)));
					insuranceService.saveSubmitInfor(insuranceUnderwrite.getBaseinfor());
				}
				
/*				String applicationProvinceName = httprequest.getParameter("applicationProvinceName");
				String applicationCityName = httprequest.getParameter("applicationCityName");
				String applicationCountyName = httprequest.getParameter("applicationCountyName");
				String insuredProvinceName = httprequest.getParameter("insuredProvinceName");
				String insuredCityName = httprequest.getParameter("insuredCityName");
				String insuredCountyName = httprequest.getParameter("insuredCountyName");
				String deliveryProvinceName = httprequest.getParameter("deliveryProvinceName");
				String deliveryCityName = httprequest.getParameter("deliveryCityName");
				String deliveryCountyName = httprequest.getParameter("deliveryCountyName");
				
				insuranceUnderwrite.getBaseinfor().setApplicationProvinceName(applicationProvinceName);
				insuranceUnderwrite.getBaseinfor().setApplicationCityName(applicationCityName);
				insuranceUnderwrite.getBaseinfor().setApplicationCountyName(applicationCountyName);
				insuranceUnderwrite.getBaseinfor().setInsuredProvinceName(insuredProvinceName);
				insuranceUnderwrite.getBaseinfor().setInsuredCityName(insuredCityName);
				insuranceUnderwrite.getBaseinfor().setInsuredCountyName(insuredCountyName);
				insuranceUnderwrite.getBaseinfor().setDeliveryProvinceName(deliveryProvinceName);
				insuranceUnderwrite.getBaseinfor().setDeliveryCityName(deliveryCityName);
				insuranceUnderwrite.getBaseinfor().setDeliveryCountyName(deliveryCountyName);
				
				int insuranceperinforId = insuranceUnderwrite.getInsuranceperinfor().getInsuranceperinforid();
				int deliveryinforId = insuranceUnderwrite.getDeliveryinfor().getDeliveryid()==null?0:insuranceUnderwrite.getDeliveryinfor().getDeliveryid();
				if(insuranceperinforId!=0){
					insuranceperinfor.setInsuranceperinforid(insuranceperinforId);
				}
				if(deliveryinforId!=0){
					deliveryinfor.setDeliveryid(deliveryinforId);
				}
				insuranceUnderwrite.setDeliveryinfor(deliveryinfor);
				insuranceUnderwrite.setInsuranceperinfor(insuranceperinfor);*/
				
				InsuranceDetailsVO insuranceDetails1=insuranceService.AddSubmitInfor( insuranceUnderwrite);
				modelMap.addAttribute("insuranceDetailsVO",insuranceDetails1);
				Map<String,Object> map1 = new HashMap<String,Object>();
				map1.put("insurance", insuranceDetails1);				
				//数据存进redis
				operateRedis.addToHash(map1,sessionId);
				
				logger.info("人员信息增加进人员信息表: "+insuranceDetails.getBaseinfor().getOwnersname());
				
			}else{
				logger.info("提核失败"+insuranceUnderwrite.getInterfaceslogsWithBLOBs().getResponsemessage());
			}		
			} catch (Exception e) {
				StringWriter sw = new StringWriter();  
				  e.printStackTrace(new PrintWriter(sw, true));  
				  String str = sw.toString();
				logger.error("提核失败:"+str);
			}
			}
			if(Success.equals("10")){
			 /*return LudiConstants.PAYMENT;*/	
				return "paymentInfor";
			}else{
			/* return LudiConstants.PERSONINFORS;*/
				return "personInfors";
			}
		}

}
