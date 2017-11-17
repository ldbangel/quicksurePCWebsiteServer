package com.quicksure.pc.consumer.action;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.quicksure.insurance.entity.Baseinfor;
import com.quicksure.insurance.entity.Coverageinfor;
import com.quicksure.insurance.entity.InsuranceDetailsVO;
import com.quicksure.insurance.entity.Vhlinfor;
import com.quicksure.insurance.service.InsuranceService;
import com.quicksure.insurance.util.InsuranceDetailsVOHelp;
import com.quicksure.insurance.util.StringUtils;
import com.quicksure.pc.consumer.utils.MapUtil;
import com.quicksure.pc.consumer.utils.OperateRedis;
/**
 * 保费计算的后台入口
 * @author lenny.li001
 *
 */
@Controller
@RequestMapping("/PremiumCount")
public class PremiumCountController {
	private static final Logger logger = Logger
			.getLogger(PremiumCountController.class);
	
	@Autowired
	private InsuranceService insuranceService;
	@Resource
	private OperateRedis operateRedis;
	
	/**
	 * 前端信息提交到此交互
	 * @param insuranceperinfor
	 * @param modelMap
	 * @param httprequest
	 * @throws ParseException 
	 */
	@RequestMapping("/premiumCount.do")
	public @ResponseBody InsuranceDetailsVO premiumCount(@RequestBody List<Coverageinfor> coverageinfors,
			Vhlinfor vhlinfor,Baseinfor baseinfor,ModelMap modelMap,HttpServletRequest httprequest) 
			throws ParseException{
		logger.info("保费试算开始--： 客户端IP："+httprequest.getRemoteAddr());
		String sessionId = httprequest.getSession().getId();
		//从redis里取数据
		Map<byte[], byte[]> mapbyte = operateRedis.getHash(sessionId);
		Map<String,Object> map = MapUtil.resolveByteMap(mapbyte);
		InsuranceDetailsVO insuranceDetailsVO = (InsuranceDetailsVO) map.get("insurance");
		
		/*
		 * 给予保费计算一些值,以后有前台，从前台获取
		 */
		InsuranceDetailsVO premiumCount=null;
		try {			
			logger.info("-----------保费计算开始-------------");
			premiumCount = insuranceService.PremiumCount(vhlinfor,baseinfor,coverageinfors, insuranceDetailsVO);
			logger.info("-------保费计算完后--------");
			if(premiumCount.getBaseinfor().getQuoteno()!=null){
				logger.info("试算成功"+premiumCount.getVhlinfor().getDrvowner()); 
			}else{
				logger.info("试算失败没有成功获取到报价单号");
			}
		} catch (Exception e) {
			StringWriter sw = new StringWriter();  
			e.printStackTrace(new PrintWriter(sw, true));  
			String str = sw.toString();
			logger.error("试算失败:"+str);
		}
		
		Map<String,Object> map1 = new HashMap<String,Object>();
		map1.put("insurance", premiumCount);
		//数据存进redis
		operateRedis.addToHash(map1,sessionId);
		
		return premiumCount;
	}

	/**
	 * 跳转到人员信息页面(提核)
	 * 孙小东
	 * @return
	 */
	@RequestMapping("/goToPersonInfor.do")
	public String goToPersonInfor(HttpServletRequest httprequest,ModelMap modelMap){
		String sessionId = httprequest.getSession().getId();
		InsuranceDetailsVO insuranceDetails = null;
		int lastImplementPage=4;
		//从redis里取数据
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
		InsuranceDetailsVO insuranceDetailsVo = insuranceService.savePremiumInfor(insuranceDetails);	
		modelMap.addAttribute("insuranceDetailsVO",insuranceDetailsVo);
		Map<String,Object> map1 = new HashMap<String,Object>();
		map1.put("insurance", insuranceDetailsVo);
		//数据存进redis
		operateRedis.addToHash(map1,sessionId);
		
		return "personInfors";
	}
	
	/**
	 * 返回到人员信息(personinfor)页面
	 * @return
	 */
	@RequestMapping("/backToPersonInfor.do")
	public String backToPersonInfor(ModelMap modelMap, HttpServletRequest request){
		String orderNo = request.getParameter("orderNo");
		InsuranceDetailsVO insuranceDetailsVO = (InsuranceDetailsVO) request.getSession()
				.getAttribute(orderNo + "insuranceDetailsVO");
		modelMap.addAttribute("insuranceDetailsVO", insuranceDetailsVO);
		return "";
	}
}
