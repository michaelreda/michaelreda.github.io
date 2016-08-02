<?php
$data = json_decode(file_get_contents("php://input"));
$first_name = mysql_real_escape_string($data->first_name);
$last_name = mysql_real_escape_string($data->last_name);
$age = mysql_real_escape_string($data->age);
$homeCity = mysql_real_escape_string($data->homeCity);
$mobile = mysql_real_escape_string($data->mobile);
$church = mysql_real_escape_string($data->church);
$faculty = mysql_real_escape_string($data->faculty);
$dash = mysql_real_escape_string($data->dash);


$host="127.7.30.2";

mysql_connect($host,"adminWgLJxMp","H18sCM-e3FKn") or die(mysql_error());
mysql_select_db("pyf") or die(mysql_error());
mysql_query("INSERT INTO members(first_name,last_name,age,home_city,mobile_number,church,faculty,class)VALUES('".$first_name."','".$last_name."','".$age."','".$homeCity."','".$mobile."','".$church."','".$faculty."','".$dash."')");
$id = json_decode(mysql_insert_id());
echo $id;



/*
$con=mysqli_init();
if (!$con)
  {
  die("mysqli_init failed");
  }

mysqli_ssl_set($con,"key.pem","cert.pem","cacert.pem",NULL,NULL); 

if (!mysqli_real_connect($con,"https://pyf2-michaelreda96.rhcloud.com/","adminMfcGa1s","N_K8QfcpBSA-","pyf"))
  {
  die("Connect Error: " . mysqli_connect_error());
  }

mysqli_query($con,"INSERT INTO members(first_name,last_name,age,home_city,mobile_number,church,faculty,class)VALUES('".$first_name."','".$last_name."','".$age."','".$homeCity."','".$mobile."','".$church."','".$faculty."','".$dash."')");

mysqli_close($con);
*/



/*$conn = new mysqli("localhost", "root", "", "pyf");
$id = $conn->insert_id;
*/
//$output='{"records":'.$id.'}';
//$conn->close();
//echo $output;


/*
header("Access-Control-Allow-Origin: *");
$host = "localhost";
$user = "root";
$pass = "";
$db = "pyf";

$link = mysqli_connect($host, $user, $pass, $db) or die(mysqli_error($link));

// get input data
$data = json_decode(file_get_contents("php://input"));

// take value from array
$name= $data['name'];


// query insert
$sql = "insert into members (first_name) values ('$name') ";

// echo message
if(mysqli_query($link, $sql)):
    echo "input success| name: $name";
else: echo "input failed| name : $name ";
endif;
*/


?>
