<?php
  $loader_type = $_POST['loader_type'];

  $DB_ACCESS = array();
  $DB_ACCESS['SERVER_NAME'] = 'localhost';
  $DB_ACCESS['USER_NAME'] = 'root';
  $DB_ACCESS['PASSWORD'] = '';
  $DB_ACCESS['DB_NAME'] = 'beefood_dev';

foreach ($DB_ACCESS as $key => $value) {
    define($key, $value);
}

class DB_Connect {
  protected $db;

  public function __construct($dbo=NULL) {
    if(is_object($dbo)) {
      $this->db = $dbo;
    } else {
      $dsn = 'mysql:host=' . SERVER_NAME . ';dbname=' . DB_NAME;
      try {
        $this->db = new PDO($dsn, USER_NAME, PASSWORD);
      } catch (Exception $e) {
        die($e->getMessage());
      }
    }
  }
  public  function getDb() {
    return $this->db;
  }
}

class Menu_Loader extends DB_Connect {
  private $query = 'SELECT * FROM menu_item';

  public function __construct($dbo=NULL) {
      parent::__construct($dbo);
  }

  public function getMenuItems() {
    $stmt  = $this->getDb()->prepare($this->query);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $results;
  }
}

if($loader_type == "menu") {
  $ml = new Menu_Loader();
  $results = $ml->getMenuItems();

  echo json_encode($results);
}


?>
