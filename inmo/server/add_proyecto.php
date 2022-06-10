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
            $sql = "INSERT INTO proyecto_inmobiliario
            (valor_total_proyecto, rentabilidad_estimada, valor_min_inicio_proy, 
            sum_valores_aportados, valor_min_aportacion, proyecto_activo, doc_plusvalia, nombre) 
            VALUES (?,?,?,?,?,?,?, ?);";
            
            
            $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt= $bd->prepare($sql);
            $stmt->execute([$data['valor_total_proyecto'],$data['rentabilidad_estimada'],$data['valor_min_inicio_proy'],$data['sum_valores_aportados'],
            $data['valor_min_aportacion'],$data['proyecto_activo'],base64_decode($data['doc_plusvalia']),$data['nombre'] ]);

            $idProyecto = $bd->lastInsertId();

            for ($i = 0; $i < count($data['idinmuebles']); $i++) {
                $sql = "UPDATE inmueble SET proyecto_inmobiliario_idproyecto_inmobiliario = ? WHERE idinmueble = ?;";
                $stmt= $bd->prepare($sql);
                $stmt->execute([$idProyecto,$data['idinmuebles'][$i]]);
            }
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
