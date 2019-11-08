<?php
include_once 'db.php';
$con = DB::getConnection();


$key = $_GET['key'];


/*
* Client
*/
$sql = "SELECT * FROM clients WHERE id = 1";
$result = $con->query($sql);

$client = [];
if ($result->rowCount() > 0) {
  while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $clientId = $row['id'];
    array_push($client, $row);
  }
}

/*
* Privacy
*/
$sql = "SELECT * FROM datenschutz WHERE clientId = $clientId";
$result = $con->query($sql);

$privacy = [];
if ($result->rowCount() > 0) {
  while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    array_push($privacy, $row);
  }
}

/*
* Impressum
*/
$sql = "SELECT * FROM impressum WHERE clientId = $clientId";
$result = $con->query($sql);

$impressum = [];
if ($result->rowCount() > 0) {
  while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    array_push($impressum, $row);
  }
}

$output = (object) ['client' => $client[0], 'privacy' => $privacy, 'impressum' => $impressum];

echo json_encode($output);

$con = null;
