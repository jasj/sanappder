function timePicker(objs){
		timePickerString = '<fieldset class="ui-field-contain">';
		$.each(objs,function(index,obj){
			timePickerString = timePickerString + "<option value='"+obj["idTime"]+"'>"+obj["amount"]+" "+obj["unit"]+"</option>";
		});
		return timePickerString+"</fieldset>";
	}
function addRules(objs){
	var toAppend = '';				
	$.each(objs,function(index,obj){
		toAppend +=  "<li class='rule' id='rule_"+obj["idRule"]+"'><h3>"+obj["ruleName"]+"</h3>";
	//	toAppend +=  " <div class='onoffswitch'><input type='checkbox' name='onoffswitch' class='onoffswitch-checkbox' id='switchRule"+obj["idRule"]+"' "+(obj["active"] ? "checked" : "")+">";
		toAppend +=   "<div class='onoffswitch'><input type='checkbox' name='toggle_"+obj["idRule"]+"' id='toggle_"+obj["idRule"]+"' class='toggle' "+(obj["active"] ? "checked" : "")+"><label for='toggle_"+obj["idRule"]+"'></label></div>";
		toAppend +=  "<div class='dropdownBox'>";
		toAppend +=  "<p>"+obj["description"].replace(/<\[singleAmount\]>/g,"<singleAmount>"+obj['singleAmount']+"</singleAmount>").replace(/<\[trxNo\]>/g,"<trxNo>"+obj['trxNo']+"</trxNo>").replace(/<\[idTime\]>/g,"<idTime>"+obj['idTime']+"</idTime>").replace(/<\[totalAmount\]>/g,"<totalAmount>"+obj['totalAmount']+"</totalAmount>").replace(/<\[varation\]>/g,"<varation>"+obj['varation']+"</varation>") +"</p><div class='editOption'><ul>";
	//	toAppend += "<div class='rule_body'><p align='justify' style='100%'>"+obj["description"].replace(/<\[singleAmount\]>/g,"<singleAmount>"+obj['singleAmount']+"</singleAmount>").replace(/<\[trxNo\]>/g,"<trxNo>"+obj['trxNo']+"</trxNo>").replace(/<\[idTime\]>/g,"<idTime>"+obj['idTime']+"</idTime>").replace(/<\[totalAmount\]>/g,"<totalAmount>"+obj['totalAmount']+"</totalAmount>").replace(/<\[varation\]>/g,"<varation>"+obj['varation']+"</varation>") +"</p><table>";
		if("trxNo" in obj ) toAppend = toAppend + "<li><h4>"+$.t("Trx No.")+"</h4><input type='tel' field='trxNo' maxlength='10'  placeholder='"+obj["trxNo"]+"'> <span class='icon-pencil'></span></li>";
		if("singleAmount" in obj ) toAppend = toAppend + "<li><h4>"+$.t("Amount")+"</h4><input type='tel' field='singleAmount' maxlength='10'  placeholder='"+obj["singleAmount"]+"'/><span class='icon-pencil'></span></li>";
		if("totalAmount" in obj ) toAppend = toAppend + "<li><h4>"+$.t("Total Amount")+"</h4><input type='tel' field='totalAmount' maxlength='10'  placeholder='"+obj["totalAmount"]+"'/><span class='icon-pencil'></span></li>";
		if("varation" in obj ) toAppend = toAppend + "<li><h4>"+$.t("Variation")+"</h4><input type='tel' field='varation' maxlength='10' placeholder='"+obj["varation"]+"'/></td></tr>";
		if("idTime" in obj ) toAppend = toAppend + "<li><h4>"+$.t("Time")+"</h4><select class='SelectStyle'>"+SPickerString+"</select></li>";
		toAppend = toAppend + "</ul></div></div> </li>";
	//	$('#rules .products>ul').append(toAppend);
		//if("idTime" in obj ) {
		   // $('#rule_'+obj["idRule"]+' select option[value="'+obj["idTime"]+'"]').prop('selected', true); $('idTime:last').html($('select:last option[value="'+obj["idTime"]+'"]').html());}
	});
	$('#rules .products').html("<ul>"+toAppend+"</ul>");
	$('#rules .products select').each(function(){
		var idTime = $(this).parent().parent().parent().parent().find('idTime').html();
		$(this).find('option[value="'+idTime+'"]').prop('selected', true);
		$(this).parent().parent().parent().parent().find('idTime').html($(this).find('option[value="'+idTime+'"]').html());
		
	});
	
	
	$('#rules_div').append("<div style='width: 100%; height: 150px;'></div>");
	$(".refreshing_list").hide();
	myScrolll = new IScroll('#listProducts', {preventDefault: false, useTransition: true });

}

function getRules(productName,openRule){
	addRules(getRuleSet(productName));
	if(openRule != undefined){
		$("#rule_"+openRule).find('.dropdownBox').toggle();
		$("#rule_"+openRule).toggleClass('active');
	}
/*	$.post('http://'+IP+':8089/appriz/getRulesByProduct',{"idSecretClient": idScretClient,"productName":productName,},function(data){
			if (data["status"]== 200){
				console.log(data["rules"]);
				addRules(data["rules"]);
			}
		
	},'json') .fail(function(e) {
		//	alert("conexion error!");
		//alert( JSON.stringify(e));
	}).done(function(){$('.refreshing_list').hide(); });
	*/
}


