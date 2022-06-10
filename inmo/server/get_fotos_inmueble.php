<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
$bd = include_once "bd.php";
include('verificar_token.php');

try {
    $headers = getallheaders();
    if (!is_null($headers["Authorization"])){
        $tokenUnlock = verifyToken2($headers["Authorization"]);
        $tokenUnlock = json_decode($tokenUnlock["data"],true);
        if (strcmp($tokenUnlock["rol"],"a") == 0 || strcmp($tokenUnlock["rol"],"u") == 0  ){
            $stmt = $bd->prepare("select foto from foto where inmueble_idinmueble=?");
            $stmt->execute([$_GET['idinmueble']]);
            $fotos = $stmt->fetchAll(PDO::FETCH_ASSOC);
            for ($i = 0; $i < count($fotos); $i++) {
                $fotos[$i]["foto"] = base64_encode($fotos[$i]["foto"]);
            }
            echo json_encode($fotos, JSON_UNESCAPED_UNICODE); 
        }else{
            throw new Exception('No eres ni un administrador ni un usuario');
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