
$(function() {

	$("#@{heatmap_id}_heatmap_control").width($("#@{heatmap_id}_heatmap").width());

	$("#@{heatmap_id}_heatmap_resize").resizable({
		stop: function( event, ui ) {
			document.getElementById("@{heatmap_id}_mask").remove();
			$("#@{heatmap_id}_heatmap_brush").remove();
			$("#@{heatmap_id}_heatmap").height(ui.size.height - 4);
			$("#@{heatmap_id}_heatmap").width(ui.size.width - 4);
			$("#@{heatmap_id}_heatmap img").width(ui.size.width - 4);  // img has 4px margin
			$("#@{heatmap_id}_heatmap img").height(ui.size.height - 4);
			
			Shiny.setInputValue("@{heatmap_id}_heatmap_resize_width", ui.size.width - 4);
			Shiny.setInputValue("@{heatmap_id}_heatmap_resize_height", ui.size.height - 4);
			Shiny.setInputValue("@{heatmap_id}_heatmap_do_resize", Math.random());
			
		},
		start: function(event, ui) {
			var mask = document.createElement("div");
			mask.setAttribute("style", "position:absolute;top:0;background-color:rgba(255, 255, 0, 0.5)");
			mask.setAttribute("id", "@{heatmap_id}_mask");
			$("#@{heatmap_id}_heatmap_resize").append(mask);
		},
		resize: function(event, ui) {
			$("#@{heatmap_id}_mask").width(ui.size.width);
			$("#@{heatmap_id}_mask").height(ui.size.height);
			$("#@{heatmap_id}_heatmap").width(ui.size.width - 4);
			$("#@{heatmap_id}_heatmap").height(ui.size.height - 4);
			$("#@{heatmap_id}_heatmap img").width(ui.size.width - 4);  // img has 4px margin
			$("#@{heatmap_id}_heatmap img").height(ui.size.height - 4);

			$("#@{heatmap_id}_heatmap_control").width(ui.size.width);

			$('#@{heatmap_id}_heatmap_input_width').val(ui.size.width - 4);
			$('#@{heatmap_id}_heatmap_input_height').val(ui.size.height - 4);

			if(parseInt($('#@{heatmap_id}_heatmap_download_format').find('input').filter(':checked').val()) > 1) {
				width_in_inch = Math.round((ui.size.width - 4)*10/100*4/3)/10;
				height_in_inch = Math.round((ui.size.height - 4)*10/100*4/3)/10;
				$('#@{heatmap_id}_heatmap_download_image_width').val(width_in_inch);
				$('#@{heatmap_id}_heatmap_download_image_height').val(height_in_inch);
			} else {
				$('#@{heatmap_id}_heatmap_download_image_width').val(ui.size.width - 4);
				$('#@{heatmap_id}_heatmap_download_image_height').val(ui.size.height - 4);
			}
			
			Shiny.setInputValue("@{heatmap_id}_heatmap_download_image_width", width);
		  Shiny.setInputValue("@{heatmap_id}_heatmap_download_image_height", height);
		},
		zIndex: 0,
		containment: @{containment}
	});

	if(@{tolower(as.character(has_brush_response))}) {
		$('#@{heatmap_id}_search_regexpr').change(function() {
			if(this.checked) {
				$('#@{heatmap_id}_keyword').attr('placeholder', 'A single regular expression');
			} else {
				$('#@{heatmap_id}_keyword').attr('placeholder', "Multiple keywords separated by ','");
			}
		});
	}

	$('#@{heatmap_id}_heatmap_input_size_button').click( function() {
		var width = $('#@{heatmap_id}_heatmap_input_width').val();
		width = parseInt(width);
		var height = $('#@{heatmap_id}_heatmap_input_height').val();
		height = parseInt(height);
		$('#@{heatmap_id}_heatmap_resize').width(width + 4);
		$('#@{heatmap_id}_heatmap').width(width);
		$('#@{heatmap_id}_heatmap img').width(width);
		$('#@{heatmap_id}_heatmap_resize').height(height + 4);
		$('#@{heatmap_id}_heatmap').height(height);
		$('#@{heatmap_id}_heatmap img').height(height);
		$('#@{heatmap_id}_heatmap_download_image_width').val(width);
		$('#@{heatmap_id}_heatmap_download_image_height').val(height);

		$("#@{heatmap_id}_heatmap_control").width(width);

		Shiny.resetBrush("@{heatmap_id}_heatmap_brush");

		Shiny.setInputValue("@{heatmap_id}_heatmap_resize_button", Math.random());
		
		Shiny.setInputValue("@{heatmap_id}_heatmap_download_image_width", width);
		Shiny.setInputValue("@{heatmap_id}_heatmap_download_image_height", height);
	});

	$('#@{heatmap_id}_heatmap_download_format').change( function() {
		var width = $('#@{heatmap_id}_heatmap_input_width').val();
		width = parseInt(width);
		var height = $('#@{heatmap_id}_heatmap_input_height').val();
		height = parseInt(height);
		if(parseInt($(this).find('input').filter(':checked').val()) > 1) {
			width_in_inch = Math.round(width*10/100*4/3)/10;
			height_in_inch = Math.round(height*10/100*4/3)/10;
			$('#@{heatmap_id}_heatmap_download_image_width').val(width_in_inch);
			$('#@{heatmap_id}_heatmap_download_image_height').val(height_in_inch);
			$('#@{heatmap_id}_heatmap_download_image_width').prev().text('Image width (in inch)');
			$('#@{heatmap_id}_heatmap_download_image_height').prev().text('Image height (in inch)');
		} else {
			$('#@{heatmap_id}_heatmap_download_image_width').val(width);
			$('#@{heatmap_id}_heatmap_download_image_height').val(height);
			$('#@{heatmap_id}_heatmap_download_image_width').prev().text('Image width (in px)');
			$('#@{heatmap_id}_heatmap_download_image_height').prev().text('Image height (in px)');
		}
		
		Shiny.setInputValue("@{heatmap_id}_heatmap_download_image_width", width);
		Shiny.setInputValue("@{heatmap_id}_heatmap_download_image_height", height);
	});

	if(@{tolower(as.character(has_brush_response))} || @{tolower(as.character(only_brush_output_response))}) {
		$('#@{heatmap_id}_color_pickers_border_width').change(function() {
			var val = $(this).val();
			$('#@{heatmap_id}_heatmap_brush').css('border-width', val);
			$('#@{heatmap_id}_heatmap').mousedown(function() {
				if($('#@{heatmap_id}_heatmap_brush').length > 0) {
					$('#@{heatmap_id}_heatmap_brush').css('border-width', val);
				}
			});
		});

		$('#@{heatmap_id}_color_pickers_opacity').change(function() {
			var val = $(this).val();
			$('#@{heatmap_id}_heatmap_brush').css('opacity', val);
			$('#@{heatmap_id}_heatmap').mousedown(function() {
				if($('#@{heatmap_id}_heatmap_brush').length > 0) {
					$('#@{heatmap_id}_heatmap_brush').css('opacity', val);
				}
			});
		});

		@{heatmap_hash}_create_color_picker();
	}
	
	Shiny.addCustomMessageHandler('@{heatmap_id}_initialized', function(message) {
		$('#@{heatmap_id}_heatmap_control').css("display", "block");
	});

	Shiny.addCustomMessageHandler('@{heatmap_id}_empty_search', function(message) {
		$('#@{heatmap_id}_tabs-search').html("<p>Search is turned off because of no row/column labels.</p>");
	});

	Shiny.addCustomMessageHandler('@{heatmap_id}_remove_brush', function(message) {
		$("#@{heatmap_id}_heatmap_brush").remove();
		Shiny.setInputValue("@{heatmap_id}_heatmap_brush", null);
	})

	Shiny.addCustomMessageHandler('@{heatmap_id}_reset_ui', function(message) {
		if($('#@{heatmap_id}_sub_heatmap_control').length) {
			var objs2 = $('#@{heatmap_id}_sub_heatmap_control li a');
			
			$('#@{heatmap_id}_sub_heatmap_control').hide();
			$('#@{heatmap_id}_sub_heatmap_control .tab-content').hide();

			$(objs2[0]).css("background-color", "white");
			$(objs2[1]).css("background-color", "white");
			$(objs2[2]).css("background-color", "white");
			$(objs2[3]).css("background-color", "white");

			$($(objs2[0]).attr("href")).attr("visible", 0);
			$($(objs2[1]).attr("href")).attr("visible", 0);
			$($(objs2[2]).attr("href")).attr("visible", 0);
			$($(objs2[3]).attr("href")).attr("visible", 0);
		}
		Shiny.setInputValue("@{heatmap_id}_reset_ui_done", Math.random());
	})

	// similar function as "jquery ui tabs"
	var objs = $('#@{heatmap_id}_heatmap_control li a');
	if(!@{tolower(as.character(has_brush_response))} && !@{tolower(as.character(only_brush_output_response))}) {
		$(objs[0]).attr("title", "Save image");
		$(objs[1]).attr("title", "Resize heatmap");
	} else if(!@{tolower(as.character(has_brush_response))} && @{tolower(as.character(only_brush_output_response))}) {
		$(objs[0]).attr("title", "Configure brush");
		$(objs[1]).attr("title", "Save image");
		$(objs[2]).attr("title", "Resize heatmap");
	} else {
		$(objs[0]).attr("title", "Search heatmap");
		$(objs[1]).attr("title", "Configure brush");
		$(objs[2]).attr("title", "Save image");
		$(objs[3]).attr("title", "Resize heatmap");
	}

	var href = $(objs[0]).attr("href");
	$(href).attr("visible", "0")
	$(objs[0]).css("background-color", "white");
	$(href).parent().css("display", "none");

	for(var i = 0; i < objs.length; i ++) {
		$(objs[i]).hover(function() {
			var tooltip = $("<span class='ui-widget-shadow'>" + $(this).attr("title") + "</span>");
			tooltip.css("position", "absolute").
			        css("z-index", "100").
			        css("bottom", "120%").
			        css("background-color", "white").
			        css("border", "1px solid #dddddd").
			        css("border-radius", "4px").
			        css("padding", "4px 12px").
			        css("color", "black").
			        css("white-space", "nowrap");
			tooltip.css("left", "-50%");
			$(this).append(tooltip);
		}, function() {
			$(this).find("span").last().remove();
		});

		$(objs[i]).click(function() {
			var href = $(this).attr("href");
			if($(href).attr("visible") == undefined) {
				if($(href).hasClass("active")) {
					$(href).attr("visible", "1")
				}
			}
			if($(href).attr("visible") == "1") {
				$(href).attr("visible", "0");
				$(href).parent().css("display", "none");
				$(this).css("background-color", "white");
				
			} else {
				for(var i = 0; i < objs.length; i ++) {
					$(objs[i]).css("background-color", "white");
					$($(objs[i]).attr("href")).attr("visible", 0);
				}

				$(href).attr("visible", "1");
				$(href).parent().css("display", "block");
				$(this).css("background-color", "#ddd");
			}
			false;
		})
	}


	if('@{action}' == 'click') {
		var @{heatmap_hash}_brush_x1;
		var @{heatmap_hash}_brush_x2;
		var @{heatmap_hash}_brush_y1;
		var @{heatmap_hash}_brush_y2;
		$('#@{heatmap_id}_heatmap').mousedown(function(e) {
			var parentOffset = $(this).offset();
			@{heatmap_hash}_brush_x1 = e.pageX - parentOffset.left;
			@{heatmap_hash}_brush_y1 = e.pageY - parentOffset.top;
		}).mouseup(function(e) {
			var parentOffset = $(this).offset();
			@{heatmap_hash}_brush_x2 = e.pageX - parentOffset.left;
			@{heatmap_hash}_brush_y2 = e.pageY - parentOffset.top;
			if(@{heatmap_hash}_brush_x1 == @{heatmap_hash}_brush_x2 && @{heatmap_hash}_brush_y1 == @{heatmap_hash}_brush_y2) {
				Shiny.setInputValue('@{heatmap_id}_heatmap_mouse_action', Math.random());
			}
		});
	}

	if('@{action}' == 'hover') {
		var @{heatmap_hash}_x;
        var @{heatmap_hash}_y;
        $('#@{heatmap_id}_heatmap').mousemove(function(e) {
            var parentOffset = $(this).offset();
            @{heatmap_hash}_x = e.pageX - parentOffset.left;
            @{heatmap_hash}_y = e.pageY - parentOffset.top;
        }).mousestop(function() {
        	var h = $(this).height();
            if($('#@{heatmap_id}_heatmap_brush').length == 0) {
                Shiny.setInputValue('@{heatmap_id}_heatmap_hover', {x: @{heatmap_hash}_x, y: h - @{heatmap_hash}_y});
                Shiny.setInputValue('@{heatmap_id}_heatmap_mouse_action', Math.random());
            } 
        })
	}

	if(@{cursor}) {
		$('#@{heatmap_id}_heatmap').mouseover(function(e) {
			var parentOffset = $(this).offset();
	        @{heatmap_hash}_x = e.pageX - parentOffset.left;
	        @{heatmap_hash}_y = e.pageY - parentOffset.top;

			var right_curser = document.createElement("div");
			right_curser.setAttribute("id", "@{heatmap_id}_right_curser");
			$("#@{heatmap_id}_heatmap").append(right_curser);
			$('#@{heatmap_id}_right_curser').css({'position': 'absolute', 'right': '0px', 'top': @{heatmap_hash}_y, 'width': Math.max(0, Math.min(10, $(this).width() - @{heatmap_hash}_x - 10)), 'height': '1px', 'background-color': 'black'});

			var left_curser = document.createElement("div");
			left_curser.setAttribute("id", "@{heatmap_id}_left_curser");
			$("#@{heatmap_id}_heatmap").append(left_curser);
			$('#@{heatmap_id}_left_curser').css({'position': 'absolute', 'left': '0px', 'top': @{heatmap_hash}_y, 'width': Math.max(0, Math.min(10, @{heatmap_hash}_x - 10)), 'height': '1px', 'background-color': 'black'});

			var top_curser = document.createElement("div");
			top_curser.setAttribute("id", "@{heatmap_id}_top_curser");
			$("#@{heatmap_id}_heatmap").append(top_curser);
			$('#@{heatmap_id}_top_curser').css({'position': 'absolute', 'left': @{heatmap_hash}_x, 'top': '0px', 'width':'1px', 'height': Math.max(0, Math.min(10, @{heatmap_hash}_y - 10)), 'background-color': 'black'});

			var bottom_curser = document.createElement("div");
			bottom_curser.setAttribute("id", "@{heatmap_id}_bottom_curser");
			$("#@{heatmap_id}_heatmap").append(bottom_curser);
			$('#@{heatmap_id}_bottom_curser').css({'position': 'absolute', 'left': @{heatmap_hash}_x, 'bottom': '0px', 'width':'1px', 'height': Math.max(0, Math.min(10, $(this).height() - @{heatmap_hash}_y - 10)), 'background-color': 'black'});

		}).mousemove(function(e) {
			var parentOffset = $(this).offset();
	        @{heatmap_hash}_x = e.pageX - parentOffset.left;
	        @{heatmap_hash}_y = e.pageY - parentOffset.top;

			$('#@{heatmap_id}_right_curser').css({'right': '0px', 'top': @{heatmap_hash}_y, 'width': Math.max(0, Math.min(10, $(this).width() - @{heatmap_hash}_x - 10)), 'height': '1px'});
			$('#@{heatmap_id}_left_curser').css({'left': '0px', 'top': @{heatmap_hash}_y, 'width': Math.max(0, Math.min(10, @{heatmap_hash}_x - 10)), 'height': '1px'});
			$('#@{heatmap_id}_top_curser').css({'left': @{heatmap_hash}_x, 'top': '0px', 'width':'1px', 'height': Math.max(0, Math.min(10, @{heatmap_hash}_y - 10))});
			$('#@{heatmap_id}_bottom_curser').css({'left': @{heatmap_hash}_x, 'bottom': '0px', 'width':'1px', 'height': Math.max(0, Math.min(10, $(this).height() - @{heatmap_hash}_y - 10))});

		}).mouseout(function(e) {
			$('#@{heatmap_id}_right_curser').remove();
			$('#@{heatmap_id}_left_curser').remove();
			$('#@{heatmap_id}_top_curser').remove();
			$('#@{heatmap_id}_bottom_curser').remove();
		});
	}
});

