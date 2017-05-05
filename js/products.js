
view = "unselect";
function addProducts(products,view){
	console.log(products);
	$(".productNav li").eq(0).find("button").html(view  == "rules" ? '<span class="icon-myAlerts rbtn"><span class="path1"></span><span class="path2"></span></span>': '<span class="icon-services rbtn"><span class="path1"></span></span>');
	for( product in products){
		console.log(product);
		$('#products .products ul').append('<li page-content='+view+'><button><prd>'+product+'</prd><span class="icon-arrow"><span class="path1"></span></button></li>');
	}
	$(".refreshing_list").hide();
	

}
function getProducts(view){
	$('#products p.title').html((view == 'rules' ? 'My Alerts' : 'Services')+'<i class="fa fa-angle-double-right"></i>Products </p>')
	$('#products .products ul').html("<div class='refreshing_list'><i class='fa fa-spinner fa-spin'></i> </div>");
	if(pinPolicy==1){$('#pin').show();}
	
		data = {
			  "status": 200,
			  "products": {
				"FASE 1: Amex 2514": "CAhorro",
				"FASE 1: Súper Cuenta 4810": "TCredito",
				"FASE 2: Visa 5623": "TCredito",
				"FASE 2: Cuenta Free 3258": "TDebito",
				"FASE 3: Súper Nómina": "TDebito",
				"FASE 3: Cuenta Free 3858": "TDebito",
				"FASE 3: MasterCard 4960": "TDebito"
			  }
			}
			if (data["status"]== 200){
				addProducts(data["products"],view);
			}
			
	$()
		/*$.post('http://'+IP+':8089/appriz/getProductsByClient',{"idSecretClient": idScretClient},function(data){
			//console.log(JSON.stringify(data));
		
			
		
	},'json') .fail(function(e) {
		
showInfoD($.t("Offline Mode"),$.t("This option is disabled in Offline Mode"),function(){back=["inbox","inbox"];$(".imglogo").trigger("tapend")});

	}).done(function(){$('#products p.title').html((view == 'rules' ? 'My Alerts' : 'Services')+'<i class="fa fa-angle-double-right"></i>Products </p>')});
*/
}



$( document ).on("tapend","[products]",function(){
	$('header .icon-back').css("color", "#FFFFFF" );
			$('header .icon-menu').css("color", "#FFFFFF" );
	getProducts($(this).attr("products"));
});

$( document ).on('tapend','#products .products li',function(){
	currentProduct = $(this).find("prd").html();
});

$( document ).on("tapend",".back",function(){
backKeyDown()
});
