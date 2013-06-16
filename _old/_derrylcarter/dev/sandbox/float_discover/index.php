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
  <link rel="stylesheet" href="css/books1.css">
  <!-- All JavaScript at the bottom, except for Modernizr which enables HTML5 elements & feature detects -->
  <script src="js/jquery.js"></script>
  <script src="http://cdn.jquerytools.org/1.2.5/jquery.tools.min.js"></script>

</head>

<body>

<? include("nav.php"); ?>

<p class="expl">
Each of these examples use a <span class="code">div</span> with a class of <span class="code">book</span> to represent each result.<br><br>
This first one is an attempt to format the results without using sub-containers to contain blocks of books (to make it easier to render results).
</p>

<div id="wrapper">

	<div class="book full"></div>

	<div class="book half"></div>
	<div class="book quarter"></div>
	<div class="book quarter"></div>
	
	<div class="book quarter"></div>
	<div class="book quarter"></div>
	<div class="book quarter"></div>
	<div class="book quarter"></div>

</div>

</body>

</html>