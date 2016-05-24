<?php
/* Handles reading top 10 records of each gameplay mode from leaderboard database */

	//Necessary for another website to access crowbot.co database
	header("Access-Control-Allow-Origin: *");

	//Variable to store reference to connection to leaderboard
    $connection = mysqli_connect("localhost","crowbotc_walnut","causticSauce292","crowbotc_DotDashLeaderboard") or die("Error " . mysqli_error($connection));

	//Initialize an empty array to fill with top 10 records for each mode
	//Marathon: 0-9; Untimed: 10-19; Time Attack: 20-29 
    $emparray = array();

	//Store SQL commands in variables and use to insert records into into $emparray
    $sql_m = "SELECT mName, mScore FROM `MARATHON_HISCORE` ORDER BY mScore DESC LIMIT 10";
    $result_m = mysqli_query($connection, $sql_m) or die("Error in Selecting " . mysqli_error($connection));

    while($row =mysqli_fetch_assoc($result_m))
    {
        $emparray[] = $row;
    }
	
    $sql_u = "SELECT uName, uScore FROM `UNTIMED_HISCORE` ORDER BY uScore DESC LIMIT 10";
    $result_u = mysqli_query($connection, $sql_u) or die("Error in Selecting " . mysqli_error($connection));

    while($row =mysqli_fetch_assoc($result_u))
    {
        $emparray[] = $row;
    }

    $sql_t = "SELECT tName, tScore FROM `TIMEATTACK_HISCORE` ORDER BY tScore DESC LIMIT 10";
	
    $result_t = mysqli_query($connection, $sql_t) or die("Error in Selecting " . mysqli_error($connection));

    while($row =mysqli_fetch_assoc($result_t))
    {
        $emparray[] = $row;
    }

	//Retun the entirety of the array as a JSON string to transmit
	$filledArray = json_encode($emparray);
	echo $filledArray;

?>