function addRuleChange(idRule,field,value,active){
	if (!(idRule in  rulesChanges)){
		rulesChanges[idRule] = {"idRule" : idRule,"active" : $("[name=toggle_"+idRule+"]").prop("checked")}
	}
		rulesChanges[idRule][field] = parseInt(value);
		
		console.log(JSON.stringify(rulesChanges));
}
		

function getValidTimePeriods(prd,openRule){
	
		$.post('http://'+IP+':8089/appriz/getTimePeriods',{"secretKey" : secretKey},function(data){
		if (data["status"]== 200){
			SPickerString = timePicker(data["periods"]);
		}
		
	},'json') .fail(function(e) {
			showInfoD($.t("Offline Mode"),$.t("This option is disabled in Offline Mode"),function(){back=["inbox","inbox"];$(".imglogo").trigger("tapend")});
	}).done(function(){
		getRules(prd,openRule);
	});
	
}
function merge_options(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}


function processRuleChange(){
	console.log("processRuleChange START")
	var tmp_ruleChange = [];
	for ( ruleChange in rulesChanges){
		tmp_ruleChange.push(rulesChanges[ruleChange]);
	}
	rulesChanges = {};
	console.log(JSON.stringify(tmp_ruleChange));
	
	for(var r= 0 ; r < tmp_ruleChange.length; r++){
		productBag[currentProduct] = productBag[currentProduct].map(function(_rule){
			console.log("REGLAS> ", _rule.idRule,tmp_ruleChange[r].idRule );
			if(_rule.idRule == tmp_ruleChange[r].idRule){
				 
				obj = merge_options(_rule,tmp_ruleChange[r]);
				obj.active =  $("[name=toggle_"+_rule.idRule+"]").prop("checked");
				return obj
			}
			else{
				return _rule;
			}
			console.log("prdr ",_rule);
		});
	}
	console.log("processRuleChange END")
	return tmp_ruleChange;
}
		

$( document ).on("tapend","[page-content=rules]",function(ev){
	try{
	var endY = ev.pageY || ev.originalEvent.changedTouches[0].pageY;
	if(Math.abs(startTap.Y - endY) < 10){
		$('#rules .products').html("<div class='refreshing_list'><i class='fa fa-spinner fa-spin'></i></div>");
		$("#rules .productNav li").eq(1).find("button").html($(this).find("prd").html());
		getValidTimePeriods($(this).find("prd").html());
	}else{
		ev.stopPropagation();
	}
	}catch(e){
		
	}
		
});


$( document ).on('tapend','.rule',function(ev){
		
	var endY = ev.pageY || ev.originalEvent.changedTouches[0].pageY;
	if(Math.abs(startTap.Y - endY) < 10){
		$('.rule.active').not($(this)).removeClass('active');
		$('.dropdownBox').not($(this).find('.dropdownBox')).hide();
		$(this).find('.dropdownBox').toggle();
		$(this).toggleClass('active');
	}
});

$( document ).on('tapend','.dropdownBox',function(event){
	event.stopPropagation();
});

//change values on rule description
$(document).on('keyup','.rule input[type=tel]',function(){
		
		$(this).parent().parent().parent().parent().parent().find($(this).attr('field')).html($(this).val());
		$(this).parent().parent().find('input[type=tel]').each(function(){
			addRuleChange($(this).parent().parent().parent().parent().parent().attr('id').replace(/rule_(\S+)/,"$1"),$(this).attr('field'),$(this).val() == null || $(this).val() == "" ? $(this).attr("placeholder")  : $(this).val() );	
		});
		$(this).parent().parent().find('.SelectStyle').each(function(){
		
			addRuleChange($(this).parent().parent().parent().parent().parent().attr('id').replace(/rule_(\S+)/,"$1"),'idTime',$(this).find('option:selected').val());
		});
		
		$(this).parent().parent().parent().parent().parent().find('input[type=checkbox]').attr('checked','true');
});

$(document).on('change','.SelectStyle',function(){
		$(this).parent().parent().parent().parent().parent().parent().find('idTime').html($(this).find('option:selected').html());
		$(this).css({"color" : "#1A73B6"});
		$(this).parent().parent().find('input[type=tel]').each(function(){
			addRuleChange($(this).parent().parent().parent().parent().parent().attr('id').replace(/rule_(\S+)/,"$1"),$(this).attr('field'),$(this).val() == null || $(this).val() == "" ?    $(this).attr("placeholder") : $(this).val(),true);	
		});
		addRuleChange($(this).parent().parent().parent().parent().parent().attr('id').replace(/rule_(\S+)/,"$1"),'idTime',$(this).find('option:selected').val(),true);
		$(this).parent().parent().parent().parent().parent().find('input[type=checkbox]').attr('checked','true');
		
	});


