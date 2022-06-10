<?php
require $_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
include_once './header.php';



function verifyToken()
{
    $CI = get_instance();
    if ($CI->input->get_request_header('Authorization')) {
        $tokenHeader = $CI->input->get_request_header('Authorization', TRUE);
        try {
            //$token = JWT::decode($tokenHeader, JWT_KEY);
            $token = JWT::decode($tokenHeader, "MillerJumaWilliam");
        } catch (Exception $e) {
            return false;
        }
    } else {
        $token = null;
    }
    if ($token->iat != "Permanent") {
        $loginTime = new DateTime($token->iat);
        $nowTime = new DateTime(date("Y-m-d H:i:s", time()));
        $interval = $loginTime->diff($nowTime);
        $hoursDifference = $interval->h + $interval->days * 24;
        // $minutesDifference = $interval->i + ($hoursDifference * 60);
        if ($hoursDifference >= 48) {
            return false;
        }
    }
    if ($token !== null && $token !== false && $token->privilegeSet !== "Reset") {
        return $token->data;
    } else {
        return false;
    }
}

function verifyToken2($CI)
{
    $token = null;
    try {
        //return is_null($CI);
        //return explode(" ",$CI)[1];
        if(!is_null($CI)){
            return (array) JWT::decode(explode(" ",$CI)[1],new Key("XXX", 'HS256'));
        }
      
    } catch (Exception $e) {

        return false;
    }
    return "";
}