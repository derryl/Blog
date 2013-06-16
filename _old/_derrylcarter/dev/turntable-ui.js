$("#outer").css({ width: "840px" });

$("#right-panel").css({
	position: "absolute",
	width: "300px"
});

$(".playlist-container").css({
	position: "fixed",
	overflow: "visible",
	height: "700px",
	zIndex: "99998"
});
$(".chat-container").css({
	position: "fixed",
	top: "650px",
	zIndex: "99999"
});
$(".songlist").css({ height: "800px" });
$(".song").css({ height: "32px" });
$(".song .title").css({ top: "4px", overflow: "visible" });
$(".song.topSong, .song.currentSong").css({ backgroundPosition: "0px 0px" });
$(".song .goTop").css({ top: "8px" });
$(".song .playSample").css({ top: "8px" });
$(".song .titlediv").css({ maxWidth: "250px" });
$(".song .buy").hide();
$(".song .details").css({ top: "18px" });
$(".message").css({ width: "100%" });
$(".chatBar").css({ width: "100%" });
$(".remove").css({
	top: "10px",
	left: "350px"
});

if(!showButtonInterval) {
	showButtonInterval = setInterval( showButtons, 5000 );
} else {
	clearInterval(showButtonInterval);
	showButtonInterval = setInterval( showButtons, 5000 );
}

function showButtons() {
	$(".remove").show();
}