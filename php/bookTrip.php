<?php
  session_start();
  include 'connect.php';
  //1st -  

  // $bookstmnt = $dbc->prepare("INSERT INTO Tickets Values ('',?,?,?,?,?,?);");
  // $bookstmnt->bind_param("idsiii", $_POST);

  $response['name'] = ucfirst($_SESSION['first']);


  header("Content-Type: application/json")
  echo json_encode($response); 
 ?>
