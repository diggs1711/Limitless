
<?php

include_once './sys/class/aircraft.php';

class AirCraftCarrier {
    $numOfAirCraft = 100;
    $topSpeed = '20 knots';
    $aircraft = array();

    public function __construct() {

    }

    public function launchAirCraft($which) {
        $ac = $this->aircraft[$which];
        $ac->fly();
    }
}
 ?>
