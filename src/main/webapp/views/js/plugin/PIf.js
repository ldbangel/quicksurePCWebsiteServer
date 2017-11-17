//点击全选框
$('.check>input').click(function(){
	if($(this).parent('label').hasClass('Check_All')){//如果点击的是全选框按钮
		
		var select_chil=$('#table_list select').children(':nth-child(2)');//下拉列表的第二个值
		var all_chil=$('.check').children();//获取不计免赔对象
		
		if($(this).attr('checked')=="checked"){	//如果点击之后是选中
			select_chil.attr('selected',"selected");//那么将默认选中下拉列表中的第二个值			
			$('.check').addClass('check_on');//勾选上不计免赔
			all_chil.attr('checked','checked')//将不计免赔选中
		}else{	
			select_chil.removeAttr('selected');//取消选中的第二个值		
			$('.check').removeClass('check_on');//不计免赔取消勾选
			all_chil.removeAttr('checked');//取消选中不计免赔
		}
	}else if($(this).attr('checked')=='checked'){//如果点击的是不计免赔并选中
		
			$(this).attr('checked','checked');//那么选中不计免赔
			$(this).parent().addClass('check_on');//勾选上不计免赔
			$(this).parents("td").siblings().eq(1).find('option:nth-child(2)').attr('selected',"selected");//下拉列表的第二个值默认选中
	}else{		//点击不计免赔并取消选中	
			var Check_all=$('.Check_All');
		    Check_all.children().removeAttr('checked');//取消选中全选框
		    Check_all.removeClass('check_on');//取消勾选全选框
	        $(this).removeAttr('checked');//取消选中不计免赔
	        $(this).parent().removeClass('check_on');//取消勾选不计免赔
	        
	  }
});
//点击单选按钮
$('.selt_box>input').click(function(){
	if($(this).parent().hasClass('has')){//交强险是
		$('#JQ_DATE').val($('#SY_DATE').val());
		$(this).attr('checked','checked');
		$(this).parent().siblings("label").removeAttr('checked');
	}else if($(this).parent().hasClass('hsa')){//交强险否
		$('#JQ_DATE').val('')
	}else if($(this).parent().hasClass('nsy')){//商业险否
		$('#SY_DATE').val('')
	}else if($(this).parent().hasClass('sy')){
		if($('#JQ_DATE').val()!==null){
			$('#SY_DATE').val($('#JQ_DATE').val())
		}
	}
    if($(this).attr('checked')=="checked"){
	     $(this).parent().addClass("sel_on");
	     $(this).parent().siblings("label").removeClass("sel_on");
	}
});

//点击投保险种，自动选择不计免赔
$('select').change(function(){
var checked=$(this).parents('td').siblings().eq(1).find('.check');
if($(this).children(":selected").index()!=0){
         
	checked.addClass('check_on')
	checked.children('input').attr('checked',"checked")
   }else{
	    var Check_all=$('.Check_All');
	    Check_all.children().removeAttr('checked');//取消选中全选框
	    Check_all.removeClass('check_on');//取消勾选全选框
	    checked.removeClass('check_on');
		checked.children('input').removeAttr("checked");
	}

});
/*$('#table_list select').change(function(){
	var Check_all=$('.Check_All');
	if($(this).find('option:nth-child(1)').attr('selected')=='selected'){
		$(this).parent('td').siblings().eq(1).children('input').removeAttr('checked');
		$(this).parent('td').siblings().eq(1).children('label').removeClass('check_on');		
	    Check_all.children().removeAttr('checked');//取消选中全选框
	    Check_all.removeClass('check_on');//取消勾选全选框
		
	}else{
		$(this).parent('td').siblings().eq(1).find('.check').attr('checked','checked');
		$(this).parent('td').siblings().eq(1).children('label').addClass('check_on');
		
	}
})*/


function nextDate(){
	var t=new Date();
	var iToDay=t.getDate();
	var iToMon=t.getMonth();
	var iToYear=t.getFullYear();
	var newDay = new Date(iToYear,iToMon,(iToDay+1));
	return newDay;
}

$(function () {
	$("#JQ_DATE").calendar({
		controlId: "divDate",                                 
		speed: 200,                                          
		complement: true,                                     
		readonly: true,                                       
        upperLimit: new Date('2020/12/1'),                               
		lowerLimit: nextDate()                
		/*callback: function () {                               
			alert("��ѡ��������ǣ�" + $("#Date").val());
		}*/
	});
	$("#SY_DATE").calendar({
		controlId: "Datediv",                                 
		speed: 200,                                           
		complement: true,                                     
		readonly: true,                                      
        upperLimit: new Date('2020/12/1'),                               
		lowerLimit: nextDate()                
		/*callback: function () {                               
		 alert("��ѡ��������ǣ�" + $("#Date").val());
		 }*/
	});

});