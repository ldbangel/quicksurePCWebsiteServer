package com.quicksure.pc.consumer.action;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.quicksure.insurance.entity.InsuranceDetailsVO;
import com.quicksure.insurance.entity.Userinfor;
import com.quicksure.insurance.service.MyAccountService;
import com.quicksure.pc.consumer.utils.MapUtil;
import com.quicksure.pc.consumer.utils.OperateRedis;

@Controller
@RequestMapping("/myAccount")
public class MyAccountController {
	private static final Logger logger = Logger.getLogger(MyAccountController.class);
	@Autowired
	private MyAccountService myAccountService;
	@Resource
	private OperateRedis operateRedis;
	
	/**
	 * 初始化myAccount
	 */
	@RequestMapping("/myAccountInit.do")
	@ResponseBody
	public Map<String,Object> myAccountInit(HttpServletRequest request,HttpServletResponse response){
		String startTime = request.getParameter("startTime");
		String endTime = request.getParameter("endTime");
			
		String sessionId = request.getSession().getId();
		//从redis里取数据
		Map<byte[], byte[]> mapbyte = operateRedis.getHash(sessionId);
		Map<String,Object> map = MapUtil.resolveByteMap(mapbyte);
		Userinfor userinfor = (Userinfor) map.get("loginuser");
		
		Map<String,Object> map1 = myAccountService.getMyAccountInitInfor(userinfor,startTime,endTime);
		return map1;
	}
	
	/**
	 * 获取每个展示页面的订单数据
	 */
	@RequestMapping("/getMyOrders.do")
	@ResponseBody
	public Map<String,Object> myOrdersPaging(HttpServletRequest request,HttpServletResponse response){
		String thatPage = request.getParameter("curPage");
		String index = request.getParameter("flag");
		String startTime = request.getParameter("startTime");
		String endTime = request.getParameter("endTime");
		String content = null;
		
		int thatpage = thatPage==null?1:Integer.parseInt(thatPage);
		int tabIndex = index==null?0:Integer.parseInt(index);
		/*if(content!=null && !"".equals(content)){
			try {
				content=new String(content.getBytes("iso8859-1"),"utf-8");
			} catch (UnsupportedEncodingException e) {
				StringWriter sw = new StringWriter();  
				e.printStackTrace(new PrintWriter(sw, true));  
				String str = sw.toString();
				logger.error("获取每页展示的订单数据 方法编码异常"+str);
			}
		}*/
		HttpSession session=request.getSession();
		Userinfor user = (Userinfor) session.getAttribute("loginUser");
		
		Map<String,Object> map1 = new HashMap<String,Object>();
		map1.put("thatpage", thatpage);
		map1.put("tabIndex", tabIndex);
		map1.put("content", content);
		map1.put("startTime", startTime);
		map1.put("endTime", endTime);
		map1.put("user", user);
		long starttime=System.currentTimeMillis();
		System.out.println("起始时间为："+starttime);
		Map<String,Object> map = myAccountService.getMyOrdersInfor(map1);
		long endtime=System.currentTimeMillis();
		System.out.println("结束时间为："+endtime);
		System.out.println("耗时:"+(endtime-starttime)/1000);
		return map;
	}
	
	/**
	 * 撤销订单
	 */
	@RequestMapping("/cancelOrder.do")
	@ResponseBody
	public String cancelOrder(String orderno, HttpServletRequest request){
 		String msg = myAccountService.cancelOrder(orderno);
		return msg;
	}
	
	/**
	 * 继续支付
	 */
	@RequestMapping("/continuePay.do")
	@ResponseBody
	public String continuePayment(String orderno,HttpServletRequest request){
		String url = myAccountService.continuePay(orderno);
		return url;
	}
	
	/**
	 * 继续投保
	 * 暂存状态的继续投保操作(10跳转到车辆信息页面,20跳转到险种页面) 
	 */
	@RequestMapping("/continueInsure.do")
	@ResponseBody
	public String continueInsure(String orderno,HttpServletRequest request){
		Map<String,Object> map= myAccountService.continueInsure(orderno);
		String sessionId = request.getSession().getId();
		String path = (String) map.get("path");
		InsuranceDetailsVO insuranceDetailsVO = (InsuranceDetailsVO) map.get("insuranceDetailsVO");
		Map<String,Object> map1 = new HashMap<String,Object>();
		map1.put("insurance", insuranceDetailsVO);
		operateRedis.addToHash(map1,sessionId);
		return path;
	}

	/**
	 * 订单详情
	 */
	@RequestMapping("/orderDetails.do")
	@ResponseBody
	public InsuranceDetailsVO orderDetails(ModelMap modelMap,String orderno,
			HttpServletRequest request,HttpServletResponse response){
		InsuranceDetailsVO insuranceDetailsVO = myAccountService.showOrderDetail(orderno);
		return insuranceDetailsVO;
	}
	
	/**
	 * copy支付链接
	 */
	/*@RequestMapping("/copyLink.do")
	@ResponseBody
	public String CopyLink(HttpServletRequest request){
		String url = request.getParameter("url");
		Clipboard sysClip = Toolkit.getDefaultToolkit().getSystemClipboard();
		Transferable text = new StringSelection(url);
		sysClip.setContents(text, null);
		return "success";
	}*/
}
