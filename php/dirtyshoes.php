<?php
//Rejected names:	writeDB.php
//					iAmAPartTimeWizard.php
//					birdLoaf.php

/* Handles writing records to leaderboard database */

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
	$mode = $dataArray["mode"];
	$name = $dataArray["player_name"];
	$score = $dataArray["player_score"];

	/*Depending on mode, generate a different SQL command and store in $sql
	0: marathon
	1: no timer
	2: time attack
	*/
	switch ($mode) {
		case 0:
			$sql="INSERT INTO MARATHON_HISCORE (mName, mScore) VALUES ('$name', '$score')";
			break;
		case 1:
			$sql="INSERT INTO UNTIMED_HISCORE (uName, uScore) VALUES ('$name', '$score')";
			break;
		case 2:
			$sql="INSERT INTO TIMEATTACK_HISCORE (tName, tScore) VALUES ('$name', '$score')";
			break;
		default:
			echo "You should not see this";
	}

	echo $sql; 

	//Use the SQL command to write
	if(!mysqli_query($con, $sql)) {
		die('Error : ' . mysql_error());
	} 
	else {
		echo "Quoth the pineapple: FANTASTIQUE!";
	}

?>

