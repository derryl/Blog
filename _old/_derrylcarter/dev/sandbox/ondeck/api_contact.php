<?	
	// $_POST = array("name" => "Test", "email" => "test.com", "message" => "I need some work done!");
	
	if($_POST)
	{
		$name = 	$_POST["name"];
		$sender = 	$_POST["email"];
		$message = 	$_POST["message"];
		
		$to      = "derrylcarter@gmail.com";
		$subject = "Message from DerrylCarter.com";
		$content = "From: $sender\n\n";
		$content .= "$message";
		$headers = 'From: me@derrylcarter.com' . "\r\n" .
		    'Reply-To: webmaster@example.com' . "\r\n" .
		    'X-Mailer: PHP/' . phpversion();
		
		mail($to, $subject, $content, $headers);		
	}

?>
