<?php
  session_start();
  include_once('connect.php');
  if (!$dbc) {
    header("Location: ../LOGIN_PAGE.html");
  }
  //
  // /* Displaing all errors if they come up */
  error_reporting(E_ALL);
  ini_set('display_errors', 1);
  if ($_POST['day'] == "MF") {
    $tax = 1.1875;
  }
  else {
    $tax = 1.0575;
  }
  $days = '%'.$_POST['day'].'%';
  if ($_POST['dir'] == 'N') {
    // 1st : Get a list of all possible trains going from point A and point B whose operation days is = $_POST['day']
    $tripstmt = $dbc->prepare('SELECT Trains.train_id FROM Trains INNER JOIN (select Trains.train_id As tr from Trains inner join Stops_at on Stops_at.train_num=Trains.train_id where Stops_at.station_id = ?) As tbl1
    on tbl1.tr= Trains.train_id INNER JOIN (select Trains.train_id As tr from Trains inner join Stops_at on Stops_at.train_num=Trains.train_id where Stops_at.station_id = ?)As tbl2
    on tbl2.tr=Trains.train_id WHERE (Trains.directions = 1 and Trains.train_days LIKE ?);');
    $tripstmt->bind_param("iis",$_POST['startTrip'],$_POST['endTrip'],$days);
    $tripstmt->execute();
    $tripstmt->bind_result($train);
    while($tripstmt->fetch()){
      $trains['train'.$train] = array();
    }
    $tripstmt->free_result();
    // 2nd: For each train, are there free seats available at each segment that makes up the entire trip?
    foreach ($trains as $key => $value) {
      $trainid = substr($key,5);
      $tripstmt->prepare("SELECT seg_id, numFree from FreeSeats
        where (seg_id in
        (select Seg_id from Segments where (Seg_id%2=1 and South_end>=? and North_end<=?))
        and train_id = ? and numFree = 0 and trainDate = ?)");
      $tripstmt->bind_param("iiis",$_POST['startTrip'],$_POST['endTrip'],$trainid,$_POST['tripDate']);
      $tripstmt->execute();
      $tripstmt->store_result();
      $rows = $tripstmt->num_rows;
      $tripstmt->free_result();
      if($rows >0){
        // There is a segment or more that is full!!!

      }
      else{
        // 3rd: Find the cost to travel from start to end (moving north)
        $tripstmt = $dbc->prepare("SELECT SUM(Fare) FROM Segments where (Seg_id%2=1 and South_end>=? and North_end<=?)");
        $tripstmt->bind_param("ii",$_POST['startTrip'],$_POST['endTrip']);
        $tripstmt->execute();
        $tripstmt->bind_result($cost);
        while ($tripstmt->fetch()) {
          $trains[$key]['cost'] = "Cost: $".number_format($cost*$tax,2);
        }
        $tripstmt->free_result();
        // 4th: Get the arrival times
        $tripstmt = $dbc->prepare("SELECT time_in FROM Stops_at where train_num =? and station_id=?");
        $tripstmt->bind_param("ii",$trainid,$_POST['startTrip']);
        $tripstmt->execute();
        $tripstmt->bind_result($timein);
        while ($tripstmt->fetch()) {
          $trains[$key]['timeinstart'] = "Departs at: ".$timein;
        }
        $tripstmt->free_result();
        $tripstmt = $dbc->prepare("SELECT time_in FROM Stops_at where train_num =? and station_id=?");
        $tripstmt->bind_param("ii",$trainid,$_POST['endTrip']);
        $tripstmt->execute();
        $tripstmt->bind_result($timein);
        while ($tripstmt->fetch()) {
          $trains[$key]['timeinend'] = "Arrives at: ".$timein;
        }
        $tripstmt->free_result();
      }
    }
  }
  else { // Moving south scenario
    // 1st : Get a list of all possible trains going from point A and point B whose operation days is = $_POST['day']
    $tripstmt = $dbc->prepare('SELECT Trains.train_id FROM Trains INNER JOIN (select Trains.train_id As tr from Trains inner join Stops_at on Stops_at.train_num=Trains.train_id where Stops_at.station_id = ?) As tbl1
    on tbl1.tr= Trains.train_id INNER JOIN (select Trains.train_id As tr from Trains inner join Stops_at on Stops_at.train_num=Trains.train_id where Stops_at.station_id = ?)As tbl2
    on tbl2.tr=Trains.train_id WHERE (Trains.directions = 0 and Trains.train_days LIKE ?);');
    $tripstmt->bind_param("iis",$_POST['startTrip'],$_POST['endTrip'],$days);
    $tripstmt->execute();
    $tripstmt->bind_result($train);
    while($tripstmt->fetch()){
      $trains['train'.$train] = array();
    }
    $tripstmt->free_result();
    // 2nd: For each train, are there free seats available at each segment that makes up the entire trip?
    foreach ($trains as $key => $value) {
      $trainid = substr($key,5);
      $tripstmt->prepare("SELECT seg_id, numFree from FreeSeats
        where (seg_id in
        (select Seg_id from Segments where (Seg_id%2=0 and South_end<=? and North_end>=?))
        and train_id = ? and numFree = 0 and trainDate = ?)");
      $tripstmt->bind_param("iiis",$_POST['startTrip'],$_POST['endTrip'],$trainid,$_POST['tripDate']);
      $tripstmt->execute();
      $tripstmt->store_result();
      $rows = $tripstmt->num_rows;
      $tripstmt->free_result();
      if($rows >0){
        // There is a segment or more that is full!!!

      }
      else{
        // 3rd: Find the cost to travel from start to end (moving south)
        $tripstmt = $dbc->prepare("SELECT SUM(Fare) FROM Segments where (Seg_id%2=0 and South_end<=? and North_end>=?)");
        $tripstmt->bind_param("ii",$_POST['startTrip'],$_POST['endTrip']);
        $tripstmt->execute();
        $tripstmt->bind_result($cost);
        while ($tripstmt->fetch()) {
          $trains[$key]['cost'] = "Cost: $".number_format($cost*$tax,2);
        }
        $tripstmt->free_result();
        // 4th: Get the arrival times
        $tripstmt = $dbc->prepare("SELECT time_in FROM Stops_at where train_num =? and station_id=?");
        $tripstmt->bind_param("ii",$trainid,$_POST['startTrip']);
        $tripstmt->execute();
        $tripstmt->bind_result($timein);
        while ($tripstmt->fetch()) {
          $trains[$key]['timeinstart'] = "Departs at: ".$timein;
        }
        $tripstmt->free_result();
        $tripstmt = $dbc->prepare("SELECT time_in FROM Stops_at where train_num =? and station_id=?");
        $tripstmt->bind_param("ii",$trainid,$_POST['endTrip']);
        $tripstmt->execute();
        $tripstmt->bind_result($timein);
        while ($tripstmt->fetch()) {
          $trains[$key]['timeinend'] = "Arrives at: ".$timein;
        }
        $tripstmt->free_result();
      }
    }
  }
  header("Content-Type: application/json");
  echo json_encode($trains);

 ?>
