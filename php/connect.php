<?php
// Try to connect to database
// Parameters for mysqli constructor :
$dbc = new mysqli('localhost:3307','S17336sbarrio','23185552','S17336team6');
if(mysqli_connect_errno()){
  // if mysqli has error, we catch it and display what error was
  die('Unable to connect ()' . $dbc->connect_error . ')');
}
?>
