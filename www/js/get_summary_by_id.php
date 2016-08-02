<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));
$id = mysql_real_escape_string($data->id);


$conn = new mysqli("localhost", "root", "", "pyf");
mysqli_set_charset($conn,"utf8");
$result = $conn->query("SELECT * FROM summaries WHERE id='".$id."'");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"id":"'  . $rs["id"] . '",';
    $outp .= '"title":"'   . $rs["title"]        . '",';
    $outp .= '"summary":"'   . $rs["summary"]        . '",';
    $outp .= '"speaker":"'   . $rs["speaker"]        . '",';
    $outp .= '"date":"'. $rs["date"]     . '"}'; 
    
}
$outp ='{"records":'.$outp.'}';
$conn->close();

echo($outp);
?>
