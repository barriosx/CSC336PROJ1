<?php
  session_start();
  include 'connect.php';

  //1st -  Insert ticket information
  $bookstmnt = $dbc->prepare("INSERT INTO Tickets Values ('',?,?,?,?,?,?);");
  $bookstmnt->bind_param("idsiii", $_SESSION['ps_id'],$_POST['cost'],$_POST['date'],$_POST['train'],$_POST['start'],$_POST['end']);
  $bookstmnt->execute();
  $bookstmnt->free_result();
  //2nd - Need to go through SeatsFree and find any records where there isnt data on seats on a segment for the date required 
  


  $response['name'] = ucfirst($_SESSION['first']);
  header("Content-Type: application/json");
  echo json_encode($response); 
 ?>
