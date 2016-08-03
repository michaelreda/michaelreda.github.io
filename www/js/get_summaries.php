<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$host="127.7.30.2";
//mysql_connect($host,"adminWgLJxMp","H18sCM-e3FKn") or die(mysql_error());
$conn = new mysqli($host,"adminWgLJxMp","H18sCM-e3FKn", "pyf");

$result = $conn->query("SELECT id, title, date FROM summaries");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"id":"'  . $rs["id"] . '",';
    $outp .= '"title":"'   . $rs["title"]        . '",';
    $outp .= '"date":"'. $rs["date"]     . '"}'; 
}
$outp ='{"records":['.$outp.']}';
$conn->close();

echo($outp);
?>
