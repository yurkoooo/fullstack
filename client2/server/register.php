<?php
require_once 'config/db.php';
require_once 'core/function_db.php';
require_once 'core/function.php';
$conn = connect();

/**
 * register page template
 */


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$content = trim(file_get_contents("php://input"));
$content = json_decode($content, true);

switch ($content['submit']) {
    case 'isLoginExist':
        if (strlen($content['login']) >= 4 AND strlen($content['login']) < 30) {
            if (isLoginExist($content['login'])) {
                echo 'exist';
            } else {
                echo 'not_exist';
            }
        }
        break;
    case 'createNewUser':       
        if (strlen($content['login']) >= 4 AND strlen($content['login']) < 30 AND strlen($content['password']) >= 4 AND strlen($content['password']) < 30) {
            createUser($content['login'], $content['password']);
        }
        break;
    }
?>
