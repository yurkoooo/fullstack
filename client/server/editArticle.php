<?php

require_once 'config/db.php';
require_once 'core/function_db.php';
require_once 'core/function.php';
$conn = connect();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$content = trim(file_get_contents("php://input"));
$content = json_decode($content, true); 

if (count($_FILES) !== 0) {
    if ($_FILES['img'] == NULL) {
        $targetPath = 'static/json/'. basename($_FILES['file']['name']);
        move_uploaded_file($_FILES['file']['tmp_name'], $targetPath);
        $result = file_get_contents('static/json/edit.json');
        $data = json_decode($result, true);
        editArticle($data['id'], $data['title'], $data['min_desc'], $data['description'], $data['category'], null);
    } else {
        $targetPath = 'static/images/'. basename($_FILES['img']['name']);
        move_uploaded_file($_FILES['img']['tmp_name'], $targetPath);
        $targetPath = 'static/json/'. basename($_FILES['file']['name']);
        move_uploaded_file($_FILES['file']['tmp_name'], $targetPath);
        $result = file_get_contents('static/json/edit.json');
        $data = json_decode($result, true);
        editArticle($data['id'], $data['title'], $data['min_desc'], $data['description'], $data['category'], $_FILES['img']['name']);
    }
}
