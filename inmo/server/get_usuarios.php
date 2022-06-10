<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
$bd = include_once "bd.php";
include('verificar_token.php');

try {
    $headers = getallheaders();
    if (!is_null($headers["Authorization"])){
        $tokenUnlock = verifyToken2($headers["Authorization"]);
        $tokenUnlock = json_decode($tokenUnlock["data"],true);
        if (strcmp($tokenUnlock["rol"],"a") == 0){
            $sentencia = $bd->prepare("select * from usuario");
            $sentencia->execute([]);
            $usuarios = $sentencia->fetchAll(PDO::FETCH_ASSOC);
            foreach ($usuarios as $clave => $valor) {
                $usuarios[$clave]["dni_pasaporte_foto"] = base64_encode($usuarios[$clave]["dni_pasaporte_foto"]);
            }
            echo json_encode($usuarios, JSON_UNESCAPED_UNICODE); 
        }else{
            throw new Exception('No eres un administrador');
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