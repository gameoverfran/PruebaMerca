<?php
$bd = include_once "bd.php";
$json = file_get_contents("php://input");
$pila = array();
$sql = "";
include('verificar_token.php');

function insertEdificacion($data){
    switch (strtolower($data['tipo_edificacion'])) {
        case "local":
            $GLOBALS["sql"] = "INSERT INTO `inmo`.`inmueble` 
            (`usuario_idusuario`, `valor`, `anejos`, `metros`, `informacion_extra`, `situacion`, 
            `comunidad_autonoma`, `provincia`, `poblacion`, `cp`, `calle`, `numero_calle`, `fecha_construccion`, 
            `tipo`, `tipo_edificacion`, `conservacion`, `numero_edificio`, `gastos_comunidad`, `nombre`) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ;";

            array_push($GLOBALS["pila"] , $data['usuario_idusuario'], $data['valor'],$data['anejos'],$data['metros'],$data['informacion_extra'],$data['situacion'],$data['comunidad_autonoma'],
            $data['provincia'],$data['poblacion'],$data['cp'],$data['calle'],$data['numero_calle'],$data['fecha_construccion'],$data['tipo'],$data['tipo_edificacion'],
            $data['conservacion'],$data['numero_edificio'],$data['gastos_comunidad'], $data['nombre']);

            break;
        case "nave":
            $GLOBALS["sql"] = "INSERT INTO `inmo`.`inmueble` 
            (`usuario_idusuario`, `valor`, `anejos`, `metros`, `informacion_extra`, `situacion`, 
            `comunidad_autonoma`, `provincia`, `poblacion`, `cp`, `calle`, `numero_calle`, `fecha_construccion`, 
            `tipo`, `tipo_edificacion`, `conservacion`, `numero_edificio`, `gastos_comunidad`,`acondicionamiento`, `nombre`) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ;";

            array_push($GLOBALS["pila"] , $data['usuario_idusuario'], $data['valor'],$data['anejos'],$data['metros'],$data['informacion_extra'],$data['situacion'],$data['comunidad_autonoma'],
            $data['provincia'],$data['poblacion'],$data['cp'],$data['calle'],$data['numero_calle'],$data['fecha_construccion'],$data['tipo'],$data['tipo_edificacion'],
            $data['conservacion'],$data['numero_edificio'],$data['gastos_comunidad'],$data['tipo_instalacion'], $data['nombre']);
            break;

        case "instalacion":
            $GLOBALS["sql"] = "INSERT INTO `inmo`.`inmueble` 
            (`usuario_idusuario`, `valor`, `anejos`, `metros`, `informacion_extra`, `situacion`, 
            `comunidad_autonoma`, `provincia`, `poblacion`, `cp`, `calle`, `numero_calle`, `fecha_construccion`, 
            `tipo`, `tipo_edificacion`, `conservacion`, `numero_edificio`, `gastos_comunidad`,`tipo_instalacion`, `nombre`) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ;";

            array_push($GLOBALS["pila"] , $data['usuario_idusuario'], $data['valor'],$data['anejos'],$data['metros'],$data['informacion_extra'],$data['situacion'],$data['comunidad_autonoma'],
            $data['provincia'],$data['poblacion'],$data['cp'],$data['calle'],$data['numero_calle'],$data['fecha_construccion'],$data['tipo'],$data['tipo_edificacion'],
            $data['conservacion'],$data['numero_edificio'],$data['gastos_comunidad'],$data['tipo_instalacion'], $data['nombre']);
            break;

        case "vivienda":
            $GLOBALS["sql"] = "INSERT INTO `inmo`.`inmueble` 
            (`usuario_idusuario`, `valor`, `anejos`, `metros`, `informacion_extra`, `situacion`, 
            `comunidad_autonoma`, `provincia`, `poblacion`, `cp`, `calle`, `numero_calle`, `fecha_construccion`, 
            `tipo`, `tipo_edificacion`, `conservacion`, `numero_edificio`, `gastos_comunidad`, `amueblado`, `habitaciones`, `banos`, `trastero`, `garaje`, `orientacion`, `terraza`
            , `nombre`) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ;";

            array_push($GLOBALS["pila"] , $data['usuario_idusuario'], $data['valor'],$data['anejos'],$data['metros'],$data['informacion_extra'],$data['situacion'],$data['comunidad_autonoma'],
            $data['provincia'],$data['poblacion'],$data['cp'],$data['calle'],$data['numero_calle'],$data['fecha_construccion'],$data['tipo'],$data['tipo_edificacion'],
            $data['conservacion'],$data['numero_edificio'],$data['gastos_comunidad'],$data['amueblado'],$data['habitaciones'],$data['banos'],$data['trastero'],$data['garaje'],
            $data['orientacion'],$data['terraza'], $data['nombre']);
            break;

        case "trastero":
            $GLOBALS["sql"] = "INSERT INTO `inmo`.`inmueble` 
            (`usuario_idusuario`, `valor`, `anejos`, `metros`, `informacion_extra`, `situacion`, 
            `comunidad_autonoma`, `provincia`, `poblacion`, `cp`, `calle`, `numero_calle`, `fecha_construccion`, 
            `tipo`, `tipo_edificacion`, `conservacion`, `numero_edificio`, `gastos_comunidad`,`titularidad`, `nombre`) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ;";

            array_push($GLOBALS["pila"] , $data['usuario_idusuario'], $data['valor'],$data['anejos'],$data['metros'],$data['informacion_extra'],$data['situacion'],$data['comunidad_autonoma'],
            $data['provincia'],$data['poblacion'],$data['cp'],$data['calle'],$data['numero_calle'],$data['fecha_construccion'],$data['tipo'],$data['tipo_edificacion'],
            $data['conservacion'],$data['numero_edificio'],$data['gastos_comunidad'],$data['titularidad'], $data['nombre']);
            break;

        case "garaje":
            $GLOBALS["sql"] = "INSERT INTO `inmo`.`inmueble` 
            (`usuario_idusuario`, `valor`, `anejos`, `metros`, `informacion_extra`, `situacion`, 
            `comunidad_autonoma`, `provincia`, `poblacion`, `cp`, `calle`, `numero_calle`, `fecha_construccion`, 
            `tipo`, `tipo_edificacion`, `conservacion`, `numero_edificio`, `gastos_comunidad`, `nombre`) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ;";

            array_push($GLOBALS["pila"] , $data['usuario_idusuario'], $data['valor'],$data['anejos'],$data['metros'],$data['informacion_extra'],$data['situacion'],$data['comunidad_autonoma'],
            $data['provincia'],$data['poblacion'],$data['cp'],$data['calle'],$data['numero_calle'],$data['fecha_construccion'],$data['tipo'],$data['tipo_edificacion'],
            $data['conservacion'],$data['numero_edificio'],$data['gastos_comunidad'], $data['nombre']);
            break;
        default:
            break;
    }
}

