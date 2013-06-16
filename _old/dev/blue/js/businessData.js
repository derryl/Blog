$(document).ready( function() {


	/*
	name 		= Display name
	categories 	= breakfast/lunch/dinner
	yelp_name	= Valid Yelp name
	open_until  = How late they're open
	*/

	eat.data = [

		{
			"name": "Stella Rossa",
			"categories": ["dinner"],
			"yelp_name": "stella-rossa-pizza-bar-santa-monica"
		}

	];

	eat.getYelpResponse = function(bizName) {
		// var url = "yelp-auth.php",
		// 	data = { "name": bizName };

		$.ajax({
			type: "POST",
			url: "yelp-auth.php",
			data: { "name": "stella-rossa-pizza-bar-santa-monica" },
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data) {
				console.log(data);
			},
			error: function(xhr, textStatus) {
				console.log("error = " + textStatus);
			}
		});

		// req = $.post(url, data, function(data, status, xhr) {

		// 	console.log(JSON.parse(data));

		// });
	};

});