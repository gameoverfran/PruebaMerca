<?php
include_once './header.php';
function conexionphp()
{
    $server = getenv('DOCKER_MYSQL_DB_HOST') or $server = "localhost:3306";
    $user = getenv('DOCKER_MYSQL_USER') or $user = "root";
    $pass = getenv('DOCKER_MYSQL_PASSWORD') or $pass = "root";
    $db = getenv('DOCKER_MYSQL_DATABASE') or $db = "inmo";
    return new PDO('mysql:host=' . $server . ';dbname=' . $db, $user, $pass);
}

try
{
    return conexionphp();
}
catch(Exception $e)
{
    echo "Ocurrió algo con la base de datos: " . $e->getMessage();
}