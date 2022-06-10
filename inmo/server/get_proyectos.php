<?php

header("Access-Control-Allow-Origin: http://localhost:4200");
$bd = include_once "bd.php";
include('verificar_token.php');

try {
    $headers = getallheaders();
    if (!is_null($headers["Authorization"])){
        $tokenUnlock = verifyToken2($headers["Authorization"]);
        $tokenUnlock = json_decode($tokenUnlock["data"],true);
        if (strcmp($tokenUnlock["rol"],"a") == 0 ){
            $sentencia = $bd->prepare("select * from proyecto_inmobiliario");
            //$sentencia = $bd->prepare("select * from usuario");
            $sentencia->execute([]);
            $proyectos = $sentencia->fetchAll(PDO::FETCH_ASSOC);
            foreach ($proyectos as $clave => $valor) {
                $proyectos[$clave]["doc_plusvalia"] = base64_encode($proyectos[$clave]["doc_plusvalia"]);
            }
            echo json_encode($proyectos, JSON_UNESCAPED_UNICODE);
            //echo json_encode("asds", JSON_UNESCAPED_UNICODE);
        }else{
            if (strcmp($tokenUnlock["rol"],"u") == 0  ){
                $sentencia = $bd->prepare("select * from proyecto_inmobiliario where proyecto_activo = 1");
                $sentencia->execute([]);
                $proyectos = $sentencia->fetchAll(PDO::FETCH_ASSOC);
                foreach ($proyectos as $clave => $valor) {
                    $proyectos[$clave]["doc_plusvalia"] = base64_encode($proyectos[$clave]["doc_plusvalia"]);
                }
                echo json_encode($proyectos, JSON_UNESCAPED_UNICODE);
            }else{
                throw new Exception('No eres un administrador');
            }
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

