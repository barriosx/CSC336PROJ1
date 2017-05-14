<?php
include_once('connect.php');
/* Displaing all errors if they come up */
error_reporting(E_ALL);
ini_set('display_errors', 1);
$checkstmt = $dbc->prepare("INSERT into Passengers values ('',?,?,?,?);");
$checkstmt->bind_param("ssss",$_POST['fname'],$_POST['fname'],$_POST['lname'],$_POST['usremail']);
$checkstmt->execute();
$response['success'] = "Yes";
$response['first'] = $_POST['fname'];
// this forces php script to handle client request in a JSON format
header("Content-Type: application/json");
echo json_encode($response);
 ?>
