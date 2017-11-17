//切换注册和退出
$(document).ready(function(){
	if($('.removea').text().length>5){
		$('.select_a').children(".regist").remove();
		$('.select_a').children(".out_user").removeClass("hidden");
	}else{
		$('.regist').removeClass('hidden');
		$('.select_a').children(".out_user").remove();
	}
});

//头部(header.jsp)浮动
$(document).ready(function(){
	$(window).scroll(function(){
		if($('html').scrollTop()>120||$(document).scrollTop()>120){
			$('#head_top').addClass('fead').css('background','linear-gradient(90deg, #dcdcdc 10%, #e3e3e3 20%, #dcdcdc 80%)')
		}else{
			$('#head_top').removeClass('fead').css('background','linear-gradient(90deg, #dcdcdc 10%, #e3e3e3 20%, #dcdcdc 80%)')
		}
	});
});

//退出账户
function login(){
	var address = $('#demo1').val();
	var chepai = $('#lcno').val();
	var dptcode = $('#dptcode').val();
	var phoneNo=$("#phoneno").val();
	if(address==null||"undefined"===address||""===address){
		address=$("#city").val();
	}
	if(userName!="登录"){
		/*e.preventDefault();*/
		if(window.confirm("确定退出当前账户吗？")){
			window.location.href=getUrl()+"/loginUser/logout.do";
		}
	}else{
		window.location.href=getUrl()+"/views/jsp/loginUser.jsp?address="+address+"&chepai="+chepai+"&dptcode="+dptcode+"&phoneno="+phoneNo;
	}
}

//登录之后点击用户名，去掉事件
$(".removea").click(function () {
	if($('.removea').text().length>5){
		$('.removea').attr("onclick", "");
		return false;
	}
});