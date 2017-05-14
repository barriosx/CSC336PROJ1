<?php
  session_start();
  include_once('connect.php');
  if (!$dbc) {
    header("Location: ../LOGIN_PAGE.html");
  }
  // I get back the session that has already been started

  /* Displaing all errors if they come up */
  error_reporting(E_ALL);
  ini_set('display_errors', 1);

  $createstmt = $dbc->prepare("SELECT station_id,name FROM Stations ORDER BY name");
  $createstmt->execute();
  $createstmt->bind_result($sid,$name);
  while ($createstmt->fetch()) {
    $data[(string)$sid."_"] = $name; // I concat the '_' because i noticed that the browser will re order the station_id
  }
  echo json_encode($data);
 ?>
