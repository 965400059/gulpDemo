jQuery.extend({
	myLinkage : function(option){
		var opts = $.extend(false,{
			provinceDom:'#provinceLinkage',
			cityDom:'#cityLinkage',
			countyDom:'#countyLinkage',
			province:'',
			city:'',
			county:''
		},option);
		
		if(opts.cityDom){
			$(opts.provinceDom).change(function() {
				opts.province = $(opts.provinceDom).val();
				setCitys();
			})
		}
		
		if(opts.countyDom){
			$(opts.cityDom).change(function() {
				opts.city = $(opts.cityDom).val();
				setCountys();
			})
		}
		
		function setProvinces(){
			var provinceData = opts.data.map(function(item){
				return item.province;
			})
			
			var provinceList = [];
			provinceData.forEach(function(item){
				if($.inArray(item,provinceList) == -1){
					provinceList.push(item);
				}
			})
			var str = "";
			$.each(provinceList,function(index,item){
				str += '<option value="'+item+'">'+item+'</option>'
			})
			$(opts.provinceDom).append(str);
			$(opts.provinceDom).val(opts.province);
			$(opts.provinceDom).trigger("change"); 
		}
		
		function setCitys(){
			var cityData = opts.data.filter(function(item){
						return item.province == opts.province;
					}).map(function(item){
						return item.city;
					});
					
			var cityList = [];
			
			cityData.forEach(function(item){
				if($.inArray(item,cityList) == -1){
					cityList.push(item);
				}
			})
			
			opts.city = $(opts.cityDom).val()==opts.city?"":opts.city,
			$(opts.cityDom + " option:not(:first)").remove();
			
			var str = "";
			$.each(cityList,function(index,item){
				str += '<option value="'+item+'">'+item+'</option>'
			})
			$(opts.cityDom).append(str);
			$(opts.cityDom).val(opts.city);
			$(opts.cityDom).trigger("change"); 
		}
		
		function setCountys(){
			var countyList = opts.data.filter(function(item){
						return item.province == opts.province && item.city == opts.city && item.county != null;
					}).map(function(item){
						return item.county;
					});
			
			opts.county = $(opts.countyDom).val()==opts.county?"":opts.county,		
			$(opts.countyDom + " option:not(:first)").remove();
			
			var str = "";
			$.each(countyList,function(index,item){
				str += '<option value="'+item+'">'+item+'</option>'
			})
			$(opts.countyDom).append(str);
			$(opts.countyDom).val(opts.county);
		}
		
		setProvinces();
	}
});
