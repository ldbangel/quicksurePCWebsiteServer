package com.quicksure.pc.consumer.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.quicksure.insurance.entity.Baseinfor;
import com.quicksure.insurance.entity.InsuranceDetailsVO;
import com.quicksure.insurance.service.InsuranceService;
import com.quicksure.pc.consumer.utils.OperateRedis;


/**
 * 支付完成服务
 * @author dongbo
 *
 */
@Controller
@RequestMapping("/paymentCompleteServlet")
public class PaymentCompleteServletController {
	private static final Logger logger = Logger.getLogger(PaymentCompleteServletController.class);
	
	@Autowired
	private InsuranceService insuranceService;
	
	@Resource
	private OperateRedis operateRedis;
	
	/**
	 * 支付完成之后，然后将支付结果存库
	 * @param request
	 * @param response
	 */
	@RequestMapping("/paymentComplete.do")
	public void PaymentComplete(HttpServletRequest request,
			HttpServletResponse response) {
		logger.info("payment completed and udpate paymentinfor start!");
		boolean isSuccess = false;
		String result = request.getParameter("result"); // 0是成功，1是失败
		//String resultFromNewSnfForPayment = request.getParameter("result"); //0是成功，1是失败
		String jqapplicationno = request.getParameter("jq_app_ply_no"); //交强险投保单号
		String syapplicationno = request.getParameter("sy_app_ply_no"); //商业险投保单号
		String jqpolicyno = request.getParameter("jq_ply_no"); //交强险保单号
		String sypolicyno = request.getParameter("sy_ply_no"); //商业险保单号
		String orderNoforPayment = request.getParameter("pay_app_no"); //支付单号
		
		logger.info("生成保单---状态result为："+result+"   交强险投保单号："+jqapplicationno+"   商业险投保单号:"
				+syapplicationno+"   交强险保单号:"+jqpolicyno+"   商业险保单号"+sypolicyno+"  支付单号:"+orderNoforPayment);
		
		Baseinfor baseinfor = new Baseinfor();
		baseinfor.setSyapplicationno(syapplicationno);
		baseinfor.setJqapplicationno(jqapplicationno);
		baseinfor.setSypolicyno(sypolicyno);
		baseinfor.setJqpolicyno(jqpolicyno);
		//更新支付方式，10线下，20线上
		if("08".equals(orderNoforPayment.substring(0, 2))){
			baseinfor.setPaymentMethod(10);
		}else{
			baseinfor.setPaymentMethod(20);
		}
		if ("0".equals(result)) {
			isSuccess = insuranceService.updatePaymentInfor(baseinfor);
		}
		logger.info("payment completed and udpate paymentinfor end!");
		try {
			if (isSuccess == true) {		
				response.getWriter().print("success");
				
				logger.info("成功把保单更新进数据库");
			} else {
				response.getWriter().print("fail");// return "fail";
			}
		} catch (IOException e) {
			 StringWriter sw = new StringWriter();  
			  e.printStackTrace(new PrintWriter(sw, true));  
			  String str = sw.toString();
			  logger.error("接收生成保单服务，返回消息IO异常，异常信息为："+str);
		}
	}
	
	@RequestMapping(value="/goPaymentSucessPage.do", method=RequestMethod.GET)
	public String goPaymentSucessPage(ModelMap modelMap,HttpServletRequest request,HttpServletResponse response){
		InsuranceDetailsVO insuranceDetailsVO=null;	
		String orderNo=request.getParameter("LudiOrderNo");
		logger.info("开始获取支付返回的信息，订单号为： "+orderNo);
		insuranceDetailsVO=insuranceService.processPaymentSuccessData(orderNo);
		if(insuranceDetailsVO.getBaseinfor()!=null){
			if("".equals(insuranceDetailsVO.getBaseinfor().getSyapplicationno())){
				insuranceDetailsVO.getBaseinfor().setSyapplicationno(null);
			}
			if("".equals(insuranceDetailsVO.getBaseinfor().getSypolicyno())){
				insuranceDetailsVO.getBaseinfor().setSypolicyno(null);
			}
			if("".equals(insuranceDetailsVO.getBaseinfor().getJqapplicationno())){
				insuranceDetailsVO.getBaseinfor().setJqapplicationno(null);
			}
			if("".equals(insuranceDetailsVO.getBaseinfor().getJqpolicyno())){
				insuranceDetailsVO.getBaseinfor().setJqpolicyno(null);
			}
		}
		//调用配送,(使用时可以直接调用)
		/*InsuranceDetailsVO ins=insuranceService.selectDistributionInfors(orderNo);//查询配送所需要的字段		
	    if(ins!=null){
	    	insuranceService.deliveryToCustomer(ins);//请求华安,配送完成并 修改订单状态	 	
	    }*/
		modelMap.addAttribute("insuranceDetailsVO", insuranceDetailsVO);
		logger.info("结束获取支付返回的信息，订单号为： "+orderNo);
		return "insuranceSuccess";
		
	}
	
}
