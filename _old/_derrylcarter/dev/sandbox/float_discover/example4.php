<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <!-- www.phpied.com/conditional-comments-block-downloads/ -->
  <!--[if IE]><![endif]-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title></title>
  <meta name="description" content="">
  <meta name="author" content="">
  <!--  Mobile Viewport Fix -->
  <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;">
  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/typography.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/books4.css">
  <!-- All JavaScript at the bottom, except for Modernizr which enables HTML5 elements & feature detects -->
  <script src="js/jquery.js"></script>
  <script src="http://cdn.jquerytools.org/1.2.5/jquery.tools.min.js"></script>

</head>

<body>

<? include("nav.php"); ?>

<p class="expl">
This one uses three vertical containers to hold the books... maybe more effective?
</p>

<div id="wrapper">

	<div class="block">
		<div class="book large"></div>
		<div class="book medium"></div>
		<div class="book medium"></div>
		<div class="book medium"></div>
		<div class="book small"></div>
	</div>
	
	<div class="block">
		<div class="book medium"></div>
		<div class="book medium"></div>
		<div class="book medium"></div>
		<div class="book medium"></div>
		<div class="book large"></div>
		<div class="book medium"></div>
		<div class="book small"></div>
	</div>
	
	<div class="block">
		<div class="book large"></div>
<!--
		<div class="book medium"></div>
		<div class="book small"></div>
		<div class="book tiny"></div>
-->
	</div>
	
	<div id="book_info" class="reveal-modal">
	
	</div>

</div>

<script type="text/javascript">

	$(document).ready( function() {
	
		$("div.book").each( function() {
		
			var books = new Array();
			var rand = Math.floor(Math.random()*71) + 1;
			
/*			// this is meant to avoid dupes... too slow to loop through ~DC
			var duplicate = jQuery.inArray(rand, books);
			if( duplicate == -1 ) { books.push(rand); }
			else while ( duplicate == true )
			{
				rand = Math.floor(Math.random()*71) + 1;
				if( duplicate == -1 ) { books.push(rand); }
			}
*/
			
			var bookNum = "book" + rand + ".jpg";
			var book_result = "<img src='img/sample_covers/" + bookNum + "'>";
		
			$(this).html(book_result);
		});
	
	});

</script>

</body>

</html>