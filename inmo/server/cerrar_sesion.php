<?php


try {
    header('Access-Control-Allow-Origin: *');
    $bd = include_once "bd.php";
    $json = file_get_contents("php://input");
    
    /*if (isset($_SESSION['idusuario'])) {
        if($_SESSION['idusuario'] == $_GET['idusuario']){
            unset($_SESSION["idusuario"]);
            unset($_SESSION["rol"]);
            session_destroy();
        }
    }else{
        throw new Exception('No sesion');
    }*/
} catch (Exception $e) {
    header("HTTP/1.1 500 Internal Server Error");
    echo '{"data": "Exception occurred: '.$e->getMessage().'"}';
}


     