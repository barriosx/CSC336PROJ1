<?php
/*
This example uses an array called a session array, one of a few arrays that are provided by web apps.
It is an array that can store variables that you might need as you move from webpage to webpage
*/
include_once('connect.php');
// if the dbc variable points no where, we direct them back to login page
if (!$dbc) {
  header("Location: ../LOGIN_PAGE.html");
}

// this forces php script to handle client request in a JSON format
header("Content-Type: application/json");

// We store the input (request) into arrary variable rawdata, overriding default return value to associative array
$rawdata = json_decode(stripslashes(file_get_contents("php://input")), true);

/* Displaing all errors if they come up */
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Get global post parameters
$user = $rawdata['usr'];
$pass = $rawdata['passwd'];
// Set up our sql command
$checkstmt = $dbc->prepare("SELECT passenger_id FROM Passengers WHERE email = ? and pass = ?");
$checkstmt->bind_param("ss",$user,$pass);
$checkstmt->execute();
$checkstmt->store_result();
$rows= $checkstmt->num_rows;
$checkstmt->free_result();
if($rows >0){
  // We are logged in, start the session
  session_start();
}
else {
  // Invalid credentials
  $dbc->close();

}
?>
