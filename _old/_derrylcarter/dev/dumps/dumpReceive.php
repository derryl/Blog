<?php

	$data = $_POST;

	$file_handle = fopen('tapjoy-test.txt', 'w');
	fwrite($file_handle, $data);
	fclose($file_handle);

?>