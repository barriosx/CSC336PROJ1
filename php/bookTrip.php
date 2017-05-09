<?php
  session_start();
  include 'connect.php';

  $bookstmnt = $dbc->prepare("INSERT INTO Tickets Values (,?,?,?,?,?,?);");
  $bookstmnt->bind_param("idsiii", $_POST);

 ?>
