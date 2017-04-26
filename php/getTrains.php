<?php
  include_once('connect.php');
  if (!$dbc) {
    header("Location: ../LOGIN_PAGE.html");
  }

  header("Content-Type: application/json");
  $rawdata = json_decode(stripslashes(file_get_contents("php://input")), true);

  /* Displaing all errors if they come up */
  error_reporting(E_ALL);
  ini_set('display_errors', 1);
  if ($rawdata['dir'] == 'N') {
    // Find the cost to travel from start to end
    $createstmt = $dbc->prepare("SELECT SUM(Fare) FROM Segments where (Seg_id%2=1 and South_end>=? and North_end<=?)");
    $createstmt->bind_param("ii",$rawdata['startTrip'],$rawdata['endTrip']);
    $createstmt->execute();
    $createstmt->bind_result($cost);
  }
  else {
    // Find the cost to travel from start to end
    $createstmt = $dbc->prepare("SELECT SUM(Fare) FROM Segments where (Seg_id%2=0 and South_end<=? and North_end>=?)");
    $createstmt->bind_param("ii",$rawdata['startTrip'],$rawdata['endTrip']);
    $createstmt->execute();
    $createstmt->bind_result($cost);
  }
  while ($createstmt->fetch()) {
    $data['cost'] = $cost;
  }
  $createstmt->free_result();

  echo json_encode($data);
 ?>
