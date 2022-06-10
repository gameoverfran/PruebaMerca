<?php
header('Access-Control-Allow-Origin: *');
$bd = include_once "bd.php";
include('verificar_token.php');
$json = file_get_contents("php://input");

$data = json_decode($json,true);
try{
    $headers = getallheaders();
    if (!is_null($headers["Authorization"])){
        $tokenUnlock = verifyToken2($headers["Authorization"]);
        $tokenUnlock = json_decode($tokenUnlock["data"],true);
        if (strcmp($tokenUnlock["rol"],"a") == 0 ){
            
            $data['fecha_inversion'] = date_parse($data['fecha_inversion']);
            $data['fecha_inversion'] = "".$data['fecha_inversion']['year']."-".$data['fecha_inversion']['month']."-".$data['fecha_inversion']['day']."";
            
            //echo json_encode($data['fecha_inversion'], JSON_UNESCAPED_UNICODE);
            //echo json_encode(date_parse($data['fecha_inversion']), JSON_UNESCAPED_UNICODE);
            $sql = "INSERT INTO `inversion` (`usuario_idusuario`, `proyecto_inmobiliario_idproyecto_inmobiliario`, `cantidad`, `fecha_inversion`, 
            `estado_inversion`, `contrato_participacion_cliente`) 
            VALUES (?, ?, ?, ?, ?, ?);";
            
            
            $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt= $bd->prepare($sql);
            echo json_encode($stmt, JSON_UNESCAPED_UNICODE); 
            $stmt->execute([$data['usuario_idusuario'],$data['proyecto_inmobiliario_idproyecto_inmobiliario'],$data['cantidad'],$data['fecha_inversion'],
            $data['estado_inversion'],base64_decode($data['contrato_participacion_cliente'])]);
            

        }
        else{
                throw new Exception('No eres un administrador');
            
        }
    }else{
        if(is_null($headers["Access-Control-Request-Method"])){
            throw new Exception('El http no contenia un token Authorization');
        }
    }

    }
 catch (Exception $e) {
    header("HTTP/1.1 500 Internal Server Error");
    echo '{"data": "Exception occurred: '.$e->getMessage().'"}';
}
