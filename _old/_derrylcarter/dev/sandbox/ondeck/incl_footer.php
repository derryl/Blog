<script type="text/javascript">

	$(document).ready(function() {
		
		$("#nav a").live("click", function() {
		
			var current = $("#nav").attr("current");
			var clicked = $(this).attr('id');
			
			// should we react to this click?
			if(current != clicked) {
				$("#nav a."+current).removeClass("selected");
				$(this).addClass("selected");
				$("#nav").attr("current", clicked);
				$( 'html, body' ).animate( { scrollTop: 0 }, 'slow' );
				// change the content
				$("#container").animate({ opacity: 0 }, 200, function() {
					$("#container").load(clicked+".php", function() {
						$("#container").animate({opacity: 1}, 300);
					});
				});
				
			} // endif
		
			$("#nav a").css('cursor', 'pointer');
			
			$("#resume").live("mouseover", function() {
				$("#view_my_resume").show();
			});
			
			$("#resume").live("mouseout", function() {
				$("#view_my_resume").hide();
			});
			
		}); // end #nav click
		
	}); // end $(doc).ready
	
	
	// scroll the colored strip upward
	var scrollSpeed = 70;
	var current = 0;
	var direction = 'h';
	function bgscroll() {
    	if ( current <= -3009) { current = 0; }
   		current -= 5;
	    $('#strip').css("backgroundPosition", (direction == 'v') ? current+"px 0" : "0 " + current+"px");
	}
	//setInterval("bgscroll()", scrollSpeed);
  
</script>