<?php


  $server = 'localhost';
  $user   = 'sakila';
  $pass   = 'password';
  $dbname = 'sakila';

  $mysqli = new mysqli($server, $user, $pass, $dbname);

  if( $mysqli->connect_errno ){
    printf("Connect Failed: %s\n", mysqli_connect_error());
    exit;
  }
