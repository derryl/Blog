<?php

// import OAuth library
require_once ('../resources/OAuth.php');

// $request_type = $_POST['request_type'];
$name = $_POST['name'];

$unsigned_url = "http://api.yelp.com/v2/business/" . $name;

// Set your keys here
$consumer_key 	 = "JJmbAFTV3fveClUfafmUGw";
$consumer_secret = "QazYaj0KSosUQB-aJQVx03wPyxY";
$token 			 = "J2KFPOrffi33W2sLCjOYg3bEvmxkD7bv";
$token_secret 	 = "eBgd9c5dvMM90n-4afjvsEqSC28";

// Token object built using the OAuth library
$token = new OAuthToken($token, $token_secret);

// Consumer object built using the OAuth library
$consumer = new OAuthConsumer($consumer_key, $consumer_secret);

// Yelp uses HMAC SHA1 encoding
$signature_method = new OAuthSignatureMethod_HMAC_SHA1();

// Build OAuth Request using the OAuth PHP library. Uses the consumer and token object created above.
$oauthrequest = OAuthRequest::from_consumer_and_token($consumer, $token, 'GET', $unsigned_url);

// Sign the request
$oauthrequest->sign_request($signature_method, $consumer, $token);

// Get the signed URL
$signed_url = $oauthrequest->to_url();

// Send Yelp API Call
$ch = curl_init($signed_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 0);
$data = curl_exec($ch); // Yelp response
curl_close($ch);

// Handle Yelp response data
$response = json_decode($data);

// Print it for debugging
print_r($response);


?>