<?php
/* Handles reading top 10 records of each gameplay mode from leaderboard database */

	//All headers are required to send
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Credentials: true");
	header("Access-Control-Allow-Headers: origin, content-type, accept");

	//Variable to store reference to connection to leaderboard
	$connection = mysqli_connect("localhost","crowbotc_walnut","causticSauce292","crowbotc_DotDashLeaderboard") or die("Error " . mysqli_error($connection));
	
	$json = file_get_contents('php://input');
	$dataArray = json_decode($json, true);  
	header('Content-type: application/json');
	
	$name = $dataArray["username"];
	$pass = $dataArray["password"];

	//Store SQL commands in variables and use to insert records into into $emparray
    $sql_m = "SELECT badge0, badge1, badge2, badge3, badge4, badge5, badge6, badge7, badge8, badge9, permScore, peruScore, pertScore FROM PLAYER_REC WHERE username='$name' AND password='$pass' LIMIT 1";
    $result_m = mysqli_query($connection, $sql_m) or die("Error in Selecting " . mysqli_error($connection));

	$descArray = array();
	$descArray = mysqli_fetch_assoc($result_m);
	/*
	while($row = mysqli_fetch_assoc($result_m)) {
		$descArray[] = $row;
	} */
	
	//Retun the entirety of the array as a JSON string to transmit
	echo json_encode($descArray);

?>

