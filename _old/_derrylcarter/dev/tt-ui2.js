// DEBUG
//window.location.reload();
$("#myShit").remove();


// ADD SELECTORS, ETC. TO UI FOR CSS TO USE
arr = $(".roomView").children();
dancefloor = $(arr[1]);
dancefloor.attr("style","").attr("id","dancefloor");

// UI CHANGES
console.log($.get("http://www.derrylcarter.com/dev/tt-ui2.less"));
//$('head').append('<link rel="stylesheet/less" href="http://www.derrylcarter.com/dev/tt-ui2.less" id="myShit" />');
$('head').append('<script type="text/javascript" src="https://raw.github.com/cloudhead/less.js/master/dist/less-1.3.0.min.js"></script>');









// Bookmarklet
// javascript:(function(){$.getScript('http://www.derrylcarter.com/dev/tt-ui2.js');})();


javascript:(function(){$.getScript('https://raw.github.com/chrisinajar/jarTT/master/jarTT.js');})();