<?php
  session_start();
  include 'connect.php';
  //1 - Find direction of train for recalculation of train rcost
  $tripstmt = $dbc->prepare('SELECT train_days from Trains where train_id = ?');
  $tripstmt->bind_param("i",$_POST['train']);
  $tripstmt->execute();
  $tripstmt->bind_result($days);
  while ($tripstmt->fetch()) {
    if ($days == "MF") {
      $tax = 1.1875;
    }
    else {
      $tax = 1.0575;
    }
  }

  //2 - Re-find the cost of the trip for the selected train route
  if ((int)$_POST['start'] < (int)$_POST['end']) {
    //Find the cost to travel from start to end (moving north)
    $tripstmt = $dbc->prepare("SELECT SUM(Fare) FROM Segments where (Seg_id%2=1 and South_end>=? and North_end<=?)");
    $tripstmt->bind_param("ii",$_POST['start'],$_POST['end']);
    $tripstmt->execute();
    $tripstmt->bind_result($cost);
    while ($tripstmt->fetch()) {
      $cost= number_format($cost*$tax,2);
    }
    $tripstmt->free_result();
  }
  else {
    //Find the cost to travel from start to end (moving south)
    $tripstmt = $dbc->prepare("SELECT SUM(Fare) FROM Segments where (Seg_id%2=0 and South_end<=? and North_end>=?)");
    $tripstmt->bind_param("ii",$_POST['start'],$_POST['end']);
    $tripstmt->execute();
    $tripstmt->bind_result($cost);
    while ($tripstmt->fetch()) {
      $cost= number_format($cost*$tax,2);
    }
    $tripstmt->free_result();
  }


  //3 -  Insert ticket information
  $bookstmnt = $dbc->prepare("INSERT INTO Tickets Values ('',?,?,?,?,?,?,?);");
  $bookstmnt->bind_param("idsiiii", $_SESSION['ps_id'],$cost,$_POST['date'],$_POST['train'],$_POST['start'],$_POST['end'],$_POST['numTix']);
  $bookstmnt->execute();
  $bookstmnt->free_result();
  //4 - Trigger shall run

  $response['name'] = ucfirst($_SESSION['first']);
  header("Content-Type: application/json");
  echo json_encode($response);
 ?>
