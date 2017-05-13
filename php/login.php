<?php
/*
This example uses an array called the session superglobal, one of a few unique arrays.
It is an array that can store variables that you might need as you move from webpage to webpage
*/
include_once('connect.php');
// if the dbc variable points no where, we direct them back to login page
if (!$dbc) {
  header("../loginform.php");
}
/* Displaing all errors if they come up */
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Get global post parameters
$user = $_POST['usr'];
// Set up our sql command
$checkstmt = $dbc->prepare("SELECT passenger_id, fname,lname FROM Passengers WHERE email = ?;");
$checkstmt->bind_param("s",$user); // check check password once the dbc connection can be figured out
$checkstmt->execute();
$checkstmt->bind_result($ps,$f,$l);
session_start();
while ($checkstmt->fetch()) {
	$_SESSION['ps_id'] = $ps;
  	$_SESSION['first'] = $f;
  	$_SESSION['last'] = $l;
}
$checkstmt->store_result();
$rows= $checkstmt->num_rows;
$checkstmt->free_result();
if($rows >0){
  // We are logged in, start the session
  $response['success'] = "Yes";
}
else {
  // Invalid credentials
  $response['success'] = "No";
}
// this forces php script to handle client request in a JSON format
header("Content-Type: application/json");
echo json_encode($response);
?>
