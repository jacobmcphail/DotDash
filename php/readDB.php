<?php

	header("Access-Control-Allow-Origin: *");

    $connection = mysqli_connect("localhost","crowbotc_walnut","causticSauce292","crowbotc_DotDashLeaderboard") or die("Error " . mysqli_error($connection));

//Records 1-10 marathon; 11-20 no timer; 21-30 time attack

    $emparray = array();
    
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

	$filledArray = json_encode($emparray); //returns entirety of array as a string
	echo $filledArray;

?>

