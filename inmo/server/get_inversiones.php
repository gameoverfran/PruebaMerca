<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
$bd = include_once "bd.php";
include('verificar_token.php');


try {
    $headers = getallheaders();
    //var_dump($headers);
    //echo is_null($headers["Authorization"]);
    $auc = is_null($headers["Authorization"]);
    if (is_null($headers["Authorization"]) == false){
        $tokenUnlock = verifyToken2($headers["Authorization"]);
        $tokenUnlock = json_decode($tokenUnlock["data"],true);
        
        if (strcmp($tokenUnlock["rol"],"a") == 0  ){
            $sentencia = $bd->prepare("select * from inversion");
            $sentencia->execute([]);
            $inversiones = $sentencia->fetchAll(PDO::FETCH_ASSOC);

            foreach ($inversiones as $clave => $valor) {
                $inversiones[$clave]["contrato_participacion_cliente"] = base64_encode($inmueble["contrato_participacion_cliente"]);
                $inversiones[$clave]["contrato_participacion_ambos"] = base64_encode($inmueble["contrato_participacion_ambos"]);
                $inversiones[$clave]["recibo_firmado"] = base64_encode($inmueble["recibo_firmado"]);
            }
            echo json_encode($inversiones, JSON_UNESCAPED_UNICODE); 
            
            //echo json_encode($headers, JSON_UNESCAPED_UNICODE); 
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