<?php
//Rejected names: 	newUser.php
//					modernGuilt.php
//					potatoParasol.php

/* Creates a new record given a usename and a password */

	//All headers are required to send
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Credentials: true");
	header("Access-Control-Allow-Headers: origin, content-type, accept");

	//Variable to store reference to connection to leaderboard
	$con = mysqli_connect("localhost","crowbotc_walnut","causticSauce292","crowbotc_DotDashLeaderboard") or die("Error " . mysqli_error($con));

	//Gets and decodes JSON string containing information to write into database
	$json = file_get_contents('php://input');
	$dataArray = json_decode($json, true);  
	header('Content-type: application/json');

	//Decoded JSON string is an array. 
	//Store the gameplay mode, name, and score in variables.
	$name = $dataArray["username"];
	$pass = $dataArray["password"];


	$sql="INSERT INTO PLAYER_REC (username, password) VALUES ('$name', '$pass')";


	echo $sql; 

	//Use the SQL command to write
	if(!mysqli_query($con, $sql)) {
		die('Error : ' . mysql_error());
	} 
	else {
		echo "Quoth the pineapple: FANTASTIQUE!";
	}

?>

