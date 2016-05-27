<?php
//rejected names: 	getUserPass.php
//					partyHatOnAPimple.php
//					breadFan.php


/* Issues SQL command to retrieve username and password given a username entered by the user. */

	//All headers are required to send
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Credentials: true");
	header("Access-Control-Allow-Headers: origin, content-type, accept");

	//Variable to store reference to connection to database
	$connection = mysqli_connect("localhost","crowbotc_walnut","causticSauce292","crowbotc_DotDashLeaderboard") or die("Error " . mysqli_error($connection));
	
	$json = file_get_contents('php://input');
	$dataArray = json_decode($json, true);  
	header('Content-type: application/json');
	
	$name = $dataArray["username"];

	//Store SQL command in variable and use to insert records into into $descArray
    $sql_m = "SELECT username, password FROM PLAYER_REC WHERE username='$name' LIMIT 1";
    $result_m = mysqli_query($connection, $sql_m) or die("Error in Selecting " . mysqli_error($connection));

	$descArray = array();
	
	while($row = mysqli_fetch_assoc($result_m)) {
		$descArray[] = $row;
	}
	
	//Retun the entirety of the array as a JSON string to transmit
	echo json_encode($descArray);

?>

