package com.quicksure.pc.consumer.action;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.quicksure.insurance.entity.Baseinfor;
import com.quicksure.insurance.entity.Dptinfor;
import com.quicksure.insurance.entity.InsuranceDetailsVO;
import com.quicksure.insurance.entity.Userinfor;
import com.quicksure.insurance.entity.Vhlinfor;
import com.quicksure.insurance.service.InsuranceService;
import com.quicksure.insurance.util.InsuranceDetailsVOHelp;
import com.quicksure.insurance.util.StringUtils;
import com.quicksure.pc.consumer.utils.MapUtil;
import com.quicksure.pc.consumer.utils.OperateRedis;


/**
 * The Class VehicleInforAction.
 *
 * @Description: (这里用一句话描述这个类的作用)
 * @author tangwenwu
 * @date 2017-2-28 10:57:59
 */
@Component
@RequestMapping("/vehicleInfor")
public class VehicleInforAction{
	
	private static final Logger logger = Logger.getLogger(VehicleInforAction.class);
	
	@Resource
	private InsuranceService insuranceService;
	@Resource
	private OperateRedis operateRedis;
	
	/**
	 * Go to vehicleinfor.
	 *
	 * @param modelMap the model map
	 * @param vhlinfor the vhlinfor
	 * @param baseinfor the baseinfor
	 * @param request the request
	 * @return the string
	 * @Description: (提交到车辆信息页面)
	 * @author tangwenwu
	 * @date 2017-2-28 10:57:59
	 */
	@RequestMapping("/goToVehicleScreen.do")
	public String goToVehicleinfor(ModelMap modelMap,Vhlinfor vhlinfor,
			Baseinfor baseinfor,HttpServletRequest request){
		logger.info("Starts go to the vehicle screen the phone No is: "+vhlinfor.getLcnno());
		int lastImplementPage=2;
		String dptCode = request.getParameter("deptno");
		String deptAddress = request.getParameter("deptAddress");
		String lcNo = request.getParameter("lcnno");
		//如果从从首页到登录再跳转过来需要转码，先登录后调到首页再过来则不需要转码
		if("get".equalsIgnoreCase(request.getMethod())){
			try {
				lcNo = new String(lcNo.getBytes("iso8859-1"), "utf-8");
				deptAddress = new String(deptAddress.getBytes("iso8859-1"), "utf-8");
			} catch (UnsupportedEncodingException e) {
				StringWriter sw = new StringWriter();  
				e.printStackTrace(new PrintWriter(sw, true));  
				String str = sw.toString();
				logger.error("goToVehicleinfor 字符编码异常： "+str);
			}
		}
		vhlinfor.setLcnno(lcNo);
		baseinfor.setDeptno(dptCode);
		baseinfor.setDeptAddress(deptAddress);
		baseinfor.setLastImplementPage(lastImplementPage);
		Userinfor user = null;
		InsuranceDetailsVO insuranceDetails=null;
		HttpSession session = request.getSession();
		String sessionId = session.getId();
		
		logger.info("--------首页的sessionId---------:"+sessionId);
		
		if (StringUtils.checkStringEmpty(baseinfor.getOrderno())
				&& session.getAttribute(baseinfor.getOrderno() + "insuranceDetailsVO") != null) {
			insuranceDetails = (InsuranceDetailsVO) session
					.getAttribute(baseinfor.getOrderno() + "insuranceDetailsVO");
		} else if (insuranceDetails == null) {
			InsuranceDetailsVO insuranceDetailsVo = InsuranceDetailsVOHelp
					.initInsuranceDetailsVO();
			insuranceDetails = insuranceDetailsVo;
		}
		
		insuranceDetails.setVhlinfor(vhlinfor);
		insuranceDetails.setBaseinfor(baseinfor);
		
		//Start 获取登录用户的信息，并给大对象赋值
		if(session.getAttribute("loginUser")!=null){
			user = (Userinfor)session.getAttribute("loginUser");
			int pageFlag = insuranceDetails.getUserinfor().getPageFlag();
			user.setPageFlag(pageFlag);
			insuranceDetails.setUserinfor(user);			
			insuranceDetails.getBaseinfor().setUserinforid(user.getUserid());			
		}
		
		InsuranceDetailsVO insuranceDetailsVO = insuranceService.goToVehicleinfor(insuranceDetails);
		modelMap.addAttribute("insuranceDetailsVO",insuranceDetailsVO);
		
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("insurance", insuranceDetailsVO);
		map.put("loginflag", true);
		//数据存进redis
		operateRedis.addToHash(map,sessionId);
		
		logger.info("Ends go to the vehicle screen the phone No is: "+request.getParameter("lcnno"));
		return  "vehicleInfor";
	}
	
