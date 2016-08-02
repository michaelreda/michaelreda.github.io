<?php
    $data = json_decode(file_get_contents("php://input"));
    //$id = mysql_real_escape_string($data->id);
    $myfile = fopen("D:/xampp/htdocs/pyf/www/js/storage_file.txt", "w") or die("Unable to open file!");
    fwrite($myfile, $data->id);
    fclose($myfile);


    function do_hash($str, $type = 'sha1')
	{
		if ( ! in_array(strtolower($type), hash_algos()))
		{
			$type = 'md5';
		}

		return hash($type, $str);
	}
?>
