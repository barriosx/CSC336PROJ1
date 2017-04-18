<?php
  /*
  This is an example script on how to run an INSERT statement using php and an established connection to a DB
  This example uses an array called a session array, one of a few arrays that are provided by web apps.
  It is an array that can store variables that you might need as you move from webpage to webpage

  */

  include_once('connect.php');
  if (!$dbc) {
    header("Location: ../LOGIN_PAGE.html");
  }

  // handle client request in JSON format
  header("Content-Type: application/json");
  // overriding default return value to associative array
  $cutwo = json_decode(stripslashes(file_get_contents("php://input")), true);

  // I get back the session that has already been started
  session_start();
  if ($_SESSION['RC']==2998) {
    $section="TW";
  }
  elseif ($_SESSION['RC'] == 2996) {
    $section="TE";
  }
  elseif ($_SESSION['RC'] == 2981) {
    $section="CC";
  }
  elseif ($_SESSION['RC'] == 2979) {
    $section="PY";
  }
  elseif ($_SESSION['RC'] == 2978) {
    $section="SC";
  }
  /* Displaing all errors if they come up */
  error_reporting(E_ALL);
  ini_set('display_errors', 1);

  $createstmt = $dbc->prepare("INSERT INTO {$section}_WO (woNum,woClass) VALUES (?,?);");
  $createstmt->bind_param("sssiiisiisisisisssiiis",$cutwo['woNum'],$cutwo['woClass']);
  $createstmt->execute();
  $createstmt->free_result();

 ?>
