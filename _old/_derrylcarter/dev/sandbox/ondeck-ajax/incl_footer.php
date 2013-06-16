<script type="text/javascript">

	$(document).ready(function() {
		
		// activate the nav links
		$("#nav a").live("click", function() {
		
			var current = $("#nav").attr("current");
			var clicked = $(this).attr('id');
			
			// should we react to this click?
			if(current != clicked) {
				$("#nav a."+current).removeClass("selected");
				$(this).addClass("selected");
				$("#nav").attr("current", clicked);
				// change the content
				$("#container").animate({ opacity: 0 }, 200, function() {
					$("#container").load(clicked+".php", function() {
						$("#container").animate({opacity: 1}, 300);
					});
				});
			} // endif
		
		}); // end #nav click
		
	}); // end $(doc).ready
	
	
	// scroll the colored strip upward
	var scrollSpeed = 70;
	var current = 0;
	var direction = 'h';
	function bgscroll() {
    	if ( current <= -3110) { current = 0; }
   		current -= 7;
	    $('#strip').css("backgroundPosition", (direction == 'v') ? current+"px 0" : "0 " + current+"px");
	}
	setInterval("bgscroll()", scrollSpeed);
  
</script>