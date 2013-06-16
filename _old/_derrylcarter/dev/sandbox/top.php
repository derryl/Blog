<html>

<head>

<style>
	body { background: #333; font-family: helvetica; color: #666; }
	h1 { text-transform: uppercase; line-height: 0;}
	a, a:hover, a:visited { color: #ff7200; font-size: 24px; line-height: 32px; text-decoration: none; text-shadow: 0 -1px 1px #000; }
	#box {
		width: 450px;
		position: absolute;
		left: 50%; margin-left: -225px;
		top: 100px;
		padding: 25px;
		background: #222;
		border-radius: 25px;
	}
</style>
</head>



<body>

	<div id="box">
	
	<h1>Experiments</h1>

	<?
	
		if ($handle = opendir('.')) {
		
			$files = array();
		
		    while (false !== ($file = readdir($handle))) {
		        
		        if(!strpos($file,".") && $file != "." && $file !=".." && $file != ".htpasswd" && $file != ".htaccess") {
		        
		        	$files[] = $file;
		        
		        }
		    }
		
		    closedir($handle);
		    
		    sort($files);
		    
		    foreach($files as $file) {
		    
		    	echo "<a href='$file'>$file</a><br>";
		    
		    }
		}
	
	?>

	</div>

</body>

</html>