function @{heatmap_hash}_create_color_picker() {
	
	var @{heatmap_hash}_pickr1 = Pickr.create({
	    el: '#@{heatmap_id}_color_pickers_border',
	    default: '@{pickr_fill}',
	    theme: 'nano',
	    comparison: false,
	    position: 'bottom-start',
	    container: "#@{heatmap_id}_tabs-brush",
	    components: {
	    	preview: true, 
	    	opacity: true,
	    	hue: true
	    }
	});	

	@{heatmap_hash}_pickr1.on('change', (color, source, instance) => {
		$('#@{heatmap_id}_heatmap_brush').css('border-color', color.toRGBA().toString());
		$('#@{heatmap_id}_heatmap').mousedown(function() {
			if($('#@{heatmap_id}_heatmap_brush').length > 0) {
				$('#@{heatmap_id}_heatmap_brush').css('border-color', color.toRGBA().toString());
			}
		});
	});

	var @{heatmap_hash}_pickr2 = Pickr.create({
	    el: '#@{heatmap_id}_color_pickers_fill',
	    default: '@{pickr_border}',
	    theme: 'nano',
	    comparison: false,
	    position: 'bottom-start',
	    container: "#@{heatmap_id}_tabs-brush",
	    components: {
	    	preview: true, 
	    	opacity: true,
	    	hue: true
	    }
	});	

	@{heatmap_hash}_pickr2.on('change', (color, source, instance) => {
		$('#@{heatmap_id}_heatmap_brush').css('background-color', color.toRGBA().toString());
		$('#@{heatmap_id}_heatmap').mousedown(function() {
			if($('#@{heatmap_id}_heatmap_brush').length > 0) {
				$('#@{heatmap_id}_heatmap_brush').css('background-color', color.toRGBA().toString());
			}
		});
	});
}

