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
    case 'isCorrect':
        $user = login($content['login'], $content['password']);
    if ($user) {
        $user = $user[0];
        $hash = md5(generateCode(10));
        $ip = null;
        if ($content['ip']) {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        updateUser($user['id'], $hash, $ip);
        $result = array(['id' => $user['id'], 'hash' => $hash]);
        echo json_encode($result);
    } else {
        $result = array(['not_exist' => true]);
        echo json_encode($result);
    }
        break;
    case 'getUser':
        $result = getUser($content['id'], $content['hash']);
        if ($result !== false) {
            echo json_encode($result);
        } else {
            $result = array(['not_exist' => true]);
            echo json_encode($result);
        }
}

?>
