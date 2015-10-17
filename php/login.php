<?php

  require('db.php');
  session_start();
  sleep(5);
  $userName = $_POST['user'];
  $password = $_POST['pass'];

  $userName = stripslashes($userName);
  $password = stripslashes($password);

  $userName = $mysqli->real_escape_string($userName);
  $password = $mysqli->real_escape_string($password);

  $sql = "SELECT id FROM User WHERE userName = '" . $userName . "' AND password = '" . $password . "'"; 

  $result = array();

  if( $resultdb = $mysqli->query($sql) ){

    $count = $resultdb->num_rows;
    if( $count == 1 ) {
      $_SESSION['authenticated'] = TRUE;
      $_SESSION['username'] = $userName;

      $result['success'] = TRUE;
      $result['msg'] = 'User authenticated';

    }else{
      $result['success'] = FALSE;
      $result['msg'] = 'Incorrect user or password';
    }

    $resultdb->close();

  }else{
    $result['success'] = FALSE;
    $result['msg'] = $mysqli->error . ' <br /> ' . $sql ;
  }


  $mysqli->close();

  echo json_encode($result);







