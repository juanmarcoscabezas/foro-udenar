<?php
$crud = $_GET['action'];

include './conexion.php';

if($crud == "post"){
    $postData = json_decode(file_get_contents('php://input'),true);
    $titulo = $postData['titulo'];
    $descripcion = $postData['descripcion'];

    $sql1 = "INSERT INTO feedback (titulo,descripcion) VALUES('$titulo','$descripcion')";
    $rs1 = mysqli_query($conn, $sql1);
  
    $sql= "SELECT * FROM feedback ORDER BY id DESC";
    $rs = mysqli_query($conn, $sql);
    $array = array();
    if ($rs) {
        $array = array();
        while ($fila = mysqli_fetch_assoc($rs)) {	
            $array[] = array_map('utf8_encode', $fila);
        }
        $res = json_encode($array, JSON_NUMERIC_CHECK);
    }else{
        $res = null;
        echo mysqli_error($conn);
    }
    mysqli_close($conn);
    echo $res;
}
?>