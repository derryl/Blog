<?
	function copy_directory( $source, $destination ) {
		if ( is_dir( $source ) ) 
		{
			@mkdir( $destination );
			$directory = dir( $source );
			while ( FALSE !== ( $readdirectory = $directory->read() ) ) {
				if ( $readdirectory == '.' || $readdirectory == '..' ) {
					continue;
				}
				$PathDir = $source . '/' . $readdirectory; 
				if ( is_dir( $PathDir ) ) {
					copy_directory( $PathDir, $destination . '/' . $readdirectory );
					continue;
				}
				copy( $PathDir, $destination . '/' . $readdirectory );
			}
	 
			$directory->close();
		}else {
			copy( $source, $destination );
		}
	}
	
	copy_directory("athina", "athina2");

	$ip = $_SERVER['REMOTE_ADDR'];
	
	if($ip=="76.174.15.254") echo "You are Derryl Carter.";


?>