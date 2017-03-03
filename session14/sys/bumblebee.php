<? php

function returnData() {
  return array('foo' => 100,
                'bar' => 200);
};

echo json_encode(returnData());

?>
