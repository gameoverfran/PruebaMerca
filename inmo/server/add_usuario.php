<?php
header('Access-Control-Allow-Origin: *');
$bd = include_once "bd.php";
try{
    $headers = getallheaders();
    if(is_null($headers["Access-Control-Request-Method"])){
        $json = file_get_contents("php://input");
        $data = json_decode($json,true);
    
        $sql = "INSERT INTO usuario 
        (num_ident, nombre, apellido, email, telefono, 
        password, fecha_registro, rol, nacionalidad, 
        comunidad_aut, provincia, poblacion, cp, direccion, 
        cuenta_suspendida, dni_pasaporte_foto, fecha_verificacion, verificado)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    
        $bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt= $bd->prepare($sql);
        $stmt->execute([$data['num_ident'],$data['nombre'],$data['apellido'],$data['email'],
        $data['telefono'],$data['password'],date("Y-m-d"),'u',$data['nacionalidad'],
        $data['comunidad_aut'],$data['provincia'],$data['poblacion'],$data['cp'],$data['direccion'],
        0,base64_decode($data['dni_pasaporte_foto']),date("Y-m-d"),1]);
    }
} catch (Exception $e) {
    header("HTTP/1.1 500 Internal Server Error");
    echo '{"data": "Exception occurred: '.$e->getMessage().'"}';
}


//var_dump($_POST);

/*function base64_to_jpeg( $base64_string, $output_file ) {
    $ifp = fopen( $output_file, "wb" ); 
    fwrite( $ifp, base64_decode( $base64_string) ); 
    fclose( $ifp ); 
    return( $output_file ); 
}*/

//base64_to_jpeg( $data['dni_pasaporte_foto'], $data['num_ident'].'.jpg' );

// ESTO ESTA BIEN
// TODO RECUERDA cambiar lo de la fechas y MD5 a la contraseña
/*$sql = "INSERT INTO usuario 
(num_ident, nombre, apellido, email, telefono, password, fecha_registro, rol, nacionalidad, 
comunidad_aut, provincia, poblacion, cp, direccion, cuenta_suspendida, dni_pasaporte_foto, fecha_verificacion, verificado)
VALUES ('".$data['num_ident']."','".$data['nombre']."','".$data['apellido']."',
'".$data['email']."','".$data['telefono']."','".$data['password']."', 
'".date("Y-m-d")."', 'u','".$data['nacionalidad']."',
'".$data['comunidad_aut']."','".$data['provincia']."',
'".$data['poblacion']."','".$data['cp']."',
'".$data['direccion']."','0',
'".addslashes(file_get_contents($data['num_ident'].'.jpg'))."','2022-03-03', '0')";*/



//Eliminar archivo
//unlink($data['num_ident'].'.jpg');
//echo json_encode(file_get_contents('./tmp2.jpg'), JSON_UNESCAPED_UNICODE); 




 


