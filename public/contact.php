<?php
header("Content-Type: application/json");

$raw = file_get_contents("php://input");
if (!$raw) {
  echo json_encode(["success" => false, "message" => "Empty payload"]);
  exit;
}

$data = json_decode($raw, true);
if (!$data) {
  echo json_encode(["success" => false, "message" => "Invalid JSON"]);
  exit;
}

// TODO: Integrate with your email or CRM.

echo json_encode(["success" => true]);