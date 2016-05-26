<?php
/* Handles reading top 10 records of each gameplay mode from leaderboard database */

	//All headers are required to send
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Credentials: true");
	header("Access-Control-Allow-Headers: origin, content-type, accept");
	header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");

	//Variable to store reference to connection to leaderboard
	$con = mysqli_connect("localhost","crowbotc_walnut","causticSauce292","crowbotc_DotDashLeaderboard") or die("Error " . mysqli_error($con));
	
	$json = file_get_contents('php://input');
	$dataArray = json_decode($json, true);  
	header('Content-type: application/json');
	
	$name = $dataArray["username"];
	$pass = $dataArray["password"];
	$data = array();
	$data = $dataArray["saveData"];

	
	//Store SQL commands in variables and use to insert records into into $emparray
    $sql = "UPDATE PLAYER_REC SET badge0='$data[0]', badge1='$data[1]', badge2='$data[2]', badge3='$data[3]', badge4='$data[4]', badge5='$data[5]', badge6='$data[6]', badge7='$data[7]', badge8='$data[8]', badge9='$data[9]', permScore='$data[10]', peruScore='$data[11]', pertScore='$data[12]' WHERE username='$name' AND password='$pass'";

	//Use the SQL command to write
	if(!mysqli_query($con, $sql)) {
		die('Error : ' . mysql_error());
	} 
	else {
		echo json_encode($name);
	}
?>

