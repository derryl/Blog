	// speed in milliseconds
	var scrollSpeed = 70;
	
	// set the default position
	var current = 0;

	// set the direction
	var direction = 'h';

	function bgscroll(){

    	// 1 pixel row at a time
    	if ( current <= -3199) {
	    	current = 0;
	    }
   
   		current -= 5;
   
	    // move the background with backgrond-position css properties
	    $('#wrapper').css("backgroundPosition", (direction == 'v') ? current+"px 0" : "0 " + current+"px");
   
	}

	//Calls the scrolling function repeatedly
	 setInterval("bgscroll()", scrollSpeed);