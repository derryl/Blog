/* Modal Overlay */

(function($) {

	$("a[modal-id]").live("click", function(e) {
		e.preventDefault();
		var modalTarget = $(this).attr('modal-id');
		$("#"+modalTarget).display($(this).data());
	});

	$.fn.display = function(options) {
	
	
	}


});