function insertTerreno($data){
    
    switch (strtolower($data['tipo_terreno'])) {
        case "terreno":
            
            $GLOBALS["sql"]  = "INSERT INTO `inmo`.`inmueble` 
            (`usuario_idusuario`, `valor`, `anejos`, `metros`, `informacion_extra`, `situacion`, 
            `comunidad_autonoma`,`provincia`, `poblacion`, `cp`, `calle`, `numero_calle`, `fecha_construccion`, `tipo`, 
            `tipo_terreno`, `aprovechamiento`, `nombre`) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ;";
            
            array_push($GLOBALS["pila"] , $data['usuario_idusuario'], $data['valor'],$data['anejos'],$data['metros'],$data['informacion_extra'],$data['situacion'],$data['comunidad_autonoma'],
            $data['provincia'],$data['poblacion'],$data['cp'],$data['calle'],$data['numero_calle'],$data['fecha_construccion'],$data['tipo'],
            $data['tipo_terreno'],$data['aprovechamiento'], $data['nombre']);
            break;
            
        default:
            break;
    }

    
}


try {
    $headers = getallheaders();
    if (!is_null($headers["Authorization"])){
        $tokenUnlock = verifyToken2($headers["Authorization"]);
        $tokenUnlock = json_decode($tokenUnlock["data"],true);
        if (strcmp($tokenUnlock["rol"],"a") == 0 ){
            $data = json_decode($json,true);
            
        
            $data['fecha_construccion'] = "".$data['fecha_construccion']['year']."-".$data['fecha_construccion']['month']."-".$data['fecha_construccion']['day']."";


            switch (strtolower($data['tipo'])) {
                case "edificacion":
                    insertEdificacion($data);
                    break;
                case "terreno":
                    insertTerreno($data); 
                    break;
            }

            $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt= $bd->prepare($sql);
            $stmt->execute($pila);
            $idInmueble = $bd->lastInsertId();


            if(!empty($data['fotosList'])){
                for ($i = 0; $i < count($data['fotosList']); $i++) {
                $fotosql = "INSERT INTO `foto` (`inmueble_idinmueble`,`foto`) 
                    VALUES 
                    (?,?);";
                    $stmt= $bd->prepare($fotosql);
                    $stmt->execute([$idInmueble,base64_decode($data['fotosList'][$i])]);      
                }
            
            }
        }else{
            throw new Exception('No eres ni un administrador');
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


