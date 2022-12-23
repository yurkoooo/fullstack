<?php

function getArticle($id) {
    $query = "select * from info where id='".$id."'";
    return select($query)[0];
}


function getCategories() {
    $query = "select * from category";
    return select($query);
}

function getCategory($id) {
    $query = "select * from info where cid = $id";
    return select($query);
}

function getCurrentCategory($id) {
    $query = "select * from category where id = $id";
    return select($query)[0];
}

function isLoginExist($login) {
    $query = "select id from users where login='".$login."'";
    $result = select($query);
    if (count($result) === 0) return false;
    return true;
}

function createUser($login, $password){
    $password = md5(md5(trim($password)));
    $login = trim($login);
    $query = "INSERT INTO users SET login='".$login."', password='".$password."'";
    return execQuery($query);
}

function login($login, $password){
    $password = md5(md5(trim($password)));
    $login = trim($login);
    $query = "SELECT id, login from users WHERE login='".$login."' AND password='".$password."'";
    $result = select($query);
    if ( count($result) != 0) return $result;
    return false;
}


function updateUser($id, $hash, $ip){
    if (is_null($ip)) {
        $query = "UPDATE users SET hash='".$hash."' WHERE id=".$id;
    }
    else {
        $query = "UPDATE users SET hash='".$hash."', ip=INET_ATON('".$ip."') WHERE id=".$id;
    }
    return execQuery($query);
}

function generateCode($length = 7) {
    $chars="qwertyuiopasdfghjklzxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM1723456789";
    $code = "";
    $clen = strlen($chars)-1;
    while(strlen($code) < $length) {
        $code .= $chars[mt_rand(0, $clen)];
    }
    return $code;
}

function getUser($id, $hash) {
    $query = "SELECT login FROM users WHERE id = '".$id."' AND hash = '".$hash."' LIMIT 1;";
    $user = select($query);
    if (count($user) === 0) {
        return false;
    }
    else {
        return $user;
    }
}

function createArticle($title, $descr_min, $description, $cid, $image) {
    $query = "INSERT INTO info (title, descr_min, description, cid, image) VALUES ('".$title."', '".$descr_min."','".$description."',".$cid.",'".$image."')";
    return execQuery($query);
}

function editArticle($id, $title, $descr_min, $description, $cid, $image) {
    if ($image == NULL) {
        $query = "UPDATE info SET title='".$title."', descr_min='".$descr_min."', description='".$description."', cid=".$cid." WHERE id=".$id;
    } else {
        $query = "UPDATE info SET title='".$title."', descr_min='".$descr_min."', description='".$description."', cid=".$cid.", image='".$image."' WHERE id=".$id;
    }
    return execQuery($query);
}

function removeArticle($id) {
    $query = "DELETE FROM info WHERE id = '".$id."'";
    return execQuery($query);
}

?>