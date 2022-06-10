<?php

require $_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;


try {
    header('Access-Control-Allow-Origin: *');
    $bd = include_once "bd.php";
    $json = file_get_contents("php://input");

    $stmt = $bd->prepare("select * from usuario where email=?");
    $stmt->execute([$_GET['email']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if($user['password'] == $_GET['password']){
        if($user['cuenta_suspendida'] == 0){
            if($user['verificado'] == 1){
                //$user["dni_pasaporte_foto"] = base64_encode($user["dni_pasaporte_foto"]);
                /*session_start( ['cookie_lifetime' => 86400,]);
                $_SESSION["idusuario"]=$user["idusuario"];
                $_SESSION["rol"]=$user["rol"];
                echo json_encode($user, JSON_UNESCAPED_UNICODE);*/
                $user["dni_pasaporte_foto"] = "";

                //------------
                $issuer_claim = "localhost"; 
                $audience_claim = "THE_AUDIENCE";
                $issuedat_claim = time(); // time issued 
                $notbefore_claim = $issuedat_claim + 10; 
                $expire_claim = $issuedat_claim + 60; 

                $token = array(
                    "iss" => "http://example.org",
                    "aud" => "http://example.com",
                    "iat" => 1356999524,
                    "nbf" => 1357000000,
                    "data" => json_encode($user)
                );
            
                $jwtValue = JWT::encode($token, "XXX", 'HS256');
                echo json_encode(
                    array(
                        "message" => "success",
                        "rol" => $user["rol"],
                        "idusuario" => $user["idusuario"],
                        "token" => $jwtValue,
                        "expiry" => $expire_claim
                    ));

            }else{
                throw new Exception('Cuenta no verificada');
            }
        }
        else{
            throw new Exception('Cuenta suspendida');
        }
    }else{
        throw new Exception('Contraseña erronea');
    }
} catch (Exception $e) {
    header("HTTP/1.1 500 Internal Server Error");
    echo '{"data": "Exception occurred: '.$e->getMessage().'"}';
}


     
