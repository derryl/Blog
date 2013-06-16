var log = function(x) { console.log(x); }

var d = {};

window.onload = function() {

	var timeBuckets = {},
		processedData = [],
		headers = [];

	var chart = 	$("#chart"),
		output = 	$("table#output"),
		output_head = output.find("thead tr"),
		output_body = output.find("tbody tr");

	for (var i = 0; i < 24; i++) {
		chart.append("<div class='container'><div class='bar' data-hour='"+(i+1)+"'></div></div>")
		output_head.append("<th>" + (i+1) + "</th>");
		output_body.append("<td data-hour='" + (i+1) + "'>0</td>");
		timeBuckets[String(i+1)] = 0;
	}

	$.get('shark-attacks-pipe-delimited.txt', function(data) {
		parseData(data);
	});

	var parseData = function(data) {

		var lines = data.split(/\n/);
		headers = _.first(lines).split('|');
		lines = _.rest(lines);

		// Iterate over rows
		for (var i = 0; i < lines.length; i++) {

			row = {};
			els = lines[i].split("|");

			// Iterate over items in a row
			for (var x = 0; x < els.length; x++) {
				if (x !== undefined && x < els.length) {
					row[headers[x]] = sanitizeText(els[x]);
				}
			}

			processedData.push(row);
		}

		postProcess(processedData);
	};

	var sanitizeText = function(text) {

		return text;

	};

	var postProcess = function() {

		time = processedData[0]["Time"];
		date = processedData[0]["Date"];

		log(time);
		log(date);

	};

};