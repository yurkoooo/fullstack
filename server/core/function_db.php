<?php

function connect(){
    $conn = new PDO('mysql:host='.SERVER.';dbname='.DB.'', USER, PASSWORD);
    return $conn;
}

function select($query) {
    global $conn;
    $result = $conn->prepare($query);
    $result->execute();
    $queryResult = $result->fetchAll();
    if ($queryResult === false) {
    $queryResult = [];
    }
    return $queryResult;
}

function execQuery($query) {
    global $conn;
    if ($conn->exec($query) > 0){
        return true;
    }
    return false;
}