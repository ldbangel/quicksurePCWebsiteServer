package com.quicksure.pc.consumer.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.quicksure.insurance.entity.Userinfor;


public class LudiMobileFilter implements Filter {

	
	public void destroy() {
		// TODO Auto-generated method stub
	}
	
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {		 
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse resp = (HttpServletResponse) response;
		HttpSession session = req.getSession();
		String path = req.getContextPath();
		String url = req.getRequestURI();
		Userinfor user = (Userinfor) session.getAttribute("loginUser");
		
		String conString = req.getHeader("REFERER"); //获取父url
		if (url.endsWith(".jsp") || url.endsWith(".do")) {
			//如果不是按顺序走的页面进来,重定向到首页
			if ("".equals(conString) || null == conString) {
				String servletPath = req.getServletPath();
				if (servletPath.indexOf("loginUser") >= 0
						|| servletPath.indexOf("quickSurehome") >= 0
						|| servletPath.indexOf("MP_verify_PPlSQIplLY8fbefx.txt") >= 0
						|| servletPath.indexOf("/paymentCompleteServlet/goPaymentSucessPage.do")>=0
						|| servletPath.indexOf("/login.jsp")>=0
						|| servletPath.indexOf("/paymentComplete.do")>=0
						|| servletPath.indexOf("/goToFirstScreen.do")>=0
						|| servletPath.indexOf("/goToMyAccount.do")>=0
						|| servletPath.indexOf("/infor_publish.jsp")>=0){
					chain.doFilter(request, response);
				} else { // 当前请求url
					resp.sendRedirect(path + "/views/jsp/quickSurehome.jsp");
				}
			//判断哪些功能或者页面是不需要过滤的
			} else if (url.endsWith("/loginUser.jsp") //登录页
					|| url.endsWith("/quickSurehome.jsp") //首页
//					|| url.endsWith("goToVehicleScreen.do") //可以进入第二页 车辆信息页
					|| url.endsWith("/footer.jsp") 
					|| url.endsWith("header.jsp")
					|| url.endsWith("getDptCode.do")
					|| url.endsWith("checkPhoneCode.do")
					|| url.endsWith("userLogin.do")
					|| url.endsWith("phoneCheck.do")
					|| url.endsWith("/registUser.jsp")
					|| url.endsWith("registUser.do")
					|| url.endsWith("resetPassword.do")
					|| url.endsWith("/resetPassword.jsp")
					|| url.endsWith("goPaymentSucessPage.do")
					|| url.endsWith("paymentComplete.do")
					|| url.endsWith("userEverRegist.do")
					|| url.endsWith("goToFirstScreen.do")
					|| url.endsWith("goToMyAccount.do")
					|| url.endsWith("checkAgentCode.do") //注册时代理人识别码校验
					|| url.endsWith("/login.jsp")
					|| url.endsWith("/getVerify.do")
					|| url.endsWith("/checkVerify.do")
					|| url.endsWith("/batch_search.jsp")
					|| url.endsWith("/modelSerachByVin.do")
					|| url.endsWith("/modelSerachByName.do")
					|| url.endsWith("/infor_publish.jsp")){
				chain.doFilter(request, response);
			}else if (user == null) {//如果用户没有登录就调转到登录页面
				if(url.endsWith("/myAccount.jsp")){
					req.getRequestDispatcher("/views/jsp/loginUser.jsp?action=myaccount")
						.forward(request, response);
				}else{
					// 跳转到登陆页面
					req.getRequestDispatcher("/views/jsp/loginUser.jsp").forward(request, response);
				}
			} else {
				chain.doFilter(request, response);
			}
		} else {
			chain.doFilter(request, response);
		}
	}

	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub
	}

}
