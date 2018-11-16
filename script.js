var isMobile = false; //initiate as false
		// device detection
		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
			|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
		
		
		var m = L.map('map',{zoomControl: false});
		m.setView([18.16, 105.70], 6); //map view for Laos

		//add zoom home control from @torfsen github
		var zoomHome = L.Control.zoomHome({position: 'bottomleft'});
		zoomHome.addTo(m);

		var mapQuestAttr = 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; ';
		var osmDataAttr = 'Basemap data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
		var mopt = {
			url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
			options: {attribution:'Basemap data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
		  };
		var mq = L.tileLayer(mopt.url,mopt.options);

		var OpenCartoMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}'+ (L.Browser.retina ? '@2x.png' : '.png'),{
				attribution:'Basemap data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | Basemap style &copy; <a href="https://carto.com/attributions">CARTO</a>',
				subdomains: 'abcd',
				maxZoom: 20,
				minZoom: 0
		});
			 
		var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
			maxZoom: 17,
			attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Basemap style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
		});	
			
		OpenCartoMap.addTo(m);

		//map title
		var ctitle = L.control({position: 'topleft'});
		ctitle.onAdd = function () {
			var div = L.DomUtil.create('div', 'ctitle'),
			//this is for adding a logo as needed
			//holder ='<table><tr>' 
			//logo = '<td rowspan=2><img class="logo" src="logo_laos.png"></img></td>';
			//labels = "<td><h4>Poverty in Lao PDR</h4></td></tr><tr><td><p>Percentage of people in poverty by province/district: 2015</p></td></tr></table>";
			labelsn = "<h4>Poverty in Lao PDR</h4><p>Percentage of people in poverty by province/district: 2015</p>";
		 
			div.innerHTML = labelsn;//holder + logo + labels;
			return div;
		};
		ctitle.addTo(m);

		var district_lay = new L.GeoJSON.AJAX("data/district_pov.geojson",{onEachFeature:popUp, style:style});
		var province_lay = new L.GeoJSON.AJAX("data/province_pov.geojson",{onEachFeature:popUp,style:style}).addTo(m);

		var baseMaps = {
			"Open StreetMap": mq, 
			"Carto BaseMap": OpenCartoMap,
			"Open TopoMap": OpenTopoMap
			};

		var groupedOverlays = {
			"Admin Level": {
				"Province": province_lay,
				"District": district_lay        
			}
		};

		var options = {
			  // Make the "Admin Level" group exclusive (use radio inputs)
			  exclusiveGroups: ["Admin Level"],
			  // Show a checkbox next to non-exclusive group labels for toggling all
			  groupCheckboxes: true,
			  position: 'topleft'
			};

		// Use the custom grouped layer control, not "L.control.layers"
		var layerControl = L.control.groupedLayers(baseMaps, groupedOverlays, options);
			m.addControl(layerControl);

		function popUp(f,layer){
			var out = [];
			layer.on({
				mouseover: highlightFeature,
				mouseout: resetHighlight,
				click: highlightFeature
			});	
		};

		// Creates an info box on the map
		var info = L.control({position: 'topright'});
		info.onAdd = function (map) {
			this._div = L.DomUtil.create('div', 'info nomobile');
			this.update();
			return this._div;
		};

		info.update = function (props) {
			
			content =  '<table class="props"><tbody>';
				
			content +=  (props ? '<div class="areaName">' + props.Province + checkNull2(props.District)+ '</div>' : '<div class="areaName">Lao PDR</div><div class="areaName faded"><small><i>Hover over areas to view data</i><br></small></div>');//'<th>'+ checkNull2(props.District)+'</th></tr>';
									//checkNull2(props.province_p) +"<br>"+  checkNull2(props.district_p) +  checkNull2(props.district_1) + 
			content += '<tr><td class="ditem">Area [sq km]</td>         <td class="dval">'  +(props ? '' + (checkNull(props["Area"].toFixed(0))) : '236,800') + '</div>'+ '</td></tr>';
			content += '<tr><td class="ditem">Population</td>         <td class="dval">'  +(props ? '' + (checkNull(props["Population"].toFixed(0))) : '6,492,228') + '</div>'+ '</td></tr>';
			content += '<tr><td class="ditem">Density [per sq km]</td>         <td class="dval">'  +(props ? '' + (checkNull(props["Density"].toFixed(1))) : '27') + '</div>'+ '</td></tr>';
			content += '<tr><td class="ditem">Urban population (%)</td>         <td class="dval">'  +(props ? '' + (checkNull(props["Urban_popu"].toFixed(1))) : '32.9') + '</div>'+ '</td></tr>';
			content += '<tr><td class="ditem">Improved sanitation (%)</td>         <td class="dval">'  +(props ? '' + (checkNull(props["Improved_S"].toFixed(1))) : '71.1') + '</div>'+ '</td></tr>';
			content += '<tr><td class="ditem">Improved water source (%)</td>         <td class="dval">'  +(props ? '' + (checkNull(props["Improved_W"].toFixed(1))) : '83.9') + '</div>'+ '</td></tr>';
			content += '<tr><td class="ditem">Electricity access (%)</td>         <td class="dval">'  +(props ? '' + (checkNull(props["Using_Elec"].toFixed(1))) : '85.6') + '</div>'+ '</td></tr>';
			content += '<tr><td class="ditem">Own a phone (%)</td>         <td class="dval">'  +(props ? '' + (checkNull(props["Own_a_Phon"].toFixed(1))) : '91.3') + '</div>'+ '</td></tr>';
			content += '<tr><td class="ditem">Poverty headcount (%)</td>         <td class="dval">'  +(props ? '' + (checkNull(props["Poverty_He"].toFixed(1))) : '24.8') + '</div>'+ '</td></tr>';
			content += '<tr><td class="ditem">Poverty gap (%)</td>         <td class="dval">'  +(props ? '' + (checkNull(props["Poverty_Ga"].toFixed(1))) : '6.0') + '</div>'+ '</td></tr>';
			content += '<tr><td class="ditem">Poverty severity (%)</td>         <td class="dval">'  +(props ? '' + (checkNull(props["Poverty_Se"].toFixed(1))) : '--') + '</div>'+ '</td></tr>';
			content += '</tbody></table>';
			
			this._div.innerHTML = content;
			};
			
		info.addTo(m);
		
		function onclick(e){
			var bounds = e.target.getBounds();
			m.fitBounds(bounds);
			highlightFeature(e);
		};

		function highlightFeature(e) {
			resetHighlight(e);
			var layer = e.target;
			layer.setStyle({
				weight: 3,
				color: 'black',
				fillOpacity: 0.5
			});
			info.update(layer.feature.properties);
		};

		// This resets the highlight after hover moves away
		function resetHighlight(e) {
			province_lay.setStyle(style);
			district_lay.setStyle(style);
			info.update();
		};

		function checkNull(val) {
		  if (val != null || val == "NaN") {
			return comma(val);
		  } else {
			return "--";
		  }
		};

		function checkNull2(val) {
		  if (val != null || val == "NaN") {
			return ", " + comma(val);
		  } else {
			return "";
		  }
		};

		// Use in info.update if GeoJSON data needs to be displayed as a percentage
		function checkThePct(a,b) {
		  if (a != null && b != null) {
			return Math.round(a/b*1000)/10 + "%";
		  } else {
			return "--";
		  }
		};

		// Use in info.update if GeoJSON data needs to be displayed with commas (such as 123,456)
		function comma(val){
		  while (/(\d+)(\d{3})/.test(val.toString())){
			val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
		  }
		  return val;
		};



		var cmap_poverty = [{"label" : ">&nbsp;54.0", "lower" : 54.0, "fill" : '#d73027'},
						{"label" : "45.6&nbsp;-&nbsp;54.0", "lower" : 45.6, "fill" : '#f46d43'},
						{"label" : "38.4&nbsp;-&nbsp;45.6", "lower" : 38.4, "fill" : '#fdae61'},
						{"label" : "31.2&nbsp;-&nbsp;38.4", "lower" : 31.2, "fill" : '#fee090'},
						{"label" : "25.2&nbsp;-&nbsp;31.2", "lower" : 25.2, "fill" : '#ffffbf'},
						{"label" : "19.1&nbsp;-&nbsp;25.2", "lower" : 19.1, "fill" : '#abd9e9'},
						{"label" : "12.2&nbsp;-&nbsp;19.1", "lower" : 12.2, "fill" : '#74add1'},
						{"label" : "<&nbsp;12.2", "lower" : 0.0,  "fill" : '#4575b4'}];

		var cmap_density = [{"label" : ">&nbsp;78.1", "lower" : 78.1, "fill" : '#FF00FF'},
						{"label" : "42.1&nbsp;-&nbsp;78.0", "lower" : 42.0, "fill" : '#DB24FF'},
						{"label" : "30.1&nbsp;-&nbsp;42.0", "lower" : 30.0, "fill" : '#B649FF'},
						{"label" : "23.1&nbsp;-&nbsp;30.0", "lower" : 23.0, "fill" : '#926DFF'},
						{"label" : "19.1&nbsp;-&nbsp;23.0", "lower" : 19.0, "fill" : '#6D92FF'},
						{"label" : "15.1&nbsp;-&nbsp;19.0", "lower" : 15.0, "fill" : '#49B6FF'},
						{"label" : "10.1&nbsp;-&nbsp;15.0", "lower" : 10.0, "fill" : '#24DBFF'},
						{"label" : "<&nbsp;10.0", "lower" : 0.0,  "fill" : '#00FFFF'}];

		var cmap_sanitation = [{"label" : "", "lower" : 7, "fill" : '#005a32'},
						   {"label" : "", "lower" : 6, "fill" : '#238443'},
						   {"label" : "", "lower" : 5, "fill" : '#41ab5d'},
						   {"label" : "", "lower" : 4, "fill" : '#78c679'},
						   {"label" : "", "lower" : 3, "fill" : '#addd8e'},
						   {"label" : "", "lower" : 2, "fill" : '#d9f0a3'},
						   {"label" : "", "lower" : 1, "fill" : '#f7fcb9'},
						   {"label" : "", "lower" : 0, "fill" : '#ffffe5'}];

		var cmap_water= [{"label" : "", "lower" : 7, "fill" : '#0c2c84'},
						   {"label" : "", "lower" : 6, "fill" : '#225ea8'},
						   {"label" : "", "lower" : 5, "fill" : '#1d91c0'},
						   {"label" : "", "lower" : 4, "fill" : '#41b6c4'},
						   {"label" : "", "lower" : 3, "fill" : '#7fcdbb'},
						   {"label" : "", "lower" : 2, "fill" : '#c7e9b4'},
						   {"label" : "", "lower" : 1, "fill" : '#edf8b1'},
						   {"label" : "", "lower" : 0, "fill" : '#ffffd9'}];

		var cmap_electricity = [{"label" : "", "lower" : 7, "fill" : '#8c2d04'},
						  {"label" : "", "lower" : 6, "fill" : '#cc4c02'},
						  {"label" : "", "lower" : 5, "fill" : '#ec7014'},
						  {"label" : "", "lower" : 4, "fill" : '#fe9929'},
						  {"label" : "", "lower" : 3, "fill" : '#fec44f'},
						  {"label" : "", "lower" : 2, "fill" : '#fee391'},
						  {"label" : "", "lower" : 1, "fill" : '#fff7bc'},
						  {"label" : "", "lower" : 0, "fill" : '#ffffe5'}];
						  
		var cmap_tphone = [{"label" : "", "lower" : 7, "fill" : '#b10026'},
						  {"label" : "", "lower" : 6, "fill" : '#e31a1c'},
						  {"label" : "", "lower" : 5, "fill" : '#fc4e2a'},
						  {"label" : "", "lower" : 4, "fill" : '#fd8d3c'},
						  {"label" : "", "lower" : 3, "fill" : '#feb24c'},
						  {"label" : "", "lower" : 2, "fill" : '#fed976'},
						  {"label" : "", "lower" : 1, "fill" : '#ffeda0'},
						  {"label" : "", "lower" : 0, "fill" : '#ffffcc'}];
						  
		var cmap_urban = [{"label" : "", "lower" : 7, "fill" : '#081D58'},
						  {"label" : "", "lower" : 6, "fill" : '#243996'},
						  {"label" : "", "lower" : 5, "fill" : '#206CAE'},
						  {"label" : "", "lower" : 4, "fill" : '#2CA0C1'},
						  {"label" : "", "lower" : 3, "fill" : '#64C3BE'},
						  {"label" : "", "lower" : 2, "fill" : '#B2E0B6'},
						  {"label" : "", "lower" : 1, "fill" : '#E8F6B1'},
						  {"label" : "", "lower" : 0, "fill" : '#FFFFD9'}];
		function get_var(legX) {

		  if (legX == "poverty")    return "Poverty_He";
		  if (legX == "density")  return "Density";
		  if (legX == "sanitation")     return "Improved_S";
		  if (legX == "water") return "Improved_W";
		  if (legX == "electricity") return "Using_Elec";
		  if (legX == "tphone") return "Own_a_Phon";
		  if (legX == "urban") return "Urban_popu";};
		// assign map coloring based on var
		function repaint_map(fill_variable) {

			province_lay.eachLayer(
			  function (layer) {  
			  
				switch(shading) {
				  case "water": 
					val = parseFloat(layer.feature.properties[fill_variable]);
					layer.setStyle({fillColor: getColor(val)});
					break;
				  case "density":
					val = parseFloat(layer.feature.properties[fill_variable]);
					layer.setStyle({fillColor: getColor(val)});
					break;
				  case "sanitation":
					val = parseFloat(layer.feature.properties[fill_variable]);
					layer.setStyle({fillColor: getColor(val)});
					break;
				  case "tphone":
					val = parseFloat(layer.feature.properties[fill_variable]);
					layer.setStyle({fillColor: getColor(val)});
					break;
				  case "electricity":
					val = parseFloat(layer.feature.properties[fill_variable]);
					layer.setStyle({fillColor: getColor(val)});
					break;
				  case "urban":
					val = parseFloat(layer.feature.properties[fill_variable]);
					layer.setStyle({fillColor: getColor(val)});
					break;
				  default:
					val = parseFloat(layer.feature.properties["Poverty_He"]);
					layer.setStyle({fillColor: getColor(val)});
					break;
				}
			  }
			);
			district_lay.eachLayer(
			  function (layer) {  
			  
				switch(shading) {
				  
				  case "water": 
					val = parseFloat(layer.feature.properties[fill_variable]);
					layer.setStyle({fillColor: getColor(val)});
					break;
				  case "density":
					val = parseFloat(layer.feature.properties[fill_variable]);
					layer.setStyle({fillColor: getColor(val)});
					break;
				  case "sanitation":
					val = parseFloat(layer.feature.properties[fill_variable]);
					layer.setStyle({fillColor: getColor(val)});
					break;
				  case "tphone":
					val = parseFloat(layer.feature.properties[fill_variable]);
					layer.setStyle({fillColor: getColor(val)});
					break;
				  case "electricity":
					val = parseFloat(layer.feature.properties[fill_variable]);
					layer.setStyle({fillColor: getColor(val)});
					break;
				  case "urban":
					val = parseFloat(layer.feature.properties[fill_variable]);
					layer.setStyle({fillColor: getColor(val)});
					break;
				  default:
					val = parseFloat(layer.feature.properties["Poverty_He"]);
					layer.setStyle({fillColor: getColor(val)});
					break;
				}
			  }
			);
			};	
			
		//these enable manual class methods
		function fileFilter(x)   { return x.file   == this; };
		function methodFilter(x) { return x.method == this; };
		function seedFilter(x)   { return x.seed   == this; };		
			
		//coloring var	
		var cmap = {"poverty" : cmap_poverty,
					"density" : cmap_density,
					"sanitation" : cmap_sanitation,
					"electricity" : cmap_electricity,
					"urban" : cmap_urban,
					"tphone" : cmap_tphone,
					"water" : cmap_water};

		//default value and var for legend			
		var shading = "poverty";
		var variable = "Poverty_He";	

		//function to get colors based on coloring on cmap	
		function getColor(d) {
			for (var vi in cmap[shading]) {
				if (d >= cmap[shading][vi].lower) {
				return cmap[shading][vi].fill;
				}
			}
			return '#BBB';
		};

		//function for layer style based on coloring on cmap
		function style(feature) {
			val = parseFloat(feature.properties[variable]);
			return {
				weight: 1.2,
				opacity: 0.9,
				color: 'black',
				fillOpacity: 0.75,
				fillColor: getColor(val)
			};
		};


		//legend design
		var legend = L.control({position: 'bottomright'});

		legend.onAdd = function () {
			leg_select = '<select class="legend" id="shading_select">' + 
							'<option value="density">Density</option>' + 
							'<option value="poverty" selected=true>Poverty Rate (%)</option>' + 
							'<option value="sanitation">Improved Sanitation (%)</option>' + 
							'<option value="water">Improved Water Source (%)</option>' + 
							'<option value="electricity">Electricity Access (%)</option>' + 
							'<option value="tphone">Own a Phone (%)</option>' + 
							'<option value="urban">Urban Population (%)</option>' + 
						  '</select>';
			
			var labels = [];

			cmap[shading].forEach( function(v) {
					labels.push('<tr>' + 
						'<td class="cblock" style="background:' + v.fill + '"></td>' +
						'<td class="ltext">' + v.label + '</td></tr>');
				});
				
			//draw legend based on selected var
			var div = L.DomUtil.create('div', 'info legend');
			div.innerHTML = leg_select  + '<table class= "legend_t" id="legend_table">' + labels.join('') + '</table>';

			return div;
		};
		legend.addTo(m);

		var shading_sel  = document.getElementById("shading_select");
		var legend_table = document.getElementById("legend_table");
		shading_sel.onchange = change_legend;

		function change_legend() {
			//get shading and variable from legend selector
			shading = shading_sel.value;
			variable = get_var(shading);
			repaint_map(variable);

			//retrieve the range for legends case by case, by equal count
			if (shading == "sanitation") {
				mini = 3, maxi = 0;
				district_lay.eachLayer(function (layer) {
					c = parseFloat(layer.feature.properties[variable])
					if (mini > c) mini = c;
					if (maxi < c) maxi = c;
				});

				step_size = (maxi - mini) / 8;
				for (var s = 0; s < 8; s++) {
					cmap_sanitation[7-s]["lower"] = mini + s * step_size;
					cmap_sanitation[7-s]["label"] = (mini + s * step_size).toFixed(1) + "&nbsp;-&nbsp;" + (mini + (s+1) * step_size).toFixed(1);
				}
				cmap_sanitation[7]["lower"] = mini;
			}
			
			if (shading == "water") {
				mini = 37, maxi = 0;
				district_lay.eachLayer(function (layer) {
					c = parseFloat(layer.feature.properties[variable])
					if (mini > c) mini = c;
					if (maxi < c) maxi = c;
				});

				step_size = (maxi - mini) / 8;
				for (var s = 0; s < 8; s++) {
					cmap_water[7-s]["lower"] = mini + s * step_size;
					cmap_water[7-s]["label"] = (mini + s * step_size).toFixed(1) + "&nbsp;-&nbsp;" + (mini + (s+1) * step_size).toFixed(1);
				}
				cmap_water[7]["lower"] = mini;
			}
			
			if (shading == "tphone") {
				mini = 54, maxi = 0;
				district_lay.eachLayer(function (layer) {
					c = parseFloat(layer.feature.properties[variable])
					if (mini > c) mini = c;
					if (maxi < c) maxi = c;
				});

				step_size = (maxi - mini) / 8;
				for (var s = 0; s < 8; s++) {
					cmap_tphone[7-s]["lower"] = mini + s * step_size;
					cmap_tphone[7-s]["label"] = (mini + s * step_size).toFixed(1) + "&nbsp;-&nbsp;" + (mini + (s+1) * step_size).toFixed(1);
				}
				cmap_tphone[7]["lower"] = mini;
			}
			
			if (shading == "urban") {
				mini = 4, maxi = 0;
				district_lay.eachLayer(function (layer) {
					c = parseFloat(layer.feature.properties[variable])
					if (mini > c) mini = c;
					if (maxi < c) maxi = c;
				});

				step_size = (maxi - mini) / 8;
				for (var s = 0; s < 8; s++) {
					cmap_urban[7-s]["lower"] = mini + s * step_size;
					cmap_urban[7-s]["label"] = (mini + s * step_size).toFixed(1) + "&nbsp;-&nbsp;" + (mini + (s+1) * step_size).toFixed(1);
				}
				cmap_urban[7]["lower"] = mini;
			}
			
			if (shading == "electricity") {
				mini = 24, maxi = 0;
				district_lay.eachLayer(function (layer) {
					c = parseFloat(layer.feature.properties[variable])
					if (mini > c) mini = c;
					if (maxi < c) maxi = c;
				});

				step_size = (maxi - mini) / 8;
				for (var s = 0; s < 8; s++) {
					cmap_electricity[7-s]["lower"] = mini + s * step_size;
					cmap_electricity[7-s]["label"] = (mini + s * step_size).toFixed(1) + "&nbsp;-&nbsp;" + (mini + (s+1) * step_size).toFixed(1);
				}
			  cmap_electricity[7]["lower"] = mini;
			}
			
			var labels = [];
			if (shading in cmap) {
				cmap[shading].forEach( function(v) {
					labels.push('<tr>' + 
						'<td class="cblock" style="background:' + v.fill + '"></td>' +
						'<td class="ltext">' + v.label + '</td></tr>');
				  });
			}
			legend_table.innerHTML = labels.join('');
			repaint_map(variable);
		};
	if (isMobile) {
		document.getElementsByClassName("nomobile")[0].style.display = "none";
	};
