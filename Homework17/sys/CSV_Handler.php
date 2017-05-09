<?php

/**
 *
 */
class CSV_Handler
{
  private $result;
  private $file;
  private $handle;

  public function __construct($f)
  {
    $this->file = $f;
    $this->result = array();
  }

  public function fetch_data() {
    if (($handle = fopen($this->file, "r")) !== FALSE) {
        $column_headers = fgetcsv($handle); // read the row.
        foreach($column_headers as $header) {
                $result[$header] = array();
        }

        while (($data = fgetcsv($handle)) !== FALSE) {
            $i = 0;
            foreach($result as &$column) {
                    $column[] = $data[$i++];
                  }
            }
      }
      
      fclose($handle);

      return $result;
  }

}

?>
