<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));
$id = mysql_real_escape_string($data->id);

$conn = new mysqli("localhost", "root", "", "pyf");

$result = $conn->query("SELECT * FROM members WHERE id='".$id."'");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"id":"'  . $rs["id"] . '",';
    $outp .= '"first_name":"'   . $rs["first_name"]        . '",';
    $outp .= '"last_name":"'   . $rs["last_name"]        . '",';
    $outp .= '"age":"'   . $rs["age"]        . '",';
    $outp .= '"home_city":"'   . $rs["home_city"]        . '",';
    $outp .= '"mobile_number":"'   . $rs["mobile_number"]        . '",';
    $outp .= '"church":"'   . $rs["church"]        . '",';
	$outp .= '"faculty":"'   . $rs["faculty"]        . '",';
    $outp .= '"class":"'   . $rs["class"]        . '",';
    $outp .= '"access_level":"'. $rs["access_level"]     . '"}'; 
}
$outp ='{"records":'.$outp.'}';
$conn->close();

echo($outp);
?>
