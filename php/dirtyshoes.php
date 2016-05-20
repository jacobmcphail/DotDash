<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: origin, content-type, accept");
/*Receives the output of a script and works on it*/
$con = mysqli_connect("localhost","crowbotc_walnut","causticSauce292","crowbotc_DotDashLeaderboard") or die("Error " . mysqli_error($con));

$json = file_get_contents('php://input');
$dataArray = json_decode($json, true);  
header('Content-type: application/json');

var_dump($dataArray);
echo "<br>";

//store the element values into variables
$mode = $dataArray["mode"];
$name = $dataArray["player_name"];
$score = $dataArray["player_score"];

/*Depending on mode, assign something different to $SQL
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

if(!mysqli_query($con, $sql)) //$con is mysql connection object
{
 die('Error : ' . mysql_error());
} 
else {
	echo "you done right boy";
}

?>