	/**
	 * Modle serach by vin.
	 *
	 * @param vhlinfor the vhlinfor
	 * @param httprequest the httprequest
	 * @param response the response
	 * @return the list
	 * @Description: (这里用一句话描述这个方法的作用)
	 * @author tangwenwu
	 * @date 2017-3-6 18:09:59
	 */
	@RequestMapping("/modelSerachByVin.do")
	public @ResponseBody
	List<Map<String, Object>> modleSerachByVin(@RequestBody Vhlinfor vhlinfor,
			HttpServletRequest request, HttpServletResponse response) {
		logger.info("Modle SerachBy Vin Start the Vin No is： "+ vhlinfor.getVinno());
        
		HttpSession session = request.getSession();
		String sessionId = session.getId();
		InsuranceDetailsVO insuranceDetails = null;
		Map<byte[], byte[]> mapbyte = operateRedis.getHash(sessionId);
		Map<String,Object> map = MapUtil.resolveByteMap(mapbyte);
		
		if (StringUtils.checkStringEmpty(sessionId)) {			                                      
			insuranceDetails = (InsuranceDetailsVO) map.get("insurance");
			List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
			insuranceDetails.setVhlinfoList(list);
		}
		if (insuranceDetails == null) {
			InsuranceDetailsVO insuranceDetailsVo = InsuranceDetailsVOHelp
					.initInsuranceDetailsVO();
			insuranceDetails = insuranceDetailsVo;
		}
				
		InsuranceDetailsVO insuranceDetailsVO = insuranceService.modleSerachByVin(vhlinfor,insuranceDetails );
		Map<String,Object> map1 = new HashMap<String,Object>();
		map1.put("insurance", insuranceDetailsVO);
		operateRedis.addToHash(map1,sessionId);
		
		logger.info("Modle SerachBy Vin Ends the result data is： "+ insuranceDetailsVO.getVhlinfoList());
		return insuranceDetailsVO.getVhlinfoList();

	}
	
	/**
	 * Modle serach by name.
	 *
	 * @param vhlinfor the vhlinfor
	 * @param httprequest the httprequest
	 * @param response the response
	 * @return the list
	 * @Description: (这里用一句话描述这个方法的作用)
	 * @author tangwenwu
	 * @date 2017-3-6 18:09:59
	 */
	@RequestMapping("/modelSerachByName.do")
	public @ResponseBody List<Map<String, Object>> modleSerachByName(@RequestBody Vhlinfor vhlinfor,
			HttpServletRequest request,HttpServletResponse response){	
		logger.info("Modle SerachBy Name Start the VhlName  is"+vhlinfor.getVehiclename());	
		
		HttpSession session=request.getSession();
		String sessionId = session.getId();
		InsuranceDetailsVO insuranceDetails=null;
		Map<byte[], byte[]> mapbyte = operateRedis.getHash(sessionId);
		Map<String,Object> map = MapUtil.resolveByteMap(mapbyte);
		
		if (StringUtils.checkStringEmpty(sessionId)) {			                                      
			insuranceDetails = (InsuranceDetailsVO) map.get("insurance");
			List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
			insuranceDetails.setVhlinfoList(list);
		}
		if (insuranceDetails == null) {
			InsuranceDetailsVO insuranceDetailsVo=InsuranceDetailsVOHelp.initInsuranceDetailsVO();
			insuranceDetails=insuranceDetailsVo;
		}
		
		InsuranceDetailsVO insuranceDetailsVO = insuranceService.modleSerachByName(vhlinfor, insuranceDetails);
		Map<String,Object> map1 = new HashMap<String,Object>();
		map1.put("insurance", insuranceDetailsVO);
		operateRedis.addToHash(map1,sessionId);
		
		logger.info("Modle SerachBy Name Ends the result data is： "+insuranceDetailsVO.getVhlinfoList());
		return insuranceDetailsVO.getVhlinfoList();
	}
	
	@RequestMapping("/modelSearchFromSinosafe.do")
	@ResponseBody
	public List<Map<String, Object>> modelSearchFromSinosafe(@RequestBody Vhlinfor vhlinfor,
			HttpServletRequest request,HttpServletResponse response){
		HttpSession session=request.getSession();
		String sessionId = session.getId();
		InsuranceDetailsVO insuranceDetails=null;
		Map<byte[], byte[]> mapbyte = operateRedis.getHash(sessionId);
		Map<String,Object> map = MapUtil.resolveByteMap(mapbyte);
		
		if (StringUtils.checkStringEmpty(sessionId)) {			                                      
			insuranceDetails = (InsuranceDetailsVO) map.get("insurance");
			List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
			insuranceDetails.setVhlinfoList(list);
		}
		if (insuranceDetails == null) {
			InsuranceDetailsVO insuranceDetailsVo=InsuranceDetailsVOHelp.initInsuranceDetailsVO();
			insuranceDetails=insuranceDetailsVo;
		}
		
		InsuranceDetailsVO insuranceDetailsVO = insuranceService.modleSerachFromSinosafe(vhlinfor, insuranceDetails);
		Map<String,Object> map1 = new HashMap<String,Object>();
		map1.put("insurance", insuranceDetailsVO);
		operateRedis.addToHash(map1,sessionId);
		
		logger.info("Modle Serach From Sinosafe Ends the result data is： "+insuranceDetailsVO.getVhlinfoList());
		return insuranceDetailsVO.getVhlinfoList();
	}
	
