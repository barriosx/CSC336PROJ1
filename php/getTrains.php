<?php
  include_once('connect.php');
  if (!$dbc) {
    header("Location: ../LOGIN_PAGE.html");
  }

  /* Displaing all errors if they come up */
  error_reporting(E_ALL);
  ini_set('display_errors', 1);
  if ($_POST['dir'] == 'N') {
    // Find the cost to travel from start to end
    $createstmt = $dbc->prepare("SELECT SUM(Fare) FROM Segments where (Seg_id%2=1 and South_end>=? and North_end<=?)");
    $createstmt->bind_param("ii",$_POST['startTrip'],$_POST['endTrip']);
    $createstmt->execute();
    $createstmt->bind_result($cost);

    $tripstmt = $dbc->prepare("SELECT Trains.train_id from Trains
      inner join (select Trains.train_id As tr from Trains inner join Stops_at
                  on Stops_at.train_num=Trains.train_id where Stops_at.station_id = ?) As tbl1
      on tbl1.tr= Trains.train_id
      inner join (select Trains.train_id As tr from Trains inner join Stops_at
                    on Stops_at.train_num=Trains.train_id where Stops_at.station_id = ?)As tbl2
      on tbl2.tr= Trains.train_id
      where Trains.directions=1 and Trains.train_days=?;");
    $tripstmt->bind_param("ii",$_POST['startTrip'],$_POST['endTrip'],$_POST['day']);
    $tripstmt->execute();
    $tripstmt->bind_result($trains);
  }
  else {
    // Find the cost to travel from start to end
    $createstmt = $dbc->prepare("SELECT SUM(Fare) FROM Segments where (Seg_id%2=0 and South_end<=? and North_end>=?)");
    $createstmt->bind_param("ii",$_POST['startTrip'],$_POST['endTrip']);
    $createstmt->execute();
    $createstmt->bind_result($cost);

  }
  $createstmt = $dbc->prepare("SELECT SUM(Fare) FROM Segments where (Seg_id%2=0 and South_end<=? and North_end>=?)");
  $createstmt->bind_param("ii",$_POST['startTrip'],$_POST['endTrip']);
  $createstmt->execute();
  while ($createstmt->fetch()) {
    $data['cost'] = $cost;
  }
  $createstmt->free_result();

  header("Content-Type: application/json");
  echo json_encode($data);
 ?>
