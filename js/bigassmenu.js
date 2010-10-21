/*
 * BigAssMenu jQuery Plugin
 * 
 */
(function($){
	
	$.fn.extend({
		BigAssMenu: function(options){
			
			var defaults = {
				activeClass: 'active',
				submenuClass: 'submenu',
				fade: 300,
				height: 0
			};
			
			var options = $.extend(defaults,options);
			
			return this.each(function(){
				
				// Assign current element to variable
				var obj = $(this);
				
				// get only direct decendents of our obj,ul
				var menuItems = $('> ul > li',obj);
								
				var activeClass = options.activeClass;
				var submenuClass = options.submenuClass;
				var animateInDelay = options.fade;
				var animateOutDelay = options.fade;
				var submenuHeight = options.height;
				
				// loop over every menu item
				menuItems.each(function(index,value){
					
					// the id of the top level menu item
					var menuid = $(this).find("a")[0].id;
					var submenu = $("#" + menuid).next();
					var hide = false;
		
					// hide all sub menus
					$(submenu).hide();
					// add a sub menu class to all sub menus 
					$(submenu).addClass(submenuClass);
					
					// if submenuHeight is > 0 set the height for all sub menus
					if(submenuHeight > 0) {
						$(submenu).css('height',submenuHeight);
					}
					
					// does the sub menu have an include					
					var include = $(submenu).attr('include');

					// when you hover over the main menu item
					$("#" + menuid).hover(function(){
						
						if(hide){
							clearTimeout(hide)
						}
						
						if(include){
							load(menuid,include);
						}
						
						// if the sub menu does not have a full class set an offset						
						if ( !$(submenu).hasClass("no-offset") ) {
							$(submenu).css("margin-left", ($("#" + menuid).offset().left - 10));
						}
												
						// fade in the sub menu
						$(submenu).fadeIn(animateInDelay);
						
						// change the class of the menu item to create that on affect
						$(this).addClass(activeClass);
													
					},function(){
												
						// when you move off the menu hide the sub menu
						hide = setTimeout(function(){
							$(submenu).fadeOut(animateOutDelay);
						});
						// remove the active class from the menu item
						$("#" + menuid).removeClass(activeClass);
						
					});
					
					// make sure the sub menu does not disappear after you move off the main navigation item
					$(submenu).hover(function(){
						
						if(hide){
							clearTimeout(hide);
							$(submenu).fadeIn(animateInDelay);
							$("#" + menuid).addClass(activeClass);
						}
					},function(){
						
						// if you move your mouse out of the sub menu div, the div fades out and removes the active class
						hide = setTimeout(function() {
							$(submenu).fadeOut(animateOutDelay);
						});
						
						$("#" + menuid).removeClass(activeClass);
					
					});
									
				});
					
			});
		}

	});
	
	function load(menu,include){
		$.ajax({
			url: include,
			success: function(data){
				$("#" + menu).next().html(data);
			},
			error: function(request){
				var status = request.status;				
				var e = "";
				switch(status){
				case 404:
					e = "The template '" + include + "' could not be found";
					break;
				default:
				 	e = "Some error I have not accounted for just happened.";
				}				
				$("#" + menu).next().css('color','red').html(e);
			}
		});
	}
	
})(jQuery);
