var log = function(x) { console.log(x); }

window.onload = function() {

	var timeBuckets = {};

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


	$.get('white-shark-attack-data.csv', function(data) {

		parseData(data);

	});

	var parseData = function(data) {

		var result = $.csv.toArrays(data);
	
		for(x in result) {

			row = result[x];
			timeData = row[5];

			if (timeData.indexOf("h") >= 0) {
				hour = timeData.substr(0,2);

				if (hour.charAt(0) == "0") hour = hour.substr(1);

				// minute = timeData.substr(3);

				if (hour > 0 && hour < 25 && hour != NaN) timeBuckets[hour] += 1;
			}
		}

		var hourlyTotals = [];

		for (var key in timeBuckets) {
			output_body.find("td[data-hour='"+key+"']").html( timeBuckets[key] );
			hourlyTotals.push(timeBuckets[key]);
		}

		maxHourly = _.max(hourlyTotals);

		bars = $("#chart");

		for (var key in timeBuckets) {
			percentage = ((timeBuckets[key] / maxHourly) * 100) + "%";
			bars.find(".bar[data-hour='"+key+"']").animate({height: percentage});
		};

	};

};