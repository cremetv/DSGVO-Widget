<?php
header("Content-Type: text/html; charset=utf-8");
include_once 'db.php';
$con = DB::getConnection();


/*
* Elements
*/
$sql = "SELECT * FROM elements";
$result = $con->query($sql);

$elements = [];
if ($result->rowCount() > 0) {
  while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    array_push($elements, $row);
  }
}

/*
* CustomElements
*/
$sql = "SELECT * FROM customElements";
$result = $con->query($sql);

$customElements = [];
if ($result->rowCount() > 0) {
  while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    array_push($customElements, $row);
  }
}

$output = (object) ['customElements' => $customElements, 'elements' => $elements];

echo json_encode($output);

$con = null;
