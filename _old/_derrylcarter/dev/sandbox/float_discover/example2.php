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
  <link rel="stylesheet" href="css/books2.css">
  <!-- All JavaScript at the bottom, except for Modernizr which enables HTML5 elements & feature detects -->
  <script src="js/jquery.js"></script>
  <script src="http://cdn.jquerytools.org/1.2.5/jquery.tools.min.js"></script>

</head>

<body>

<? include("nav.php"); ?>

<p class="expl">
This one uses blocks to contain mid-small book results, still floated horizontally in one big container.
</p>

<div id="wrapper">

	<div class="book large"></div>
	
	<div class="block">
		<div class="book medium"></div>
		<div class="book medium"></div>
		<div class="book medium"></div>
		<div class="book medium"></div>
	</div>
	
	<div class="book large"></div>
	
	<div class="book small"></div>
	
	<div class="book tiny"></div>
	
</div>

</body>

</html>