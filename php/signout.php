<?php
  session_start();
  $_SESSION = array();
  session_destroy();
  header("Location: ../LOGIN_PAGE.html");
  exit();
 ?>
