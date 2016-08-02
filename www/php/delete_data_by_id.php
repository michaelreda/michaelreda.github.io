<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));
$id = mysql_real_escape_string($data->id);
$table = mysql_real_escape_string($data->table);

$conn = new mysqli("localhost", "root", "", "pyf");
mysqli_set_charset($conn,"utf8");
$result = $conn->query("delete from ".$table." where id = ".$id." ");

$conn->close();

?>
