package com.quicksure.pc.consumer.action;

import java.io.PrintWriter;
import java.io.StringWriter;
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

import com.quicksure.insurance.entity.AgentCode;
import com.quicksure.insurance.entity.OTPGeneration;
import com.quicksure.insurance.entity.Userinfor;
import com.quicksure.insurance.service.InsuranceService;
import com.quicksure.pc.consumer.utils.OperateRedis;
import com.quicksure.pc.consumer.utils.RandomValidateCode;


@Controller
@RequestMapping("/loginUser")
public class LoginContorller {
	private static final Logger logger = Logger
			.getLogger(LoginContorller.class);
	
	@Autowired
	private InsuranceService insuranceService;
	@Resource
	private OperateRedis operateRedis;
	
	/**
	 * 用户登录校验,两种登录方式 方式一通过手机验证码登录;方式二用户名密码登录(通过usertype区分登录方式)
	 * 
	 * @param username
	 * @param password
	 * @param usertype
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/userLogin.do")
	@ResponseBody
	public String userLogin(ModelMap modelMap,String username,String password,
			String usertype, HttpServletRequest request,HttpServletResponse response) 
					throws Exception{
		logger.info("开始进行登录,用户名为 : " + username);
		HttpSession session = request.getSession();
		String sessionId = request.getSession().getId(); 
		String result="";
		try {
			Userinfor userinfo=new Userinfor();
			userinfo.setUsername(username.toLowerCase());
			if(password!=null&&!password.equals("")){
				userinfo.setPassword(password);
			}
			int loginType = Integer.parseInt(usertype);
			userinfo =insuranceService.userExists(userinfo,loginType);
			result = userinfo.getMsg();
			//modelMap.addAttribute("userinfo",userinfo);
			session.setAttribute("loginUser", userinfo);
			logger.info("-----sessionID-----:"+sessionId);
			
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("loginuser", userinfo);
			//数据存进redis
			operateRedis.addToHash(map,sessionId);
			
		} catch (Exception e) {
			StringWriter sw = new StringWriter();  
			e.printStackTrace(new PrintWriter(sw, true));  
			String str = sw.toString();
			logger.error("用户登录服务，返回消息IO异常，异常信息为："+str);
		}
		return result;
	} 
	
	/**
	 *用户密码重置 
	 * @param phoneno
	 * @param password
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/resetPassword.do")
	@ResponseBody
	public String resetPassword(String phoneno,String password, HttpServletRequest request,HttpServletResponse response) throws Exception{
		//根据用户名修改(在登录成功的情况下重置密码,session保存当前登录用户信息,前端页面进行输入框提示,这里只需进行密码修改即可    这里是否需要发送短信通知用户?)
		logger.info("开始进行密码重置操作,手机号为 : " + phoneno);
		String result="";
		try {
			result = insuranceService.resetPassword(phoneno, password);
		} catch (Exception e) {
			StringWriter sw = new StringWriter();  
			e.printStackTrace(new PrintWriter(sw, true));  
			String str = sw.toString();
			logger.info("密码重置异常"+str);
		}
		return result;
	}
	
	/**
	 * 用户注册
	 * @param username
	 * @param password
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/registUser.do")
	@ResponseBody
	public String registUser(String username,String password, String agentCode){
		logger.info("开始进行用户注册操作,手机号为 : " + username);
		String result="";
		try {
			result = insuranceService.registUser(username, password, 1, agentCode);
		} catch (Exception e) {
			StringWriter sw = new StringWriter();  
			e.printStackTrace(new PrintWriter(sw, true));  
			String str = sw.toString();
			logger.info("用户注册异常"+str);
		}
		return result;
	}
	
	/**
	 * 注册判断用户是否注册过
	 * @param username
	 * @return
	 */
	@RequestMapping("/userEverRegist.do")
	@ResponseBody
	public String userEverRegist(String username,HttpServletRequest request,HttpServletResponse response){
		//1表示用户已存在
		String result=insuranceService.userEverRegist(username);
		return result;
	}
	
	/**
	 * 发送验证码到用户手机
	 * 
	 * @param phoneno
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("phoneCheck.do")
	@ResponseBody
	public OTPGeneration phoneCheck(String phoneno,HttpServletRequest request,HttpServletResponse response) throws Exception{
		OTPGeneration Generation=new OTPGeneration();
		try {
			Generation=insuranceService.validateCode(phoneno);
		} catch (Exception e) {
			StringWriter sw = new StringWriter();  
			e.printStackTrace(new PrintWriter(sw, true));  
			String str = sw.toString();
			logger.info("用户注册发送验证码异常"+str);
		}
		return Generation;
	}
	
	/**
	 * 校验手机验证码
	 * 
	 * @param request
	 * @param phoneno
	 * @param checkCode
	 * @return
	 */
	@RequestMapping("checkPhoneCode.do")
	@ResponseBody
	public String checkPhoneCode(HttpServletRequest request,String phoneno,String checkCode){
		String codeExist="";
		try {
			codeExist=insuranceService.phoneCodeExist(phoneno,checkCode);
		} catch (Exception e) {
			StringWriter sw = new StringWriter();  
			e.printStackTrace(new PrintWriter(sw, true));  
			String str = sw.toString();
			logger.info("用户校验手机验证码异常"+str);
		}
		return codeExist;
	}
	
	
	/**
     * 登录页面生成验证码
     */
    @RequestMapping("getVerify.do")
    public void getVerify(HttpServletRequest request, HttpServletResponse response){
        response.setContentType("image/jpeg");//设置相应类型,告诉浏览器输出的内容为图片  
        response.setHeader("Pragma", "No-cache");//设置响应头信息，告诉浏览器不要缓存此内容  
        response.setHeader("Cache-Control", "no-cache"); 
        response.setDateHeader("Expire", 0); 
        RandomValidateCode randomValidateCode = new RandomValidateCode(); 
        try { 
            randomValidateCode.getRandcode(request, response);//输出验证码图片方法  
        } catch (Exception e) { 
        	StringWriter sw = new StringWriter();  
			  e.printStackTrace(new PrintWriter(sw, true));  
			  String str = sw.toString();
			  logger.error("登录页面生成验证码"+str);
        } 
    } 

    /**
     * 登录页面校验验证码
     */
    @RequestMapping("checkVerify.do")
    @ResponseBody
    public String checkVerify(String inputStr, HttpSession session){
        //从session中获取随机数
        String random = (String) session.getAttribute("RANDOMVALIDATECODEKEY");
        if(random.equals(inputStr)){
            return "TURE";//验证码正确
        }else{
            return "FALSE";//验证码错误
        }
    } 
    
    /**
     * 注销账户
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("logout.do")
    public String logout(HttpServletRequest request,HttpServletResponse response){
    	HttpSession session = request.getSession();
    	session.removeAttribute("loginUser");
    	response.setHeader("Cache-Control","no-cache");
    	response.setHeader("Pragma","no-cache");
    	response.setDateHeader ("Expires", 0);
    	return "quickSurehome";
    }
    
    /**
     * 校验代理人识别码
     * @return
     */
    @RequestMapping("checkAgentCode.do")
    @ResponseBody
    public String checkAgentCode(HttpServletRequest request, String agentCode){
    	String agentCode1 = request.getParameter("agentCode");
    	String agentCode2 = (String) request.getAttribute("agentCode");
    	AgentCode agent = insuranceService.validateAgentCode(agentCode);
    	if(agent!=null){
    		return "true";
    	}
    	return "false";
    }
	
}
