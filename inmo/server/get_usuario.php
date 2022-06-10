<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
$bd = include_once "bd.php";
include('verificar_token.php');

try {
    $headers = getallheaders();
    if (!is_null($headers["Authorization"])){
        $tokenUnlock = verifyToken2($headers["Authorization"]);
        $tokenUnlock = json_decode($tokenUnlock["data"],true);
        if (strcmp($tokenUnlock["rol"],"a") == 0 || $tokenUnlock["idusuario"] == $_GET['idusuario'] ){
            $stmt = $bd->prepare("select * from usuario where idusuario=?");
            $stmt->execute([$_GET['idusuario']]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            $user["dni_pasaporte_foto"] = base64_encode($user["dni_pasaporte_foto"]);
            //$user["dni_pasaporte_foto"] = $user["dni_pasaporte_foto"];
            echo json_encode($user, JSON_UNESCAPED_UNICODE);
        }else{
            throw new Exception('No eres ni un administrador ni el dueño de esta cuenta');
        }
    }else{
        if(is_null($headers["Access-Control-Request-Method"])){
            throw new Exception('El http no contenia un token Authorization');
        }
    }
} catch (Exception $e) {
    header("HTTP/1.1 500 Internal Server Error");
    echo '{"data": "Exception occurred: '.$e->getMessage().'"}';
}