<?php
require_once 'config/db.php';
require_once 'core/function_db.php';
require_once 'core/function.php';
$conn = connect();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$content = trim(file_get_contents("php://input"));
$content = json_decode($content, true);


switch ($content['route']) {
    case '/':
        $query = 'select * from info';
        $result = select($query);
        echo json_encode($result, true);
        break;
    case 'categories':
        $result = getCategories();
        echo json_encode($result, true);
        break;
    case 'category':
        $result = getCategory($content['id']);
        echo json_encode($result, true);
        break;
    case 'nameCategory':
        $result = getCurrentCategory($content['id']);
        echo json_encode($result, true);
        break;
    case 'detailed':
        $result = getArticle($content['id']);
        echo json_encode($result, true);
        break;
}

