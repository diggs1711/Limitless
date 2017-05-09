<?php

require_once 'CSV_Handler.php';

if(isset( $_POST)) {
  $handler = new CSV_Handler("temperature.csv");
  $result = $handler->fetch_data();
}

echo json_encode($result);
?>
