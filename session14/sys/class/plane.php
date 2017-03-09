
<?php

class Plane {
    public $ele;
    public $topSpeed;

    public function __construct() {
      $this->ele = 'foo';
      $this->topSpeed = 'mach 3';
    }

    public function init() {}
    public function fly() {}
}

$p = new Plane();

echo $p->ele.'<br>';
echo $p->topSpeed;

?>
