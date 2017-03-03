<?php

function returnData() {
  return array('foo' => 100,
                'bar' => 200,
              'list' => array(
                array(
                  'val' => 100,
                  'name' => 'John'
                ),
                array(
                  'val' => 200,
                  'name' => 'Mark'
                ),
                array(
                  'val' => 300,
                  'name' => 'David'
                )
              )
            );
};

echo json_encode(returnData());

?>