//active rule
$( document ).on("tapend",'input.toggle + label',function(e){
		e.stopPropagation();
		var rId = $(this).parent().parent().attr('id').replace(/rule_(\S+)/,"$1");
		console.log(rId);
		if($(this).prev().is(":checked")){
			console.log('checked');
			$('.dropdownBox').not($(this).parent().parent().find(".dropdownBox")).hide();
			$(this).parent().parent().find(".dropdownBox").show();
			$('.rule.active').not($(this).parent().parent()).removeClass('active');
			$(this).parent().parent().addClass('active');
			$(this).parent().parent().find('.dropdownBox input').each(function(){
				console.log('table input');
				addRuleChange(rId,$(this).attr('field'),$(this).val() == "" ? $(this).attr("placeholder") : $(this).val(),true);
				
			});
			$(this).parent().parent().find('option:selected').each(function(){
				addRuleChange(rId,'idTime',$(this).val(),true);
			});

		}else{
			addRuleChange(rId,"none","",false)
			rulesChanges[rId] = {"idRule" : rId} // disable rule
			$(this).parent().parent().find(".dropdownBox").hide();
			$(this).parent().parent().removeClass('active');
		}
	});
	
$( document ).on("tapend",".icon-pencil",function(){
//	$(this).prev().focus();
});
	
//avoid non numeric symbols
 $(document).on("keydown",".rule input[type=tel]",function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
             // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
             // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            $(this).val(0);
			e.preventDefault();
			
        }
    });
	
	
	
function getRuleSet(product){
	const regex = /(FASE \d):/;
	let m;

	var set;
	
	if(product in productBag){
			set = productBag[product];
	}else{
		if ((m = regex.exec(product)) !== null) {
		// The result can be accessed through the `m`-variable.
		m.forEach((match, groupIndex) => {
			console.log("mathc: ",match);
			console.log("set: ", rulePhaseSet[match])
			set = rulePhaseSet[match];
			productBag[product] = set;
		});
	}
	}
	
	
	return set;
	
	
}


productBag ={
	
}

rulePhaseSet = {
	"FASE 1" : [
	  {
		"idRule": "R1",
		"ruleName": "Transacciones Internacionales",
		"active": true,
		"description": "Si activa esta regla, no permitira utilizar su tarjeta en el extranjero"
	  },
	  {
		"idRule": "R2",
		"ruleName": "Transacciones en Internet",
		"active": true,
		"description": "Si activa esta regla, no permitira utilizar su tarjeta para compras en internet."
	  },
	  {
		"idRule": "R3",
		"ruleName": "Retiros en ATM",
		"active": true,
		"description": "Si activa esta regla, no permitira utilizar su tarjeta retiros en ATM."
	  },
	  {
		"idRule": "R4",
		"ruleName": "Estaciones de Servicio",
		"active": true,
		"description": "Si activa esta regla, no permitira utilizar su tarjeta en estaciones de servicio."
	  } ,
	  {
		"idRule": "R5",
		"ruleName": "Casinos",
		"active": true,
		"description": "Si activa esta regla, no permitira utilizar su tarjeta para casinos."
	  },
	  {
		"idRule": "R6",
		"ruleName": "Supermercados",
		"active": true,
		"description": "Si activa esta regla, no permitira utilizar su tarjeta para supermercados."
	  }
	 ],
	 "FASE 2": [
	  {
		"idRule": "R7",
		"ruleName": "Monto máximo en el extranjero",
		"active": false,
		"description": "No permitir transaccione en el extranjero por montos superiores a <[singleAmount]> pesos.",
		"singleAmount": 200
	  },
	  {
		"idRule": "R8",
		"ruleName": "Acumulado máximo en el extranjero",
		"active": false,
		"description": "No permitir más de <[singleAmount]> pesos en un día de compras hechas en el extranjero",
		"singleAmount": 200
	  },
	  {
		"idRule": "R9",
		"ruleName": "Monto máximo de compra en Internet",
		"active": false,
		"description": "No permitir transaccione en Internet por montos superiores a <[singleAmount]>",
		"singleAmount": 200
	  },
	  {
		"idRule": "R10",
		"ruleName": "Monto máximo de Retiros en ATM",
		"active": false,
		"description": "No permitir retiros en ATM por montos superiores a <[singleAmount]>",
		"singleAmount": 200
	  }
	
	 ],
	 "FASE 3":[
	  {
		"idRule": "R11",
		"ruleName": "Acumulado en lapzo en el Extranjero",
		"active": false,
		"description": "No permitir gastar más de  <[totalAmount]> pesos en un lapso de <[idTime]> para compras en el extranjero",
		"totalAmount": 800000,
		"idTime": 199
	  },
	  {
		"idRule": "R12",
		"ruleName": "Acumulado en lapzo para el Internet",
		"active": false,
		"description": "No permitir gastar más de  <[totalAmount]> pesos en un lapso de <[idTime]> para compras en el extranjero",
		"totalAmount": 4300,
		"idTime": 1
	  },
	  {
		"idRule": "R13",
		"ruleName": "Cantidad de Retiros en ATM",
		"active": false,
		"description": "No permitir más de <[trxNo]> retiros en ATM en un lapso de <[idTime]>",
		"trxNo": 122,
		"idTime": 1
	  }
	 ]
}