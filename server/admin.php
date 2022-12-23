<?php
/**
 * login page template
 */
require_once 'config/db.php';
require_once 'core/function_db.php';
require_once 'core/function.php';
$conn = connect();


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$content = trim(file_get_contents("php://input"));
$content = json_decode($content, true); 

switch ($content['submit']) {
    case 'removeArticle':
        removeArticle($content['id']);
        break;
}



?>