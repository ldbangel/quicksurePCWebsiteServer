package com.quicksure.pc.consumer.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.quicksure.insurance.entity.InsuranceDetailsVO;
import com.quicksure.insurance.service.InsuranceService;
import com.quicksure.insurance.util.InsuranceDetailsVOHelp;
import com.quicksure.insurance.util.StringUtils;
import com.quicksure.pc.consumer.utils.MapUtil;
import com.quicksure.pc.consumer.utils.OperateRedis;



@Controller
@RequestMapping("/paymentInfor")
public class PaymentInforController {
	private static final Logger logger = Logger.getLogger(PaymentInforController.class);
	@Autowired
	private InsuranceService paymentInforService;	
	@Resource
	private OperateRedis operateRedis;
	

	
	@RequestMapping("/paymentApplication.do")
	public void paymentApplication(HttpServletRequest httprequest,
			HttpServletResponse response) throws IOException, ServletException{
		JSONArray jsonArray=null;
		int lastImplementPage=6;
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
		insuranceDetails.getBaseinfor().setLastImplementPage(lastImplementPage);
		try{
			InsuranceDetailsVO insuranceDetailsVOs=paymentInforService.paymentApplication(insuranceDetails);
			jsonArray=JSONArray.fromObject(insuranceDetailsVO.getPayInfoList()); 
			response.setCharacterEncoding("utf-8");	
			response.setContentType( "application/json");
			response.sendRedirect(insuranceDetailsVOs.getPaymentinfor().getPaymenturl());//支付链接跳转
		    //response.getWriter().print(jsonArray);
		    response.getWriter().flush();
		}catch (IOException e) {	
			StringWriter sw = new StringWriter();  
			  e.printStackTrace(new PrintWriter(sw, true));  
			  String str = sw.toString();
			logger.error("paymentApplication exception the  error message is: "+str);
				
		}		
		logger.info("payment application Ends the result data is： "+jsonArray);
	}
}