    /**
     * 
    * @Title: onSumbitAction 
    * @Description: TODO(提交车辆信息) 
    * @param @param modelMap
    * @param @param vhlinfor
    * @param @param baseinfor
    * @param @param httprequest
    * @param @param response
    * @param @return    设定文件 
    * @return String    返回类型 
    * @throws
     */
	@RequestMapping("/vehicleSumbit.do")
	public String onSumbitAction(ModelMap modelMap,Vhlinfor vhlinfor,Baseinfor baseinfor,
			HttpServletRequest httprequest,HttpServletResponse response){
		
		String sessionId = httprequest.getSession().getId();
		logger.info("-------------车辆信息页面的sessionID-----------------："+sessionId);
		int lastImplementPage=3;
		baseinfor.setLastImplementPage(lastImplementPage);
		InsuranceDetailsVO insuranceDetails = null;
		String Chgownerflag = "";
		if(vhlinfor!=null){
			if(vhlinfor.getChgownerflag()!=null){
				
			}else{
				vhlinfor.setChgownerflag("0");
				Chgownerflag = vhlinfor.getChgownerflag();
			}
			
		}		
		if (StringUtils.checkStringEmpty(sessionId)) {
			//从redis里面获取数据
			Map<byte[], byte[]> mapbyte = operateRedis.getHash(sessionId);
			Map<String,Object> map = MapUtil.resolveByteMap(mapbyte);
			insuranceDetails = (InsuranceDetailsVO) map.get("insurance");
			if(insuranceDetails!=null){
				logger.info("----orderNo is-----:"+insuranceDetails.getBaseinfor().getOrderno());
			}
			if(Chgownerflag.endsWith("0")){
				insuranceDetails.getVhlinfor().setChgownerflag(Chgownerflag);
				insuranceDetails.getVhlinfor().setTransferdate(null);
			}
		} else {
			InsuranceDetailsVO insuranceDetailsVo = InsuranceDetailsVOHelp
					.initInsuranceDetailsVO();
			insuranceDetails = insuranceDetailsVo;
		}
		if(insuranceDetails.getUserinfor().getPageFlag()<3){
			insuranceDetails.getUserinfor().setPageFlag(3); //如果首次进入到车辆信息(vehicleinfor)页面,将pageFlag状态改变为3
		}
		
		
		logger.info("vehicle information sumbit Start the Vin No  is:"+vhlinfor.getVinno());
		InsuranceDetailsVO insuranceDetailsVO = insuranceService.saveVehicleDate(vhlinfor,baseinfor, insuranceDetails);	
		modelMap.addAttribute("insuranceDetailsVO",insuranceDetailsVO);
		
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("insurance", insuranceDetailsVO);
		map.put("loginflag", "false");
		
		//数据存进redis
		operateRedis.addToHash(map,sessionId);
		logger.info("vehicle information sumbit Ends the Vin No  is:"+vhlinfor.getVinno());	
		return "coveinfor";
	}
	/**
	 * 
	* @Title: getAlldeptinfor 
	* @Description: TODO获取地区编码
	* @param @param response
	* @param @return    设定文件 
	* @return List<Dptinfor>    返回类型 
	* @throws
	 */
	@RequestMapping("/getDptCode.do")
	public @ResponseBody
	List<Dptinfor> getAlldeptinfor(HttpServletResponse response) {

		List<Dptinfor> dptinfors = insuranceService.getAlldeptinfor();

		return dptinfors;
	}
	
	/**
	 * 返回车辆信息页面
	 * @return
	 */
	@RequestMapping("/backToVehicleScreen.do")
	public String backToVehicleinfor(HttpServletRequest request,ModelMap modelMap){
		String orderNo = request.getParameter("orderNo");
		
		String sessionId = request.getSession().getId();
		InsuranceDetailsVO insuranceDetails=null;
		Map<byte[], byte[]> mapbyte = operateRedis.getHash(sessionId);
		Map<String,Object> map = MapUtil.resolveByteMap(mapbyte);
		
		if (StringUtils.checkStringEmpty(sessionId)) {			                                      
			insuranceDetails = (InsuranceDetailsVO) map.get("insurance");
		}
		if (insuranceDetails == null) {
			InsuranceDetailsVO insuranceDetailsVo = InsuranceDetailsVOHelp.initInsuranceDetailsVO();
			insuranceDetails = insuranceDetailsVo;
		}
		/*if(insuranceDetailsVO.getUserinfor().getPageFlag()==0){
			insuranceDetailsVO.getUserinfor().setPageFlag(2); //我的订单中继续投保到这个页面时，pageFlag为0，手动给其赋值2
		}*/
		modelMap.addAttribute("insuranceDetailsVO", insuranceDetails);
		return "vehicleInfor";
	}


}
