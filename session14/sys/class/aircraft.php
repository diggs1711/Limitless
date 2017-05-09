<?php
include_once './sys/class/plane.php';

class AirCraft extends Plane {
  public $ammo = 10;
  public function __construct($numOfAmmo) {
    $this->ammo = $numOfAmmo;
  }

  public function fireAmmo() {
    if($this->ammo > 0) {
      $this->ammo--;
      echo $this->ammo . ' left<br>';
    }else  {
      echo 'out of ammo<br>';
    }
  }
}

?>
