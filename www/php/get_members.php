<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "pyf");

$result = $conn->query("SELECT id, first_name, last_name, faculty, class FROM members");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"id":"'  . $rs["id"] . '",';
    $outp .= '"first_name":"'   . $rs["first_name"]        . '",';
    $outp .= '"last_name":"'   . $rs["last_name"]        . '",';
    $outp .= '"faculty":"'   . $rs["faculty"]        . '",';
    $outp .= '"class":"'. $rs["class"]     . '"}'; 
}
$outp ='{"records":['.$outp.']}';
$conn->close();

echo($outp);
?>