function create_clipboard(target_element) {
	var btn = document.createElement("button");
	btn.setAttribute("data-clipboard-target", "#"+target_element);
	btn.innerHTML = "<i class='far fa-copy'></i>";
	
	var btn_id = target_element + "_clipboard_btn";
	btn.setAttribute("id", btn_id);
	btn.setAttribute("class", "btn btn-default");
	$("#"+target_element).append(btn);
	$("#"+target_element).css("position", "relative");
	$("#"+btn_id).css({'position':'absolute','right':0,'top':'0px'});

	var clipboard = new ClipboardJS(btn);
	clipboard.on('success', function(e) {
	    e.clearSelection();

	    $("#"+btn_id).html("<i class='fa fa-copy'></i>"); 
	    $("#"+btn_id).after("<div style='position:absolute;top:40px;right:0;padding:8px;border:1px solid #CCC;background-color:white;border-radius:4px;font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif;'>Copied</div>");

	    $("#"+btn_id).mouseleave(function() {
	    	$(this).next().remove();
	    	$("#"+btn_id).html("<i class='far fa-copy'></i>");
	    	$(this).unbind("mouseleave");
	    })
	});
	
	$("#"+target_element).mouseover(function() {
		$("#"+btn_id).show();
	}).mouseleave(function() {
		$("#"+btn_id).hide();
	});
}


