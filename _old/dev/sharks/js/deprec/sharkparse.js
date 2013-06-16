//console.log("Index,Date,Name,Sex,Age,Time,Country,Area,Location,Activity,Injury,Species,SpeciesLength");

var sharkParse = function () {
	var newArr = [], outputStr = '';

	$("form[botid='0']").next("table").find("tbody").find("tr").each( function() {

		newArr = [];

		$(this).find("td").each( function() {
			text = $(this).text().replace(/^\s+|\s+$/g,"");
			if (text.indexOf("22]") < 0) {
				newArr.push(text);
			}
		});

		outputStr = '';
		for(var i = 0; i < newArr.length; i++) { outputStr += newArr[i] + ','; }
		document.write(outputStr + "<br>");
	});
};